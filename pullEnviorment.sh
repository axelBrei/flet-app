#!/bin/bash

yum install -y wget

wget -O .env.web $ENV_URL

npm run build:web:prod
