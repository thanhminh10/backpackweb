import dynamic from "next/dynamic";
import React from "react";
import ScrollToTop from "@/components/scrollToTop";
import ApolloWrapper from "@/lib/apolloProvider";
import MainLayout from "@/components/MainLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <MainLayout>{children}</MainLayout>
    </ApolloWrapper>
  );
}
