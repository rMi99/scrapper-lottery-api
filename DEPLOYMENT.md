# AWS ECS / EC2 Deployment Notes

## ECS Task Definition

### Required Environment Variables
- `PORT`: Application port (default: 3000)
- `CHROME_EXECUTABLE_PATH`: Chrome path (default: /usr/bin/google-chrome-stable)

### Task Definition JSON Snippet
```json
{
  "containerDefinitions": [
    {
      "name": "scraper-lottery",
      "image": "your-ecr-repo/scraper-lottery:latest",
      "memory": 1024,
      "cpu": 512,
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "PORT",
          "value": "3000"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/scraper-lottery",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "networkMode": "awsvpc",
  "cpu": "512",
  "memory": "1024"
}
```

## EC2 Deployment

### Prerequisites
- Docker installed on EC2 instance
- Security group allowing inbound traffic on port 3000 (or your chosen port)

### Steps
1. Build and push to ECR (or use Docker Hub)
2. SSH into EC2 instance
3. Pull image: `docker pull your-image:latest`
4. Run container:
   ```bash
   docker run -d \
     --name scraper-lottery \
     --restart unless-stopped \
     -p 3000:3000 \
     -e PORT=3000 \
     your-image:latest
   ```

### Systemd Service (Optional)
Create `/etc/systemd/system/scraper-lottery.service`:
```ini
[Unit]
Description=Scraper Lottery API
After=docker.service
Requires=docker.service

[Service]
Type=simple
ExecStart=/usr/bin/docker run --rm --name scraper-lottery -p 3000:3000 -e PORT=3000 your-image:latest
ExecStop=/usr/bin/docker stop scraper-lottery
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable: `sudo systemctl enable scraper-lottery.service`

## Performance Considerations

### Memory
- Minimum: 512MB
- Recommended: 1GB+ (Chrome can be memory-intensive)
- Monitor memory usage in production

### CPU
- Minimum: 256 CPU units
- Recommended: 512+ CPU units for concurrent requests

### Scaling
- Use ECS Service with auto-scaling based on CPU/Memory metrics
- Consider using Application Load Balancer for multiple tasks
- Implement request queuing if handling high concurrency

## Security Best Practices

1. **Non-root user**: Already implemented in Dockerfile
2. **Secrets**: Use AWS Secrets Manager or Parameter Store for sensitive data
3. **Network**: Use private subnets for ECS tasks, ALB in public subnet
4. **IAM Roles**: Assign minimal required permissions to ECS task role
5. **Image Scanning**: Enable ECR image scanning
6. **Logging**: Use CloudWatch Logs (configured in task definition)

## Monitoring

### CloudWatch Metrics
- CPUUtilization
- MemoryUtilization
- NetworkRxBytes / NetworkTxBytes

### Application Logs
- Logs are sent to CloudWatch Logs
- Monitor for Puppeteer errors, timeouts, or Chrome crashes

### Health Checks
- Health check endpoint configured in Dockerfile
- ECS health check: `GET /api-scraper?url=test&slug=test&drawNo=1` (expects 400)

## Troubleshooting

### Chrome Crashes
- Increase memory allocation
- Check Chrome args in scraper.js
- Review logs for specific error messages

### Timeouts
- Increase ECS task timeout settings
- Adjust Puppeteer timeout values if needed
- Consider implementing request queuing

### High Memory Usage
- Monitor concurrent requests
- Consider implementing request rate limiting
- Use connection pooling if applicable

