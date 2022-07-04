import { generate } from 'randomstring';
import { ISqlDbConnection } from '../sqlDbCOnnection';
const uuid = require('uuid');

export interface BasicEntity {
    id: string;
    name: string;
    reference: string;
}

export class ObjectBuilder {
    private id!: string;
    private name!: string;
    private reference!: string;

    constructor(private connection: ISqlDbConnection) {
    }

    public withId(id: string): ObjectBuilder {
        this.id = id;
        return this;
    }

    public withRandomId(): ObjectBuilder {
        this.id = uuid.v4();
        return this;
    }

    public withRandomName(length = 10): ObjectBuilder {
        this.name = generate(length);
        return this;
    }

    public withName(name: string): ObjectBuilder {
        this.name = name;
        return this;
    }

    public withRandomReference(length = 10): ObjectBuilder {
        this.reference = generate(length);
        return this;
    }

    public withReference(reference: string): ObjectBuilder {
        this.reference = reference;
        return this;
    }

    public withRandom(length = 10): ObjectBuilder {
        this.withRandomReference(length);
        this.withRandomName(length);
        this.withRandomId();
        return this;
    }

    public async insertRaw(tableName: string, data: any): Promise<number> {
        var result = await this.connection.builder(tableName).insert(data);
        return result[0];
    }

    public async insert(tableName: string, additional?: any|null): Promise<BasicEntity> {

        let obj: BasicEntity = {
            id: this.id,
            name: this.name,
            reference: this.reference
        };

        (obj as any).statusId = 'ACTIVE';

        if (additional)
            Object.assign(obj, additional);

        await this.connection.builder(tableName).insert(obj);

        return obj;
    }

    public async build(additional?: any|null): Promise<BasicEntity> {

        let obj: BasicEntity = {
            id: this.id,
            name: this.name,
            reference: this.reference,
        };

        (obj as any).statusId = 'ACTIVE';

        if (additional)
            Object.assign(obj, additional);

        return obj;
    }
}