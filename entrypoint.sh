#!/bin/sh

JSON_STRING='window.configs = { "VUE_APP_API_URL":"'"${VUE_APP_API_URL}"'"}'

sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@g" /app/index.html

exec "$@"