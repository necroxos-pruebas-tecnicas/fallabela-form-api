FROM node:21-alpine3.19
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

# Init prisma
RUN npx prisma migrate
RUN npx prisma generate

# Exec lint, tests and build
RUN npm run lint
RUN npm run test:cov
RUN npm run build

EXPOSE 3001