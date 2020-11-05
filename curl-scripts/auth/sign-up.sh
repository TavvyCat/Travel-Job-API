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
      "type": "'"${TYPE}"'",
      "occupation": "'"${OCC}"'"
    }
  }'

echo

# EMAIL=test1@test.com PASS=1234 NAME="George" PHONE=384 TYPE=Employee OCC=OT sh back-end/curl-scripts/auth/sign-up.sh