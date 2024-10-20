"use client";
import dynamic from "next/dynamic";
import React from "react";
import ScrollToTop from "./scrollToTop";

const Header = dynamic(() => import("@/components/header/Header"));
const Footer = dynamic(() => import("@/components/footer/Footer"));

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return ( 
    <div className="flex flex-col min-h-screen justify-between bg-teriaty">
      <Header/>
      <section>{children}</section>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default MainLayout;
