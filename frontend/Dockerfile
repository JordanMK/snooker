# Development stage
FROM node:22.11-bookworm-slim AS development

WORKDIR /app

COPY package.json package-lock.json ./ 

RUN npm ci

COPY . .

ARG API_URL

RUN API_URL=${API_URL} npm run build

# Production stage
FROM caddy:2-alpine AS production

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=development /app/out /srv
