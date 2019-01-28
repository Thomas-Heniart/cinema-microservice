#!/usr/bin/env bash

docker run --name cinema-catalog-service -p 3001:3000 -e DB_USER=$DB_USER -e DB_PASSWORD=$DB_PASSWORD -e DEBUG=$DEBUG -d cinema-catalog-service
