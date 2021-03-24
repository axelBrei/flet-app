#!/bin/bash

yum install -y wget

wget -O .env $ENV_URL

cat .env

npm run build:web:prod
