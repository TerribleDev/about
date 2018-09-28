FROM node:8 as build
WORKDIR /build
COPY .bowerrc bower.json ./
RUN npm run bower install
COPY package.json ./
RUN npm install
COPY . .
RUN npm run pub

FROM nginx:mainline as runtime
COPY --from=build /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf