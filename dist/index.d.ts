import { Property } from './models/property';
export declare function CreateProperty(landlordId?: string): Promise<Property>;
export declare function RemoveProperty(propertyid: string): Promise<void>;
