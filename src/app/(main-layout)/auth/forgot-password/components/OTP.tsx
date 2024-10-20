"use client";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import React, { useState } from "react";

function OTP() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="flex lg:w-[480px] w-full p-9 flex-col justify-center items-center gap-6 flex-shrink-0 bg-white shadow-[0px_4px_20px_0px_rgba(194,194,194,0.5)]">
        <SectionHeader title="Quên mật khẩu" />
        <div className="flex items-center gap-4 self-stretch">
          <span className="text-normal">
            Mã OTP đã được gửi vào gmail của bạn. Nhập mã OTP
          </span>
        </div>
        
        <div className="flex py-2 justify-center items-start gap-4 self-stretch">
          <input className="w-[60px] h-[60px] rounded-[12px] bg-[#E7EAEC] text-center" />
          <input className="w-[60px] h-[60px] rounded-[12px] bg-[#E7EAEC] text-center" />
          <input className="w-[60px] h-[60px] rounded-[12px] bg-[#E7EAEC] text-center" />
          <input className="w-[60px] h-[60px] rounded-[12px] bg-[#E7EAEC] text-center" />
        </div>
        <button
          className="btn bg-primary-default text-white uppercase"
          disabled={loading}
        >
          {"Đăng nhập"}
        </button>
        <div className="flex items-center gap-4 self-stretch">
            <span className="text-normal">Chưa nhận được mã OTP?</span>
            <button type="button" className="text-normal text-primary-default uppercase">Gửi lại</button>
        </div>
      </div>
    </div>
  );
}

export default OTP;
