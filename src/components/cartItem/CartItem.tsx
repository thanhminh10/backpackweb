"use client";
import { formatPrice } from "@/constants";
import { closeIcon, deductIcon, plusIcon } from "@/utils/icon/icon";
import Image from "next/image";
import React from "react";

interface CartItemBaseProps {
  imageUrl: string;
  title: string;
  price: number;
  originalPrice: number;
  quantity: number;
  nohandle?: boolean;
}

// Khi `nohandle` là `false`, các props `onQuantityChange` và `onRemove` là bắt buộc
interface CartItemWithHandlersProps extends CartItemBaseProps {
  nohandle?: false;
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void;
}

// Khi `nohandle` là `true`, không cần các props `onQuantityChange` và `onRemove`
interface CartItemWithoutHandlersProps extends CartItemBaseProps {
  nohandle: true;
  onQuantityChange?: never;
  onRemove?: never;
}

// Kiểu tổng hợp cho phép cả hai trường hợp
type CartItemProps = CartItemWithHandlersProps | CartItemWithoutHandlersProps;

const CartItem: React.FC<CartItemProps> = ({
  imageUrl,
  title,
  price,
  originalPrice,
  quantity,
  onQuantityChange,
  onRemove,
  nohandle = false,
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      onRemove?.(); // Nếu số lượng < 1, xóa sản phẩm
    } else {
      onQuantityChange?.(newQuantity); // Cập nhật số lượng
    }
  };

  if (nohandle) {
    return (
      <div className="flex p-[8px_0px] items-start gap-6 self-stretch border-b border-[#E7EAEC]">
        <div className="flex relative w-[80px] h-[80px] justify-between items-end">
          <Image
            src={imageUrl}
            alt="item"
            layout="fill"
            className="absolute top-0 left-0 right-0 bottom-0"
          />
        </div>
        <div className="flex flex-col items-start gap-2 flex-[1_0_0]">
          <h4 className="text-normal uppercase line-clamp-2 leading-[140%]">
            {title}
          </h4>
          <div className="flex gap-4 items-center">
            <div className="text-normal text-primary-default">
              {formatPrice(price)} <span className="underline">đ</span>
            </div>
            <div className="text-12 font-400 line-through">
              {formatPrice(originalPrice)} <span className="underline">đ</span>
            </div>
          </div>
        </div>
        <span className="flex p-2 px-4 justify-center items-center gap-3 rounded-[32px] bg-teriaty">
          <span>SL: {quantity}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex p-[8px_0px] items-start gap-6 self-stretch border-b border-[#E7EAEC]">
      <div className="flex relative w-[80px] h-[80px] justify-between items-end">
        <Image
          src={imageUrl}
          alt="item"
          layout="fill"
          className="absolute top-0 left-0 right-0 bottom-0"
        />
      </div>
      <div className="flex flex-col lg:flex-row  items-start gap-2 flex-[1_0_0]">
        <div className="flex flex-col  items-start gap-2 flex-[1_0_0]">
          <h4 className="text-normal uppercase line-clamp-2 leading-[140%]">
            {title}
          </h4>
          <div className="flex gap-4 items-center">
            <div className="text-normal text-primary-default">
              {formatPrice(price)} <span className="underline">đ</span>
            </div>
            <div className="text-12 font-400 line-through">
              {formatPrice(originalPrice)} <span className="underline">đ</span>
            </div>
          </div>
        </div>
        <span className="flex p-2 px-4 justify-center items-center gap-3 rounded-[32px] bg-teriaty">
          <button
            type="button"
            className="p-1 w-6 h-6"
            onClick={() => handleQuantityChange(quantity - 1)} // Giảm số lượng hoặc xóa nếu < 1
          >
            {deductIcon}
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            className="p-1 w-6 h-6"
            onClick={() => handleQuantityChange(quantity + 1)} // Tăng số lượng
          >
            {plusIcon}
          </button>
        </span>
      </div>
      <button
        type="button"
        className="flex p-2 justify-center items-center"
        onClick={onRemove}
      >
        {closeIcon}
      </button>
    </div>
  );
};

export default CartItem;
