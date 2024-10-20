export interface CreateAddressBook {
  addressBook: {
    nameAddress: string;
    provinceId: string;
    districtId: string;
    wardId: string;
    address: string;
    fullAddress: string;
    defaultAddress: boolean;
  };
}

export interface EditAddressBook {
  addressBookId:string;
  addressBook: {
    nameAddress: string;
    provinceId: string;
    districtId: string;
    wardId: string;
    address: string;
    fullAddress: string;
    defaultAddress: boolean;
  }
}
