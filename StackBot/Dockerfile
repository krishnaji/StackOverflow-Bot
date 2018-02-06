FROM node:8
WORKDIR /usr/src/app

COPY package.json .
COPY . .

EXPOSE 8080
EXPOSE 443
EXPOSE 3978
RUN npm install
CMD ["npm", "start"]
