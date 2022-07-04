import { ISqlDbConnection } from '../sqlDbCOnnection';
export declare class DeviceBuilder {
    private connection;
    private propertyId;
    private statusId;
    private serialNumber;
    private subLocationId;
    private locationId;
    private modelReference;
    constructor(connection: ISqlDbConnection);
    withPropertyId(propertyId: string): DeviceBuilder;
    withStatusId(statusId: string): DeviceBuilder;
    withSerialNumber(serialNumber: string): DeviceBuilder;
    withModel(modelReference: string): DeviceBuilder;
    withSubLocationId(subLocationId: string): DeviceBuilder;
    withLocationId(locationId: string): DeviceBuilder;
    insertRandom(): Promise<string>;
}
