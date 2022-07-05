import { LandlordBuilder } from './builders/LandlordBuilder';
import { PropertyBuilder } from './builders/PropertyBuilder';
import { Property } from './models/property';
import { SqlDbConnection } from './sqlDbCOnnection';


export async function CreateProperty(landlordId?: string): Promise<Property> {
    const connection: SqlDbConnection = new SqlDbConnection();
    let landlord;
    if (!landlordId) {
        landlord = await new LandlordBuilder(connection).withRandom().insert()
    }

    const property = await new PropertyBuilder(connection).withLandLordId(landlordId || landlord.id).insertRandom();

    return property;
}

export async function RemoveProperty(propertyid: string): Promise<void> {

    const connection: SqlDbConnection = new SqlDbConnection();

    await new PropertyBuilder(connection).removeTestProperty(propertyid);

}