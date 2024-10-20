import React from "react";
import SectionHeader from "../sectionHeader/SectionHeader";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  title?:string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
  title
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex w-[500px] p-9 flex-col justify-start items-start text-start gap-6 bg-white">
        <div className="flex items-start gap-2 self-stretch flex-col">
          <div className="text-semantics-error text-start font-medium text-[20px] leading-[28px]">
            {title}
          </div>
          <span className="bg-[#2D2E2F] w-full h-[1px]"></span>
        </div>
        <p className="text-normal text-neutral-gray-80">{message}</p>
        <div className="flex items-start gap-6 self-stretch">
          <button
            className=" btn text-primary-default"
            onClick={onCancel}
          >
            Hủy bỏ
          </button>
          <button
            className="btn btn-lg text-white bg-primary-default flex-1"
            onClick={onConfirm}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
