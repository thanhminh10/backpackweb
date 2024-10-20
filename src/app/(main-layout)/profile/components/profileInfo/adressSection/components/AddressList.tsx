// AddressList.tsx
import React from "react";
import AddressItem from "@/components/addressItem/AddressItem";
import { AddressBooksResponse } from "@/interfaces/addressBook/addressBook";

interface AddressListProps {
  addressBookData?: AddressBooksResponse; // Make it optional
  handleEdit: (id: string) => void;
  handleRemove: (id: string) => void;
}

const AddressList: React.FC<AddressListProps> = ({
  addressBookData,
  handleEdit,
  handleRemove,
}) => {
    if (!addressBookData) {
        return <div>No addresses found.</div>; // Or any other placeholder
    }
  return (
    <div className="flex flex-col justify-end items-start gap-1 self-stretch">
      {addressBookData?.addressBooks.data?.map((address) => (
        <AddressItem
          key={address._id}
          addressName={address.nameAddress}
          addressDetails={address.fullAddress}
          isDefault={address.defaultAddress}
          onEdit={() => handleEdit(address._id)} // Pass the edit handler
          onRemove={() => handleRemove(address._id)}
        />
      ))}
    </div>
  );
};

export default AddressList;
