import { isLoggedInVar, userCartVar, userVar } from "@/constants/makevar/makeVar";
import { cartIcon, userIcon } from "@/utils/icon/icon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReactiveVar } from "@apollo/client";

const UserActions: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const user = useReactiveVar(userVar);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  const totalCartItem =  useReactiveVar(userCartVar)
  
  // Lấy thông tin từ localStorage khi component được mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("userInfo") || "null");

    if (token && storedUser) {
      userVar(storedUser);  // Khôi phục thông tin user
      isLoggedInVar(true);  // Đặt trạng thái đã đăng nhập
    }

    setLoading(false);  // Đặt loading về false khi hoàn tất khởi tạo
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Hiển thị loading khi đang khởi tạo
  }

  return (
    <div className="flex items-center gap-4">
      {isLoggedIn ? (
        <>
          <Link href={"/profile"} className="btn py-3 px-0">
            {userIcon}
            {user?.userName ?? "User"}  {/* Hiển thị tên người dùng nếu có */}
          </Link>
        </>
      ) : (
        <>
          <Link href={"/auth/login"} className="btn py-3 px-0">
            Đăng nhập
          </Link>
          <Link href={"/auth/register"} className="btn py-3 px-0">
            Đăng ký
          </Link>
        </>
      )}
      <Link href={"/cart"} className="relative btn py-3 px-0">{cartIcon} Giỏ hàng  
      ({totalCartItem.length})
      </Link>
    </div>
  );
};

export default UserActions;
