"use client";
import ArticlesList from "@/components/articlesList/ArticlesList";
import BrandListSuggest from "@/components/brandListSuggest/BrandListSuggest";
import DataWrapper from "@/components/DataWrapper";
import Loading from "@/components/loading/Loading";
import Pagination from "@/components/pagination/Pagination";
import ProductList from "@/components/productList/ProductList";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import Select from "@/components/Select";
import CustomSwiper from "@/components/slider/Slider";
import { RemoveLink } from "@/constants";
import { SHOP_ID } from "@/constants/enviroment";
import { GET_ARTICLES } from "@/graphql/article/getArticles";
import { GET_BRANDS } from "@/graphql/brand/getBrands";
import { GET_HOT_PRODUCTS } from "@/graphql/product/getlistHotProducts";
import { IArticleResponse } from "@/interfaces/article/Article.d";
import { IBrandResponse } from "@/interfaces/brand/brand";
import { IGetHotProductData } from "@/interfaces/product/product";
import { sendIcon } from "@/utils/icon/icon";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function ArticleList() {
  const [page, setPage] = useState(1);
  const limit = 15;
  const [getSort, setGetSort] = useState("-1");

  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
    refetch,
  } = useQuery<IArticleResponse>(GET_ARTICLES, {
    variables: { pageSize: limit, pageIndex: page, sort: parseInt(getSort) },
  });

  const {
    data: hotProductData,
    loading: hotProductLoading,
    error: hotProductError,
  } = useQuery<IGetHotProductData>(GET_HOT_PRODUCTS, {
    variables: { pageIndex: 1, pageSize: 6, sort: -1 },
  });
  const {
    data: brandsData,
    loading: brandsLoading,
    error: brandsError,
  } = useQuery<IBrandResponse>(GET_BRANDS, {
    variables: { pageSize: 6,
    pageIndex: 1,
    active: true , shopId: SHOP_ID},
  });

  const totalItems = articlesData?.articles?.links?.totalItems ?? 0;

  const totalPages = Math.ceil(totalItems / limit);
  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  if (articlesLoading) return <Loading />;
  if (articlesError) return <p> Error</p>;
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetch({ pageIndex: newPage, pageSize: limit, sort: getSort });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGetSort(e.target.value);
    refetch({
      pageIndex: page,
      pageSize: limit,
      sort: parseInt(e.target.value),
    });
  };

  const sortOptions = [
    { value: "-1", label: "Từ mới đến cũ" },
    { value: "1", label: "Từ cũ đến mới" },
  ];

  return (
    <section className="block">
      <div className="block">
        <CustomSwiper bg="#F3F3F3" h={500} hmb={500}></CustomSwiper>
      </div>
      <div className="block bg-teriaty">
        <div className="inner-container lg:py-9 lg:px-0 px-4 py-6">
          <SectionHeader
            title="Bài viết nổi bật"
            SectionString="bài viết"
            showProductCount={true}
            productCount={totalItems}
            showSort={false}
            sortComponent={
              <Select
                options={sortOptions}
                value={getSort}
                onChange={handleSortChange}
              />
            }
          />
          <div className="grid grid-cols-4 gap-[48px]">
            <div className="lg:col-span-3 col-span-4 lg:col-start-1">
              <DataWrapper
                data={articlesData?.articles?.data}
                loading={articlesLoading}
                error={articlesError}
              >
                {(data) => (
                  <div className="col-span-3">
                    <ArticlesList articleList={data ?? []} />
                    <Pagination
                      page={page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </DataWrapper>
            </div>
            <div className="lg:col-span-1 col-span-4 lg:col-start-4">
              <div className="flex flex-col justify-center items-start gap-[36px]">
                <SectionHeader
                  title="Sản phẩm nổi bật"
                  showProductCount={false}
                  showSort={false}
                  headerTitleSize={20}
                  suggestItem={true}
                />
                <DataWrapper
                  data={hotProductData?.hotProducts?.data}
                  loading={hotProductLoading}
                  error={hotProductError}
                >
                  {(data) => <ProductList col={1} products={data ?? []} />}
                </DataWrapper>

                <div className="flex flex-col w-full gap-[36px]">
                  <SectionHeader
                    title="Thương hiệu"
                    showProductCount={false}
                    showSort={false}
                    headerTitleSize={20}
                    suggestItem={true}
                  />
                  <DataWrapper
                    data={brandsData?.brands.data}
                    loading={brandsLoading}
                    error={brandsError}
                  >
                    {(data) => {
                      const listImg = (data ?? []).map((item, index) => {
                        return {
                          id: index, // Hoặc string, tùy thuộc vào cách bạn quản lý ID
                          name: item.name ?? "",
                          logo: item.logo ? RemoveLink(item.logo) : "", // Đường dẫn hình ảnh của logo
                        };
                      });
                      return <BrandListSuggest brands={listImg ?? []} />;
                    }}
                  </DataWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
