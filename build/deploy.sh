#!/bin/bash

echo "CapsulaJS: Deploying.."

# install aws cli
pip install --user awscli
export PATH=$PATH:$HOME/.local/bin

# upload to s3
aws s3 rm $S3_PATH/$CURRENT_BRANCH_NAME --recursive --region $S3_REGION
aws s3 cp dist $S3_PATH/$CURRENT_BRANCH_NAME --cache-control "max-age=$CACHE_CONTROL_MAX_AGE" --recursive
aws cloudfront create-invalidation --distribution-id $CF_DISTRIBUTION_ID --paths "/$CURRENT_BRANCH_NAME/*"
