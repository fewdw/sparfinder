#!/bin/bash
heroku login

heroku container:login

heroku create sf-fe-container

heroku create sf-be-container