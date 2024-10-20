import { sendIcon } from "@/utils/icon/icon";
import React from "react";

function PromotionsSection() {
  return (
    <div className="flex py-4 justify-center items-center gap-4 lg:gap-18 self-stretch bg-[#EBF4F6] flex-col lg:flex-row">
      <span className="text-normal text-primary">
        Nhận thông tin khuyến mãi mới nhất
      </span>
      <div className="flex w-[400px] h-[48px] px-4 justify-between items-center rounded-[36px] border border-[var(--Primary-Color-Dark,#04547C)]">
        <input
          type="email"
          className="w-full h-full outline-none border-none bg-transparent px-2 placeholder:italic"
          placeholder="Nhập email"
        />
        <button>{sendIcon}</button>
      </div>
    </div>
  );
}

export default PromotionsSection;
