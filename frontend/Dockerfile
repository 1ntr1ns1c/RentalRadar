# frontend/Dockerfile
FROM node:20-alpine
ENV NODE_ENV=development
WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json* ./

RUN npm ci --legacy-peer-deps
# RUN npm ci

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
