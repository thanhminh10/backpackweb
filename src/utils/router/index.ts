import { articleRouter } from "./article";
import { CartRouter } from "./cart";
import { contactRouter } from "./contact-form";
import { homeRouter } from "./home";
import { introduceRouter } from "./introduce";
import { orderRouter } from "./order";
import { productRouter } from "./product";
import { ProfileRouter } from "./profile";

export const Routers = {
    home: new homeRouter(),
    product: new productRouter(),
    article:new articleRouter(),
    contact: new contactRouter(),
    introduce: new introduceRouter(),
    cart: new CartRouter(),
    order: new orderRouter(),
    profile: new ProfileRouter(),
};
