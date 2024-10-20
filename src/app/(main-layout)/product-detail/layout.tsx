import React from "react";

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="product-detail-layout">{children}</div>;
}
