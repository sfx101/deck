ARG PHP_VERSION
FROM deckapp/apache_php:v${PHP_VERSION}

LABEL maintainer="Naba Kumar Das <nabad600@gmail.com>"

COPY httpd.conf /etc/apache2/httpd.conf
ARG SERVER_ROOT

RUN sed -i "s#{SERVER_ROOT}#$SERVER_ROOT#g" /etc/apache2/httpd.conf
VOLUME [ "/var/www/" ]
WORKDIR /var/www

CMD ["/sbin/runit-wrapper"]
EXPOSE 80