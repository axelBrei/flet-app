#!/bin/bash

yum install -y wget

wget -O .env $ENV_URL

npm run build:web:prod
