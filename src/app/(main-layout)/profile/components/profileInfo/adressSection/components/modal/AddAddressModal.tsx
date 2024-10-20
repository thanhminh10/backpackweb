// AddAddressModal.tsx
import React, { useEffect, useMemo, useState } from "react";
import Modal from "@/components/modal/modal";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import AddressForm from "../form/AddAddressForm";
import { DistrictResponse, ProvinceResponse, WardResponse } from "@/interfaces/user/address";
import { MUTATION_ADD_ADDRESSBOOK, QUERY_DISTRICT, QUERY_PROVINCE, QUERY_WARD } from "@/graphql/address";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CreateAddressBook } from "@/interfaces/form/address";
import message from "@/components/notification/Notification";

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch?: () => void;  // Add refetch prop
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({
  isOpen,
  onClose,
  refetch
}) => {
  const [createAddressMutation] = useMutation(MUTATION_ADD_ADDRESSBOOK);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>("");
  const [selectedWardCode, setSelectedWardCode] = useState<string>("");

  // GRAHQL QUERY
  const { data: provinceData } = useQuery<ProvinceResponse>(QUERY_PROVINCE);
  const memorizedProvinceData = useMemo(() => provinceData, [provinceData]);

  const [fetchDistricts, { data: districtData }] =
    useLazyQuery<DistrictResponse>(QUERY_DISTRICT);
  const memorizedDistrictData = useMemo(() => districtData, [districtData]);

  const [fetchWards, { data: wardData }] =
  useLazyQuery<WardResponse>(QUERY_WARD);
const memorizedWardData = useMemo(() => wardData, [wardData]);


  useEffect(() => {
    if (selectedProvinceCode) {
      setSelectedDistrictCode("");
      setSelectedWardCode(""); 
      fetchDistricts({ variables: { provinceCode: selectedProvinceCode } });
    }
  }, [selectedProvinceCode, fetchDistricts, provinceData]);


  useEffect(() => {
    if (selectedDistrictCode) {
      setSelectedWardCode("");
      fetchWards({ variables: { districtCode: selectedDistrictCode } });
    }
  }, [selectedDistrictCode, fetchWards, districtData]);


  const handleProvinceChange = (changeId: string) => {
    setSelectedProvinceCode(changeId);
    setSelectedDistrictCode("");
    setSelectedWardCode("");
  };

  const handleDistrictChange = (changeId: string) => {
    setSelectedDistrictCode(changeId);
    setSelectedWardCode("");
  };


  const handleWardChange = (changeId: string) => {
    setSelectedWardCode(changeId);
  };

  // Submit function for form submission
  const handleAddAddress  = async (data: CreateAddressBook) => {

    const provinceName = memorizedProvinceData?.provinces.find((item) => {
      return item.code == data?.addressBook?.provinceId;
    });
    const DistrictName = memorizedDistrictData?.districts.find((item) => {
      return item.code == data?.addressBook?.districtId;
    });
    const WardName = memorizedWardData?.wards.find((item) => {
      return item.code == data?.addressBook?.wardId;
    });

    const fullAddress = `${data.addressBook.address || ""}, ${
      WardName?.fullName || ""
    }, ${DistrictName?.fullName || ""}, ${provinceName?.fullName || ""}`;
    
    try {
      const response = await createAddressMutation({
        variables: {
          addressBook: {
            nameAddress: data.addressBook.nameAddress,
            provinceId: data?.addressBook?.provinceId,
            districtId: data?.addressBook?.districtId,
            wardId: data?.addressBook?.wardId,
            address: data?.addressBook?.address,
            fullAddress: fullAddress,
            defaultAddress: data?.addressBook?.defaultAddress,
          },
        },
      });
      if (response?.data?.createAddressBook?.message) {
        message.success("Thêm địa chỉ thành công");
        if(typeof refetch === 'function') {
          refetch();  // Call refetch if it's defined
        }
        onClose(); 
      }
    } catch (error) {
      console.error("Error creating address:", error);
      // Handle error (e.g., show notification)
    }
  };
  
  return (
    <Modal w={800} isOpen={isOpen} onClose={onClose}>
      <SectionHeader title="Thêm địa chỉ mới" suggestItem={true} />
      <AddressForm
        onSubmit={handleAddAddress}
        provinceData={memorizedProvinceData}
        districtData={memorizedDistrictData}
        wardData={memorizedWardData}
        handleProvinceChange={handleProvinceChange}
        handleDistrictChange={handleDistrictChange}
        handleWardChange={handleWardChange}
      />
    </Modal>
  );
};

export default AddAddressModal;
