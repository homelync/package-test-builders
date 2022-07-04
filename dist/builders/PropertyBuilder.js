"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyBuilder = void 0;
const randomstring_1 = require("randomstring");
const ObjectBuilder_1 = require("./ObjectBuilder");
class PropertyBuilder {
    constructor(connection) {
        this.connection = connection;
    }
    withLandLordId(landlordId) {
        this.landlordId = landlordId;
        return this;
    }
    withFloor(floorId) {
        this.floorId = floorId;
        return this;
    }
    withBuildingType(buildingTypeId) {
        this.buildingTypeId = buildingTypeId;
        return this;
    }
    withLandLordReference(landlordReference) {
        this.landlordReference = landlordReference;
        return this;
    }
    withParent(parentId) {
        this.parentId = parentId;
        return this;
    }
    withIdentifier(key, value) {
        this.key = key;
        this.value = value;
        return this;
    }
    buildCreateModel(landlordReference) {
        const model = {
            'name': (0, randomstring_1.generate)(10),
            'reference': (0, randomstring_1.generate)(10),
            'landlordReference': landlordReference,
            'typeId': 'BUNG',
            'statusId': 'ACTIVE',
            'constructionTypeId': 'TRA',
            'heatingTypeId': 'GAS',
            'constructionDate': new Date(1900, 0, 1),
            'buildingTypeId': this.buildingTypeId,
            'propertyFloorId': this.floorId,
            'address': {
                'nameNumber': '1',
                'street': 'Test Street',
                'locality': 'Clifton',
                'county': 'Bristol',
                'city': 'Bristol',
                'postcode': 'BS88DJ',
                'country': 'United Kingdom'
            },
            'geo': {
                'latitude': 100,
                'longitude': 100,
                'pitch': 100,
                'heading': 100,
                'zoom': 8
            },
            'propertyIdentifiers': [
                { 'key': 'test', 'value': '1234' }
            ]
        };
        if (this.parentId) {
            model.parentId = this.parentId;
        }
        return model;
    }
    async insertRandom() {
        const address = {
            nameNumber: (0, randomstring_1.generate)(10),
            street: (0, randomstring_1.generate)(10),
            locality: (0, randomstring_1.generate)(10),
            county: (0, randomstring_1.generate)(5),
            city: (0, randomstring_1.generate)(5),
            postcode: (0, randomstring_1.generate)(6),
            country: 'United Kingdom'
        };
        const addressId = await new ObjectBuilder_1.ObjectBuilder(this.connection).insertRaw('address', address);
        const geoId = await new ObjectBuilder_1.ObjectBuilder(this.connection).insertRaw('geo', {
            latitude: 100,
            longitude: 100,
            pitch: 100,
            heading: 100,
            zoom: 8
        });
        const additional = { addressId: addressId, geoId: geoId, typeId: 'BUNG', statusId: 'ACTIVE' };
        if (this.landlordId) {
            additional.landlordId = this.landlordId;
        }
        if (this.landlordReference) {
            additional.landlordReference = this.landlordReference;
        }
        const property = await new ObjectBuilder_1.ObjectBuilder(this.connection)
            .withRandom()
            .insert('property', additional);
        if (this.key && this.value)
            await this.connection.knexRaw().raw(`insert into propertyidentity (propertyid, \`key\`, value) values ('${property.id}', '${this.key}', '${this.value}');`);
        return property;
    }
}
exports.PropertyBuilder = PropertyBuilder;
//# sourceMappingURL=PropertyBuilder.js.map