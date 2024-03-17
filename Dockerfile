FROM node:19-alpine3.15 as dev-dependencies
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:19-alpine3.15 as dev
WORKDIR /app
COPY --from=dev-dependencies /app/node_modules /app/node_modules
COPY . .
RUN npm install -g nodemon
ENTRYPOINT ["nodemon", "/app/index.js"] 
CMD ["npm", "run", "start"]