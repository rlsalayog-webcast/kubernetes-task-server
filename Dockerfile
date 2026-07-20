# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

# Install deps first for better layer caching
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY src ./src

# ---- Production stage ----
FROM node:20-alpine AS production

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy only what's needed from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/src ./src

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

USER appuser

CMD ["node", "src/app.js"]