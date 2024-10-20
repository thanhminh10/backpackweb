"use client";
import PromotionsSection from "@/components/promotionsSection/PromotionsSection";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import CustomSwiper from "@/components/slider/Slider";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormContact } from "./_interface/contact";

export default function ContactForm() {
  // Sử dụng hook useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormContact>();

  const onSubmit: SubmitHandler<IFormContact> = (data) => {
  
  };

  return (
    <section className="block">
      <CustomSwiper bg={"#F3F3F3"} h={500} hmb={500}></CustomSwiper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6 px-4 py-6 lg:px-[320px] lg:py-9 lg:pb-[108px] self-stretch bg-teriaty"
      >
        <SectionHeader title="Liên hệ" suggestItem={true} />
        <p className="text-normal text-start w-full">
          Bạn cần hỗ trợ tư vấn, hãy để lại thông tin dưới đây nhé:
        </p>

        <div className="flex items-start gap-12 self-stretch lg:flex-row flex-col">
          <div className="input_wrapper">
            <label htmlFor="name">Họ và tên</label>
            <input
              id="name"
              placeholder="Nhập họ và tên"
              className="input_base"
              {...register("name", { required: "Họ và tên là bắt buộc" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="input_wrapper">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              id="phone"
              placeholder="Nhập số điện thoại"
              className="input_base"
              {...register("phone", { required: false })}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-12 self-stretch lg:flex-row flex-col">
          <div className="input_wrapper">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="Nhập email"
              className="input_base"
              {...register("email", { required: "Email là bắt buộc" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="input_wrapper">
            <label htmlFor="address">Địa chỉ</label>
            <input
              id="address"
              placeholder="Nhập địa chỉ"
              className="input_base"
              {...register("address", { required: false })} // Fixed to "address"
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-12 self-stretch lg:flex-row flex-col">
          <div className="input_wrapper">
            <label htmlFor="content">Nội dung</label>
            <textarea
              className="textarea_base"
              placeholder="Nội dung"
              rows={3}
              {...register("content", { required: "Nội dung là bắt buộc" })}
            ></textarea>
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}
          </div>
        </div>

        <button
          className="btn bg-primary-default text-white uppercase"
          type="submit"
        >
          Gửi tin nhắn
        </button>
      </form>

     
    </section>
  );
}
