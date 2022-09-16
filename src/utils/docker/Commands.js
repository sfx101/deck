export const DOCKER_COMPOSE_UP =
    "docker-compose build --force-rm ; docker-compose stop; docker-compose up -d";
export const DOCKER_COMPOSE_STOP = "docker-compose stop";
export const DOCKER_COMPOSE_RESTART =
    "docker-compose build ; docker-compose stop ; docker-compose up -d";
export const DOCKER_COMPOSE_DOWN =
    "docker-compose down --rmi all -v --remove-orphans";
