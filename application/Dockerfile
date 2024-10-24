FROM node:18

WORKDIR /application

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD npm run seed && npm run dev