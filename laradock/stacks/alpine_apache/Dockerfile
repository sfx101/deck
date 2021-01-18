FROM deckapp/apache_php:v7.2
MAINTAINER Naba Das <hello@get-deck.com>
ENV APACHE_DOCUMENT_ROOT=/var/www/
RUN sed -ri -e 's!/var/www/localhost/htdocs!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/httpd.conf
#RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
