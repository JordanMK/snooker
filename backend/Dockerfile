# Development stage
FROM node:22.11-bookworm-slim AS development

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci 

COPY . .

CMD ["npm", "run", "dev"]

# Production stage
FROM node:22.11-bookworm-slim AS production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . . 

CMD ["npm", "run", "prod"]
