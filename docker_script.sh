#!/bin/bash

echo "What is your MongoDB Username? (Case-sensitive) "
read Username

echo "What is your MongoDB Password? (Case-sensitive) "
read Password

sudo docker run -p 8080:8080 -d l9caps/assist-go-server -t -i -e MONGO_USERNAME="${Username}" \
-e MONGO_PASSWORD="${Password}"