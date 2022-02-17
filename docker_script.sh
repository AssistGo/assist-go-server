#!/bin/bash

echo "What is your MongoDB Username? (Case-sensitive) "
read Username

echo "What is your MongoDB Password? (Case-sensitive) "
read Password

echo "MONGO_USERNAME=${Username}" >> .env
echo "MONGO_PASSWORD=${Password}" >> .env

npm install

sudo nohup npm run start &