import { generate } from 'randomstring';
import uuid = require('uuid');
import { ISqlDbConnection } from '../sqlDbCOnnection';

export class DeviceBuilder {
    private propertyId!: string;
    private statusId!: string;
    private serialNumber!: string;
    private subLocationId!: string;
    private locationId!: string;
    private modelReference!: string;

    constructor(private connection: ISqlDbConnection) {
    }

    public withPropertyId(propertyId: string): DeviceBuilder {
        this.propertyId = propertyId;
        return this;
    }

    public withStatusId(statusId: string): DeviceBuilder {
        this.statusId = statusId;
        return this;
    }

    public withSerialNumber(serialNumber: string): DeviceBuilder {
        this.serialNumber = serialNumber;
        return this;
    }

    public withModel(modelReference: string): DeviceBuilder {
        this.modelReference = modelReference;
        return this;
    }

    public withSubLocationId(subLocationId: string): DeviceBuilder {
        this.subLocationId = subLocationId;
        return this;
    }

    public withLocationId(locationId: string): DeviceBuilder {
        this.locationId = locationId;
        return this;
    }

    public async insertRandom(): Promise<string> {

        var modelResults = await this.connection.builder('model').select('id').where('reference', '=', this.modelReference || 'Ei3028').limit(1);

        const device =  {
            'id': uuid.v4(),
            'propertyId': this.propertyId,
            'modelId': modelResults[0].id,
            'name': 'test' + generate(),
            'serialNumber': this.serialNumber || 'test' + generate(10),
            'locationId':  this.locationId || 'HALLWAY',
            'subLocationId': this.subLocationId,
            'statusId': this.statusId || 'DISABLED', // Create test devices as disabled so they don't end up leaking out to integration
            'typeId': 'ENV',
            'installationDate': new Date()
        };

        await this.connection.builder('device').insert(device);
        await this.connection.knexRaw().raw(`insert into deviceidentity (deviceid, \`key\`, value) values ('${device.id}', 'serialnumber', '${device.serialNumber}');`);

        return device.id;
    }
}