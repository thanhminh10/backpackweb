"use client";
import Breadcrumb from "@/components/Breadcrumb";
import ProductImages from "@/components/ProductImages";
import { GET_ARTICLES } from "@/graphql/article/getArticles";
import { GET_BRANDS } from "@/graphql/brand/getBrands";
import { IArticleResponse } from "@/interfaces/article/Article.d";
import { IBrandResponse } from "@/interfaces/brand/brand";
import { IProduct } from "@/interfaces/product/productDetails";
import { useQuery } from "@apollo/client";
import ProductDetails from "./components/productDetails";
import ProductDescription from "./components/productDescription";
import RelatedArticles from "./components/relatedArticles";
import { SHOP_ID } from "@/constants/enviroment";

type Props = {
  product: IProduct;
};

export default function ProductInfo(prop: Props) {
  const { product } = prop;
  const productData = product;

  const breadcrumbRoutes = [
    {
      label: "Trang chủ",
      href: "/",
    },
    {
      label: productData?.category?.name
        ? `${productData?.category?.name}`
        : "Sản phẩm",
      href: productData?.category?.name
        ? `/product-list?_id=${productData?.category?._id}`
        : "/product-list/hot-product",
    },
    { label: `${productData?.name}` }, // This is the current page, so no href
  ];

  const { data: articlesData } = useQuery<IArticleResponse>(GET_ARTICLES, {
    variables: { pageSize: 3, pageIndex: 1, sort: -1 },
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

  if (!product) {
    return <p>No product data available.</p>;
  }
  return (
    <div className="product-detail bg-teriaty">
      <div className="inner-container">
        <Breadcrumb routes={breadcrumbRoutes} />
        <div className="flex items-start flex-col lg:flex-row self-stretch px-4 py-4 lg:py-9 lg:px-0 gap-4 lg:gap-12">
          {/* Image Carousel */}

          <ProductImages
            mainImage={productData?.image ? productData?.image[0] : {}}
            thumbnails={productData?.image ? productData?.image : []}
          />

          {/* Product Details */}
          <ProductDetails product={product} />
        </div>
        {/* Product Des */}
        <div className="flex items-start gap-[48px] self-stretch flex-col lg:flex-row px-4 py-4 lg:py-0 lg:px-0">
          <ProductDescription product={product} />
          <RelatedArticles
            articles={articlesData}
            brandsLoading={brandsLoading}
            brandsError={brandsError}
            brandsData={brandsData?.brands.data}
          />
        </div>
      </div>
    </div>
  );
}
