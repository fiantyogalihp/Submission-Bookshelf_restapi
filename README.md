# [HapiJS]

# [READY TO UPLOAD] to AWS with Process Manager

A simple Bookshelf app backend [REST API] with AWS EC2 Instance, stay server active with process manager

## Create and Start server (in first time only)

$ {NODE_PORT, NODE_ENV=?}pm2 start npm --name "bookshelf-api" -- run "start-prod"

## Restart server

$ pm2 restart bookshelf-api

## Stop server

$ pm2 stop bookshelf-api

## Start server

$ pm2 start bookshelf-api

# DEMO [VM]:

1. ssh into nginx VM using vagrant cli vagrant ssh nginx
2. run app using pm2 pm2 start index.js --name "{app-name}" -- {port} {app-name} Example : pm2 start index.js --name "app-01" -- 3022 app-1

source = <https://github.com/2pai/poc-lb-nodejs-nginx.git>
