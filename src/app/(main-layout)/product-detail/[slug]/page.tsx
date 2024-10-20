import Loading from "@/components/loading/Loading";
import PromotionsSection from "@/components/promotionsSection/PromotionsSection";
import { removeTags } from "@/constants";
import { GET_PRODUCT } from "@/graphql/product/getProduct";
import { IProductDetailData } from "@/interfaces/product/productDetails";
import client from "@/lib/apolloClient";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ProductInfo: any = dynamic(
  () =>
    import(
      "@/app/(main-layout)/product-detail/[slug]/components/product-info/product-info"
    ) as any,
  {
    loading: () => <Loading />,
    ssr: false,
  }
);

const RecommendList: any = dynamic(
  () =>
    import(
      "@/app/(main-layout)/product-detail/[slug]/components/recomment-product/recomment-product"
    ) as any,
  {
    loading: () => <Loading />,
    ssr: false,
  }
);

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: Params): Promise<Metadata> {
  const { data } = await client.query<IProductDetailData>({
    query: GET_PRODUCT,
    variables: {
      slug: slug,
    },
  });
  
  

  const title = data?.product?.data?.name?.substring(0, 65) || "Đàn guitar";
  const remove = removeTags(data?.product?.data?.description || "");
  const desc = remove?.substring(0, 155) || "Không có mô tả";
  const keyword = data?.product?.data?.category?.name || title;
  const image = data?.product?.data?.image?.url
    ? data?.product?.data?.image?.url
    : "/assets/img/guitar_default.png"; 
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

export default async function ProductDetailPage({ params: { slug } }: Params) {
  const { data } = await client.query<IProductDetailData>({
    query: GET_PRODUCT,
    variables: {
      slug: slug,
    },
  });
  // Xử lý dữ liệu không hợp lệ
  if (!data || !data.product || !data.product.data) {
    console.error("Invalid product data:", data);
    return <p>Error loading product details.</p>;
  }

  const cateId = data?.product?.data?.cateId;

  return (
    <div className="product-detail">
      <Suspense fallback={<h2>Loading</h2>}>
        <ProductInfo product={data?.product?.data} />
      </Suspense>

      <RecommendList cateId={cateId}></RecommendList>

     
    </div>
  );
}
