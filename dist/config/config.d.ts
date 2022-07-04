export declare const configuration: {
    cache: {
        ttlSecs: number;
    };
    authService: {
        url: string | undefined;
        clientId: string | undefined;
        secret: string | undefined;
    };
    sensorium: {
        url: string | undefined;
    };
    aico: {
        url: string | undefined;
        apiPath: string | undefined;
        authPath: string | undefined;
        username: string | undefined;
        password: string | undefined;
    };
    rabbit: {
        host: string | undefined;
        port: number;
    };
    notification: {
        accessKeyId: string | undefined;
        secretAccessKey: string | undefined;
        smsAllowList: string[];
        emailSlackChannel: string;
        emailTopic: string | undefined;
        smsSlackChannel: string;
        smsTopic: string | undefined;
        defaultWebHookProcesor: string;
    };
    residentApplication: {
        validInsightDefinitionIds: string[];
    };
    environment: string;
    SQL: {
        db: string | undefined;
        username: string | undefined;
        password: string | undefined;
        host: string | undefined;
        port: number;
        dialect: string | undefined;
        debug: string | undefined;
    };
    logging: {
        loglevel: string | undefined;
        key: string | undefined;
        secret: string | undefined;
    };
};
