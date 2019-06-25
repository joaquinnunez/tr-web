#!/usr/bin/env sh
if [ ! -d "/home/node/app/" ]; then
	create-react-app app
fi
cd app
yarn install
yarn start
