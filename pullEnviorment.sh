#!/bin/bash

yum install -y wget

mkdir enviorments
wget -O ./.env $ENV_URL
ls -la
mv ./.env enviorments/.env

npm run build:web:prod
