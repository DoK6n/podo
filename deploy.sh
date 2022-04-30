#!/bin/bash
if [ -f .env ] ;  then 
  export  $( echo $( cat .env | sed ' s/#.*//g ' | xargs )  | envsubst )
fi


# build
npm run build

# s3 upload
aws s3 sync ./build s3://$S3_BUCKET_NAME --profile=$AWS_CLI_PROFILE

# deploy cloudfront
aws cloudfront create-invalidation --profile=dok6n --distribution-id $DISTRIBUTION_ID --paths / /index.html /service-worker.js /manifest.json /favicon.ico