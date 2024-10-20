import SectionHeader from "@/components/sectionHeader/SectionHeader";
import { shareBtn } from "@/utils/icon/icon";
import Image from "next/image";
import React from "react";

function Introduce() {
  return (
    <section className=" bg-teriaty">
      <div className="inner-container">
        <div className="flex justify-center items-center w-full lg:py-9 lg:pb-[108px] lg:px-0 px-4 py-6">

          <div
            className="flex max-w-[1050px] p-[36px] flex-col items-start gap-[24px] bg-white"
            style={{ boxShadow: "0px 4px 20px 0px rgba(194, 194, 194, 0.50)" }}
          >
            <SectionHeader title="Giới thiệu" />
            <div className="h-[300px] self-stretch relative">
              <Image
                src={"/assets/img/default_banner.png"}
                alt="giới thiệu"
                layout="fill"
                className="absolute top-0 left-0 bottom-0 right-0"
              />
            </div>
            <button className="flex h-[40px] py-2 justify-center items-center gap-1 text-normal text-primary-default">
              {shareBtn}
              <span>Chia sẻ</span>
            </button>
            <div className="flex py-1 px-4 lg:py-3 lg:px-6 justify-center items-center gap-2.5  bg-primary-default text-white">
              10-09-2024
            </div>
            <h1 className=" text-neutral-800 uppercase font-mulish text-base leading-6">
              Balo Targus: Thương hiệu balo cao cấp đến từ Mỹ
            </h1>
            <div className="text-normal text-neutral-gray-60">
              Balo Targus có gì đặc biệt mà thu hút nhiều tín đồ mộ điệu đến vậy?
              Hãy cùng Balohanghieu khám phá trong bài viết dưới đây nhé. 1 Đôi
              nét về balo Targus Targus là một mẫu balo thuộc dòng Safire với
              thiết kế hiện đại, đến từ thương hiệu cao cấp của Mỹ. Với phong cách
              trẻ trung và hiện đại, mẫu balo này phù hợp để bạn sử dụng trong
              suốt ngày dài năng động, từ trường học, cơ quan cho đến những chuyến
              du lịch ngắn ngày. Điểm nổi bật của balo Targus là ngăn chứa rộng
              rãi, quai đeo và đệm lưng chắc chắn được làm từ vải Polyester chống
              thấm hiệu quả. Hãng Targus rất ưu ái khi thiết lập chế độ bảo hành
              lên đến 30 năm trên toàn cầu cho chiếc balo tiện lợi này. Hiện tại,
              những mẫu balo thời trang Targus đang được phân phối độc quyền tại
              MIA.vn.
            </div>

            <div className="text-normal text-neutral-gray-60">
              2 Những sản phẩm balo Targus được yêu thích nhất 2.1 Balo Targus
              Sagano EcoSmart Campus Backpack Balo Targus Sagano EcoSmart Campus
              Backpack được làm từ chất liệu vải tái chế từ chai nhựa thân thiện
              với môi trường và chống thấm nước, đường chỉ tỉ mỉ, chắc chắn. Balo
              trang bị khóa kéo bền bỉ, thuận tiện khi sử dụng. Thiết kế hiện đại,
              thanh lịch với quai đeo đệm lưới êm ái. Balo có nhiều ngăn chứa, bao
              gồm ngăn chính vừa vặn với laptop/Macbook tới 156, ngăn phụ khóa
              kéo an toàn và ngăn đựng chai nước lớn.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Introduce;
