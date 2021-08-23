FROM node:14-slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
# RUN npx sequelize-cli db:migrate --env production
CMD ["npm", "start"]