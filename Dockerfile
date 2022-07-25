FROM node

WORKDIR /viewing_stock_quotes

COPY package*.json /viewing_stock_quotes

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]