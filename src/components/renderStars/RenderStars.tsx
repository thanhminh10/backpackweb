import React, { useState } from 'react';

interface RenderStarsProps {
  rating: number;
  onRatingChange: (newRating: number) => void; // Hàm callback để cập nhật rating
}

const RenderStars: React.FC<RenderStarsProps> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null); // Để hiển thị số sao khi hover
  const maxStars = 5;

  const handleClick = (index: number) => {
    onRatingChange(index + 1); // Cập nhật số sao khi người dùng click (index + 1 vì index bắt đầu từ 0)
  };

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1); // Hiển thị số sao khi hover
  };

  const handleMouseLeave = () => {
    setHoverRating(null); // Xóa trạng thái hover khi không di chuột qua sao
  };

  return (
    <span className="flex gap-[5px]">
      {[...Array(maxStars)].map((_, index) => {
        const currentRating = hoverRating !== null ? hoverRating : rating; // Hiển thị số sao khi hover, nếu không thì dựa vào rating

        return (
          <svg
            key={index}
            onClick={() => handleClick(index)} // Xử lý sự kiện click
            onMouseEnter={() => handleMouseEnter(index)} // Xử lý hover
            onMouseLeave={handleMouseLeave} // Xử lý rời khỏi hover
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M8.60821 1.06031C8.50069 0.820758 8.26257 0.666626 7.99999 0.666626C7.73741 0.666626 7.49929 0.820758 7.39178 1.06031L5.51377 5.24464L0.953909 5.7377C0.692853 5.76593 0.472681 5.94476 0.39154 6.19449C0.310399 6.44422 0.383404 6.71831 0.57801 6.89459L3.9772 9.97371L3.03706 14.4628C2.98323 14.7198 3.08528 14.9844 3.29771 15.1388C3.51014 15.2931 3.79338 15.3084 4.02117 15.1778L7.99999 12.8964L11.9788 15.1778C12.2066 15.3084 12.4898 15.2931 12.7023 15.1388C12.9147 14.9844 13.0168 14.7198 12.9629 14.4628L12.0228 9.97371L15.422 6.89459C15.6166 6.71831 15.6896 6.44422 15.6084 6.19449C15.5273 5.94476 15.3071 5.76593 15.0461 5.7377L10.4862 5.24464L8.60821 1.06031Z"
              fill={index < currentRating ? "#FBBD08" : "#E2E7EB"} // Đổi màu dựa vào rating hoặc hover
            />
          </svg>
        );
      })}
    </span>
  );
};
export default RenderStars;
