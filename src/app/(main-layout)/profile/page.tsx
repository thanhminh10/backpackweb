"use client";
import {
  isLoggedInVar,
  userCartVar,
  userVar,
} from "@/constants/makevar/makeVar";
import { useApolloClient, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import useState
import ChangePassword from "./components/ChangePassword";
import Notifications from "./components/Notifications";
import Orders from "./components/Orders";
import Profileinfo from "./components/profileInfo/profileinfo";
import message from "@/components/notification/Notification";

function Profile() {
  const router = useRouter();
  const client = useApolloClient();
  const [activeTab, setActiveTab] = useState("account"); // State cho tab hiện tại
  const isLoggedIn = useReactiveVar(isLoggedInVar); // Get the logged-in status from reactive variable

 if(!isLoggedIn) {
      return null;
 }

  const handleLogout = async () => {
    localStorage.removeItem("token");
    await client.resetStore();
    router.push("/auth/login");
    userVar(undefined);
    isLoggedInVar(false);
    userCartVar([]);
  };

  return (
    <div className="inner-container bg-red">
      <div className="grid grid-cols-12 grid-rows-1 gap-9 py-6">
        <div className="col-span-3">
          <div className="flex w-[345px] p-[36px_48px] flex-col items-start flex-shrink-0 shadow-[0px_4px_20px_0px_rgba(194,194,194,0.50)]">
            <button
              onClick={() => setActiveTab("account")}
              className={`flex h-[48px] p-[4px_24px] items-center gap-2 self-stretch rounded-[12px] text-normal uppercase ${
                activeTab === "account" ? "bg-white" : ""
              }`}
            >
              Tài khoản
            </button>
            <button
              onClick={() => setActiveTab("changePassword")}
              className={`flex h-[48px] p-[4px_24px] items-center gap-2 self-stretch rounded-[12px] text-normal uppercase ${
                activeTab === "changePassword" ? "bg-white" : ""
              }`}
            >
              Đổi mật khẩu
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex h-[48px] p-[4px_24px] items-center gap-2 self-stretch rounded-[12px] text-normal uppercase ${
                activeTab === "orders" ? "bg-white" : ""
              }`}
            >
              Đơn hàng
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex h-[48px] p-[4px_24px] items-center gap-2 self-stretch rounded-[12px] text-normal uppercase ${
                activeTab === "notifications" ? "bg-white" : ""
              }`}
            >
              Thông báo
            </button>
            <button
              onClick={handleLogout}
              className="flex h-[48px] p-[4px_24px] items-center gap-2 self-stretch rounded-[12px] text-normal uppercase"
            >
              Đăng xuất
            </button>
          </div>
        </div>
        <div className="col-span-9 col-start-4">
          <div className="flex flex-col justify-center items-center gap-6 flex-1 p-9 bg-white shadow-[0px_4px_20px_0px_rgba(194,194,194,0.50)]">
            {activeTab === "account" && <Profileinfo />}
            {activeTab === "changePassword" && <ChangePassword />}
            {activeTab === "orders" && <Orders />}
            {activeTab === "notifications" && <Notifications />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
