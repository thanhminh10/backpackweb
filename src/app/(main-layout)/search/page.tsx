"use client";
import ArticlesList from "@/components/articlesList/ArticlesList";
import BrandListSuggest from "@/components/brandListSuggest/BrandListSuggest";
import DataWrapper from "@/components/DataWrapper";
import Loading from "@/components/loading/Loading";
import Pagination from "@/components/pagination/Pagination";
import ProductList from "@/components/productList/ProductList";
import PromotionsSection from "@/components/promotionsSection/PromotionsSection";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import Select from "@/components/Select";
import CustomSwiper from "@/components/slider/Slider";
import { Remove, RemoveLink } from "@/constants";
import { GET_ARTICLES } from "@/graphql/article/getArticles";
import { GET_BRANDS } from "@/graphql/brand/getBrands";
import { GET_HOT_PRODUCTS } from "@/graphql/product/getlistHotProducts";
import { GET_SEARCH } from "@/graphql/searchList/SearchList";
import { IBrandResponse } from "@/interfaces/brand/brand";
import { IGetHotProductData } from "@/interfaces/product/product";
import { sendIcon } from "@/utils/icon/icon";
import { viewMoreRightIcon } from "@/utils/icon/icondefine";
import { notfoundProductImg } from "@/utils/img";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchList({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const page_slug =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 18;
  const slug = searchParams?.slug ?? "";

  const [page, setPage] = useState(page_slug);
  const [getSort, setGetSort] = useState("-1");
  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
    refetch,
  } = useQuery(GET_SEARCH, {
    variables: {
      pageIndex: page,
      pageSize: limit,
      slug: Remove(slug),
      sort: parseInt(getSort),
    },
  });

  const {
    data: hotProductData,
    loading: hotProductLoading,
    error: hotProductError,
  } = useQuery<IGetHotProductData>(GET_HOT_PRODUCTS, {
    variables: { pageIndex: 1, pageSize: 5, sort: -1 },
  });

  useEffect(() => {
    setGetSort("-1");
  }, [searchParams._id]);

  const totalItems = searchData?.products?.links?.totalItems ?? 0;

  const totalPages = Math.ceil(totalItems / limit);

  const pageNumbers = [];
  const offsetNumber = 3;

  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetch({ pageIndex: newPage, pageSize: limit, sort: parseInt(getSort) });
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

  if (searchLoading) return <Loading />;
  if (searchError)
    return (
      <div
        style={{ minHeight: "calc(100vh - 80px - 300px)" }}
        className="flex items-center justify-center w-full uppercase font-bold text-3xl"
      >
        sản phẩm không có!!!
      </div>
    );

  return totalItems !== 0 ? (
    <section className="block">
      <div className="block bg-teriaty">
        <div className="inner-container lg:py-9 lg:px-0 px-4 py-6">
          <div className="text-[#2D2E2F] text-center font-mulish text-[16px] font-normal leading-[140%] mb-6">
            {`Đã tìm thấy ${totalItems} sản phẩm cho từ khoá '${slug}'`}
          </div>
          <div className="grid lg:grid-cols-5 grid-cols-2 gap-[48px]">
            <div className="lg:col-span-5 col-span-4 lg:col-start-1">
              <DataWrapper
                data={searchData?.products?.data}
                loading={searchLoading}
                error={searchError}
              >
                {(data) => (
                  <div className="col-span-5">
                    <ProductList itemnumber={5} products={data ?? []} />
                    <Pagination
                      page={page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </DataWrapper>
            </div>
          </div>
        </div>
      </div>
     
    </section>
  ) : (
    <section className="block">
      <div className="block bg-teriaty">
        <div className="inner-container lg:py-9 lg:px-0 px-4 py-6">
          <div className="text-[#2D2E2F] text-center font-mulish text-[16px] font-normal leading-[140%] mb-6">
            {`Đã tìm thấy ${totalItems} sản phẩm cho từ khoá '${slug}'`}
          </div>
          <div className="block">
            <div className="flex justify-center items-center">
              {notfoundProductImg}
            </div>
          </div>
          <DataWrapper
            data={hotProductData?.hotProducts?.data}
            loading={hotProductLoading}
            error={hotProductError}
          >
            {(data) => (
              <div
                className="flex flex-col gap-[16px] lg:gap-[24px] md:items-center lg:items-center 
              "
              >
                <SectionHeader
                  title="Sản phẩm khác"
                  href="/product-list/hot-product"
                />
                <ProductList itemnumber={5} products={data ?? []} />
                <Link
                  className="flex lg:hidden items-center justify-center lg:px-6 lg:py-2 text-primary-default text-16    p-2 gap-1 self-stretch rounded-[32px] border border-primary-default   "
                  href="/product-list/hot-product"
                >
                  Xem thêm
                  {viewMoreRightIcon}
                </Link>
              </div>
            )}
          </DataWrapper>
        </div>
      </div>
     
    </section>
  );
}
