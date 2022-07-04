import { ISqlDbConnection } from '../sqlDbCOnnection';
export interface BasicEntity {
    id: string;
    name: string;
    reference: string;
}
export declare class ObjectBuilder {
    private connection;
    private id;
    private name;
    private reference;
    constructor(connection: ISqlDbConnection);
    withId(id: string): ObjectBuilder;
    withRandomId(): ObjectBuilder;
    withRandomName(length?: number): ObjectBuilder;
    withName(name: string): ObjectBuilder;
    withRandomReference(length?: number): ObjectBuilder;
    withReference(reference: string): ObjectBuilder;
    withRandom(length?: number): ObjectBuilder;
    insertRaw(tableName: string, data: any): Promise<number>;
    insert(tableName: string, additional?: any | null): Promise<BasicEntity>;
    build(additional?: any | null): Promise<BasicEntity>;
}
