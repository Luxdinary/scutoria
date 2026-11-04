# Scutoria website. Build context: the site/ folder, after `npm run build:assets` has filled public/.
# The Playwright image carries Chromium for the PDF documents; its Node version matches package.json.
FROM mcr.microsoft.com/playwright:v1.64.1-noble
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src ./src
COPY content ./content
COPY public ./public
RUN mkdir -p /app/data
ARG APP_VERSION=dev
ENV PORT=8080 DATA_DIR=/app/data APP_VERSION=$APP_VERSION PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
EXPOSE 8080
CMD ["node", "--disable-warning=ExperimentalWarning", "src/server.mjs"]
