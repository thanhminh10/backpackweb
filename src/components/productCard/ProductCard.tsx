import { formatPrice, RemoveLink, Strip } from "@/constants";
import { IProduct } from "@/interfaces/product/productDetails";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DisplayStars from "../renderStars/DisplayStars";

interface ProductCardProps {
  product: IProduct;
  col?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, col }) => {
  // Parse the rating count if it's a string or set a default of 0
  const ratingCount = parseFloat(product.ratingCount || "0");
  return col !== 1 ? (
    <div key={123} className="max-w-full min-w-full overflow-hidden bg-white">
      <Link href={`/product-detail/${product?.slug}`}>
        <div className="relative aspect-square">
          {product?.hot && (
            <div
              style={{
                transform: "rotate(-21.832deg)",
                filter: "drop-shadow(0px 4px 20px rgba(194, 194, 194, 0.50))",
              }}
              className="absolute top-2 left-2 flex justify-center items-center w-[48px] h-[48px] flex-shrink-0 bg-semantics-warning text-white rounded-full z-50"
            >
              Hot
            </div>
          )}
          <Image
            priority
            sizes="100vw"
            className="border border-white"
            style={{
              objectFit: "cover",
              position: "absolute",
              width: "100%",
              height: "100%",
              left: "0",
              right: "0",
              top: "0",
              bottom: "0",
            }}
            src={
              product?.image?.[0]?.url
                ? RemoveLink(product?.image?.[0]?.url)
                : "/assets/img/product-default.jpg"
            }
            alt={`image ${product?.name}`}
            fill
          ></Image>
        </div>
        <div className="grid h-auto gap-2 p-4 lg:p-6">
          {/* Tên sản phẩm: Giới hạn hiển thị bằng line-clamp để không vượt quá card */}
          <h2 className="text-[16px] font-400 leading-6 text-card-title-color line-clamp-2 text-left overflow-hidden min-h-[48px]">
            {product?.name}
          </h2>

          {/* Giá sản phẩm: Sử dụng break-word để kiểm soát nội dung quá dài */}
          <div className="flex justify-between items-center">
            <p className="text-[20px] lg:text-[20px] font-400 leading-[26px] text-left text-primary-default break-words">
              {`${formatPrice(product?.price)}`}
              <span className="underline py-0 px-1.5">đ</span>
            </p>
            <span className="hidden lg:flex line-through text-12 font-400">
              {`${formatPrice(product?.price)}`}
              <span className="underline py-0 px-1.5">đ</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <div className="flex flex-row">
      <Link className="flex flex-row" href={`/product-detail/${product?.slug}`}>
        <div className="relative w-[130px] h-[130px] bg-[#D9D9D9] shrink-0">
          <Image
            src={
              product?.image[0]
                ? RemoveLink(product?.image[0].url)
                : "/assets/img/guitar_default.png"
            }
            alt={product?.name}
            layout="fill"
            className="absolute top-0 left-0 object-cover"
          />
        </div>

        <div className="flex flex-col p-2 items-start gap-2 flex-1">
          <DisplayStars rating={Number(ratingCount)}/>
          <div
            className="overflow-hidden text-[#2D2E2F] text-ellipsis font-normal text-[16px] leading-[140%] uppercase"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              overflowWrap: "break-word",
            }}
          >
            {product?.name}
          </div>

          {/* Nội dung */}
          <div className="text-normal text-primary">
            {formatPrice(product?.price)} <span className="undeline">đ</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
