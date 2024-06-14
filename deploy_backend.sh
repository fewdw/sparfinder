#!/bin/bash
cd backend
heroku container:push web --app sf-be-container
heroku container:release web --app sf-be-container
heroku open --app sf-be-container
