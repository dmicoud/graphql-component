FROM node:12.13.0-alpine as stage

WORKDIR /app

COPY ./test/examples/federation/property-service/package.json .

RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
RUN cp -R node_modules prod_node_modules

FROM stage

COPY --from=stage /app/prod_node_modules ./node_modules
COPY ./lib ./lib
COPY ./test/examples/federation/property-service .

CMD ["node", "index.js"]