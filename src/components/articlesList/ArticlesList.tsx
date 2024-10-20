"use client";
import { IArticle } from "@/interfaces/article/Article.d";
import React from "react";
import ArticlesCard from "../articlesCard/ArticlesCard";

export interface ArticlesListProps {
  articleList: IArticle[]; // Mảng các bài viết
  col?: number; // Số cột (không bắt buộc)
}
const ArticlesList: React.FC<ArticlesListProps> = ({ articleList, col }) => {
  return (
    <section className="flex flex-col gap-6 md:px-0 lg:px-0">
      <div>
        <div
          className={`grid ${
            col
              ? "grid-cols-1 lg:gap-6 gap-4" // Nếu có `col`, từ `sm` trở lên đều là 1 cột
              : "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
          } md:gap-3 lg:gap-4`}
        >
          {articleList?.map((article: any, index: number) => (
            <ArticlesCard col={col} key={index} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesList;
