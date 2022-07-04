"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectBuilder = void 0;
const randomstring_1 = require("randomstring");
const uuid = require('uuid');
class ObjectBuilder {
    constructor(connection) {
        this.connection = connection;
    }
    withId(id) {
        this.id = id;
        return this;
    }
    withRandomId() {
        this.id = uuid.v4();
        return this;
    }
    withRandomName(length = 10) {
        this.name = (0, randomstring_1.generate)(length);
        return this;
    }
    withName(name) {
        this.name = name;
        return this;
    }
    withRandomReference(length = 10) {
        this.reference = (0, randomstring_1.generate)(length);
        return this;
    }
    withReference(reference) {
        this.reference = reference;
        return this;
    }
    withRandom(length = 10) {
        this.withRandomReference(length);
        this.withRandomName(length);
        this.withRandomId();
        return this;
    }
    async insertRaw(tableName, data) {
        var result = await this.connection.builder(tableName).insert(data);
        return result[0];
    }
    async insert(tableName, additional) {
        let obj = {
            id: this.id,
            name: this.name,
            reference: this.reference
        };
        obj.statusId = 'ACTIVE';
        if (additional)
            Object.assign(obj, additional);
        await this.connection.builder(tableName).insert(obj);
        return obj;
    }
    async build(additional) {
        let obj = {
            id: this.id,
            name: this.name,
            reference: this.reference,
        };
        obj.statusId = 'ACTIVE';
        if (additional)
            Object.assign(obj, additional);
        return obj;
    }
}
exports.ObjectBuilder = ObjectBuilder;
//# sourceMappingURL=ObjectBuilder.js.map