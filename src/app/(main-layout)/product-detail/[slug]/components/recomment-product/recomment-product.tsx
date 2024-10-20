"use client";

import ProductList from "@/components/productList/ProductList";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import { viewMoreRightIcon } from "@/utils/icon/icondefine";
import { GET_RECOMMEND_LIST } from "@/graphql/product/getlistRecommentProducts";
import { GetRecommendProductData } from "@/interfaces/product/product";
import { useQuery } from "@apollo/client";
import Link from "next/link";

type Props = {
  cateId: any;
};

export default function RecommendList(props: Props) {
  const { cateId } = props;
  const limit = 5;
  const { data, error } = useQuery<GetRecommendProductData>(
    GET_RECOMMEND_LIST,
    {
      variables: { cateId: cateId, pageSize: limit },
    }
  );
  return (
    <div className="bg-teriaty">
      <div className="inner-container">
        <div className="flex flex-col gap-[16px] lg:gap-[24px] py-[24px] lg:py-[36px] sm:py-[24px] items-center px-[16px]">
          <SectionHeader
            href={`/`}
            showProductCount={false}
            showSort={false}
            title="Sản phẩm liên quan"
          />
          <ProductList
            products={
              data?.recommendProduct?.data ? data?.recommendProduct?.data : []
            }
            itemnumber={5}
          />
          <div className="w-full flex lg:hidden flex-col items-center">
            <Link
              className="btn-lg  text-primary-default border border-primary-default text-16 uppercase"
              href={`/product-list?${cateId}`}
            >
              Xem thêm
              {viewMoreRightIcon}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
