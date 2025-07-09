# 1. Gebruik de officiële Playwright image (jammy bevat Ubuntu 22.04 + browsers)
FROM mcr.microsoft.com/playwright:v1.53.1-jammy

# 2. Werkdirectory instellen
WORKDIR /app

# 3. Kopieer package-bestanden en installeer dependencies
COPY package*.json ./
RUN npm ci
RUN npx playwright install --with-deps
# RUN node login.js
# 4. Kopieer de rest van je project
COPY . .

# 5. Kopieer test sessiestatus als je die gebruikt (optioneel)
# COPY state.json .

# 6. Start Playwright tests met alleen Chromium
CMD ["npx", "playwright", "test", "--project=chromium"]
