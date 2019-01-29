#!/usr/bin/env bash

docker run --name booking-service -p 3002:3000 -e DB_USER=$DB_USER -e DB_PASSWORD=$DB_PASSWORD -e DEBUG=$DEBUG -d booking-service
