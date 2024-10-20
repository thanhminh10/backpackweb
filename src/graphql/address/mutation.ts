import { gql } from "@apollo/client";

export const MUTATION_ADD_ADDRESSBOOK = gql `
mutation CreateAddressBook($addressBook: AddressBookInput!) {
  createAddressBook(addressBook: $addressBook) {
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
export const MUTATION_DELETE_ADDRESSBOOK = gql `
mutation DeleteAddressBook($addressId: ID!) {
  deleteAddressBook(addressId: $addressId) {
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

export const MUTATION_EDIT_ADDRESSBOOK = gql `
mutation EditAddressBook($addressBookId: ID!, $addressBook: AddressBookInput!) {
  editAddressBook(addressBookId: $addressBookId, addressBook: $addressBook) {
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