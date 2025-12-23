# Lottery Scraper API

A production-ready Node.js Express API for web scraping lottery data using Puppeteer and Google Chrome. Fully Dockerized with optimized multi-stage builds and security best practices.

## Features

- 🚀 **Express.js REST API** - Simple and efficient API endpoint
- 🎭 **Puppeteer Integration** - Headless Chrome browser automation
- 🐳 **Dockerized** - Production-ready Docker container with multi-stage builds
- 🔒 **Security** - Non-root user, optimized Chrome args, minimal attack surface
- 📊 **Health Checks** - Built-in health monitoring
- ☁️ **Cloud Ready** - Optimized for AWS ECS/EC2 deployment
- 🔧 **Configurable** - Environment-based configuration

## Prerequisites

- **Node.js** 20+ (for local development)
- **Docker** 20.10+ (for containerized deployment)
- **Docker Compose** 2.0+ (optional, for easier management)

## Quick Start

### Using Docker Compose (Recommended)

```bash
# Build and start the service
docker-compose up -d --build

# View logs
docker-compose logs -f scraper-lottery

# Stop the service
docker-compose down
```

### Using Docker

```bash
# Build the image
docker build -t scraper-lottery:latest .

# Run the container
docker run -d \
  --name scraper-lottery \
  -p 3000:3000 \
  -e PORT=3000 \
  scraper-lottery:latest
```

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## API Documentation

### Endpoint

```
GET /api-scraper
```

### Query Parameters

| Parameter | Type   | Required | Description                    |
|----------|--------|----------|--------------------------------|
| `url`    | string | Yes      | Base URL of the target website |
| `slug`   | string | Yes      | URL slug/path segment          |
| `drawNo` | string | Yes      | Draw number identifier         |

### Example Request

```bash
curl "http://localhost:3000/api-scraper?url=https://example.com&slug=lottery&drawNo=12345"
```

### Success Response

```json
{
  "success": true,
  "data": [
    "<div>Scraped content 1</div>",
    "<div>Scraped content 2</div>"
  ]
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message description"
}
```

### Status Codes

- `200` - Success
- `400` - Bad Request (missing required parameters)
- `500` - Internal Server Error

## Configuration

### Environment Variables

| Variable                  | Default                          | Description                    |
|---------------------------|----------------------------------|--------------------------------|
| `PORT`                    | `3000`                           | Server port                    |
| `CHROME_EXECUTABLE_PATH`  | `/usr/bin/google-chrome-stable`  | Chrome executable path          |
| `NODE_ENV`                | `production`                     | Node environment               |

### Example Configuration

```bash
# Using environment variables
export PORT=8080
export CHROME_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Or in docker-compose.yml
environment:
  - PORT=8080
  - CHROME_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
```

## Project Structure

```
scraper-lottery/
├── src/
│   ├── app.js          # Express application setup
│   └── scraper.js      # Puppeteer scraping logic
├── index.js            # Application entry point
├── Dockerfile          # Multi-stage Docker build
├── docker-compose.yml  # Docker Compose configuration
├── .dockerignore       # Docker ignore patterns
├── package.json        # Node.js dependencies
└── README.md          # This file
```

## Docker Details

### Image Features

- **Base Image**: `node:20-slim` (lightweight)
- **Multi-stage Build**: Optimized image size
- **Non-root User**: Runs as `appuser` for security
- **Chrome Dependencies**: All required libraries pre-installed
- **Health Check**: Automatic container health monitoring

### Resource Requirements

- **Minimum**: 512MB RAM, 0.5 CPU
- **Recommended**: 1GB RAM, 1 CPU
- **Concurrent Requests**: Monitor memory usage for high concurrency

## Deployment

### AWS ECS

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed AWS ECS/EC2 deployment instructions.

### Docker Commands

See [docker-commands.md](./docker-commands.md) for comprehensive Docker commands.

### Health Check

The container includes a built-in health check that validates the API endpoint:

```bash
# Manual health check
curl http://localhost:3000/api-scraper?url=test&slug=test&drawNo=1
# Expected: 400 status (validates endpoint is working)
```

## Development

### Scripts

```bash
npm run dev    # Start with nodemon (auto-reload)
npm start      # Start production server
npm test       # Run tests (placeholder)
```

### Adding New Features

1. Modify scraping logic in `src/scraper.js`
2. Add new endpoints in `src/app.js`
3. Rebuild Docker image: `docker-compose build`
4. Test locally before deploying

## Troubleshooting

### Chrome Crashes

- **Solution**: Increase container memory allocation
- **Check**: Review logs for specific error messages
- **Verify**: Chrome executable path is correct

### Timeout Issues

- **Solution**: Adjust Puppeteer timeout values
- **Check**: Network connectivity to target URLs
- **Consider**: Implementing request queuing for high load

### High Memory Usage

- **Solution**: Monitor concurrent requests
- **Consider**: Implement rate limiting
- **Optimize**: Review Chrome args in `scraper.js`

### Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Or use different port
PORT=8080 docker-compose up -d
```

## Security Considerations

- ✅ Non-root user execution
- ✅ Minimal base image (slim)
- ✅ No unnecessary packages
- ✅ Secure Chrome launch arguments
- ✅ Environment variable configuration
- ✅ Health check monitoring

## Performance Tips

1. **Memory**: Allocate sufficient memory (1GB+ recommended)
2. **CPU**: Use at least 0.5 CPU for stable performance
3. **Concurrency**: Implement request queuing for high traffic
4. **Caching**: Consider caching frequently accessed data
5. **Monitoring**: Use CloudWatch or similar for production monitoring

## License

ISC

## Support

For deployment assistance, refer to:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - AWS deployment guide
- [docker-commands.md](./docker-commands.md) - Docker command reference

---

**Built with** ❤️ using Node.js, Express, Puppeteer, and Docker

