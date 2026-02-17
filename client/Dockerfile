FROM node:18-alpine AS development
RUN apk add --no-cache python3 make g++ 
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]