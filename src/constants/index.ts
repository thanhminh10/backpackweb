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
  const baseUrl = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "";

  const formattedStr = str.replace(/\s/g, "%20");

  if (formattedStr && formattedStr.includes("https://")) {
    // Nếu là một URL đầy đủ, chỉ thay thế domain
    const strRegex = baseUrl + formattedStr.replace(/^.*\/\/[^\/]+/, "");
    return strRegex;
  } else if (formattedStr.startsWith("/")) {
    // Nếu là một đường dẫn tương đối bắt đầu bằng "/", thêm baseUrl vào
    return baseUrl + formattedStr;
  } else {
    // Trường hợp khác, trả về chuỗi gốc hoặc xử lý tùy theo yêu cầu
    return baseUrl + "/" + formattedStr;
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
