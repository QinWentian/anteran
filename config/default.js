const dotenv = require('dotenv')
const exceptions = ['production', 'uat']

if (!exceptions.includes(process.env.NODE_ENV)) {
  dotenv.config()
}

const {
  NODE_ENV,
  TMS_API_DO_DB_HOST_MASTER,
  TMS_API_DO_DB_HOST_SLAVE,
  TMS_API_DO_DB_PORT,
  TMS_API_DO_DB_DIALECT,
  TMS_API_DO_DB_NAME,
  TMS_API_DO_DB_USER,
  TMS_API_DO_DB_PASSWORD,
  TMS_API_DO_JWK_URI,
  TMS_API_DO_JWK_AUDIENCE,
  TMS_API_DO_ISSUER,
  MASTER_DATA_URL,
  TMS_SUBMIT_SAP_URL,
  AWS_REGION_NAME,
  AWS_ACCESS_KEYID,
  AWS_SECRET_ACCESS,
  DATACUST_LAMBDA,
  SQS_URL_AUTO,
  TMS_DO_CREATION_TOPIC,
  TMS_POD_CREATION_TOPIC,
  IDSP_REF_DOC_DO,
  IDSP_REF_DOC_SO,
  SOMP_URL,
  TMS_POD_RUNNING_MDM_DOC_SOURCE_ID,
  TMS_POD_RUNNING_MDM_DOC_OBJECT_ID,
  TMS_POD_RUNNING_NUMBER_CREATION_TOPIC,
  DIST_URL_API,
  IMS_URL,
  TMS_DOC_TRACKER_TOPIC,
  TMS_POD_REVERSE_TOPIC,
  SENTRY_DSN
} = process.env

const config = {
  env: NODE_ENV,
  db: {
    dialect: TMS_API_DO_DB_DIALECT,
    user: TMS_API_DO_DB_USER,
    password: TMS_API_DO_DB_PASSWORD,
    database: TMS_API_DO_DB_NAME,
    port: TMS_API_DO_DB_PORT,
    host: TMS_API_DO_DB_HOST_MASTER,
    write: {
      host: TMS_API_DO_DB_HOST_MASTER,
      pool: {
        max: 5,
        min: 0,
        idle: 60000,
        acquire: 60000,
        handleDisconnects: true
      }
    },
    read: [{
      host: TMS_API_DO_DB_HOST_SLAVE,
      pool: {
        max: 5,
        min: 0,
        idle: 60000,
        acquire: 60000,
        handleDisconnects: true
      }
    },
    {
      host: TMS_API_DO_DB_HOST_SLAVE,
      pool: {
        max: 5,
        min: 0,
        idle: 60000,
        acquire: 60000,
        handleDisconnects: true
      }
    },
    {
      host: TMS_API_DO_DB_HOST_SLAVE,
      pool: {
        max: 5,
        min: 0,
        idle: 60000,
        acquire: 60000,
        handleDisconnects: true
      }
    }]
  },
  guard: {
    uri: TMS_API_DO_JWK_URI,
    audience: TMS_API_DO_JWK_AUDIENCE,
    issuer: TMS_API_DO_ISSUER
  },
  submitUrl: TMS_SUBMIT_SAP_URL,
  awsRegionName: AWS_REGION_NAME,
  awsAccessKeyId: AWS_ACCESS_KEYID,
  awsSecretAccess: AWS_SECRET_ACCESS,
  dataCustLambda: DATACUST_LAMBDA,
  tmsDoCreationTopic: TMS_DO_CREATION_TOPIC,
  tmsPodCreationTopic: TMS_POD_CREATION_TOPIC,
  tmsPodRNCreationTopic: TMS_POD_RUNNING_NUMBER_CREATION_TOPIC,
  docAggregatorTopic: TMS_DOC_TRACKER_TOPIC,
  podReverseTopic: TMS_POD_REVERSE_TOPIC
}

module.exports = config
