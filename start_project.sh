#!/bin/bash

# Start the Express.js server
cd server
npm install
npm start &
cd ..

# Start the React.js app
cd app
npm install
npm start