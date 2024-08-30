FROM node:18.12.1-alpine

WORKDIR /usr/app

COPY . . 

RUN npm install

ENV TZ="America/Sao_Paulo"

EXPOSE 3000

CMD ["npm","run","prod"] 