#!/bin/bash

# Exit immediately if a *pipeline* returns a non-zero status. (Add -x for command tracing)
cd /app
cp -a * /var/www/html/
cd /
chown -R www-data:www-data /var/www/html/
