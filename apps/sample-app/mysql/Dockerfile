FROM --platform=linux/x86_64 alpine:3.4
LABEL MAINTAINER Naba Das <hello@get-deck.com>

WORKDIR /app
VOLUME /app

RUN apk add --update mysql mysql-client && rm -f /var/cache/apk/*
RUN apk update
RUN apk add bash

# These lines moved to the end allow us to rebuild image quickly after only these files were modified.
COPY startup.sh /startup.sh
RUN chmod +x /startup.sh
COPY my.cnf /etc/mysql/my.cnf

EXPOSE 3306
CMD ["/startup.sh"]