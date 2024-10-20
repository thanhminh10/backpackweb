"use client";
import { RemoveLink } from "@/constants";
import { SHOP_ID } from "@/constants/enviroment";
import { GetBannersGQL } from "@/graphql/banner/getBanner";
import { IBannerResponse } from "@/interfaces/banners";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

interface CustomSwiperProps {
  w?: number;
  h?: number;
  hmb?: number;
  OpennextPrebtn?: boolean;
  bg?: string;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({
  h = 400,
  hmb = 233,
  OpennextPrebtn = false,
  bg = "white",
}) => {
  const {
    data: banner,
    loading: bannerLoading,
    error: bannerError,
  } = useQuery<IBannerResponse>(GetBannersGQL, {
    variables: {
      shopId: SHOP_ID,
      active: true,
      orderBy: {
        active: 1,
        title: 1,
      },
    },
  });

  const slides = Array.isArray(banner?.banners)
    ? banner?.banners.map((banner) => ({
        imageUrl: banner.imageUrl,
      }))
    : []; 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      return (prevIndex + 1) % slides.length;
    });
  };
  const handleIndicator = (index: number) => {
    setCurrentIndex(index);
  };
  const handlePre = () => {
    setCurrentIndex((prevIndex) => {
      return (prevIndex - 1 + slides.length) % slides.length;
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  const handleMouseDown = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ) => {
    const clientX =
      e.type === "mousedown"
        ? (e as React.MouseEvent).clientX
        : (e as React.TouchEvent).touches[0].clientX;
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ) => {
    if (isDragging) {
      const clientX =
        e.type === "mousemove"
          ? (e as React.MouseEvent).clientX
          : (e as React.TouchEvent).touches[0].clientX;
      const offsetX = clientX - startX;
      if (Math.abs(offsetX) > 50) {
        if (offsetX < 0) {
          handleNext();
        } else {
          handlePre();
        }
        setStartX(clientX);
        setIsDragging(false);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  let backgroundImage = "";

  if (
    slides[currentIndex] &&
    typeof slides[currentIndex].imageUrl === "string" &&
    slides[currentIndex].imageUrl.trim() !== ""
  ) {
    backgroundImage = RemoveLink(slides[currentIndex].imageUrl);
  } else {
    // Xử lý trong trường hợp không có imageUrl hợp lệ
    console.log("Invalid imageUrl");
  }

  return (
    <div style={{ backgroundColor: `${bg}` }}>
      <div className="inner-container">
        <div
          className={`banner-wrapper w-full m-auto rounded-none lg:rounded-2xl relative  ${
            hmb ? `md:h-[${hmb}px]` : "md:h-[500px]"
          } ${h ? `lg:h-[${h}px]` : "lg:h-[500px]"}`}
          style={{ height: `${h}px` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Left Arrow */}
          {OpennextPrebtn ? (
            <>
              <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <span onClick={handlePre}>‹</span>
              </div>
              <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <span onClick={handleNext}>›</span>
              </div>
            </>
          ) : null}

          <div
            style={{ backgroundImage: `url(${backgroundImage})` }}
            className={`w-full h-full  bg-center bg-cover lg:duration-1000 duration-200 cursor-grab`}
          ></div>
          <div className="absolute bottom-[1px] left-1/2 justify-center py-2 hidden">
            {slides.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => handleIndicator(slideIndex)}
                className={`text-2xl cursor-pointer ${
                  slideIndex === currentIndex ? "text-primary" : "text-gray-500"
                }`}
              >
                •
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSwiper;
