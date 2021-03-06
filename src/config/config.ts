import { resolve as pathResolve } from 'path';
import { config } from 'dotenv';
const fs = require('fs');

const env = process.env;
const nodeEnv = env.NODE_ENV || 'local';
let path = pathResolve(__dirname, `../../src/env/.env.${nodeEnv}`);
if (!fs.existsSync(path)) {
    path = pathResolve(__dirname, `../../env/.env.${nodeEnv}`);
}
config({ path: path });

const baseConfiguration = {
    cache: {
        ttlSecs: parseInt(env.CACHE_TTL_SECS ||  '0')
    },
    authService: {
        url: env.AUTH_URL,
        clientId: env.AUTH_CLIENTID,
        secret: env.AUTH_SECRET
    },
    sensorium: {
        url: env.SENSORIUM_URL
    },
    aico: {
        url: env.AICO_API_URL,
        apiPath: env.AICO_API_PATH,
        authPath: env.AICO_AUTH_PATH,
        username: env.AICO_API_USERNAME,
        password: env.AICO_API_PASSWORD
    },
    rabbit: {
        host: env.RABBIT_HOST,
        port: Number(env.RABBIT_PORT)
    },
    notification: {
        accessKeyId: env.NOTIFICATION_ACCESS_KEY_ID,
        secretAccessKey: env.NOTIFICATION_SECRET_ACCESS_KEY,
        smsAllowList: env.SMS_ALLOW_LIST ?  env.SMS_ALLOW_LIST.split(',') : [],
        emailSlackChannel: '__transactional-emails',
        emailTopic: env.EMAIL_TOPIC_ARN,
        smsSlackChannel: '__transactional-sms',
        smsTopic: env.SMS_TOPIC_ARN,
        defaultWebHookProcesor: 'processor-webhook-default'
    },
    residentApplication: {
        validInsightDefinitionIds: env.RESIDENT_APP_INSIGHTS ? env.RESIDENT_APP_INSIGHTS.split(',') : []
    },
    environment: nodeEnv,
    SQL: {
        db: env.SQL_DB,
        username: env.SQL_USERNAME,
        password: env.SQL_PASSWORD,
        host: env.SQL_HOST,
        port: Number(env.SQL_PORT),
        dialect: env.SQL_DIALECT,
        debug: env.DEBUG
    },
    logging: {
        loglevel: env.LOG_LEVEL,
        key: env.LOGGING_ACCESS_KEY,
        secret: env.LOGGING_ACCESS_SECRET
    }
};

export const configuration = baseConfiguration;
