
import { generate } from 'randomstring';
import { Identifier } from '../models/landlord';
import { SqlDbConnection } from '../sqlDbCOnnection';

const uuid = require('uuid');

export interface BasicEntity {
    id: string;
    name: string;
    reference: string;
    statusId: string;
}

export class LandlordBuilder {
    private id!: string;
    private name!: string;
    private reference!: string;
    private parentReference!: string;
    private designationId!: string;
    private dbConnection: SqlDbConnection;
    private landlordIdentifiers: Identifier[] = [];

    constructor(dbConnection: SqlDbConnection) {
        this.dbConnection = dbConnection;
    }

    public withId(id: string): LandlordBuilder {
        this.id = id;
        return this;
    }

    public withRandomId(): LandlordBuilder {
        this.id = uuid.v4();
        return this;
    }

    public withRandomName(length = 10): LandlordBuilder {
        this.name = generate(length);
        return this;
    }

    public withName(name: string): LandlordBuilder {
        this.name = name;
        return this;
    }

    public withRandomReference(length = 10): LandlordBuilder {
        this.reference = generate(length);
        return this;
    }

    public withReference(reference: string): LandlordBuilder {
        this.reference = reference;
        return this;
    }

    public withParentReference(parentReference: string): LandlordBuilder {
        this.parentReference = parentReference;
        return this;
    }

    public withDesignation(designationId: string) : LandlordBuilder {
        this.designationId = designationId;
        return this;
    }

    public withIdentifiers(identifiers: Identifier[]): LandlordBuilder {
        this.landlordIdentifiers = identifiers;
        return this;
    }

    public withRandom(length = 10): LandlordBuilder {
        this.withRandomReference(length);
        this.withRandomName(length);
        this.withRandomId();
        return this;
    }

    public async insert(): Promise<BasicEntity> {

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
                (i as any).landlordId = landlord.id;
                await this.dbConnection.builder('LandlordIdentity').insert(i);
            }
        }

        return landlord;
    }
}