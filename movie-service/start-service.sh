#!/usr/bin/env bash

docker run --name movies-service -p 3000:3000 -e DB_USER=$DB_USER -e DB_PASSWORD=$DB_PASSWORD -e DEBUG=$DEBUG -d movies-service
