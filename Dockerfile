# Step 1: Build Stage
FROM node:20 AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Production Stage
FROM node:20-alpine AS production-stage

WORKDIR /app

COPY --from=build-stage /app/.output ./.output
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/package*.json ./

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]