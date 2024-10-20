// OrderSummary.tsx
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
import { useQuery, useReactiveVar } from "@apollo/client";
import React, { forwardRef, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Item {
  id: string;
  prodId: string;
  imageUrl: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
}

interface OrderFormData {
  userName: string;
  phone: string;
  paymentMethod: string;
  address: {
    province: string;
    district: string;
    ward: string;
    detailedAddress: string;
  };
  prods: Item[];
}

interface OrderSummaryProps {
  onSubmit: SubmitHandler<OrderFormData>;
  items: Item[];
}

const OrderSummary = forwardRef((props: OrderSummaryProps,ref) => {
  const orderConfirmation = useReactiveVar(orderConfirmationVar);
  const { onSubmit , items} = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>();

  
  const { data: provinceData } = useQuery<ProvinceResponse>(QUERY_PROVINCE);
  const provinceName = provinceData?.provinces.find(
    (item) => item.code == orderConfirmation.address.province
  )?.name;

  const { data: districtData } = useQuery<DistrictResponse>(QUERY_DISTRICT, {
    variables: { provinceCode: orderConfirmation.address.province },
  });
  const districtName = districtData?.districts.find(
    (item) => item.code == orderConfirmation.address.district
  )?.name;

  const { data: wardData } = useQuery<WardResponse>(QUERY_WARD, {
    variables: { districtCode: orderConfirmation.address.district },
  });
  const wardName = wardData?.wards.find(
    (item) => item.code == orderConfirmation.address.ward
  )?.name;
  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
  }));
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col justify-center items-start gap-4 self-stretch">
        <h3 className="text-normal uppercase text-start">Sản phẩm</h3>

        <span id="countCardItem" className="text-normal text-start">
          Có {orderConfirmation.prods.length ?? 0} sản phẩm trong giỏ hàng
        </span>

        {orderConfirmation.prods.map((item, index) => (
          <CartItem
            key={index}
            imageUrl={item.thumbnail ?? ""}
            title={item.prodName ?? ""}
            price={item.price ?? 0}
            originalPrice={item.price ?? 0}
            quantity={item.itemQuantity ?? 0}
            nohandle={true}
          />
        ))}

        <form className="flex flex-col gap-4 lg:mt-6 w-full">
          <div className="text-normal uppercase">Thông tin nhận hàng</div>
          <div className="flex lg:flex-row flex-col items-start gap-6 self-stretch">
            <div className="flex flex-col w-full">
              <label htmlFor="userName">Họ và tên:</label>
              <input
                id="userName"
                type="text"
                placeholder="Nhập họ và tên"
                defaultValue={orderConfirmation.userName ?? ""}
                {...register("userName")}
                readOnly
                className="input_base bg-teriaty w-full"
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="phone">Số điện thoại:</label>
              <input
                id="phone"
                type="text"
                placeholder="Nhập số điện thoại"
                {...register("phone")}
                defaultValue={orderConfirmation.userPhone ?? ""}
                readOnly
                className="input_base bg-teriaty w-full"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label>Địa chỉ</label>
            <div className="flex flex-col gap-6 w-full">
              <div className="flex lg:flex-row flex-col items-start gap-6 self-stretch">
                <div className="flex flex-col lg:w-1/2 w-full">
                  <input
                    type="text"
                    placeholder="Tỉnh/ Thành phố"
                    defaultValue={provinceName}
                    {...register("address.province")}
                    readOnly
                    className="input_base bg-teriaty w-full"
                  />
                </div>

                <div className="flex flex-col lg:w-1/2 w-full">
                  <input
                    type="text"
                    placeholder="Quận/ Huyện"
                    defaultValue={districtName}
                    {...register("address.district")}
                    readOnly
                    className="input_base bg-teriaty w-full"
                  />
                </div>
              </div>
              <div className="flex lg:flex-row flex-col items-start gap-6 self-stretch">
                <div className="flex flex-col lg:w-1/2 w-full">
                  <input
                    type="text"
                    placeholder="Phường/ Xã"
                    defaultValue={wardName}
                    {...register("address.ward")}
                    readOnly
                    className="input_base bg-teriaty w-full"
                  />
                </div>

                <input
                  placeholder="Địa chỉ cụ thể"
                  className="input_base bg-teriaty lg:w-1/2 w-full"
                  defaultValue={
                    orderConfirmation.address.detailedAddress ?? ""
                  }
                  {...register("address.detailedAddress")}
                  type="text"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="text-normal uppercase">Phương thức thanh toán</div>

          <div className="flex lg:flex-row flex-col items-start gap-6 self-stretch">
            <label className="flex p-2 border border-gray-300 rounded-lg items-center gap-4 flex-1 self-stretch cursor-pointer">
              <input
                type="radio"
                value="3"
                defaultChecked={String(orderConfirmation.paymentMethod) === "3"}
                className="form-checkbox"
                {...register("paymentMethod")}
                readOnly
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
                defaultChecked={String(orderConfirmation.paymentMethod) === "2"}
                className="form-checkbox"
                {...register("paymentMethod")}
                readOnly
              />
              {cashIcon}
              <span className="text-normal text-neutral-gray-60">
                Chuyển khoản
              </span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
});

OrderSummary.displayName = "OrderSummary"; // Set display name for debugging
export default OrderSummary;
