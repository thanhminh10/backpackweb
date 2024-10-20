import Image from "next/image";
import React from "react";

interface CateCartProps {
  imageSrc: string;
  altText: string;
  label: string;
}

function CateCart({ imageSrc, altText, label }: CateCartProps) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <Image src={imageSrc} alt={altText} width={180} height={240} />
      <p className="text-normal leading-[140%] uppercase text-center text-[#2D2E2F]">
        {label}
      </p>
    </div>
  );
}

function CateListSection() {
  const categories = [
    {
      imageSrc: "/assets/img/DefaultCate.png",
      altText: "cateImg",
      label: "Balo laptop",
    },
    {
      imageSrc: "/assets/img/DefaultCate.png",
      altText: "cateImg",
      label: "Balo máy ảnh",
    },
    {
      imageSrc: "/assets/img/DefaultCate.png",
      altText: "cateImg",
      label: "Balo thể thao",
    },
    {
      imageSrc: "/assets/img/DefaultCate.png",
      altText: "cateImg",
      label: "Balo du lịch",
    },
    {
      imageSrc: "/assets/img/DefaultCate.png",
      altText: "cateImg",
      label: "Máy ảnh",
    },
    {
      imageSrc: "/assets/img/DefaultCate.png",
      altText: "cateImg",
      label: "Balo Một Quai",
    },
  ];

  return (
    <div className="bg-teriaty">
      <div className="inner-container">
        <div className="grid grid-cols-2 gap-4 md:gap-4 lg:gap-[24px] py-6 px-4 lg:p-[36px] sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-6">
          {categories.map((category, index) => (
            <CateCart
              key={index}
              imageSrc={category.imageSrc}
              altText={category.altText}
              label={category.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CateListSection;
