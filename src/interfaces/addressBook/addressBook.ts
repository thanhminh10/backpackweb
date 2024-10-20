import { IResponse } from "../response";

export interface AddressBookEntry {
    _id: string;              // Unique identifier for the address book entry
    nameAddress: string;      // Name of the address
    userId: string;          // ID of the user associated with this address
    provinceId: string;       // Province ID
    districtId: string;       // District ID
    wardId: string;           // Ward ID
    address: string;          // Specific address details
    fullAddress: string;      // Complete formatted address
    defaultAddress: boolean;  // Indicates if this is the default address
    createdAt: string;        // Timestamp of when the address was created
}

export interface AddressBooksResponse {
            
    addressBooks: IResponse<AddressBookEntry[]>; 
}