#!/bin/bash

API="http://localhost:4741"
URL_PATH="/jobs"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "job": {
      "occupation": "'"${OCC}"'",
      "type": "'"${TYPE}"'",
      "pay": "'"${PAY}"'",
      "location": "'"${LOC}"'",
      "description": "'"${DESC}"'"
    }
  }'

echo

# TOKEN=661e61698a28655494dac0106254f51e OCC=OT PAY=1400 LOC="Denver, CO" DESC="Occupational Therapist needed at Rehabilitation Center" sh back-end/curl-scripts/jobs/create.sh