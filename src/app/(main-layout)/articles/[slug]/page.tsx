import { Metadata } from "next";
// import ArticleInfo from './components/articleInfo';
import Loading from "@/components/loading/Loading";
import ProductList from "@/components/productList/ProductList";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import { viewMoreRightIcon } from "@/utils/icon/icondefine";
import { GET_ARTICLE } from "@/graphql/article/getArticle";
import { GET_HOT_PRODUCTS } from "@/graphql/product/getlistHotProducts";
import { IGetHotProductData } from "@/interfaces/product/product";
import client from "@/lib/apolloClient";
import dynamic from "next/dynamic";
import Link from "next/link";
import { removeTags } from "../../../../constants/index";
import ArticleListSuggest from "./components/articleListSuggest";

type Params = {
  params: {
    slug: string;
  };
};
const ArticleInfo = dynamic(() => import("./components/articleInfo"), {
  ssr: false,
});
export async function generateMetadata({
  params: { slug },
}: Params): Promise<Metadata> {
  const { data } = await client.query({
    query: GET_ARTICLE,
    variables: { slug: slug },
  });

  const title = data?.article?.data?.title?.substring(0, 65) || "Đàn guitar";
  const remove = removeTags(data?.article?.data?.content || "");
  const desc = remove?.substring(0, 155) || "Không có mô tả";
  const keyword = data?.article?.data?.keyword || title;
  const image =
    data?.article?.data?.thumbnail || "/assets/img/guitar_default.png"; // Thêm ảnh mặc định

  return {
    title: title,
    description: desc,
    keywords: keyword,
    openGraph: {
      title: title,
      description: desc,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
  };
}

export default async function ArticleProduct({ params: { slug } }: Params) {
  const { data } = await client.query({
    query: GET_ARTICLE,
    variables: { slug: slug },
  });
  const {
    data: hotProductData,
    loading: hotProductLoading,
    error: hotProductError,
  } = await client.query<IGetHotProductData>({
    query: GET_HOT_PRODUCTS,
    variables: { pageIndex: 1, pageSize: 6, sort: -1 },
  });
  if (hotProductLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-teriaty">
      <div className="inner-container ">
        <ArticleInfo article={data}></ArticleInfo>
        <div className="flex flex-col gap-[16px] lg:gap-[24px]  py-[24px] px-[16px] items-center  sm:px-[16px] lg:px-0 lg:items-end">
         <ArticleListSuggest />
        </div>
      </div>
    </div>
  );
}
