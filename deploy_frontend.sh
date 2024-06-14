#!/bin/bash
cd frontend
heroku container:push web --app sf-fe-container
heroku container:release web --app sf-fe-container
heroku open --app sf-fe-container
