import { RemoveLink } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";

interface ProductImagesProps {
  mainImage: any;
  thumbnails: any[];
}

const ProductImages: React.FC<ProductImagesProps> = ({
  mainImage,
  thumbnails,
}) => {
  
  const mainImg = mainImage?.url ? RemoveLink(mainImage?.url) : '';
  const [selectedImage, setSelectedImage] = useState<string>(mainImg);

  return (
    <div className="flex flex-col gap-[14px] lg:gap-[29px] lg:w-[547px] w-full">
      <div className="relative lg:h-[550px] h-[360px] w-full mx-auto self-stretch">
        <Image
          src={
            selectedImage
              ? RemoveLink(selectedImage)
              : "/assets/img/product-default.jpg"
          }
          alt="Main Product"
          layout="fill"
          objectFit="contain"
          className="absolute top-0 left-0 bottom-0 right-0"
        />
      </div>
      <div className="flex w-full lg:justify-start lg:items-start justify-center items-center flex-wrap gap-2">
        {thumbnails.map((thumbnail, index) => (
          <div key={index} className="relative lg:w-[120px] lg:h-[120px] w-[80px] h-[80px] flex-shrink-0 border border-[#E7EAEC]">
            <Image
              src={
                thumbnail?.url
                  ? RemoveLink(thumbnail?.url)
                  : "/assets/img/product-default.jpg"
              }
              alt={`Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
              onClick={() => setSelectedImage(RemoveLink(thumbnail?.url))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
