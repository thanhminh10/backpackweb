"use client";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import { EyeIcon, EyeOffIcon } from "@/utils/icon/icon";
import React, { useState } from "react";
import { useForm } from "react-hook-form";


// Define the interface for the form data
interface NewPasswordForm {
    password: string;
    confirmPassword: string;
}



function NewPassword() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NewPasswordForm>();

  const password = watch("password");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleComfirmPasswordVisibility = () => {
    setShowComfirmPassword(!showComfirmPassword);
  };

  const onSubmit = (data: NewPasswordForm) => {
    
    setLoading(true);
    // Add your submit logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex lg:w-[480px] w-full p-9 flex-col justify-center items-center gap-6 flex-shrink-0 bg-white shadow-[0px_4px_20px_0px_rgba(194,194,194,0.5)]">
        <SectionHeader title="Quên mật khẩu" />

        {/* Password Input */}
        <div className="w-full">
          <div className="relative w-full">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className="input_base bg-teriaty w-full pr-12"
              {...register("password", {
                required: "Mật khẩu không được để trống",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm text-primary-default w-[48px] h-full flex justify-center items-center"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-start">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="w-full">
          <div className="relative w-full">
            <input
              id="confirmPassword"
              type={showComfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              className="input_base bg-teriaty w-full pr-12"
              {...register("confirmPassword", {
                required: "Vui lòng xác nhận mật khẩu",
                validate: (value) =>
                  value === password || "Mật khẩu không khớp",
              })}
            />
            <button
              type="button"
              onClick={toggleComfirmPasswordVisibility}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm text-primary-default w-[48px] h-full flex justify-center items-center"
            >
              {showComfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-start">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          className="btn bg-primary-default text-white uppercase"
          type="submit"
          disabled={loading}
        >
          {"Đăng nhập"}
        </button>

        <div className="flex items-center gap-4 self-stretch">
          <span className="text-normal">Chưa nhận được mã N?</span>
          <button
            type="button"
            className="text-normal text-primary-default uppercase"
          >
            Gửi lại
          </button>
        </div>
      </div>
    </form>
  );
}
export default NewPassword;
