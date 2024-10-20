import {
  articlesIcon,
  contactIcon,
  downIcon,
  homeIcon,
  ProductListIcon,
  infoIcon,
} from "@/utils/icon/iconHover";
import { ICategory } from "@/interfaces/categories/getCategories";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { cartIcon, hamburgerIcon, logoIcon, userIcon } from "@/utils/icon/icon";
import { isLoggedInVar, userCartVar } from "@/constants/makevar/makeVar";
import { useReactiveVar } from "@apollo/client";
import { Routers } from "@/utils/router";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ICategory[];
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, categories }) => {
  const islogin =  useReactiveVar(isLoggedInVar)
  const userCardList = useReactiveVar(userCartVar); 

  const [logginSubMenu, setLogginSubMenu] = useState<boolean>(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const router = useRouter();

  const handleNavigation = (href: string) => {
    setTimeout(() => {
      router.push(href);
      onClose();
    }, 200); // Thay đổi khoảng thời gian tùy ý
  };

  const handleSubmenuToggle = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const handleLoginSubmenuToggle = () => {
    setLogginSubMenu(!logginSubMenu);
  };

  const items = [
    {
      label: "Sản phẩm",
      href: "/product-list",
      items:
        categories?.map((cate: ICategory) => ({
          label: cate?.name,
          href: `/product-list?_id=${cate?._id}`,
        })) || [],
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      <div className="flex lg:hidden flex-row items-center justify-between p-4 px-4 bg-primary-default">
        <div className="flex justify-between lg:hidden w-full inner-container items-center gap-4">
          <button onClick={onClose}>{hamburgerIcon}</button>

          {/* Đặt logo ở giữa */}
          <div className="flex-grow flex justify-center">
            <Link href={"/"}>{logoIcon}</Link>
          </div>

          <div className="relative flex justify-end items-center gap-3">
            {
              !islogin && 
            <button onMouseDown={() => handleLoginSubmenuToggle()}>
              {userIcon}
            </button>
            }

            {
              islogin
            && <Link href={Routers.profile.pathProfile}> {userIcon}</Link>
            }

            <Link href={Routers.cart.pathCart} className="flex gap-1">{cartIcon}
              <span className="text-white">({userCardList.length})</span>
            </Link>
            {logginSubMenu && (
              <div  className={`absolute top-10 right-0 flex w-[183px] p-3.5 flex-col items-start rounded-[12px] bg-white shadow-[0px_4px_20px_0px_rgba(194,194,194,0.50)] z-50
                transition-transform  duration-300 ease-in-out transform ${
                  logginSubMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                <Link
                  href={"/auth/login"}
                  onClick={() => {
                    setTimeout(() => {
                      handleLoginSubmenuToggle();
                    }, 200);
                  }}
                  className="flex h-[48px] p-[4px_24px] items-center gap-2 self-stretch hover:text-primary-default hover:bg-[#EBF4F6] rounded-full text-normal uppercase"
                >
                  Đăng nhập
                </Link>

                <Link
                  href={"/auth/register"}
                  onClick={() => {
                    setTimeout(() => {
                      handleLoginSubmenuToggle();
                    }, 200);
                  }}
                  className="flex h-[48px] p-[4px_24px] items-center gap-2 self-stretch  hover:text-primary-default hover:bg-[#EBF4F6] rounded-full text-normal uppercase"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
          {/* Drawer Body */}
          <div
            className={`fixed top-0 left-0 h-full md:w-3/4 w-3/4 bg-white z-50 transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } overflow-y-auto`}
          >
            <div className="flex h-[80px] py-6 flex-col justify-center items-center gap-4 flex-shrink-0 self-stretch bg-primary-default">
              {logoIcon}
            </div>
            <div className="p-6 relative py-[24px]">
              <nav>
                <a
                  className="sidebar_item group flex items-center gap-2 px-5 py-[10px] text-16 leading-4 border-b border-light-gray hover:rounded-full hover:text-primary-default hover:bg-[#EBF4F6]"
                  onClick={() => handleNavigation("/")}
                >
                  {homeIcon}
                  Trang Chủ
                </a>

                <a
                  className="sidebar_item group flex items-center gap-2 px-5 py-[10px] text-16 leading-4 border-b border-light-gray hover:rounded-full hover:text-primary-default hover:bg-[#EBF4F6]"
                  onClick={() => handleNavigation("/")}
                >
                  {infoIcon}
                  Giới thiệu
                </a>
                <div className="sidebar_item group pl-0 text-16 leading-4 hover:rounded-8">
                  <div className="relative">
                    <div
                      className="flex group-hover:bg-[#EBF4F6] group-hover:text-primary-default items-center justify-between gap-2 px-5 py-[10px] text-16 leading-4 border-b border-light-gray cursor-pointer hover:rounded-8"
                      onClick={() => handleSubmenuToggle("Sản phẩm")}
                    >
                      <span className="flex gap-2 items-center">
                        {ProductListIcon}
                        Sản phẩm
                      </span>
                      {downIcon}
                    </div>
                    {openSubmenu === "Sản phẩm" && (
                      <div className="pl-5">
                        {items[0].items?.map((item, index) => (
                          <a
                            key={index}
                            className="block p-3 px-2 pl-[40px] transition-colors duration-300 ease-in-out text-normal  hover:rounded-8 hover:text-primary-default hover:bg-[#EBF4F6]"
                            onClick={() => handleNavigation(item.href)}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <a
                  className="sidebar_item group flex items-center gap-2 px-5 py-[10px] text-16 leading-4 border-b border-light-gray hover:rounded-full hover:text-primary-default hover:bg-[#EBF4F6]"
                  onClick={() => handleNavigation("/articles")}
                >
                  {articlesIcon}
                  Bài Viết
                </a>
                <a
                  className="sidebar_item group flex items-center gap-2 px-5 py-[10px] text-16 leading-4 border-b border-light-gray hover:rounded-full hover:text-primary-default hover:bg-[#EBF4F6]"
                  onClick={() => handleNavigation("/contact-form")}
                >
                  {contactIcon}
                  Liên Hệ
                </a>
              </nav>
              <div className="flex flex-col gap-3 py-12 border-b border-black-20">
                <p className="text-2xl font-light">Liên kết</p>
                <a
                  className="text-primary"
                  href=""
                  onClick={() => handleNavigation("")}
                >
                  Lazada.vn
                </a>
                <a
                  className="text-primary"
                  href=""
                  onClick={() => handleNavigation("")}
                >
                  Facebook.com
                </a>
                <a
                  className="text-primary"
                  href=""
                  onClick={() => handleNavigation("")}
                >
                  backpack.vn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
