#!/bin/bash

echo "What is your MongoDB Username? (Case-sensitive) "
read Username

echo "What is your MongoDB Password? (Case-sensitive) "
read Password

echo "MONGO_USERNAME=${Username}" >> .env
echo "MONGO_USERNAME=${Password}" >> .env

docker build . -t assist-go-server
docker run -p 8080:8080 -d assist-go-server