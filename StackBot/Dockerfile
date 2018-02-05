FROM node:8
WORKDIR /usr/src/app

COPY package.json .
COPY . .

EXPOSE 80
EXPOSE 443

RUN npm install
CMD ["npm", "start"]
