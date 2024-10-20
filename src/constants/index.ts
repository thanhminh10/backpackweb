export const formatPrice = (num: number) =>
  String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const Remove = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
};
export const formatDateTime = (date: number) => {
  const string = new Intl.DateTimeFormat("vn-VN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(date);
  return string;
};

export const formatDate = (date: number) => {
  const dateFormatter = new Intl.DateTimeFormat("vn-VN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const [day, month, year] = dateFormatter
    .formatToParts(date)
    .map(({ type, value }) => {
      return type === "day" || type === "month" || type === "year" ? value : "";
    });
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const Strip = (html: string) => {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};
export const removeTags = (str: string) => {
  if (str === null || str === "") return;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, " ");
};
export const RemoveLink = (str: string) => {
  const baseUrlAdmin = "https://eshopadmin.s500.vn/_next/image";
  const baseUrlApi = "https://eshopapi.s500.vn";
  
  // Check if it's a relative path
  if (str.startsWith("/uploads")) {
    // Encode the URL part for the 'url' parameter
    const encodedUrl = encodeURIComponent(baseUrlApi + str);
    
    // Construct the final URL with the required parameters
    return `${baseUrlAdmin}?url=${encodedUrl}&w=1080&q=75`;
  } else {
    // Handle other cases if needed
    return str;
  }
};

export const removeEmptyTags = (htmlString: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Lấy tất cả các thẻ
  const elements = doc.body.querySelectorAll("*");

  elements.forEach((element) => {
    // Kiểm tra nếu thẻ không có nội dung và không có giá trị
    if (!element.textContent?.trim() && !element.hasAttribute("src")) {
      element.remove();
    }
  });

  return doc.body.innerHTML;
};
