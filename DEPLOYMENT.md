
_Before you deploy manually... The simplest way for deploying is to create a new tag on GitHub and an action will be triggered performing all the steps described in here._
# Deployment instructions

To deploy the application manually, run the following commands in the same order.

1. Export all required environment variables

```shell
# If necessary export your AWS configuration or credentials
# For ~/.aws/credentials configuration
export AWS_PROFILE=<profile>

# If you don't have ~/.aws/credentials configuration
export AWS_DEFAULT_REGION=<region>
export AWS_ACCESS_KEY_ID=<key_id>
export AWS_SECRET_ACCESS_KEY=<secret>

# Calculate the current version
export APP_VERSION=$(date +"%m%d%Y%H%M%S") # this is used on all scripts (publish and deploy), and can be replaced with a custom value

# Not required variables
export ARTIFACTS_BUCKET=<artifacts_bucket_name>
export APP_BUCKET=<webpage_bucket_name>
```

2. Run `yarn build`, this will execute the nextjs build process and will prepare code for individual lambdas
3. Run `./scripts/publish.artifacts.mjs`, this will upload all artifact content (lambdas code, chunks, css, images)
4. Run:
```shell
cd terraform
terraform init -backend-config="bucket=<tf_states_bucket>"
terraform apply -var="artifacts_bucket=$ARTIFACTS_BUCKET" -var="artifact_version=$APP_VERSION"
# Not that if you didnt export this variables replace them with the actual bucket names
```
5. Run:
```shell
cd ..
./scripts/deploy.mjs # This will deploy the artifact to the application bucket
```

After the commands are executed in this order we can trigger a CF invalidation manually with 

```shell
aws cloudfront create-invalidation --distribution-id="<distribution_id>" --paths="/*"
```

It's recommended to invalidate after a deployment to ensure users have the latest version.
