#!/bin/bash

#yum install -y wget

mkdir enviorments
wget -O ./.env $ENV_URL

npm run build:web:prod
