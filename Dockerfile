# Build context must be repo root. In Railway: Dockerfile path = Dockerfile, Root directory = empty.
FROM node:25-alpine AS builder

# Set BUILD_REV in Railway variables to force a fresh build when "no change detected".
ARG BUILD_REV=unknown
RUN echo "Build revision: $BUILD_REV"

WORKDIR /app

# Root package.json only (no lockfile) — npm then only sees the 3 packages we COPY below
COPY package.json ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/database/package.json ./packages/database/
COPY packages/server/package.json ./packages/server/

RUN npm install

COPY tsconfig.json ./
COPY packages/shared/ ./packages/shared/
COPY packages/database/ ./packages/database/
COPY packages/server/ ./packages/server/

# Must build in dependency order: shared → database → server (do not use "npm run build" here)
RUN npm run build -w @ducky/shared && \
    npm run build -w @ducky/database && \
    npm run build -w @ducky/server

FROM node:25-alpine

WORKDIR /app

COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/
COPY --from=builder /app/packages/database/dist ./packages/database/dist
COPY --from=builder /app/packages/database/package.json ./packages/database/
COPY --from=builder /app/packages/server/dist ./packages/server/dist
COPY --from=builder /app/packages/server/package.json ./packages/server/
COPY --from=builder /app/package.json ./

RUN npm install --omit=dev

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV TUNNEL_DOMAIN=localhost

CMD ["node", "packages/server/dist/index.js"]
