import Image from "next/image";
import { useState } from "react";
import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay?: number | null) => {
  const savedCallback = useRef<() => void>(() => null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }
  }, [delay]);
};

const Card = ({
  src,
  idx,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  src: string;
  idx: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  let style = {};

  if (idx === 0) {
    style = {
      zIndex: 0,
    };
  } else if (idx === 5) {
    style = {
      zIndex: 0,
    };
  } else if (idx === 1 || idx === 4) {
    style = {
      zIndex: 1,
    };
  } else if (idx === 2 || idx === 3) {
    style = {
      zIndex: 2, // Làm nổi bật phần tử giữa
      transition: "transform 0.2s ease",
    };
  }

  return (
    <div
      className="card"
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Image
        src={src}
        alt={`Card ${idx}`}
        layout="fill"
        className="absolute top-0 left-0 object-contain"
      />
    </div>
  );
};



interface Item {
  id: string;
  image: string;
  name: string;
}

interface CarouselProps {
  listData: Item[];
}

const Carousel: React.FC<CarouselProps> = ({ listData }) => {
  const [arr, setArr] = useState<Item[]>([]);
  const [rest, setRest] = useState<Item[]>([]);
  const [isScrolling, setIsScrolling] = useState<boolean>(true);

  // Sử dụng useEffect để cập nhật state khi listData thay đổi
  useEffect(() => {
    if (listData) {
      setArr(listData.slice(0, 6)); // Hiển thị 6 phần tử
      setRest(listData.slice(6));
    }
  }, [listData]);

  const updateArr = (idx?: number) => {
    if (!listData) return; // Kiểm tra trước khi tiếp tục

    const [a, b, c, d, e, f] = arr; // Lấy 6 phần tử

    if (idx === 0) {
      const lastRem = rest[rest.length - 1];
      const beforeArr = [lastRem, a, b, c, d, e];
      const beforeRem = [f, ...rest.slice(0, rest.length - 1)];
      setArr(beforeArr);
      setRest(beforeRem.length ? beforeRem : listData.slice(6));
    } else {
      const firstRem = rest[0];
      const afterArr = [b, c, d, e, f, firstRem];
      const afterRem = [...rest.slice(6), a];

      setArr(afterArr);
      setRest(afterRem.length ? afterRem : listData.slice(6));
    }
  };

  useInterval(
    () => {
      updateArr();
    },
    isScrolling ? 3000 : null
  );

  return (
    <div className="bg-neutral-gray-20 flex flex-col items-center gap-6 py-6 px-4 lg:px-20 lg:py-4 self-stretch">
      <div className="inner-container">
        <div className="relative flex justify-between flex-wrap items-center gap-4 lg:gap-[30px]">
          {arr.map((item, idx) => (
            <Card
              key={item.id} // Sử dụng id của item
              idx={idx}
              src={item.image} // Sử dụng thuộc tính image
              onClick={() => updateArr(idx)}
              onMouseEnter={() => setIsScrolling(false)}
              onMouseLeave={() => setIsScrolling(true)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
