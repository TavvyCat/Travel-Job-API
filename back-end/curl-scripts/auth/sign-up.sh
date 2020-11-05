#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sign-up"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "user": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASS}"'",
      "password_confirmation": "'"${PASS}"'",
      "name": "'"${NAME}"'",
      "phone": "'"${PHONE}"'",
      "occupation": "'"${OCC}"'"
    }
  }'

echo
