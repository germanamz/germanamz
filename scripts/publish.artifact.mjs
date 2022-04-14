#!/usr/bin/env zx
const path = require('path');
const recursiveFileWalking = require('./recursiveFileWalking');

const PAGES_PATH = path.resolve(__dirname, '../.next/serverless/pages');
const STATIC_PATH = path.resolve(__dirname, '../.next/static');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const LAMBDAS_ARTIFACTS_PATH = path.resolve(__dirname, '../build/archives');
const ARTIFACT_KEY = `${process.env.ARTIFACTS_BUCKET}/germanamz_com/${process.env.APP_VERSION}`;

await $`aws s3 cp ${LAMBDAS_ARTIFACTS_PATH} s3://${ARTIFACT_KEY}/lambdas --recursive --include "*.zip" --include "*.checksum"`;
await $`aws s3 cp ${STATIC_PATH} s3://${ARTIFACT_KEY}/static --recursive`;
await $`aws s3 cp ${PUBLIC_PATH} s3://${ARTIFACT_KEY}/public --recursive`;

await recursiveFileWalking(PAGES_PATH, ['.html'], async (directoryPath, filename) => {
  const pathName = path.basename(filename, '.html');
  await $`aws s3 cp ${path.join(directoryPath, filename)} s3://${ARTIFACT_KEY}/pages/${pathName} --content-type text/html`;
});
