"use client";
import ArticlesList from "@/components/articlesList/ArticlesList";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import { viewMoreRightIcon } from "@/utils/icon/icondefine";
import { GET_ARTICLES } from "@/graphql/article/getArticles";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import DataWrapper from "@/components/DataWrapper";
import { Routers } from "@/utils/router";

export default function ArticleListSuggest() {
  const { data, loading, error } = useQuery(GET_ARTICLES, {
    variables: { pageSize: 3, sort: -1, pageIndex: 1 },
  });
  if (error) return <p>Error</p>;
  return (
    <DataWrapper data={data?.articles?.data} loading={loading} error={error}>
      {(data) => (
        <div className=" bg-teriaty">
          <div className="inner-container">
            <div
              className="flex flex-col gap-[16px] lg:gap-[24px] lg:py-[36px] py-[24px] px-[0px] md:items-center sm:px-[16px] lg:px-0 lg:items-center"
            >
              <SectionHeader title="Bài Viết" href={Routers.article.pathArticle} />
              <ArticlesList articleList={data ?? []} />
              <Link
                className="flex lg:hidden items-center justify-center lg:px-6 lg:py-2 text-primary-default text-16 
                       p-2 gap-1 self-stretch rounded-[32px] border border-primary-default
                       "
                href={Routers.article.pathArticle}
              >
                Xem thêm
                {viewMoreRightIcon}
              </Link>
            </div>
          </div>
        </div>
      )}
    </DataWrapper>
  );
}
