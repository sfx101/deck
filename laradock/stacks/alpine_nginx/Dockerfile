ARG PHP_VERSION
FROM deckapp/nginx_php:v${PHP_VERSION}

LABEL maintainer="Naba Kumar Das <nabad600@gmail.com>"

COPY default.conf /etc/nginx/conf.d/
ARG SERVER_ROOT

RUN sed -i "s#{SERVER_ROOT}#$SERVER_ROOT#g" /etc/nginx/conf.d/default.conf
VOLUME [ "/var/www/" ]
WORKDIR /var/www

CMD ["/sbin/runit-wrapper"]
EXPOSE 80