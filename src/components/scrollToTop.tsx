"use client";
import { UpIcon } from "@/utils/icon/icon";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [showBtn, setShowBtn] = useState(false);
  const isServer = () => typeof window === "undefined";

  function scrollToTop() {
    if (!isServer()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const handleScrollEvent = () => {
    if (window.scrollY > 400) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {showBtn && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12  rounded-full shadow-lg hover:bg-[#EBF4F6] flex items-center justify-center"
          style={{
            backgroundColor: "#EBF4F6",
            color: "rgba(0, 0, 0, 0.88)",
            fontSize: "18px",
            lineHeight: "18px",
          }}
        >
          {UpIcon}
        </button>
      )}
    </div>
  );
}
