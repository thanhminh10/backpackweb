import React from "react";
import RatingCard from "@/components/ratingCard/RatingCard"; // Đường dẫn đến RatingCard component

function Rating() {
  const ratingsData = [
    {
      name: "Darlene Robertson",
      imageUrl: "./assets/img/avatar.svg",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.."
    },
    {
      name: "John Doe",
      imageUrl: "./assets/img/avatar2.svg",
      review: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
    },
    {
      name: "Jane Smith",
      imageUrl: "./assets/img/avatar.svg",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.."
    },
    {
      name: "Michael Johnson",
      imageUrl: "./assets/img/avatar.svg",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.."
    }
  ];

  return (
    <div className="flex justify-center gap-4 lg:gap-9 flex-wrap">
      {ratingsData.map((rating, index) => (
        <RatingCard
          key={index}
          name={rating.name}
          imageUrl={rating.imageUrl}
          review={rating.review}
        />
      ))}
    </div>
  );
}

export default Rating;