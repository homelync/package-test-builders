import { Property } from '../models/property';
import { ISqlDbConnection } from '../sqlDbCOnnection';
import { BasicEntity } from './ObjectBuilder';
export declare class PropertyBuilder {
    private connection;
    private landlordId;
    private landlordReference;
    private parentId;
    private buildingTypeId;
    private floorId;
    private key;
    private value;
    constructor(connection: ISqlDbConnection);
    withLandLordId(landlordId: string): PropertyBuilder;
    withFloor(floorId: string): PropertyBuilder;
    withBuildingType(buildingTypeId: string): PropertyBuilder;
    withLandLordReference(landlordReference: string): PropertyBuilder;
    withParent(parentId: string): PropertyBuilder;
    withIdentifier(key: string, value: string): PropertyBuilder;
    buildCreateModel(landlordReference: any): Property;
    insertRandom(): Promise<BasicEntity>;
}
