"use client";

import ProductList from '@/components/productList/ProductList';
import SectionHeader from '@/components/sectionHeader/SectionHeader';
import { GET_HOT_PRODUCTS } from '@/graphql/product/getlistHotProducts';
import { IGetHotProductData } from '@/interfaces/product/product';
import { useQuery } from '@apollo/client';
import React from 'react';

export default function ProductSuggest() {
  const {
    data: hotProductData,
    loading: hotProductLoading,
    error: hotProductError,
  } = useQuery<IGetHotProductData>(GET_HOT_PRODUCTS, { variables: { pageIndex: 1, pageSize: 5, sort: -1 } });

  if (hotProductLoading) {
    return <div>Loading...</div>; // Show a loading state
  }

  if (hotProductError) {
    return <div>Error: {hotProductError.message}</div>; // Show an error message
  }

  return (
    <div className='flex flex-col gap-9'>
      <SectionHeader
        title="Sản phẩm nổi bật"
        suggestItem={true}
      />
      <ProductList
        products={hotProductData?.hotProducts?.data || []} // Use fallback to an empty array
        itemnumber={1}
        col={1}
      />
    </div>
  );
}
