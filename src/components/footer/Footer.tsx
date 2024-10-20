"use client";
import { fbIcon, ggIcon } from "@/utils/icon/icon";
import {
  articlesIcon,
  contactIcon,
  infoIcon,
  menuIcon,
} from "@/utils/icon/icondefine";
import { Routers } from "@/utils/router";
import Image from "next/image";
import Link from "next/link";
import PromotionsSection from "../promotionsSection/PromotionsSection";

export function SocialIcon(props: any) {
  return (
    <Image
      style={{
        filter:
          "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(191deg) brightness(104%) contrast(104%)",
      }}
      src={props?.url}
      alt={props?.name}
      width={24}
      height={24}
    />
  );
}

export default function Footer() {
  return (
    <div>
      <PromotionsSection />
      <footer className="text-white bg-primary-default">
        <div className="">
          <div className="flex flex-col lg:gap-6 gap-4 lg:py-6 py-8 px-4">
            <div className="flex flex-wrap flex-col justify-center lg:justify-center items-center gap-4">
              <Link href={Routers.home.pathHome}>
                <h1 className="text-[32px] font-700">BACKPACK</h1>
              </Link>
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-0 lg:gap-4 text-center">
                <div className="flex gap-6 justify-center">
                  <div className="flex h-[48px] py-2 lg:p-[12px_24px] justify-center items-center gap-[4px]">
                    {menuIcon}
                    <Link
                      href={"/product-list/latest-product"}
                      className="text-white uppercase"
                    >
                      Sản phẩm
                    </Link>
                  </div>
                  <div className="flex h-[48px] py-2 lg:p-[12px_24px] justify-center items-center gap-[4px]">
                    {infoIcon}
                    <Link
                      href={Routers.introduce.pathintroduce}
                      className="text-white uppercase"
                    >
                      Giới thiệu
                    </Link>
                  </div>
                </div>
                <div className="flex gap-6 justify-center">
                  <div className="flex h-[48px] py-2 lg:p-[12px_24px] justify-center items-center gap-[4px]">
                    {articlesIcon}
                    <Link
                      href={Routers.article.pathArticle}
                      className="text-white uppercase"
                    >
                      Bài viết
                    </Link>
                  </div>
                  <div className="flex h-[48px] py-2 lg:p-[12px_24px] justify-center items-center gap-[4px]">
                    {contactIcon}
                    <Link
                      href={Routers.contact.pathContact}
                      className="text-white uppercase"
                    >
                      Liên Hệ
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-[5px]">
                <span>{fbIcon}</span>
                <span>{ggIcon}</span>
              </div>
            </div>
            <div className="border-t border-[#C1C7CD] w-full"></div>
            <div className="flex lg:flex-wrap flex-wrap-reverse justify-center lg:justify-center items-center gap-4">
              <p className="text-[14px] font-normal leading-[19.6px] lg:text-left sm:text-center">
                {process.env.NEXT_PUBLIC_COMPANY_INFO}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
