import message from "@/components/notification/Notification";
import { formatPrice } from "@/constants";
import { CREATE_CART } from "@/graphql/cart/cart";
import { IProduct } from "@/interfaces/product/product";
import { fetchUserCart } from "@/lib/fetchUserInfo";
import { userCartVar } from "@/constants/makevar/makeVar";
import {
  bagIcon,
  colorlessStar,
  deductIcon,
  plusIcon,
  primaryCardIcon,
} from "@/utils/icon/icon";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Routers } from "@/utils/router";
import { SHOP_ID } from "@/constants/enviroment";

type Props = {
  product: IProduct;
};

const ProductDetails = ({ product }: Props) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const remaining_quantity = product.quantity;

  const [mutationCreateCard] = useMutation(CREATE_CART);
  const handleCreateCard = async (prodId: string, quantity: number) => {
    try {
      const { data } = await mutationCreateCard({
        variables: { prodId, quantity ,shopId: SHOP_ID },
      });
      if (data?.createCart?.success) {
        message.success("Sản phẩm đã được thêm vào giỏ hàng");
        const newData = await fetchUserCart();
        userCartVar(newData);
      } else {
        message.error("Thêm sản phẩm vào giỏ hàng thất bại!");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  return (
    <div className="flex flex-col items-start gap-6 flex-[1_0_0] w-full">
      <div className="flex items-center gap-4">
        {product.hot && (
          <div className="flex justify-center items-center w-[48px] h-[48px] flex-shrink-0 bg-semantics-warning text-white rounded-full z-50">
            Hot
          </div>
        )}
        <div className="flex h-[40px] py-2 justify-center items-center gap-1">
          {colorlessStar}
          {product.ratingCount}
        </div>
        <div className="flex items-center justify-center text-normal uppercase gap-2 lg:gap-2">
          {bagIcon}
          <span className="lg:text-16 text-14 text-card-title-color">
            {product.quantity}
          </span>{" "}
          Đã bán
        </div>
      </div>

      <h1 className="text-[#2D2E2F] text-[20px] font-normal leading-[140%] uppercase">
        {product.name}
      </h1>

      <div className="flex items-start gap-3 self-stretch">
        <span className="w-[122px] text-normal">Thương hiệu:</span>
        <span className="text-normal text-primary-default">
          {product.brand.name}
        </span>
      </div>
      <div className="flex items-start gap-3 self-stretch">
        <span className="w-[122px] text-normal">Tình trạng</span>
        <span
          className={`text-normal ${
            remaining_quantity > 0
              ? "text-primary-default"
              : "text-neutral-gray-60"
          }`}
        >
          {remaining_quantity > 0 ? "Còn hàng" : "hết hàng"}
        </span>
      </div>

      <div className="flex items-start gap-3 self-stretch">
        <span className="w-[122px] text-normal">Số lượng</span>
        <span className="flex p-2 px-4 justify-center items-center gap-3 rounded-[32px] bg-white">
          <button
            className="p-1 w-6 h-6"
            onClick={() => setQuantity(Math.max(quantity - 1, 1))}
          >
            {deductIcon}
          </button>
          <span>{quantity}</span>
          <button
            className="p-1 w-6 h-6"
            onClick={() => setQuantity(quantity + 1)}
          >
            {plusIcon}
          </button>
        </span>
      </div>

      <div className="flex h-[28px] items-center gap-4 self-stretch">
        <p className="text-[20px] lg:text-[20px] font-400 leading-[26px] text-left text-primary-default-default break-words">
          {`${formatPrice(product.price)}`}
          <span className="underline py-0 px-1.5">đ</span>
        </p>
        <span className="hidden lg:flex items-center line-through text-12 font-400">
          {`${formatPrice(product.price)}`}
          <span className="underline py-0 px-1.5">đ</span>
        </span>
      </div>

      <div className="flex flex-col items-start gap-6 w-full">
        <button 
        onClick={() =>{ 
          
          router.push(Routers.cart.pathCart)
          handleCreateCard(product._id, quantity)
        }}
        
        className="btn-lg bg-primary-default text-white uppercase">
          Mua Hàng ngay
        </button>
        <button
          className="btn-lg text-primary-default-default border border-primary-default uppercase"
          onClick={() => handleCreateCard(product._id, quantity)}
        >
          {primaryCardIcon} Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
