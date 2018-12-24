#!/bin/sh

yarn build

if [[ "$NODE_ENV" == "production" ]] ; then
  yarn start:prod
else
  yarn start
fi