#!/bin/bash

echo "What is your MongoDB Username? (Case-sensitive) "
read Username

echo "What is your MongoDB Password? (Case-sensitive) "
read Password

echo "MONGO_USERNAME=${Username}\nMONGO_PASSWORD=${Password}" >> .env