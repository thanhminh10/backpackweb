"use client";
import { GET_CATEGORIES } from "@/graphql/category/getCategories";
import { ICategoryResponse } from "@/interfaces/categories/getCategories";

import {
  articlesIcon,
  contactIcon,
  DownIcon,
  homeIcon,
  infoIcon,
  menuIcon,
} from "@/utils/icon/icondefine";
import { Routers } from "@/utils/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Drawer from "./components/Drawer";
import Search from "./components/Search";
import UserActions from "./components/UserActions";
import { SHOP_ID } from "@/constants/enviroment";
import { useFetchUserInfo } from "@/constants/hooks/useFetchUserInfo";

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Curl up when the drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden"); // Cleanup khi component bị unmount
    };
  }, [isDrawerOpen]);

  const { data, error } = useQuery<ICategoryResponse>(GET_CATEGORIES, {
    variables: {
      pageSize: 20,
      pageIndex: 1,
      active: true,
      shopId: SHOP_ID,
      orderBy: {
        sort: -1,
      },
    },
  });
  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  useFetchUserInfo();
  return (
    <header className="items-center relative z-10">
      <div className="hidden lg:flex items-center relative justify-center h-[96px] bg-primary-default container">
        <div className="inner-container tablet:px-6 flex text-white justify-between items-center">
          <div className="flex justify-between items-center gap-6">
            <Link href={Routers.home.pathHome}>
              <h1 className="text-[32px] font-700">BACKPACK</h1>
            </Link>
            <div className="flex items-center w-full h-8 text-sm pt-1 pb-1 pl-0 pr-4">
              <Link
                className="flex items-center text-normal text-white gap-2 btn-header uppercase"
                href={Routers.home.pathHome}
              >
                {homeIcon}
                Trang chủ
              </Link>
              <div className="flex items-center gap-4 transition-all h-[36px] z-50">
                <div
                  className="relative flex items-center text-normal text-white gap-2 btn-header uppercase group"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <p className="flex items-center gap-2 text-normal text-white">
                    {menuIcon}
                    <span className="text-normal leading-4 text-white">
                      Sản phẩm
                    </span>
                    {DownIcon}
                  </p>

                  {/* Tạo wrapper cho nút và sub menu */}
                  <div className="absolute inset-0 -top-[16px] -left-[16px] w-[calc(100%+48px)] h-[calc(100%+48px)] z-50"></div>
                  {isDropdownVisible && (
                    <div className="absolute  gap-4 p-5 transition-all bg-white rounded-lg shadow-2xl group-hover:grid  group-hover:grid-cols-3 top-16 left-0 w-max z-50">
                      {data?.categories?.data?.map((category, index) => (
                        <Link
                          className="flex items-center justify-start py-1 px-6 h-12 text-normal rounded-full transition-colors duration-300 hover:text-primary-default hover:bg-[#EBF4F6]"
                          href={{
                            pathname: `/product-list/`,
                            query: { _id: category._id },
                          }}
                          key={index}
                        >
                          {category?.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <Link
                className="flex items-center text-normal text-white gap-2 btn-header uppercase"
                href={Routers.introduce.pathintroduce}
              >
                {infoIcon}
                Giới thiệu
              </Link>
              <Link
                className="flex items-center text-normal text-white gap-2 btn-header uppercase"
                href={Routers.article.pathArticle}
              >
                {articlesIcon}
                Bài viết
              </Link>
              <Link
                className="flex items-center text-normal text-white gap-2 btn-header uppercase"
                href="/contact-form"
              >
                {contactIcon}
                Liên hệ
              </Link>
            </div>
          </div>
          <UserActions />
        </div>
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        categories={data?.categories?.data ?? []}
      ></Drawer>
      <div className="container mx-auto bg-teriaty">
        <section className="inner-container">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between py-4 px-4 lg:px-0">
            <div className="flex items-center gap-4 lg:gap-6 justify-between">
              <div className="flex py-1 px-2 lg:py-2 lg:px-[20px] rounded-[24px] bg-white text-12 font-400">
                Balo nam
              </div>
              <div className="flex py-1 px-2 lg:py-2 lg:px-[20px] rounded-[24px] bg-white text-12 font-400">
                Balo Nữ
              </div>

              <div className="flex py-1 px-2 lg:py-2 lg:px-[20px] rounded-[24px] bg-white text-12 font-400">
                Balo Đen
              </div>

              <div className="flex py-1 px-2 lg:py-2 lg:px-[20px] rounded-[24px] bg-white text-12 font-400">
                Túi chống xóc laptop
              </div>
              <div className="hidden lg:flex py-1 px-2 lg:py-2 lg:px-[20px] rounded-[24px] bg-white text-12 font-400">
                Túi du lịch
              </div>
            </div>
            <div className="flex-grow  max-w-full lg:max-w-[40%]">
              <Search />
            </div>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header;
