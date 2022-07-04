import { configuration } from './config/config';
import { injectable } from 'inversify';
import * as Knex from 'knex';
import 'reflect-metadata'

@injectable()
export class SqlDbConnection {
    public knex: Knex;
    public constructor() {
        const config = configuration.SQL;
        this.knex = Knex({
            client: 'mysql',
            debug: (config.debug === 'true'),
            pool: { min: 0, max: 20 },
            connection: {
                host: config.host,
                user: config.username,
                port: config.port,
                password: config.password,
                multipleStatements: true,
                database: config.db,
                timezone: '+00:00',
                typeCast: function (field, next) {
                    if (field.type === 'TINY' && field.length === 1) {
                        return (field.string() === '1'); // 1 = true, 0 = false
                    }

                    if (field.type === 'BIT' && field.length === 1) {
                        var bytes = field.buffer();

                        return (bytes && bytes.length && bytes[0] === 1);

                    }
                    return next();
                }
            }
        });
    }

    public builder(tableName: string): Knex.QueryBuilder {
        return this.knex.table(tableName);
    }

    public knexRaw(): Knex {
        return this.knex;
    }
}

export interface ISqlDbConnection {
    builder(tableName: string): Knex.QueryBuilder;
    knexRaw(): Knex;
}