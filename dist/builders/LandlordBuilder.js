"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandlordBuilder = void 0;
const randomstring_1 = require("randomstring");
const uuid = require('uuid');
class LandlordBuilder {
    constructor(dbConnection) {
        this.landlordIdentifiers = [];
        this.dbConnection = dbConnection;
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
    withParentReference(parentReference) {
        this.parentReference = parentReference;
        return this;
    }
    withDesignation(designationId) {
        this.designationId = designationId;
        return this;
    }
    withIdentifiers(identifiers) {
        this.landlordIdentifiers = identifiers;
        return this;
    }
    withRandom(length = 10) {
        this.withRandomReference(length);
        this.withRandomName(length);
        this.withRandomId();
        return this;
    }
    async insert() {
        const landlord = {
            id: this.id,
            name: this.name,
            reference: this.reference,
            statusId: 'ACTIVE',
            parentReference: this.parentReference,
            designationId: this.designationId || 'PROVIDER'
        };
        await this.dbConnection.builder('Landlord').insert(landlord);
        if (this.landlordIdentifiers) {
            for (const i of this.landlordIdentifiers) {
                i.landlordId = landlord.id;
                await this.dbConnection.builder('LandlordIdentity').insert(i);
            }
        }
        return landlord;
    }
}
exports.LandlordBuilder = LandlordBuilder;
//# sourceMappingURL=LandlordBuilder.js.map