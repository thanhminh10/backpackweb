import { RemoveLink, Strip } from "@/constants";
import { IArticle } from "@/interfaces/article/Article.d";
import { formatDate } from "@/utils/format/format";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ArticlesCardProps {
  article: IArticle;
  col?: number;
}

const ArticlesCard: React.FC<ArticlesCardProps> = ({ article, col }) => {
  // Xử lý điều kiện cho width và height
  const height = 300; // Giữ chiều cao cố định
  const maxH_title = col === 1 ? 50 : 110;

  return col !== 1 ? (
    <div className="relative max-w-full max-h-full min-w-full min-h-full py-2 md:py-0">
      <Link className="cursor-pointer" href={`/articles/${article?.slug}`}>
        <div className="article_card_wrapper relative flex flex-col lg:gap-4 gap-4 overflow-hidden">
          {/* Sử dụng width và height đã tính */}
          <div
            style={{
              width: "100%",
              height: height + `px`,
            }}
            className={`article_card_img flex-shrink-0 w-[100%] h-[${height}px] relative`}
          >
            <Image
              sizes="100vw"
              className="object-cover"
              src={
                article?.thumbnail
                  ? RemoveLink(article?.thumbnail)
                  : "/assets/img/guitar_default.png"
              }
              alt={`image ${article?.title}`}
              fill
            />
          </div>

          <div
            className={`flex flex-col justify-start flex-grow px-4 pb-4 pt-2 lg:px-9 lg:py-[16px] lg:gap-3 gap-2`}
          >
            <div
              style={{
                maxHeight: `${maxH_title + 48}px`, // Tính toán thêm khoảng trống cho mô tả
              }}
              className="flex flex-col overflow-hidden gap-3"
            >
              <h2
                style={{
                  overflow: "hidden",
                  WebkitLineClamp: 2,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  minHeight: "40px", // Đặt chiều cao tối thiểu
                }}
                className="font-mulish text-[16px] font-normal leading-[140%] uppercase"
              >
                {article?.title}
              </h2>

              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
                className="font-mulish text-[16px] font-normal leading-[140%]"
                dangerouslySetInnerHTML={{
                  __html: Strip(article?.content),
                }}
              />
            </div>
          </div>
        </div>
        <p className="flex py-1 px-4 lg:py-3 lg:px-6 justify-center items-center gap-2.5 absolute left-[16px] lg:left-[36px] bottom-[150px] bg-primary-default text-white">
          {`${formatDate(Number(article?.createdAt))}`}
        </p>
      </Link>
    </div>
  ) : (
    <div className="flex flex-row">
    <Link className="cursor-pointer flex flex-row" href={`/articles/${article?.slug}`}>
      <div className="relative w-[130px] h-[130px] bg-[#D9D9D9] shrink-0">
        <Image 
          src={article?.thumbnail
            ? RemoveLink(article?.thumbnail)
            : "/assets/img/guitar_default.png"
          }
          alt={article.title}
          layout="fill"
          className="absolute top-0 left-0 object-cover"
        />
      </div>
    
      
      <div className="flex flex-col p-2 items-start gap-1 flex-1">
        {/* Tiêu đề */}
        <div
          className="overflow-hidden text-[#2D2E2F] text-ellipsis font-normal text-[16px] leading-[140%] uppercase"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            overflowWrap: "break-word",
          }}
        >
          {article?.title}
        </div>
    
        {/* Nội dung */}
        <div
          className="overflow-hidden text-[#5C5F61] text-ellipsis font-normal text-[16px] leading-[140%]"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
            overflowWrap: "break-word",
          }}
          dangerouslySetInnerHTML={{
            __html: Strip(article?.content),
          }}
        ></div>
      </div>
    </Link>
  </div>
  
  );
};

export default ArticlesCard;
