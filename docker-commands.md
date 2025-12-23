# Docker Commands

## Build Image
```bash
docker build -t scraper-lottery:latest .
```

## Run Container
```bash
docker run -d \
  --name scraper-lottery \
  -p 3000:3000 \
  -e PORT=3000 \
  scraper-lottery:latest
```

## Run with Custom Port
```bash
docker run -d \
  --name scraper-lottery \
  -p 8080:8080 \
  -e PORT=8080 \
  scraper-lottery:latest
```

## Run with Environment Variables
```bash
docker run -d \
  --name scraper-lottery \
  -p 3000:3000 \
  -e PORT=3000 \
  -e CHROME_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
  scraper-lottery:latest
```

## View Logs
```bash
docker logs -f scraper-lottery
```

## Stop Container
```bash
docker stop scraper-lottery
```

## Remove Container
```bash
docker rm scraper-lottery
```

## Test API
```bash
curl "http://localhost:3000/api-scraper?url=https://example.com&slug=test&drawNo=123"
```

---

## Docker Compose Commands

### Build and Start
```bash
docker-compose up -d --build
```

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f scraper-lottery
```

### Restart Service
```bash
docker-compose restart scraper-lottery
```

### Run with Custom Port
```bash
PORT=8080 docker-compose up -d
```

### Rebuild Service
```bash
docker-compose build --no-cache scraper-lottery
docker-compose up -d
```

### View Service Status
```bash
docker-compose ps
```

### Execute Command in Container
```bash
docker-compose exec scraper-lottery sh
```

