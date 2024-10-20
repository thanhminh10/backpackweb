import message from "@/components/notification/Notification";
import {
  MUTATION_DELETE_ADDRESSBOOK,
  QUERY_ADDRESSBOOK,
} from "@/graphql/address";
import { AddressBooksResponse } from "@/interfaces/addressBook/addressBook";
import { EditAddressBook } from "@/interfaces/form/address";
import { leftIcon, plusIconWhite } from "@/utils/icon/icon";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import AddAddressModal from "./components/modal/AddAddressModal";
import AddressList from "./components/AddressList";
import EditAddressModal from "./components/modal/EditAddressModal";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";
interface AddressSectionProps {
  handleButtonClick: () => void;
}
const AddressSection: React.FC<AddressSectionProps> = ({
  handleButtonClick,
}) => {
  const [removeAddressMutation] = useMutation(MUTATION_DELETE_ADDRESSBOOK);

  const { data: addressBookData, refetch } =
    useQuery<AddressBooksResponse>(QUERY_ADDRESSBOOK);

  const [isAddAdressModalOpen, setIsAddAdressModalOpen] = useState<boolean>(false);
  const [isEditAdressModalOpen, setIsEditAdressModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false); 
  const [addressToRemove, setAddressToRemove] = useState<string | null>(null); // Store address to be removed
  const [editAddressData, setEditAddressData] = useState<EditAddressBook | null>(null);


  const confirmRemoveAddress = async () => {
    if (addressToRemove) {
      try {
        const response = await removeAddressMutation({
          variables: {
            addressId: addressToRemove,
          },
        });
        if (response?.data?.deleteAddressBook?.success) {
          message.success("Xóa địa chỉ thành công");
        }
      } catch (error) {
        message.error("Xóa địa chỉ thất bại");
      }
      refetch();
    }
    setIsConfirmModalOpen(false); // Close the confirmation modal after action
  };

  const handleRemove = (id: string) => {
    setAddressToRemove(id);
    setIsConfirmModalOpen(true); // Open confirmation modal
  }
  const handleEdit = (id: string) => {
    const addressToEdit = addressBookData?.addressBooks.data?.find(
      (address) => address._id === id
    );
  const tmp =  {
    addressBookId:id,
    addressBook : {
      nameAddress: addressToEdit?.nameAddress ?? "",
      provinceId: addressToEdit?.provinceId ?? "",
      districtId: addressToEdit?.districtId ?? "",
      wardId: addressToEdit?.wardId ?? "" ,
      address: addressToEdit?.address ?? "",
      fullAddress: addressToEdit?.fullAddress ?? "",
      defaultAddress: addressToEdit?.defaultAddress ?? false,
    }
  }
  setEditAddressData(tmp)
  setIsEditAdressModalOpen(true)
  };

  return (
    <>
      <div className="flex flex-col gap-6 w-full ">
        <div className="flex items-start gap-2 self-stretch flex-col ">
          <div className="text-[#2D2E2F] text-center font-medium text-[20px] leading-[28px]">
            <button
              className="pointer mr-4 w-6 h-6 p-1"
              onClick={handleButtonClick}
            >
              {leftIcon}
            </button>
            Địa chỉ
          </div>
          <span className="bg-[#2D2E2F] w-full h-[1px]"></span>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 self-stretch">
          {addressBookData ? (
            <AddressList
              addressBookData={addressBookData}
              handleEdit={handleEdit}
              handleRemove={handleRemove}
            />
          ) : (
            <div>No addresses available</div> // Handle loading or empty state
          )}
          <button
            onClick={() => setIsAddAdressModalOpen(true)}
            className="flex w-[454px] h-12 px-6 py-3 justify-center items-center gap-1 text-white bg-primary-default rounded-full"
          >
            {plusIconWhite} Thêm địa chỉ mới
          </button>
        </div>
      </div>
      <AddAddressModal
        isOpen={isAddAdressModalOpen}
        refetch={refetch ?? (() => {})}  // Provide a fallback function if refetch is undefined
        onClose={() => setIsAddAdressModalOpen(false)}
      />

      <EditAddressModal 
        isOpen={isEditAdressModalOpen}
        refetch={refetch ?? (() => {})}
        onClose={() => setIsEditAdressModalOpen(false)}
        editAddressData={editAddressData}  // Pass the data to EditAddressModal
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen} // Show ConfirmModal when necessary
        title="Xóa địa chỉ"
        message="Bạn có muốn xoá địa chỉ này?"
        onConfirm={confirmRemoveAddress} // Confirm action triggers removal
        onCancel={() => setIsConfirmModalOpen(false)} // Cancel closes the modal
      />
    </>
  );
};

export default AddressSection;
