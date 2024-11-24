FROM node:22.11-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci 

COPY . .
