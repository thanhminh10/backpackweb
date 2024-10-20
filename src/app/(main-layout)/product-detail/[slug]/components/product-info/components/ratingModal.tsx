import Modal from "@/components/modal/modal";
import message from "@/components/notification/Notification";
import RenderStars from "@/components/renderStars/RenderStars";
import { SHOP_ID } from "@/constants/enviroment";
import { CREATE_REVEIW } from "@/graphql/review/review";
import { useMutation } from "@apollo/client"; // Nhập useMutation từ Apollo
import React, { useState } from "react";

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  w?: number;
  prodId?:string;
}

const RatingModal: React.FC<Props> = ({
  isModalOpen,
  handleCloseModal,
  w = 620,
  prodId
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>(""); // Trạng thái cho comment
  const [createReview] = useMutation(CREATE_REVEIW); // Sử dụng useMutation để gọi mutation

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Ngăn chặn reload trang
    try {
      const response =  await createReview({
        variables: {
          prodId:prodId,
          shopId:SHOP_ID,
          review:{
            comment:comment,
            rating:rating
          }, // Nội dung đánh giá
        },
      });


      if(response.data.createReview.success){
        message.success("Cảm ơn đã đánh giá sản phẩm")
      }
      // Xử lý thành công, có thể gọi handleCloseModal hoặc hiển thị thông báo
      handleCloseModal();
      setRating(0); // Reset lại rating
      setComment(""); // Reset lại comment
    } catch (error) {
      console.error("Error creating review:", error);
      // Xử lý lỗi (có thể hiển thị thông báo cho người dùng)
    }
  };

  return (
    <Modal w={w} isOpen={isModalOpen} onClose={handleCloseModal}>
      <div className="flex flex-col justify-center items-center w-full p-[36px] gap-[24px]">
        <div className="flex flex-col justify-center items-start w-full gap-2 p-1 pt-0 pb-2 flex-1 ">
          <div className="text-center text-gray-800 font-500 text-[20px] leading-[28px]">
            Đánh giá sản phẩm
          </div>
          <div className="w-full h-px bg-[#2D2E2F]"></div>
        </div>
        <form className="flex flex-col items-start self-stretch gap-6" onSubmit={handleSubmit}>
          <input type="hidden" name="prodId" value={prodId} />
          <div className="flex items-center gap-6 self-stretch">
            <span className="text-normal ">Chất lượng :</span>
            <RenderStars rating={rating} onRatingChange={handleRatingChange} />
            <span className="text-primary-default italic">Tuyệt vời</span>
          </div>

          <div className="flex h-[90px] py-1 flex-col justify-end items-start gap-1 self-stretch">
            <label
              className="text-gray-800 font-normal text-base leading-[140%]"
              htmlFor="comment"
            >
              Nội dung :
            </label>
            <input
              id="comment"
              type="text"
              value={comment}
              onChange={handleCommentChange} // Xử lý thay đổi comment
              placeholder="Nhập đánh giá của bạn"
              className="flex h-[48px] p-3.5 items-center gap-3 flex-shrink-0 self-stretch rounded-[12px] bg-[#F3F3F3] border-none outline-none placeholder:italic"
            />
          </div>

          <div className="flex items-center gap-4 w-full">
            <button
              type="button"
              className="btn text-primary-default flex-shrink-0"
              onClick={handleCloseModal}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="btn-lg border bg-primary-default text-white uppercase flex-1"
            >
              Đánh giá
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RatingModal;
