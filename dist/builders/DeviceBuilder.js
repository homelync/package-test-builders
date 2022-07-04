"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceBuilder = void 0;
const randomstring_1 = require("randomstring");
const uuid = require("uuid");
class DeviceBuilder {
    constructor(connection) {
        this.connection = connection;
    }
    withPropertyId(propertyId) {
        this.propertyId = propertyId;
        return this;
    }
    withStatusId(statusId) {
        this.statusId = statusId;
        return this;
    }
    withSerialNumber(serialNumber) {
        this.serialNumber = serialNumber;
        return this;
    }
    withModel(modelReference) {
        this.modelReference = modelReference;
        return this;
    }
    withSubLocationId(subLocationId) {
        this.subLocationId = subLocationId;
        return this;
    }
    withLocationId(locationId) {
        this.locationId = locationId;
        return this;
    }
    async insertRandom() {
        var modelResults = await this.connection.builder('model').select('id').where('reference', '=', this.modelReference || 'Ei3028').limit(1);
        const device = {
            'id': uuid.v4(),
            'propertyId': this.propertyId,
            'modelId': modelResults[0].id,
            'name': 'test' + (0, randomstring_1.generate)(),
            'serialNumber': this.serialNumber || 'test' + (0, randomstring_1.generate)(10),
            'locationId': this.locationId || 'HALLWAY',
            'subLocationId': this.subLocationId,
            'statusId': this.statusId || 'DISABLED',
            'typeId': 'ENV',
            'installationDate': new Date()
        };
        await this.connection.builder('device').insert(device);
        await this.connection.knexRaw().raw(`insert into deviceidentity (deviceid, \`key\`, value) values ('${device.id}', 'serialnumber', '${device.serialNumber}');`);
        return device.id;
    }
}
exports.DeviceBuilder = DeviceBuilder;
//# sourceMappingURL=DeviceBuilder.js.map