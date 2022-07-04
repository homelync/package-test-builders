import * as Knex from 'knex';
import 'reflect-metadata';
export declare class SqlDbConnection {
    knex: Knex;
    constructor();
    builder(tableName: string): Knex.QueryBuilder;
    knexRaw(): Knex;
}
export interface ISqlDbConnection {
    builder(tableName: string): Knex.QueryBuilder;
    knexRaw(): Knex;
}
