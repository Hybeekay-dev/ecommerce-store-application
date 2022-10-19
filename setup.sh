#!/bin/sh
echo "INSTALL DEPENDENCIES"
npm install
echo "RUN BUILD"
npm run build-ts
echo "SETUP COMPLETED"
