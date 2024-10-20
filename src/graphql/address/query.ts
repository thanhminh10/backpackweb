import { gql } from "@apollo/client";

export const QUERY_PROVINCE = gql(`
 query Provinces {
  provinces {
    _id
    code
    name
    fullName
  }
}
`);

export const QUERY_DISTRICT = gql(`
 query Districts($provinceCode: String) {
  districts(provinceCode: $provinceCode) {
    _id
    code
    name
    fullName
    provinceCode
  }
}
`);


export const QUERY_WARD = gql(`
 query Wards($districtCode: String) {
  wards(districtCode: $districtCode) {
    _id
    name
    code
    fullName
    districtCode
  }
}
`);

export const QUERY_ADDRESSBOOK = gql ` 
query AddressBooks {
  addressBooks {
    success
    message
    data {
      _id
      nameAddress
      userId
      provinceId
      districtId
      wardId
      address
      fullAddress
      defaultAddress
      createdAt
    }
  }
}
`


