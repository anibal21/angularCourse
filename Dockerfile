FROM nginx:alpine

RUN apk add --update npm

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/local/angular/

WORKDIR /usr/local/angular/

RUN npm install
RUN npm update
RUN npm run build
RUN cp -R dist/* /usr/share/nginx/html

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]