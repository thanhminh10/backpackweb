import { viewMoreRightIcon } from "@/utils/icon/icondefine";
import Link from "next/link";
import { ReactElement } from "react";

interface SectionHeaderProps {
  title: string;
  href?: string;
  showSort?: boolean;
  showProductCount?: boolean;
  productCount?: number;
  sortComponent?: ReactElement;
  headerTitleSize?: number;
  SectionString?: string;
  suggestItem?: boolean;
}

export default function SectionHeader({
  title,
  href,
  showSort = false,
  showProductCount = false,
  productCount = 0,
  sortComponent,
  SectionString = "sản phẩm",
  suggestItem = false,
}: SectionHeaderProps) {
  return suggestItem === false ? (
    <div className="flex lg:flex justify-between lg:justify-between items-center gap-9 w-full">
      <div className="flex gap-[36px] items-center">
        <div className="flex flex-col pt-1 pb-2 items-start gap-3">
          <p
            className={`header_title_section text-left block lg:text-center text-[26px] font-500  text-neutral-title`}
          >
            {title}
          </p>
          <span className="w-[72px] h-[1px] border-[1px] border-neutral-gray-80"></span>
        </div>
        {showProductCount && (
          <i className="hidden lg:flex flex-col text-primary text-right items-end">
            {productCount} {SectionString}
          </i>
        )}
      </div>
      {showProductCount && (
        <i className="flex lg:hidden flex-col text-primary text-right items-end">
          {productCount} {SectionString}
        </i>
      )}
      {!showSort && href && (
        <Link
          className="hidden lg:flex items-center px-6 py-3 text-base justify-center gap-1 rounded-full border border-primary-default text-primary-default uppercase"
          href={href}
        >
          Xem thêm
          {viewMoreRightIcon}
        </Link>
      )}

      {showSort && sortComponent && (
        <div className="flex items-center">
          {sortComponent} {/* Hiển thị component sort được truyền vào */}
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-start gap-2 self-stretch flex-col">
      <div className="text-[#2D2E2F] text-center font-medium text-[20px] leading-[28px]">
        {title}
      </div>
      <span className="bg-[#2D2E2F] w-full h-[1px]">
       
      </span>
    </div>
  );
}
