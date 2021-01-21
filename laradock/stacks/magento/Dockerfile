FROM quay.io/alexcheng1982/apache2-php7:7.3.12

LABEL maintainer="alexcheng1982@gmail.com"
LABEL php_version="7.3.12"
LABEL magento_version="2.3.6"
LABEL description="Magento 2.3.6 with PHP 7.3.12"

ENV MAGENTO_VERSION 2.3.6
ENV INSTALL_DIR /var/www/html
ENV COMPOSER_HOME /var/www/.composer/

RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer
COPY ./auth.json $COMPOSER_HOME

RUN requirements="libpng++-dev libzip-dev libmcrypt-dev libmcrypt4 libcurl3-dev libfreetype6 libjpeg-turbo8 libjpeg-turbo8-dev libfreetype6-dev libicu-dev libxslt1-dev unzip" \
    && apt-get update \
    && apt-get install -y $requirements \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install gd \
    && docker-php-ext-install mbstring \
    && docker-php-ext-install zip \
    && docker-php-ext-install intl \
    && docker-php-ext-install xsl \
    && docker-php-ext-install soap \
    && docker-php-ext-install bcmath

RUN yes '' | pecl install mcrypt-1.0.3 \
    && echo 'extension=mcrypt.so' > /usr/local/etc/php/conf.d/mcrypt.ini

RUN chsh -s /bin/bash www-data

RUN cd /tmp && \ 
  curl https://codeload.github.com/magento/magento2/tar.gz/$MAGENTO_VERSION -o $MAGENTO_VERSION.tar.gz && \
  tar xvf $MAGENTO_VERSION.tar.gz && \
  mv magento2-$MAGENTO_VERSION/* magento2-$MAGENTO_VERSION/.htaccess $INSTALL_DIR

RUN chown -R www-data:www-data /var/www
RUN su www-data -c "cd $INSTALL_DIR && composer install"
RUN su www-data -c "cd $INSTALL_DIR && composer config repositories.magento composer https://repo.magento.com/"  

RUN cd $INSTALL_DIR \
    && find . -type d -exec chmod 770 {} \; \
    && find . -type f -exec chmod 660 {} \; \
    && chmod u+x bin/magento

COPY ./install-magento /usr/local/bin/install-magento
RUN chmod +x /usr/local/bin/install-magento

COPY ./install-sampledata /usr/local/bin/install-sampledata
RUN chmod +x /usr/local/bin/install-sampledata

RUN a2enmod rewrite
RUN echo "memory_limit=2048M" > /usr/local/etc/php/conf.d/memory-limit.ini

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR $INSTALL_DIR

# Add cron job
ADD crontab /etc/cron.d/magento2-cron
RUN chmod 0644 /etc/cron.d/magento2-cron \
    && crontab -u www-data /etc/cron.d/magento2-cron

VOLUME $INSTALL_DIR