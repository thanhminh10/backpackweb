import SectionHeader from "@/components/sectionHeader/SectionHeader";
import React from "react";
import LoginForm from "./components/loginForm";
import Link from "next/link";
import { ggIconBlue } from "@/utils/icon/icon";
import PromotionsSection from "@/components/promotionsSection/PromotionsSection";

function Login() {
  return (
    <div className="bg-teriaty">
      <div className="inner-container flex items-center justify-center lg:py-9 lg:pb-[108px] lg:px-0 py-6 px-4">
        <div className="flex lg:w-[480px] w-full p-9 flex-col justify-center items-center gap-6 flex-shrink-0 bg-white shadow-[0px_4px_20px_0px_rgba(194,194,194,0.5)]">
          <SectionHeader title="Đăng nhập" />

          <div className="flex items-center gap-4 self-stretch">
            <span className="text-normal">Bạn chưa có tài khoản?</span>
            <Link
              href={"/auth/register"}
              className="text-normal uppercase text-primary-default"
            >
              Đăng ký
            </Link>
          </div>

          <button className="btn uppercase border border-primary-default text-primary-default">
            {ggIconBlue}
            Đăng nhập bằng Google
          </button>

          <div className="flex items-center gap-4 self-stretch">
            <div className="w-[168.5px] h-[1px] bg-[#E2E7EB]"></div>
            <span>Hoặc</span>
            <div className="w-[168.5px] h-[1px] bg-[#E2E7EB]"></div>
          </div>
          <LoginForm />
        </div>
      </div>
     
    </div>
  );
}

export default Login;
