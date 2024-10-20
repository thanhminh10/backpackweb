import SectionHeader from "@/components/sectionHeader/SectionHeader";

import { ggIconBlue } from "@/utils/icon/icon";
import Link from "next/link";
import RegisterForm from "./components/registerForm";


function Register() {
  return (
    <div className="bg-teriaty">
      <div className="inner-container flex items-center justify-center lg:py-9 lg:pb-[108px] lg:px-0 py-6 px-4">
        <div className="flex lg:w-[480px] w-full p-9 flex-col justify-center items-center gap-6 flex-shrink-0 bg-white shadow-[0px_4px_20px_0px_rgba(194,194,194,0.5)]">
          <SectionHeader title="Đăng ký" />

          <div className="flex items-center gap-4 self-stretch">
            <span className="text-normal">Bạn đã có tài khoản?</span>
            <Link
              href={"/auth/login"}
              className="text-normal uppercase text-primary-default"
            >
              Đăng nhập
            </Link>
          </div>

          <button className="btn uppercase border border-primary-default text-primary-default">
            {ggIconBlue}
            Đăng ký bằng Google
          </button>

          <div className="flex items-center gap-4 self-stretch">
            <div className="w-[168.5px] h-[1px] bg-[#E2E7EB]"></div>
            <span>Hoặc</span>
            <div className="w-[168.5px] h-[1px] bg-[#E2E7EB]"></div>
          </div>

          <RegisterForm />
        </div>
      </div>
     
    </div>
  );
}

export default Register;
