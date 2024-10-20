"use client";
import { formatDateTime, removeEmptyTags, RemoveLink } from "@/constants";

import Breadcrumb from "@/components/Breadcrumb";
import { viewMoreDownIcon, viewMoreUpIcon } from "@/utils/icon/icondefine";
import Image from "next/image";
import { useState } from "react";
import ArticleListSuggest from "./articleListSuggest";
import ProductSuggest from "./productSuggest";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import DataWrapper from "@/components/DataWrapper";
import { useQuery } from "@apollo/client";
import { IBrandResponse } from "@/interfaces/brand/brand";
import { GET_BRANDS } from "@/graphql/brand/getBrands";
import BrandListSuggest from "@/components/brandListSuggest/BrandListSuggest";
import { formatDate } from "@/utils/format/format";
import { SHOP_ID } from "@/constants/enviroment";

type Props = {
  article: any;
};
export default function ArticleInfo(props: Props) {
  const { article } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const breadcrumbRoutes = [
    {
      label: `Trang chủ`,
      href: `/`,
    },
    {
      label: `Bài viết`,
      href: `/articles`,
    },
    { label: `${article?.article?.data?.title}` }, // This is the current page, so no href
  ];
  const {
    data: brandsData,
    loading: brandsLoading,
    error: brandsError,
  } = useQuery<IBrandResponse>(GET_BRANDS, {
    variables: { pageSize: 6,
      pageIndex: 1,
      active: true , shopId: SHOP_ID},
  });

  return (
    <section className="px-4 lg:px-0">
      <Breadcrumb routes={breadcrumbRoutes} />
      <div className="flex justify-center items-start gap-[48px] self-stretch flex-col lg:flex-row">
        <div
          style={{ boxShadow: "0px 4px 20px 0px rgba(194, 194, 194, 0.50)" }}
          className="flex flex-col p-4 lg:p-[36px] items-start gap-[24px] flex-1 bg-white"
        >
          <div className="relative h-[300px] w-full">
            <Image
              priority
              src={RemoveLink(article?.article?.data?.thumbnail) || ""}
              alt={`Image-News${article?.article?.data?._id}`}
              layout="fill"
              className="absolute top-0 left-0 right-0 bottom-0  border border-white rounded-t-md"
               
              fill
            ></Image>
          </div>

          <div className="flex py-1 px-4 lg:py-3 lg:px-6 justify-center items-center gap-2.5  bg-primary-default text-white">{`${formatDate(
            Number(article?.article?.data?.createdAt)
          )}`}</div>
          <div className="flex flex-col gap-2">
            <h1 className=" text-neutral-800 uppercase font-mulish text-base leading-6">
              {article?.article?.data?.title}
            </h1>
            <div
              className="product-content-detail "
              dangerouslySetInnerHTML={{
                __html: isExpanded
                  ? removeEmptyTags(article?.article?.data?.content)
                  : removeEmptyTags(
                      article?.article?.data?.content.substring(0, 3000)
                    ),
              }}
            ></div>
          </div>

          <div className="flex items-center  w-full justify-center font-medium text-primary">
            {article?.article?.data?.content.length >= 3000 && (
              <div className="flex w-full cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? (
                  <>
                    <p className="hidden lg:flex  w-full items-center justify-center gap-1 text-primary">
                      Rút gọn
                    </p>
                  </>
                ) : (
                  <>
                    <p className="hidden lg:flex w-full items-center justify-center gap-1 text-primary">
                      Xem thêm
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:w-1/4  text-left">
          <ProductSuggest />

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
    </section>
  );
}
