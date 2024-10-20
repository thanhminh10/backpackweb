// AddressForm.tsx
import AutoCompleteWithOutAdd from "@/components/autocomplete/autocompleteWithoutAdd";
import { CreateAddressBook, EditAddressBook } from "@/interfaces/form/address";
import {
  DistrictResponse,
  ProvinceResponse,
  WardResponse,
} from "@/interfaces/user/address";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface AddressFormProps {
  onSubmit: (data: EditAddressBook) => Promise<void>;
  provinceData?: ProvinceResponse | undefined;
  districtData?: DistrictResponse | undefined;
  wardData?: WardResponse | undefined;
  handleProvinceChange?: (provinceId: string) => void;
  handleDistrictChange?: (districtId: string) => void;
  handleWardChange?: (wardId: string) => void;
  defaultvalues?: EditAddressBook | null;
  selectedProvinceCode?: string | "";
  selectedDistrictCode?: string | "";
  selectedWardCode?:string| "";
}

const EditAddressForm: React.FC<AddressFormProps> = ({
  onSubmit,
  provinceData,
  districtData,
  wardData,
  handleProvinceChange,
  handleDistrictChange,
  handleWardChange,
  defaultvalues,
  selectedProvinceCode,
  selectedDistrictCode,
  selectedWardCode
}) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditAddressBook>({
    defaultValues: {
      addressBookId: defaultvalues?.addressBookId,
      addressBook: {
        nameAddress: defaultvalues?.addressBook.address,
        provinceId: selectedProvinceCode,
        districtId: selectedDistrictCode,
        wardId: undefined,
        address: defaultvalues?.addressBook.address,
        fullAddress: defaultvalues?.addressBook.fullAddress,
        defaultAddress: defaultvalues?.addressBook.defaultAddress,
      },
    },
  });
  useEffect(() => {
    setValue("addressBook.provinceId", selectedProvinceCode ?? "");
    setValue("addressBook.districtId", selectedDistrictCode ?? "");
    setValue("addressBook.wardId", selectedWardCode ?? "");
  }, [selectedProvinceCode, selectedDistrictCode, selectedWardCode, setValue]);
  return (
    <form
      className="flex flex-col gap-6 mt-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Name Address Input */}
      <div className="flex flex-col items-start gap-1 self-stretch">
        <label htmlFor="nameAddress">Tên địa chỉ</label>
        <input
          id="nameAddress"
          type="text"
          defaultValue={defaultvalues?.addressBook.nameAddress}
          className="input_base bg-teriaty w-full"
          placeholder="Tên địa chỉ"
          {...register("addressBook.nameAddress", {
            required: "Tên địa chỉ là bắt buộc",
          })}
        />
        {errors.addressBook?.nameAddress && (
          <span className="text-red-500">
            {errors.addressBook.nameAddress.message}
          </span>
        )}
      </div>

      {/* Province and District Selectors */}
      <div className="flex lg:flex-row flex-col items-start gap-6 self-stretch">
        <div className="flex flex-col items-start gap-1 self-stretch w-1/2">
          <label htmlFor="province">Tỉnh, thành phố</label>
          <Controller
            name="addressBook.provinceId"
            control={control}
            rules={{ required: "Vui lòng chọn tỉnh/thành phố" }}
            render={({ field }) => (
              <AutoCompleteWithOutAdd
                data={provinceData?.provinces ?? []}
                hiddenInputName="addressBook.provinceId"
                field="Tỉnh/ Thành phố"
                value={field.value || ""}
                onChange={(fieldValue) => {
                  field.onChange(fieldValue); // Update field value
                  handleProvinceChange?.(fieldValue ?? "");
                }}
              />
            )}
          />
          {errors.addressBook?.provinceId && (
            <span className="text-red-500">
              {errors.addressBook.provinceId.message}
            </span>
          )}
        </div>

        <div className="flex flex-col items-start gap-1 w-1/2">
          <label htmlFor="district">Quận, huyện</label>
          <Controller
            name="addressBook.districtId"
            control={control}
            rules={{ required: "Vui lòng chọn quận/huyện" }}
            defaultValue={selectedDistrictCode}
            render={({ field }) => (
              <AutoCompleteWithOutAdd
                data={districtData?.districts ?? []}
                hiddenInputName="addressBook.districtId"
                field="Quận huyện"
                value={field.value || ""}
                onChange={(fieldValue) => {
                  field.onChange(fieldValue); // Update field value
                  handleDistrictChange?.(fieldValue ?? "");
                }}
              />
            )}
          />
          {errors.addressBook?.districtId && (
            <span className="text-red-500">
              {errors.addressBook.districtId.message}
            </span>
          )}
        </div>
      </div>

      {/* Ward Selector and Address Input */}
      <div className="flex lg:flex-row flex-col items-start gap-6 self-stretch">
        <div className="flex flex-col items-start gap-1 w-1/2">
          <label htmlFor="ward">Phường, xã</label>
          <Controller
            name="addressBook.wardId"
            control={control}
            rules={{ required: "Vui lòng chọn phường/xã" }}
            render={({ field }) => (
              <AutoCompleteWithOutAdd
                data={wardData?.wards ?? []}
                hiddenInputName="addressBook.wardId"
                field="Phường/ Xã"
                value={field.value || ""}
                onChange={(fieldValue) => {
                  field.onChange(fieldValue); // Update field value
                  handleWardChange?.(fieldValue ?? "");
                }}
              />
            )}
          />
          {errors.addressBook?.wardId && (
            <span className="text-red-500">
              {errors.addressBook.wardId.message}
            </span>
          )}
        </div>

        <div className="flex flex-col items-start gap-1 w-1/2">
          <label htmlFor="addressDetail">Địa chỉ cụ thể</label>
          <input
            id="addressDetail"
            type="text"
            className="input_base bg-teriaty w-full"
            placeholder="Địa chỉ cụ thể"
            {...register("addressBook.address", {
              required: "Địa chỉ cụ thể là bắt buộc",
            })}
          />
          {errors.addressBook?.address && (
            <span className="text-red-500">
              {errors.addressBook.address.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex lg:flex-row flex-col items-start gap-6 self-stretch">
        <label
          className="flex  justify-center gap-4 items-center"
          htmlFor="defaultAddress"
        >
          <input
            type="checkbox"
            id="defaultAddress"
            className="w-[20px] h-[20px]"
            {...register("addressBook.defaultAddress")}
          />
          Đặt làm địa chỉ mặc định
        </label>
      </div>
      {/* Submit Button */}
      <button type="submit" className="btn bg-primary-default text-white mt-4">
        Chỉnh sửa địa chỉ
      </button>
    </form>
  );
};

export default EditAddressForm;
