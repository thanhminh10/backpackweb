import { rocketImg, rollbackImg, settingImg, shieldImg } from "@/utils/img";
import React from "react";

function OurServices() {
  return (
    <div className=" bg-teriaty">
      <div className="inner-container">
        <div className='px-3 py-4 lg:px-[80px] lg:py-6 bg-[linear-gradient(0deg,rgba(255,255,255,0.80)_0%,rgba(255,255,255,0.80)_100%),url("/assets/img/background.jfif")] bg-[length:100%_600%] bg-[0_-3.676px] bg-lightgray bg-no-repeat'>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="flex max-w-[300px] w-auto p-0 lg:p-6 items-center gap-2 lg:gap-6 flex-shrink-0">
              <span className="w-6 h-6 lg:w-12 lg:h-12 overflow-hidden">{rocketImg}</span>
              <div className="flex flex-col">
                <h3 className="text-normal text-neutral-gray-80">
                  Freeship toàn quốc
                </h3>
                <span className="text-normal text-primary-default uppercase">
                  Đơn từ 500.000 đ
                </span>
              </div>
            </div>

            <div className="flex max-w-[300px] w-auto p-0 lg:p-6 items-center gap-2 lg:gap-6 flex-shrink-0">
              <span className="w-6 h-6 lg:w-12 lg:h-12 overflow-hidden">{rollbackImg}</span>
              <div className="flex flex-col">
                <h3 className="text-normal text-neutral-gray-80">
                  Đổi trả 90 ngày
                </h3>
                <span className="text-normal text-primary-default uppercase">
                  MIỄN PHÍ
                </span>
              </div>
            </div>

            <div className="flex max-w-[300px] w-auto p-0 lg:p-6 items-center gap-2 lg:gap-6 flex-shrink-0">
              <span className="w-6 h-6 lg:w-12 lg:h-12 overflow-hidden">{shieldImg}</span>
              <div className="flex flex-col">
                <h3 className="text-normal text-neutral-gray-80">
                  Hàng hiệu chính hãng
                </h3>
                <span className="text-normal text-primary-default uppercase">
                  CAM KẾT 100%
                </span>
              </div>
            </div>

            <div className="flex max-w-[300px] w-auto p-0 lg:p-6 items-center gap-2 lg:gap-6 flex-shrink-0">
              <span className="w-6 h-6 lg:w-12 lg:h-12 overflow-hidden">{settingImg}</span>
              <div className="flex flex-col">
                <h3 className="text-normal text-neutral-gray-80">
                  Bảo hành trọn đời
                </h3>
                <span className="text-normal text-primary-default uppercase">
                  MIỄN PHÍ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurServices;
