"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveProperty = exports.CreateProperty = void 0;
const LandlordBuilder_1 = require("./builders/LandlordBuilder");
const PropertyBuilder_1 = require("./builders/PropertyBuilder");
const sqlDbCOnnection_1 = require("./sqlDbCOnnection");
async function CreateProperty(landlordId) {
    const connection = new sqlDbCOnnection_1.SqlDbConnection();
    let landlord;
    if (!landlordId) {
        landlord = await new LandlordBuilder_1.LandlordBuilder(connection).withRandom().insert();
    }
    const property = await new PropertyBuilder_1.PropertyBuilder(connection).withLandLordId(landlordId || landlord.id).insertRandom();
    return property;
}
exports.CreateProperty = CreateProperty;
async function RemoveProperty(propertyid) {
    const connection = new sqlDbCOnnection_1.SqlDbConnection();
    await new PropertyBuilder_1.PropertyBuilder(connection).removeTestProperty(propertyid);
}
exports.RemoveProperty = RemoveProperty;
//# sourceMappingURL=index.js.map