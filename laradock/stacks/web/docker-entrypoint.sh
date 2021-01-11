#!/bin/sh

cd /code
git clone https://github.com/nabad600/django.git .
exec "$@"