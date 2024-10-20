
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import React, { useState } from "react";

function EmailForm() {
    const [loading, setLoading] = useState(false);

  return (
    <div className="flex lg:w-[480px] w-full p-9 flex-col justify-center items-center gap-6 flex-shrink-0 bg-white shadow-[0px_4px_20px_0px_rgba(194,194,194,0.5)]">
      <SectionHeader title="Quên mật khẩu" />
      <div className="flex items-center gap-4 self-stretch">
        <span className="text-normal">Nhập email của bạn để nhận mã OTP</span>
      </div>
      <div className="input_wrapper">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Nhập email"
          className="input_base bg-teriaty"
          
        />
      </div>
      <button
        className="btn bg-primary-default text-white uppercase"
        disabled={loading}
      >
        {"Đăng nhập"}
      </button>
    </div>
  );
}

export default EmailForm;
