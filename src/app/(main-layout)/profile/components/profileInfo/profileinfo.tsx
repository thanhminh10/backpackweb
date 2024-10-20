import { useState } from "react";
import InfoSection from "./infoSection/infoSection";
import AddressSection from "./adressSection/addressSection";


function Profileinfo() {
  const [showContent2, setShowContent2] = useState(false);

  // Hàm xử lý sự kiện khi nhấn nút
  const handleButtonClick = () => {
    setShowContent2(!showContent2); // Hiển thị nội dung 2
  };
  return (
    <>
      {/* Nội dung 1 */}
      {!showContent2 && (
        <InfoSection   handleButtonClick={handleButtonClick}/>
      )}

      {/* Nội dung 2 */}
      {showContent2 && (
        <AddressSection  handleButtonClick={handleButtonClick}/>
      )}
    </>
  );
}

export default Profileinfo;
