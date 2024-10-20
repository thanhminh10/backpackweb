import Image from "next/image";
import React from "react";

interface Brand {
  id: number; // Hoặc string, tùy thuộc vào cách bạn quản lý ID
  name: string;
  logo: string; // Đường dẫn hình ảnh của logo
}

interface BrandListSuggestProps {
  brands: Brand[]; // Danh sách các thương hiệu
}
function BrandListSuggest({ brands }: BrandListSuggestProps) {
  return (
    <div className="flex items-start content-start gap-6 self-stretch flex-wrap">
      {brands.map((brand,index) => (
        <div
          key={index} // Sử dụng id hoặc một thuộc tính duy nhất
          className="relative h-[85px] bg-lightgray bg-cover bg-no-repeat bg-white"
          style={{ width: "calc(50% - 24px)" }}
        >
          <Image
            src={brand.logo}
            alt={brand.name}
            layout="fill"
            className="absolute top-0 left-0 object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export default BrandListSuggest;
