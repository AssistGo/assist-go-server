#!/bin/bash

echo "What is your MongoDB Username? (Case-sensitive) "
read Username

echo "What is your MongoDB Password? (Case-sensitive) "
read Password

echo "What is your Google Translate API Key (Case-sensitive) "
read googleTranslateKey

echo "MONGO_USERNAME=${Username}" >> .env
echo "MONGO_PASSWORD=${Password}" >> .env
echo "GOOGLE_TRANSLATE_KEY=${googleTranslateKey}" >> .env


npm install
npm run build

sudo nohup npm run start &