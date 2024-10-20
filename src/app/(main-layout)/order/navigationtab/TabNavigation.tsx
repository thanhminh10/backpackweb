import React from "react";

interface TabNavigationProps {
  activeTab: "order" | "summary";
  setActiveTab: (tab: "order" | "summary") => void;
  isFormValid: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  isFormValid,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 self-stretch border-b border-neutral-gray-20">
      <div
        className={`flex justify-center items-center gap-[10px] py-2 pb-4 
          ${activeTab === "order" ? "border-b border-[#5C5F61]" : ""}`}
        onClick={() => setActiveTab("order")}
      >
        <div
          className={`text-normal uppercase  ${
            activeTab === "order" ? "text-neutral-gray-80" : "text-neutral-gray-40"
          }`}
        >
          Thông tin
        </div>
      </div>
      <div
        className={`flex justify-center items-center gap-[10px] py-2 pb-4 
          ${activeTab === "summary" ? "border-b border-[#5C5F61]" : ""}`}
        onClick={() => {
          if (isFormValid) {
            setActiveTab("summary");
          }
        }}
      >
        <div
          className={`text-normal uppercase  ${
            activeTab === "summary" ? "text-neutral-gray-80" : "text-neutral-gray-40"
          }`}
        >
          Kiểm tra và đặt hàng
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
