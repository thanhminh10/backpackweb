import { IProduct } from "@/interfaces/product/product";
import React from "react";
import ProductCard from "../productCard/ProductCard";
import clsx from "clsx";

interface ProductListProps {
  products: IProduct[];
  itemnumber? : number,
  col?:number
}

const ProductList: React.FC<ProductListProps> = ({ products, itemnumber = 4 ,col}) => {
  return (
    col != 1 ? 
    <div className="min-w-full">
      <div
        className={clsx(
          "grid gap-4 lg:gap-6",
          "grid-cols-2 md:grid-cols-3",
          { "xl:grid-cols-3": itemnumber === 3,
            "xl:grid-cols-4": itemnumber === 4,
            "xl:grid-cols-5": itemnumber === 5,
            "xl:grid-cols-6": itemnumber === 6,
          }
        )}
      >
        {products.map((product, productIndex) => (
          <ProductCard col={col} key={productIndex} product={product} />
        ))}
      </div>
    </div>:
      <div className="min-w-full">
        <div className="flex flex-col gap-4 w-full">
        {products.map((product, productIndex) => (
            <ProductCard col={col} key={productIndex} product={product} />
          ))}
        </div>
      </div>
  );
};

export default ProductList;
