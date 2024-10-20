"use client";
import { searchIcon, searchIconBlue } from "@/utils/icon/icondefine";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { SearchHeader } from "./searchHeader";
import { formatPrice, RemoveLink } from "@/constants";

const Search: React.FC = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { autocomplete } = SearchHeader(inputValue);

  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen(true);
  };

  const HandleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/search?slug=" + inputValue), setInputValue("");
  };

  const HandlePush = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    router.push(`/product-detail/${slug}`), setInputValue("");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.addEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative h-[40px] md:h-[48px] w-full">
      <form onSubmit={HandleSearch} className="w-full h-full gap-2">
        <div className="relative w-full h-full gap-2 bg-white px-4 py-0 lg:py-3 rounded-[36px] border-b border-[#DDD]">
          <button className="absolute  w-[40px] h-[40px] lg:w-12 lg:h-12  right-1  top-0 lg:right-0 bg-none lg:bg-primary-default  flex items-center justify-center rounded-full">
            {searchIcon}
            {searchIconBlue}
          </button>
          <input
            ref={inputRef}
            onClick={handleClick}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Tìm kiếm..."
            className="absolute top-0 left-0 bottom-0 right-0 w-full px-4 py-0 lg:py-3 text-16 font-300 bg-transparent outline-none placeholder:italic "
          />
          {inputValue && (
            <div
              ref={ref}
              id="debounce-search"
              className={`${
                isOpen ? "flex" : "hidden"
              } bg-white w-full top-14 lg:top-16  bottom-0 left-0 right-0 min-h-fit absolute z-50 flex-col p-6 rounded-b-[12px] shadow-[0_4px_20px_0_rgba(194,194,194,0.5)]`}
            >
              {autocomplete.map((search: any) =>
                search ? (
                  <button
                    type="button"
                    className="flex p-4 items-center gap-[10px] self-stretch hover:rounded-xl hover:bg-[#EBF4F6]"
                    onClick={(e) => HandlePush(e, search?.slug)}
                    key={search?._id}
                  >
                    <div
                      style={{
                        backgroundImage: `url('${
                          search.image && search.image.length > 0
                            ? RemoveLink(search.image[0].url)
                            : ""
                        }')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      className="w-[54px] h-[54px] border border-[#E2E7EB] bg-lightgray bg-center bg-cover"
                    ></div>
                    <div className="flex flex-col justify-center items-start gap-[4px] flex-1">
                      <div className="text-start line-clamp-1 self-stretch">
                        {search.name}
                      </div>
                      <div className="flex h-[28px] items-center gap-[16px] self-stretch">
                        <div className="text-normal text-primary-default">
                          {formatPrice(search.price)}{" "}
                          <span className="underline">đ</span>
                        </div>
                        <span className="text-[#2D2E2F] text-[12px] font-normal leading-[110%] line-through">
                          {formatPrice(search.price)}
                        </span>
                      </div>
                    </div>
                  </button>
                ) : (
                  <span key={search?._id}>
                    Không có sản phẩm nào được tìm thấy
                  </span>
                )
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
