import SectionHeader from '@/components/sectionHeader/SectionHeader'
import { userVar } from '@/constants/makevar/makeVar';
import { editIcon, leftIcon, removeIcon } from '@/utils/icon/icon'
import { useReactiveVar } from '@apollo/client';
import Image from 'next/image'
import React from 'react'
interface InfoSectionProps {
    handleButtonClick: () => void;
}

const InfoSection: React.FC<InfoSectionProps> = ({ handleButtonClick }) => {
const userInfo = useReactiveVar(userVar);
  return (
    <div className="flex flex-col gap-6 w-full">
    <SectionHeader title="Tài khoản" suggestItem={true} />

    <div className="flex flex-col justify-center items-center self-stretch gap-4">
      <div className="relative w-20 h-20 rounded-full bg-teriaty border border-neutral-gray-20">
        <Image
          src={"/assets/img/avatar.svg"}
          alt={"user img"}
          layout="fill"
          className="absolute top-0 left-0 right-0 bottom-0"
        />
      </div>
      <button
        type="button"
        className="flex h-12 py-3 justify-center items-center gap-1 text-primary-default"
      >
        TẢI ẢNH TỪ THIẾT BỊ
      </button>

      <div className="flex items-start gap-6 self-stretch">
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Nhập email"
            defaultValue={userInfo?.email ?? ""}
            readOnly
            className="input_base bg-teriaty w-full"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            id="phone"
            type="text"
            defaultValue={userInfo?.phone ?? ""}
            placeholder="Nhập phone"
            className="input_base bg-teriaty w-full"
          />
        </div>
      </div>

      <div className="flex items-start gap-6 self-stretch">
        <div className="flex flex-col w-full">
          <label htmlFor="userName">Họ và tên:</label>
          <input
            id="userName"
            type="userName"
            defaultValue={userInfo?.userName ?? ""}
            placeholder="Nhập họ và tên"
            className="input_base bg-teriaty w-full"
          />
        </div>
        <div className="relative flex flex-col w-full">
          <label htmlFor="address">Địa chỉ</label>
          <input
            id="address"
            type="text"
            readOnly
            placeholder="Nhập địa chỉ"
            defaultValue={userInfo?.userName ?? ""}
            className="input_base bg-teriaty w-full"
          />
          <button
            onClick={handleButtonClick}
            className="absolute bottom-1 right-3 p-2"
          >
            {editIcon}
          </button>
        </div>
      </div>
      <button className="flex w-[454px] h-12 px-6 py-3 justify-center items-center gap-1 text-white bg-primary-default rounded-full">
        Lưu thay đổi
      </button>
    </div>
  </div>
  )
}

export default InfoSection