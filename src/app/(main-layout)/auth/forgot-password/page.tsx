import PromotionsSection from "@/components/promotionsSection/PromotionsSection";
import EmailForm from "./components/EmailForm";
import OTP from "./components/OTP";
import NewPassword from "./components/NewPassword";

export default function FogotPassWord() {
  return (
    <div className="bg-teriaty">
      <div className="inner-container flex items-center justify-center lg:py-9 lg:pb-[108px] lg:px-0 py-6 px-4">
        <NewPassword />
      </div>
     
    </div>
  );
}
