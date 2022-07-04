"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlDbConnection = void 0;
const config_1 = require("./config/config");
const inversify_1 = require("inversify");
const Knex = require("knex");
require("reflect-metadata");
let SqlDbConnection = class SqlDbConnection {
    constructor() {
        const config = config_1.configuration.SQL;
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
    builder(tableName) {
        return this.knex.table(tableName);
    }
    knexRaw() {
        return this.knex;
    }
};
SqlDbConnection = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], SqlDbConnection);
exports.SqlDbConnection = SqlDbConnection;
//# sourceMappingURL=sqlDbCOnnection.js.map