FROM node:lts-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run lint

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
