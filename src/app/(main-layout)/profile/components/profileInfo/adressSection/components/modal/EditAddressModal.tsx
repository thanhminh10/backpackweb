import Modal from "@/components/modal/modal";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import { MUTATION_EDIT_ADDRESSBOOK, QUERY_DISTRICT, QUERY_PROVINCE, QUERY_WARD } from "@/graphql/address";
import { CreateAddressBook, EditAddressBook } from "@/interfaces/form/address";
import {
  DistrictResponse,
  ProvinceResponse,
  WardResponse,
} from "@/interfaces/user/address";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import AddressForm from "../form/AddAddressForm";
import EditAddressForm from "../form/EditAddressForm";
import message from "@/components/notification/Notification";

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch?: () => void; // Add refetch prop
  editAddressData: EditAddressBook | null;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({
  isOpen,
  onClose,
  refetch,
  editAddressData,
}) => {
  const [editAddressMutation] = useMutation(MUTATION_EDIT_ADDRESSBOOK);

  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>("");
  const [selectedWardCode, setSelectedWardCode] = useState<string>("");

  const { data: provinceData } = useQuery<ProvinceResponse>(QUERY_PROVINCE);
  const memorizedProvinceData = useMemo(() => provinceData, [provinceData]);

  const [fetchDistricts, { data: districtData }] =
    useLazyQuery<DistrictResponse>(QUERY_DISTRICT);
  const memorizedDistrictData = useMemo(() => districtData, [districtData]);

  const [fetchWards, { data: wardData }] =
    useLazyQuery<WardResponse>(QUERY_WARD);
  const memorizedWardData = useMemo(() => wardData, [wardData]);

  useEffect(() => {
    if (editAddressData) {
      setSelectedProvinceCode(editAddressData.addressBook.provinceId);
      setSelectedDistrictCode(editAddressData.addressBook.districtId);
      setSelectedWardCode(editAddressData.addressBook.wardId);
    }
  }, [editAddressData]);

  useEffect(() => {
    if (selectedProvinceCode) {
      fetchDistricts({ variables: { provinceCode: selectedProvinceCode } });
    }
  }, [selectedProvinceCode, fetchDistricts]);

  useEffect(() => {
    if (selectedDistrictCode) {
      fetchWards({ variables: { districtCode: selectedDistrictCode } });
    }
  }, [selectedDistrictCode, fetchWards]);

  const handleProvinceChange = (changeId: string) => {
    setSelectedProvinceCode(changeId);
    setSelectedDistrictCode("")
    setSelectedWardCode("")
  };

  const handleDistrictChange = (changeId: string) => {
    setSelectedDistrictCode(changeId);
    setSelectedWardCode("")
  };

  const handleWardChange = (changeId: string) => {
    setSelectedWardCode(changeId);
  };

  const handleEditAddress = async (data: EditAddressBook) => {
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
      const response = await editAddressMutation({
        variables: {
          addressBookId: data.addressBookId,
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
      if (response?.data?.editAddressBook?.message) {
        message.success("Chỉnh sửa địa chỉ thành công");
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
      <SectionHeader title="Chỉnh sửa địa chỉ" suggestItem={true} />
      <EditAddressForm
        selectedProvinceCode={selectedProvinceCode}
        selectedDistrictCode = {selectedDistrictCode}
        selectedWardCode =  {selectedWardCode}
        defaultvalues={editAddressData ?? null}
        onSubmit={handleEditAddress}
        provinceData={memorizedProvinceData}
        districtData={memorizedDistrictData}
        wardData={memorizedWardData}
        handleWardChange={handleWardChange}
        handleProvinceChange={handleProvinceChange}
        handleDistrictChange={handleDistrictChange}
      />
    </Modal>
  );
};

export default EditAddressModal;
