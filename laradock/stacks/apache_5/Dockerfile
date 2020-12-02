ARG SERVER_ROOT
FROM deckapp/apache_php:v5.6

LABEL maintainer="Naba Kumar Das <nabad600@gmail.com>"
ARG SERVER_ROOT
COPY httpd.conf /etc/apache2/httpd.conf
ARG SERVER_ROOT

RUN sed -i "s#{SERVER_ROOT}#$SERVER_ROOT#g" /etc/apache2/httpd.conf
VOLUME [ "/var/www/" ]
WORKDIR /var/www

EXPOSE 80