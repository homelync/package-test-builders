export interface Property {
    id?: string;
    name?: string;
    reference?: string;
    landlordId?: string;
    typeId?: string;
    statusId?: string;
    constructionTypeId?: string;
    heatingTypeId?: string;
    propertyFloorId?: string;
    buildingTypeId?: string;
    constructionDate?: Date;
    address?: AddressModel;
    geo?: GeoModel;
    addressId?: number;
    geoId?: number;
    parentId?: string;
}

export interface AddressModel {
    id?: number;
    uprn?: number;
    flatIdentifier?: string;
    nameNumber: string;
    street: string;
    locality?: string;
    county?: string;
    city: string;
    postcode: string;
    country: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface GeoModel {
    id?: number;
    latitude: number;
    longitude: number;
    pitch: number;
    heading: number;
    zoom: number;
    createdAt?: Date;
    updatedAt?: Date;
}