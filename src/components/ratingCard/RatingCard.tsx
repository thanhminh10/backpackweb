import React from "react";
import DisplayStars from "../renderStars/DisplayStars";

function RatingCard({
  name,
  imageUrl,
  review,
  fullw = false,
  ratingNumber
}: {
  name: string;
  imageUrl: string;
  review: string;
  fullw?: boolean;
  ratingNumber?:number;
}) {
 
  return fullw !== true ? (
    <div className="flex flex-col items-start gap-4 p-4 w-full lg:w-[300px] bg-white shadow-[0px_4px_20px_0px_rgba(194,194,194,0.5)]">
      <div className="flex items-center gap-[18px] self-stretch">
        <div
          className="rating-info w-[54px] h-[54px] rounded-full bg-lightgray bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>

        <div className="flex flex-col min-w-[143px] items-start gap-2">
          <span className="text-normal">{name}</span>
          <DisplayStars rating={Number(ratingNumber)}/>
        </div>
      </div>

      <p className="text-normal leading-[140%] overflow-hidden overflow-ellipsis line-clamp-4">
        {review}
      </p>
    </div>
  ) : (
    <div className="flex flex-col items-start gap-4 py-4 w-full bg-white">
      <div className="flex items-center gap-[18px] self-stretch">
        <div
          className="rating-info w-[54px] h-[54px] rounded-full bg-lightgray bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>

        <div className="flex flex-col min-w-[143px] items-start gap-2">
          <span className="text-normal">{name}</span>
          <DisplayStars rating={Number(ratingNumber)}/>
        </div>
      </div>

      <p className="text-normal leading-[140%] overflow-hidden overflow-ellipsis line-clamp-4">
        {review}
      </p>
    </div>
  );
}

export default RatingCard;
