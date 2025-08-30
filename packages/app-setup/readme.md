# Start in detached mode (runs in background)
docker-compose up -d

# Start with logs visible in terminal
docker-compose up

# Force rebuild if you've changed the Docker configuration
docker-compose up -d --build
