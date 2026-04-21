# Ephemeral

A social media platform dedicated exclusively to photographs of **places** — everyday landscapes people walk past without noticing, remote corners of the world, and the quiet scenery that shapes our surroundings. No portraits, no animals, no content not centred on a physical location.

## Repository structure

See [`backend/README.md`](backend/README.md) and [`website/README.md`](website/README.md) for deeper detail on each service.

---

## Running with Docker

This is the recommended way to run the full stack.

```bash
# 1. Copy and configure environment variables
cp .env.example .env
# Edit .env — at minimum change JWT_SECRET to a long random string

# 2. Build and start all services
docker compose up --build
```

The website will be available at **http://localhost** (port 80 by default).
The backend API is reachable at **http://localhost/api**.