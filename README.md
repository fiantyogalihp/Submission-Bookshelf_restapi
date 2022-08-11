# [READY TO UPLOAD] to AWS with Process Manager

A simple Bookshelf app backend [REST API] with AWS EC2 Instance, stay server active with process manager

## Create and Start server (in first time only)

$ pm2 start npm --name "bookshelf-api" -- run "start-prod"

## Restart server

$ pm2 restart bookshelf-api

## Stop server

$ pm2 stop bookshelf-api

## Start server

$ pm2 start notes-api
