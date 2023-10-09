FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV REACT_APP_GOOGLE_AUTH_CLIENT_KEY='703305669487-c9t7n2d4bc2vge11coeo38neh6r4uk3e.apps.googleusercontent.com'

EXPOSE 80 
# HTPP 기본
CMD ["npm", "start"]

