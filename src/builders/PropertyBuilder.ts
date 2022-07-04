
import { generate } from 'randomstring';
import { Property } from '../models/property';
import { ISqlDbConnection } from '../sqlDbCOnnection';
import { BasicEntity, ObjectBuilder } from './ObjectBuilder';

export class PropertyBuilder {

    private landlordId!: string;
    private landlordReference!: string;
    private parentId!: string;
    private buildingTypeId!: string;
    private floorId!: string;
    private key!: string;
    private value!: string;

    constructor(private connection: ISqlDbConnection) {
    }

    public withLandLordId(landlordId: string): PropertyBuilder {
        this.landlordId = landlordId;
        return this;
    }

    public withFloor(floorId: string): PropertyBuilder {
        this.floorId = floorId;
        return this;
    }

    public withBuildingType(buildingTypeId: string): PropertyBuilder {
        this.buildingTypeId = buildingTypeId;
        return this;
    }

    public withLandLordReference(landlordReference: string): PropertyBuilder {
        this.landlordReference = landlordReference;
        return this;
    }

    public withParent(parentId: string): PropertyBuilder {
        this.parentId = parentId;
        return this;
    }

    public withIdentifier(key: string, value: string): PropertyBuilder {
        this.key = key;
        this.value = value;
        return this;
    }

    public buildCreateModel(landlordReference): Property {
        const model = {
            'name': generate(10),
            'reference': generate(10),
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
            (model as any).parentId = this.parentId;
        }

        return model;
    }

    public async insertRandom(): Promise<BasicEntity> {
        const address = {
            nameNumber: generate(10),
            street: generate(10),
            locality: generate(10),
            county: generate(5),
            city: generate(5),
            postcode: generate(6),
            country: 'United Kingdom'
        };

        const addressId = await new ObjectBuilder(this.connection).insertRaw('address', address);

        const geoId = await new ObjectBuilder(this.connection).insertRaw('geo', {
            latitude: 100,
            longitude: 100,
            pitch: 100,
            heading: 100,
            zoom: 8
        });

        const additional: any = { addressId: addressId, geoId: geoId, typeId: 'BUNG', statusId: 'ACTIVE' };
        if (this.landlordId) {
            additional.landlordId = this.landlordId;
        }

        if (this.landlordReference) {
            additional.landlordReference = this.landlordReference;
        }
        const property = await new ObjectBuilder(this.connection)
            .withRandom()
            .insert('property', additional);

        if (this.key && this.value)
            await this.connection.knexRaw().raw(`insert into propertyidentity (propertyid, \`key\`, value) values ('${property.id}', '${this.key}', '${this.value}');`);

        return property;
    }
}