import RatingCard from "@/components/ratingCard/RatingCard";
import DisplayStars from "@/components/renderStars/DisplayStars";
import { RemoveLink } from "@/constants";
import { IProduct } from "@/interfaces/product/product";
import { useState } from "react";
import RatingModal from "./ratingModal";

type Props = {
  product: IProduct;
};

const ProductDescription = ({ product }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  // State to manage how many reviews are visible
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Number of reviews to show initially
  const INITIAL_REVIEWS_COUNT = 3;

  // Function to handle showing more reviews
  const handleShowMoreReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  // Modal review Open
  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalReviewOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalReviewOpen(false);
  };

  const reviewData =
    Array.isArray(product.review) && product.review.length > 0
      ? product.review.map((item) => {
          return {
            name: item.user.userName ?? "",
            imageUrl: item.user.avatar
              ? RemoveLink(item.user.avatar)
              : "./assets/img/avatar.svg",
            review: item.comment ?? "",
            ratingNumber: item.rating ?? 0,
          };
        })
      : [];

  // Reviews to display (initial 3 or all based on state)
  const visibleReviews = showAllReviews
    ? reviewData
    : reviewData.slice(0, INITIAL_REVIEWS_COUNT);

  return (
    <div className="flex w-full p-[36px] flex-col items-start gap-6 flex-[4] lg:flex-[3] bg-white shadow-[0px_4px_20px_0px_rgba(194,194,194,0.50)]">
      <div className="flex justify-center items-center gap-4 w-full border-b  border-neutral-gray-20">
        <button
          onClick={() => setActiveTab("description")}
          className={`py-2 text-normal uppercase ${
            activeTab === "description"
              ? "border-b-2 border-primary-default"
              : "text-neutral-gray-40"
          }`}
        >
          Mô tả sản phẩm
        </button>

        <button
          onClick={() => setActiveTab("rating")}
          className={`py-2 text-normal uppercase ${
            activeTab === "rating"
              ? "border-b-2 border-primary-default"
              : "text-neutral-gray-40"
          }`}
        >
          Đánh giá sản phẩm
        </button>
      </div>
      <RatingModal prodId={product._id}  isModalOpen={isModalReviewOpen} handleCloseModal={handleCloseModal}/>
      
      {activeTab === "description" && (
        <>
          <h2 className="text-normal uppercase">
            Balo đeo chéo 14 inch có ngăn chống trộm thẻ từ Mark Ryden MR7633
          </h2>
          <div
            className="product-content-detail"
            dangerouslySetInnerHTML={{
              __html: isExpanded
                ? product.description
                : product.description.substring(0, 3000),
            }}
          ></div>

          <div className="flex items-center justify-center font-medium text-primary-default w-full">
            {product.description.length >= 3000 && (
              <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? (
                  <>
                    <p className="flex items-center justify-center gap-1 text-primary-default">
                      Rút gọn
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex items-center justify-center gap-1 text-primary-default">
                      Xem thêm
                    </p>
                  </>
                )}
              </button>
            )}
          </div>
        </>
      )}

      {activeTab === "rating" && (
        <>
          <div className="flex w-full p-4 justify-center items-center gap-6 self-stretch bg-teriaty lg:flex-row flex-col">
            <div className="flex text-normal gap-6">
              <span>
                {Number(product.ratingCount)} trên 5
              </span>
              <DisplayStars rating={Number(product.ratingCount)} />
            </div>
            <button
              className="btn border border-primary-default text-primary-default"
              onClick={handleOpenModal}
            >
              Đánh giá
            </button>
          </div>
          <div className="flex flex-col items-start gap-3 py-4 self-stretch">
            {visibleReviews.map((review, index) => (
              <RatingCard
                key={index}
                name={review.name}
                imageUrl={review.imageUrl}
                review={review.review}
                ratingNumber={review.ratingNumber}
                fullw={true}
              />
            ))}

            {/* Show "See more" button only if there are more than 3 reviews */}
            {reviewData.length > INITIAL_REVIEWS_COUNT && (
              <button
                onClick={handleShowMoreReviews}
                className="text-primary-default mt-4 w-full flex  justify-center items-center"
              >
                {showAllReviews ? "Rút gọn" : "Xem thêm"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDescription;
