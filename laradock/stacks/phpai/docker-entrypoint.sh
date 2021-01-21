#!/bin/bash
cd /var/www/
composer create-project symfony/skeleton .
exec "$@"