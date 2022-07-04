import { Identifier } from '../models/landlord';
import { SqlDbConnection } from '../sqlDbCOnnection';
export interface BasicEntity {
    id: string;
    name: string;
    reference: string;
    statusId: string;
}
export declare class LandlordBuilder {
    private id;
    private name;
    private reference;
    private parentReference;
    private designationId;
    private dbConnection;
    private landlordIdentifiers;
    constructor(dbConnection: SqlDbConnection);
    withId(id: string): LandlordBuilder;
    withRandomId(): LandlordBuilder;
    withRandomName(length?: number): LandlordBuilder;
    withName(name: string): LandlordBuilder;
    withRandomReference(length?: number): LandlordBuilder;
    withReference(reference: string): LandlordBuilder;
    withParentReference(parentReference: string): LandlordBuilder;
    withDesignation(designationId: string): LandlordBuilder;
    withIdentifiers(identifiers: Identifier[]): LandlordBuilder;
    withRandom(length?: number): LandlordBuilder;
    insert(): Promise<BasicEntity>;
}
