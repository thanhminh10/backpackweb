"use client";
import OurServices from "@/app/(main-layout)/(home)/section/ourServices/OurServices";
import ArticlesList from "@/components/articlesList/ArticlesList";
import DataWrapper from "@/components/DataWrapper"; // Import the DataWrapper component
import ProductList from "@/components/productList/ProductList";
import PromotionsSection from "@/components/promotionsSection/PromotionsSection";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import CustomSwiper from "@/components/slider/Slider";
import { RemoveLink } from "@/constants";
import { GET_ARTICLES } from "@/graphql/article/getArticles";
import { GET_BRANDS } from "@/graphql/brand/getBrands";
import { GET_HOT_PRODUCTS } from "@/graphql/product/getlistHotProducts";
import { GET_LATEST_PRODUCTS } from "@/graphql/product/getlistLatestProducts";
import { IArticleResponse } from "@/interfaces/article/Article.d";
import { IBrandResponse } from "@/interfaces/brand/brand";
import {
  GetLatestProductData,
  IGetHotProductData,
} from "@/interfaces/product/product";
import { viewMoreRightIcon } from "@/utils/icon/icondefine";
import { useQuery, useReactiveVar } from "@apollo/client";
import Link from "next/link";
import Carousel from "./section/brandList/BrandList";
import CateListSection from "./section/cateListSection/CateListSection";
import Rating from "./section/rating/Rating";
import { useFetchUserInfo } from "@/constants/hooks/useFetchUserInfo";
import { Routers } from "@/utils/router";
import { SHOP_ID } from "@/constants/enviroment";
import { GET_PRODUCT_LIST } from "@/graphql/product/getlistProduct";

export default function Home() {
  const {
    data: hotProductData,
    loading: hotProductLoading,
    error: hotProductError,
  } = useQuery<IGetHotProductData>(GET_HOT_PRODUCTS, {
    variables: { pageIndex: 1, pageSize: 4, sort: -1, shopId: SHOP_ID },
  });
  

  const {
    data: latestProductsData,
    loading: latestProductsLoading,
    error: latestProductsError,
  } = useQuery<GetLatestProductData>(GET_PRODUCT_LIST, {
    variables: { pageIndex: 1, pageSize: 10, sort: -1 , shopId: SHOP_ID  },
  });
  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
  } = useQuery<IArticleResponse>(GET_ARTICLES, {
    variables: { pageSize: 3, pageIndex: 1, sort: -1 , shopId: SHOP_ID },
  });

  const {
    data: brandsData,
    loading: brandsLoading,
    error: brandsError,
  } = useQuery<IBrandResponse>(GET_BRANDS, {
    variables: { pageSize: 10,
  pageIndex: 1,
  active: true , shopId: SHOP_ID},
  });
  
  // useFetchUserInfo();

  return (
    <div>
      <div className="grid grid-cols-4 lg:grid-cols-12">
        <div className="col-span-4 col-start-1 lg:col-span-12">
          <CustomSwiper h={500} hmb={150} bg="#F3F3F3" />
          <OurServices></OurServices>
          <CateListSection />

          <DataWrapper
            data={hotProductData?.hotProducts?.data}
            loading={hotProductLoading}
            error={hotProductError}
          >
            {(data) => (
              <div className=" bg-white">
                <div className="inner-container">
                  <div
                    className="flex flex-col gap-[16px] lg:gap-[24px] lg:py-[36px] py-[24px] px-[16px] md:items-center sm:px-[16px] lg:px-0 lg:items-center
              "
                  >
                    <SectionHeader
                      title="Sản phẩm bán chạy nhất"
                      href={Routers.product.pathHotProduct}
                    />
                    <ProductList products={data ?? []} itemnumber={4} />
                    <Link
                      className="flex lg:hidden items-center justify-center lg:px-6 lg:py-2 text-primary-default text-16 
                      p-2 gap-1 self-stretch rounded-[32px] border border-primary-default
                     "
                      href={Routers.product.pathHotProduct}
                    >
                      Xem thêm
                      {viewMoreRightIcon}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </DataWrapper>
          <DataWrapper
            data={brandsData?.brands.data}
            loading={brandsLoading}
            error={brandsError}
          >
            {(data) => {
              const listImg = (data ?? []).map((item) => {
                return {
                  id: item._id ?? "",
                  image: item.logo ? RemoveLink(item.logo) : "",
                  name: item.name ?? "",
                };
              });
              return <Carousel listData={listImg ?? []} />;
            }}
          </DataWrapper>

          <DataWrapper
            data={latestProductsData?.products?.data}
            loading={latestProductsLoading}
            error={latestProductsError}
          >
            {(data) => (
              <div className=" bg-teriaty">
                <div className="inner-container">
                  <div
                    className="flex flex-col gap-[16px] lg:gap-[24px] lg:py-[36px] py-[24px] px-[16px] md:items-center sm:px-[16px] lg:px-0 lg:items-center
               "
                  >
                    <SectionHeader
                      title="Sản phẩm mới nhất"
                      href={Routers.product.pathLatestProduct}
                    />
                    <ProductList products={data ?? []} itemnumber={5} />
                    <Link
                      className="flex lg:hidden items-center justify-center lg:px-6 lg:py-2 text-primary-default text-16 
                      p-2 gap-1 self-stretch rounded-[32px] border border-primary-default
                      "
                      href={Routers.product.pathLatestProduct}
                    >
                      Xem thêm
                      {viewMoreRightIcon}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </DataWrapper>
          <div className=" bg-teriaty">
            <div className="inner-container">
              <div
                className="flex flex-col gap-[16px] lg:gap-[24px] lg:py-[36px] py-[24px] px-[16px] md:items-center sm:px-[16px] lg:px-0 lg:items-center
               "
              >
                <SectionHeader title="Đánh giá của khách hàng" />
                <Rating />
              </div>
            </div>
          </div>

          
                 


          
          <DataWrapper
            data={articlesData?.articles?.data}
            loading={articlesLoading}
            error={articlesError}
          >
            {(data) => (
              <div className=" bg-teriaty">
                <div className="inner-container">
                  <div
                    className="flex flex-col gap-[16px] lg:gap-[24px] lg:py-[36px] py-[24px] px-[16px] md:items-center sm:px-[16px] lg:px-0 lg:items-center
                   "
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
        </div>
      </div>
    </div>
  );
}
