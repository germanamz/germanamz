#!/usr/bin/env zx
const ARTIFACT_KEY = `${process.env.ARTIFACTS_BUCKET}/germanamz_com/${process.env.APP_VERSION}`;

await $`aws s3 cp s3://${ARTIFACT_KEY}/pages s3://${process.env.APP_BUCKET} --recursive`;
await $`aws s3 cp s3://${ARTIFACT_KEY}/static s3://${process.env.APP_BUCKET}/_next/static --recursive`;
await $`aws s3 cp s3://${ARTIFACT_KEY}/public s3://${process.env.APP_BUCKET} --recursive`;
