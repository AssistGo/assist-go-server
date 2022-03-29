#!/bin/bash

echo "What is your MongoDB Username? (Case-sensitive) "
read Username

echo "What is your MongoDB Password? (Case-sensitive) "
read Password

echo "What is your RAPID API Google Translate Host (Case-sensitive) "
read googleTranslateHost

echo "What is your RAPID API Google Translate Key (Case-sensitive) "
read googleTranslateKey

echo "MONGO_USERNAME=${Username}" >> .env
echo "MONGO_PASSWORD=${Password}" >> .env
echo "RAPID_API_GOOGLE_TRANSLATE_HOST=${googleTranslateHost}" >> .env
echo "RAPID_API_GOOGLE_TRANSLATE_KEY=${googleTranslateKey}" >> .env


npm install
npm run build

sudo nohup npm run start &