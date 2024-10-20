// OrderForm.tsx
"use client";
import AutoCompleteWithOutAdd from "@/components/autocomplete/autocompleteWithoutAdd";
import CartItem from "@/components/cartItem/CartItem";
import {
  QUERY_DISTRICT,
  QUERY_PROVINCE,
  QUERY_WARD,
} from "@/graphql/address/query";
import {
  DistrictResponse,
  ProvinceResponse,
  WardResponse,
} from "@/interfaces/user/address";
import { orderConfirmationVar, userVar } from "@/constants/makevar/makeVar";
import { cashIcon } from "@/utils/icon/icon";
import { useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface OrderFormData {
  userName: string;
  phone: string;
  paymentMethod: string; // Add paymentMethod to form data
  address: {
    province: string;
    district: string;
    ward: string;
    detailedAddress: string;
  };
  prods: Item[];
}

interface Item {
  id: string;
  prodId: string;
  imageUrl: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
}

interface OrderFormProps {
  onSubmit: SubmitHandler<OrderFormData>;
  items: Item[];
  totalItems: number;
  defaultAddress: any;
}

const OrderForm = forwardRef((props: OrderFormProps, ref) => {

  // Default value
  const orderConfirmation = useReactiveVar(orderConfirmationVar);
  const userInfo = useReactiveVar(userVar);
  const { onSubmit, items, totalItems, defaultAddress } = props;

  // State
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>("");
  const [selectedWardCode, setSelectedWardCode] = useState<string>("");
  // Form handle
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<OrderFormData>({
    defaultValues: {
      userName: orderConfirmation.userName ?? userInfo?.userName ?? "",
      phone: orderConfirmation.userPhone ?? userInfo?.phone ?? "",
      paymentMethod: orderConfirmation.paymentMethod
        ? String(orderConfirmation.paymentMethod)
        : "3",
      prods: [],
    },
  });

 // Sử lý việc quay lại của order
 useEffect(() => {
  const updateAddress = () => {
    const { province, district, ward, detailedAddress } = orderConfirmation.address;
    
    if (province === "" && defaultAddress?.provinceId) {
      setSelectedProvinceCode(defaultAddress.provinceId);
      setValue("address.province", defaultAddress.provinceId);
    } else {
      setSelectedProvinceCode(province ?? "");
      setValue("address.province", province ?? "");
    }

    if (district === "" && defaultAddress?.districtId) {
      setSelectedDistrictCode(defaultAddress.districtId);
      setValue("address.district", defaultAddress.districtId);
    } else {
      setSelectedDistrictCode(district ?? "");
      setValue("address.district", district ?? "");
    }

    if (ward === "" && defaultAddress?.wardId) {
      setSelectedWardCode(defaultAddress.wardId);
      setValue("address.ward", defaultAddress.wardId);
    } else {
      setSelectedWardCode(ward ?? "");
      setValue("address.ward", ward ?? "");
    }

    if (detailedAddress === "" && defaultAddress?.address) {
      setValue("address.detailedAddress", defaultAddress.address);
    } else {
      setValue("address.detailedAddress", detailedAddress ?? "");
    }
  };
  updateAddress();
}, [orderConfirmation.address, defaultAddress, setValue]);

  const { data: provinceData } = useQuery<ProvinceResponse>(QUERY_PROVINCE);
  const memorizedProvinceData = useMemo(() => provinceData, [provinceData]);
  const [fetchDistricts, { data: districtData }] =
    useLazyQuery<DistrictResponse>(QUERY_DISTRICT);
  const memorizedDistrictData = useMemo(() => districtData, [districtData]);
  const [fetchWards, { data: wardData }] =
    useLazyQuery<WardResponse>(QUERY_WARD);
  const memorizedWardData = useMemo(() => wardData, [wardData]);

  const handleProvinceChange = (changeId: string) => {
    setSelectedProvinceCode(changeId);
    setSelectedDistrictCode("");
    setSelectedWardCode("");
    reset({
      address: {
        ...getValues("address"), // Lấy đúng giá trị của address
        province: changeId,
        district: "",
        ward: "",
      },
    });
  };

  const handleDistrictChange = (changeId: string) => {
    setSelectedDistrictCode(changeId);
    setSelectedWardCode("");
    reset({
      address: {
        ...getValues("address"), // Lấy đúng giá trị của address
        district: changeId,
        ward: "",
      },
    });
  };

  const handleWardChange = (changeId: string) => {
    setSelectedWardCode(changeId);
    reset({
      address: {
        ...getValues("address"), // Lấy đúng giá trị của address
        ward: changeId,
      },
    });
  };
  useEffect(() => {
    if (selectedProvinceCode) {
      setSelectedDistrictCode(""); // Đặt lại mã quận khi province thay đổi
      setSelectedWardCode(""); // Đặt lại mã phường khi province thay đổi
      fetchDistricts({ variables: { provinceCode: selectedProvinceCode } });
    }
  }, [
    selectedProvinceCode,
    fetchDistricts,
    provinceData,
    orderConfirmation.address.province,
  ]);

  useEffect(() => {
    if (selectedDistrictCode) {
      setSelectedWardCode("");
      fetchWards({ variables: { districtCode: selectedDistrictCode } });
    }
  }, [
    selectedDistrictCode,
    fetchWards,
    districtData,
    orderConfirmation.address.district,
  ]);

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
  }));

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col justify-center items-start gap-4 self-stretch">
        <h3 className="text-normal uppercase text-start">Sản phẩm</h3>
        <span id="countCardItem" className="text-normal text-start">
          Có {totalItems} sản phẩm trong giỏ hàng
        </span>

        {items.map((item) => (
          <CartItem
            key={item.id}
            imageUrl={item.imageUrl}
            title={item.name}
            price={item.price}
            originalPrice={item.originalPrice}
            quantity={item.quantity}
            nohandle={true}
          />
        ))}
      </div>

      <form className="flex flex-col gap-4 lg:mt-6">
        <div className="text-normal uppercase">Thông tin nhận hàng</div>
        <div className="flex lg:flex-row flex-col items-start gap-6 self-stretch">
          <div className="flex flex-col w-full">
            <label htmlFor="userName">Họ và tên:</label>
            <input
              id="userName"
              type="text"
              placeholder="Nhập họ và tên"
              {...register("userName", { required: "Họ tên là bắt buộc." })}
              className={`input_base bg-teriaty w-full ${
                errors.userName ? "border-red-500" : ""
              }`}
            />
            {errors.userName && (
              <span className="text-red-500">{errors.userName.message}</span>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="phone">Số điện thoại:</label>
            <input
              id="phone"
              type="text"
              placeholder="Nhập số điện thoại"
              {...register("phone", { required: "Số điện thoại là bắt buộc." })}
              className={`input_base bg-teriaty w-full ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col  w-full">
          <label>Địa chỉ</label>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex lg:flex-row flex-col items-start gap-6 self-stretch">
              <Controller
                name="address.province"
                control={control}
                rules={{
                  required: "Tỉnh/Thành phố là bắt buộc.", // Validation rule for required
                }}
                defaultValue={orderConfirmation.address.province ?? ""}
                render={({ formState: { errors }, field }) => (
                  <div className="flex flex-col lg:w-1/2 w-full">
                    {" "}
                    {/* Set width to 50% */}
                    <AutoCompleteWithOutAdd
                      hiddenInputName="address.province"
                      field="Tỉnh/ Thành phố"
                      data={memorizedProvinceData?.provinces ?? []}
                      onChange={handleProvinceChange}
                      value={field.value || ""} // Ensure value is always defined
                    />
                    {errors && (
                      <p className="text-red-500">
                        {errors.address?.province?.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                control={control}
                name="address.district"
                defaultValue={selectedDistrictCode}
                rules={{
                  required: "Quận/ Huyện là bắt buộc.", // Validation rule for required
                }}
                render={({ formState: { errors }, field }) => (
                  <div className="flex flex-col lg:w-1/2 w-full">
                    {" "}
                    {/* Set width to 50% */}
                    <AutoCompleteWithOutAdd
                      data={memorizedDistrictData?.districts ?? []}
                      hiddenInputName="address.district"
                      field="Quận/ Huyện"
                      value={field.value || ""} // Ensure value is always defined
                      onChange={handleDistrictChange}
                    />
                    {errors && (
                      <p className="text-red-500">
                        {errors.address?.district?.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex lg:flex-row flex-col items-start gap-6 self-stretch">
              <Controller
                control={control}
                name="address.ward"
                rules={{
                  required: "Phường/ Xã là bắt buộc.", // Validation rule for required
                }}
                defaultValue={selectedWardCode}
                render={({ formState: { errors }, field }) => (
                  <div className="flex flex-col lg:w-1/2 w-full">
                    <AutoCompleteWithOutAdd
                      data={memorizedWardData?.wards ?? []}
                      hiddenInputName="address.ward"
                      field="Phường/ Xã"
                      value={field.value || ""} // Ensure value is always defined
                      onChange={handleWardChange}
                    />
                    {errors && (
                      <p className="text-red-500">
                        {errors.address?.ward?.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <div className="flex flex-col lg:w-1/2 w-full">
                <input
                  placeholder="Địa chỉ cụ thể"
                  className=" input_base bg-teriaty  w-full"
                  type="text"
                  {...register("address.detailedAddress", {
                    required: "Địa chỉ cụ thể là bắt buộc.",
                  })}
                />

                {errors && (
                  <p className="text-red-500">
                    {errors.address?.detailedAddress?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-normal uppercase">Phương thức thanh toán</div>

        <div className="flex lg:flex-row flex-col items-start gap-6 self-stretch">
          <label className="flex p-2 border border-gray-300 rounded-lg items-center gap-4 flex-1 self-stretch cursor-pointer">
            <input
              type="radio"
              value="3"
              className="form-checkbox"
              defaultChecked={String(orderConfirmation.paymentMethod) === "3"} // Pre-select based on value
              {...register("paymentMethod", {
                required: "Phương thức thanh toán là bắt buộc.",
              })}
            />
            {cashIcon}
            <span className="text-normal text-neutral-gray-60">
              Thanh toán khi nhận hàng
            </span>
          </label>

          <label className="flex p-2 border border-gray-300 rounded-lg items-center gap-4 flex-1 self-stretch cursor-pointer">
            <input
              type="radio"
              value="2"
              className="form-checkbox"
              defaultChecked={String(orderConfirmation.paymentMethod) === "2"} // Pre-select based on value
              {...register("paymentMethod", {
                required: "Phương thức thanh toán là bắt buộc.",
              })}
            />
            {cashIcon}
            <span className="text-normal text-neutral-gray-60">
              Chuyển khoản
            </span>
          </label>
        </div>

        {/* Display error message for payment method if needed */}
        {errors.paymentMethod && (
          <span className="text-red-500">{errors.paymentMethod.message}</span>
        )}
      </form>
    </div>
  );
});

OrderForm.displayName = "OrderForm"; // Set display name for debugging

export default OrderForm;
