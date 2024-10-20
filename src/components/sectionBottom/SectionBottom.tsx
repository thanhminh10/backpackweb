import Image from "next/image";
import Link from "next/link";

export default function SectionBottom() {
  return (
    <div>
      <section className="bg-[#F2F3F7] text-center px-[16px] py-[20px] md:px-[16px] md:py-[20px] lg:py-[36px] lg:px-[80px] lg:gap-[16px] lg:rounded-[24px] xl:px-[80px] xl:gap-[16px] xl:rounded-[24px]">
        <div className="flex justify-center flex-col gap-6 md:gap-4">
          <h3 className="capo-title lg:text-[24px] text-[20px] font-normal text-center text-primary">
            Capo Guitar Cao Cấp
          </h3>
          <div className="grid gap-6 md:gap-4 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-3">
            <div className="max-w-full min-w-full px-4  sm:px-0 md:px-0">
              <Link className="cursor-pointer" href={"/"}>
                <div>
                  <Image
                    sizes="100vw"
                    className="inline-block lg:min-w-[36px] lg:h-[36px] min-w-[70px] h-8 mb-6"
                    style={{ objectFit: "contain" }}
                    src={"/assets/img/capo 2.svg"}
                    alt={`Capo`}
                    height={36}
                    width={36}
                  ></Image>
                  <p className="line-clamp-4 text-neutral-detail text-16">
                    Capo Hợp Kim Nhôm Capo được làm từ hợp kim nhôm cao cấp mang
                    lại sự chắc chắn, cứng cáp và độ bền cho capo
                  </p>
                </div>
              </Link>
            </div>
            <div className="max-w-full min-w-full px-4  sm:px-0 md:px-0">
              <Link className="cursor-pointer" href={"/"}>
                <div>
                  <Image
                    sizes="100vw"
                    className="inline-block lg:min-w-[36px] lg:h-[36px] min-w-[70px] h-8 mb-6"
                    style={{ objectFit: "contain" }}
                    src={"/assets/img/Bright.svg"}
                    alt={`Capo`}
                    height={36}
                    width={36}
                  ></Image>
                  <p className="line-clamp-4 text-neutral-detail text-16">
                    Capo Mạ Crome Cao Cấp Capo được mạ Crome sáng bóng, tăng vẻ
                    đẹp sang trọng khi kẹp trên cần đàn của bạn
                  </p>
                </div>
              </Link>
            </div>
            <div className="max-w-full min-w-full px-4  sm:px-0 md:px-0">
              <Link className="cursor-pointer" href={"/"}>
                <div>
                  <Image
                    sizes="100vw"
                    className="inline-block lg:min-w-[36px] lg:h-[36px] min-w-[70px] h-8 mb-6"
                    style={{ objectFit: "contain" }}
                    src={"/assets/img/Loxo.svg"}
                    alt={`Capo`}
                    height={36}
                    width={36}
                  ></Image>
                  <p className="line-clamp-4 text-neutral-detail text-16">
                    Capo Lò So Chất Lượng Capo lò so chất lượng, lực kẹp chắc
                    chắn mang lại âm thanh chuẩn xác, không bị rè trong quá
                    trình sử dụng
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
