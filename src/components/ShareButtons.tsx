import Image from "next/image";
import React from "react";

interface ShareButtonProps {
  platform:
    | "facebook"
    | "twitter"
    | "linkedin"
    | "reddit"
    | "pinterest"
    | "whatsapp";
  url: string;
  text?: string;
  imageUrl?: string;
  width: number;
  height: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  platform,
  url,
  text,
  imageUrl,
  width,
  height,
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = text ? encodeURIComponent(text) : "";
  const encodedImageUrl = imageUrl ? encodeURIComponent(imageUrl) : "";

  const getShareLink = () => {
    switch (platform) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
      case "linkedin":
        return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`;
      case "reddit":
        return `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`;
      case "pinterest":
        return `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImageUrl}&description=${encodedText}`;
      case "whatsapp":
        return `https://wa.me/?text=${encodedText} ${encodedUrl}`;
      default:
        return "";
    }
  };

  const getIconSrc = () => {
    switch (platform) {
      case "facebook":
        return "/assets/icon/icon-facebook.svg"; // Thay đổi đường dẫn tới hình ảnh động của bạn
      case "twitter":
        return "/assets/icon/icon-facebook.svg";
      case "linkedin":
        return "/assets/icon/icon-facebook.svg";
      case "reddit":
        return "/assets/icon/icon-facebook.svg";
      case "pinterest":
        return "/assets/icon/icon-facebook.svg";
      case "whatsapp":
        return "/assets/icon/icon-facebook.svg";
      default:
        return "";
    }
  };

  return (
    <a
      href={getShareLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
    >
      <Image
        width={width}
        height={height}
        src={getIconSrc()}
        alt={`${platform} icon`}
        className="h-6 w-6"
      />
      <span>Share</span>
    </a>
  );
};

export default ShareButton;
