// AddressItem.tsx
import { editIcon, removeIcon } from "@/utils/icon/icon";
import React from "react";

interface AddressItemProps {
  addressName: string; // Name of the address
  addressDetails: string; // Address details to be displayed
  isDefault: boolean; // Indicates if this is the default address
  onEdit: () => void; // Function to call when edit button is clicked
  onRemove: () => void; // Function to call when remove button is clicked
}

const AddressItem: React.FC<AddressItemProps> = ({
  addressName,
  addressDetails,
  isDefault,
  onEdit,
  onRemove
}) => {
  return (
    <>
    <div className="flex flex-col justify-end items-start gap-1 self-stretch">
      <div className="flex justify-start gap-6 self-stretch">
        <span>{addressName}</span>
        <span>{isDefault ? "Mặc định" : ""}</span>
      </div>
      <div className="flex flex-row justify-between items-start gap-1 flex-1 w-full">
        <p className="text-normal italic font-300 text-neutral-gray-60">
          {addressDetails}
        </p>
        <div className="flex gap-3">
            <button onClick={onEdit}>{editIcon}</button>
            { !isDefault && 
            <button  onClick={onRemove}>{removeIcon}</button>
            }
        </div>
      </div>
    </div>
    </>
    
  );
};

export default AddressItem;
