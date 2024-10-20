import { leftIcon, rightIcon } from "@/utils/icon/icon";
import clsx from "clsx";
import Image from "next/image";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const maxPageButtons = 3; // Tổng số nút trang tối đa hiển thị
  const offsetNumber = 1; // Số trang hiển thị trước và sau trang hiện tại

  const pageNumbers = [];

  // Xác định startPage và endPage
  let startPage = Math.max(1, page - offsetNumber);
  let endPage = Math.min(totalPages, page + offsetNumber);

  // Điều chỉnh startPage và endPage nếu trang hiện tại gần đầu hoặc cuối
  if (page <= offsetNumber + 1) {
    endPage = Math.min(totalPages, maxPageButtons);
  } else if (page >= totalPages - offsetNumber) {
    startPage = Math.max(1, totalPages - maxPageButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Hiển thị dấu ba chấm ở đầu và cuối nếu cần
  const showEllipsisLeft = startPage > 2;
  const showEllipsisRight = endPage < totalPages - 1;

  return (
    <div className="flex justify-center items-center gap-[8px] self-stretch pb-4 pt-4">
      <button
        onClick={() => onPageChange(page > 1 ? page - 1 : 1)}
        className={clsx(
          "flex w-[24px] h-[24px] p-[4px] flex-col justify-center items-center",
          page <= 1 && "invisible opacity-50"
        )}
      >
        {leftIcon}
      </button>

      {showEllipsisLeft && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="flex w-[24px] h-[24px] p-[4px] flex-col justify-center items-center"
          >
            1
          </button>
          <button
            onClick={() => {
              const targetPage = Math.max(1, startPage - offsetNumber);
              onPageChange(targetPage);
            }}
            className="flex w-[24px] h-[24px] p-[4px] flex-col justify-center items-center"
          >
            ...
          </button>
        </>
      )}

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`flex w-[24px] h-[24px] p-[4px] flex-col justify-center items-center ${
            pageNumber === page
              ? "text-primary-default underline underline-offset-3"
              : "text-[#B2B2B2]"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {showEllipsisRight && (
        <>
          <button
            onClick={() => {
              const targetPage = Math.min(totalPages, endPage + offsetNumber);
              onPageChange(targetPage);
            }}
            className="flex w-[24px] h-[24px] p-[4px] flex-col justify-center items-center"
          >
            ...
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            className="border rounded-lg px-2 w-[40px] py-[6px] text-center text-[#B2B2B2]"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(page < totalPages ? page + 1 : totalPages)}
        className={clsx(
          "flex w-[24px] h-[24px] p-[4px] flex-col justify-center items-center",
          page >= totalPages && "invisible opacity-50"
        )}
      >
        {rightIcon}
      </button>
    </div>
  );
}
