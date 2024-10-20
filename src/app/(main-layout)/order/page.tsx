"use client"; // Ensure this component is a client component
import Loading from "@/components/loading/Loading";
import message from "@/components/notification/Notification";
import PromotionsSection from "@/components/promotionsSection/PromotionsSection";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import { RemoveLink } from "@/constants";
import {
  GET_CART_LIST,
  MUTIPLE_DELETE_CART,
} from "@/graphql/cart/cart";
import { UserCartsResponse } from "@/interfaces/cart/cart";
import { fetchUserCart } from "@/lib/fetchUserInfo";
import { orderConfirmationVar, userCartVar } from "@/constants/makevar/makeVar";
import { leftIcon } from "@/utils/icon/icon";
import { Routers } from "@/utils/router";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import OrderForm from "./components/OrderForm";
import OrderSummary from "./components/OrderSummary";
import TabNavigation from "./navigationtab/TabNavigation";
import { CREATE_ORDER } from "@/graphql/order/createOrder";
import { useRouter } from "next/navigation";
import { SHOP_ID } from "@/constants/enviroment";
import { AddressBooksResponse } from "@/interfaces/addressBook/addressBook";
import { QUERY_ADDRESSBOOK } from "@/graphql/address";

interface Item {
  id: string;
  prodId: string;
  imageUrl: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
}

interface OrderFormData {
  userName: string;
  phone: string;
  paymentMethod: string; // Add paymentMethod to form data
  address: {
    province: string;
    district: string;
    ward: string;
    detailedAddress: string;
  };
  prods: Item[];
}

const Order: React.FC = () => {
  const router = useRouter();
  const {
    data: userCartData,
    loading,
    error,
  } = useQuery<UserCartsResponse>(GET_CART_LIST , {
    variables:{
      shopId:SHOP_ID,
    }
  });

  const { data: addressBookData, refetch } =
  useQuery<AddressBooksResponse>(QUERY_ADDRESSBOOK);

  const defaultAddress = addressBookData?.addressBooks.data?.find(item => item.defaultAddress)



  
  const [items, setItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<"order" | "summary">("order");
  const formRef = useRef<{ submit: () => void }>(null);
  const formRefSummary = useRef<{ submit: () => void }>(null);

  const [isFormValid, setIsFormValid] = useState(false); // State for form validation

  const totalItems = userCartData?.userCarts?.links?.totalItems || 0;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [mutationMutipleDeleteCard] = useMutation(MUTIPLE_DELETE_CART);
  const [mutationCreateOrder] = useMutation(CREATE_ORDER);

  useEffect(() => {
    if (userCartData) {
      const formattedItems =
        userCartData?.userCarts?.data?.map((item) => ({
          id: item._id,
          prodId: item.prodId,
          imageUrl: item.product.image[0]?.url
            ? RemoveLink(item.product.image[0].url)
            : "/assets/img/product-default.jpg",
          name: item.product.name,
          price: item.product.price,
          originalPrice: item.product.price,
          quantity: item.quantity,
        })) ?? [];
      setItems(formattedItems);
    }
  }, [userCartData]);

  const onSubmit = (data: OrderFormData) => {

    const formattedData = {
      subTotal: totalPrice, // Set the subtotal if you have it calculated
      paymentMethod: Number(data.paymentMethod),
      deliveryAddress: "",
      userName: data.userName,
      userPhone: data.phone,
      address: {
        province: data.address.province,
        district: data.address.district,
        ward: data.address.ward,
        detailedAddress: data.address.detailedAddress,
      },
      prods: items.map((item) => ({
        price: item.price,
        prodName: item.name,
        itemQuantity: item.quantity,
        prodId: item.prodId,
        thumbnail: item.imageUrl,
      })),
    };
    orderConfirmationVar(formattedData);
    setIsFormValid(true); // Set form valid state
    setActiveTab("summary"); // Move to summary tab on successful submission
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional for smooth scrolling
    });
  };

  const onSubmitSummary = async (data: OrderFormData) => {
    const formattedData = {
      subTotal: totalPrice, // Set the subtotal if you have it calculated
      paymentMethod: Number(data.paymentMethod),
      deliveryAddress: `${data.address.detailedAddress || ""}, ${
        data.address.ward || ""
      }, ${data.address.district || ""}, ${data.address.province || ""}`,
      userName: data.userName,
      userPhone: data.phone,
      prods: items.map((item) => ({
        itemQuantity: item.quantity,
        prodId: item.prodId,
        thumbnail: item.imageUrl,
      })),
      shopId:SHOP_ID,
      trackingNumber:"trackingNumber123123",
    };
    console.log(formattedData);
    
    try {
      // Call the mutation and pass the formatted data
      const { data } = await mutationCreateOrder({
        variables: formattedData,
        fetchPolicy: "network-only",
      });
      const RemoveResponse = await mutationMutipleDeleteCard({
        variables: {
          cartIds: items.map((item) => {
            return item.id;
          }),
        },
        fetchPolicy: "network-only",
      });

      const newCartList = await fetchUserCart();
      userCartVar(newCartList);

      if (data?.createOrder?.success) {
        if (RemoveResponse?.data?.success) {
          userCartVar([]);
        }
        message.success("Đặt hàng thành công");
        router.push(Routers.order.pathOrderComfirm);
      } else {
        message.error("Đặt hàng thất bại");
      }
    } catch (error) {
      // Handle errors from the mutation
      console.error("Error creating order:", error);
    }
  };
  if (loading) return <Loading />;
  if (error) return <p>Error loading cart data.</p>;

  return (
    <div className="bg-teriaty">
      <div className="inner-container">
        <div className="grid lg:grid-cols-12 grid-cols-4 grid-rows-1 gap-12 py-6 pb-[108px] lg:px-0 px-4">
          <div className="lg:col-span-8  col-span-4">
            <div
              className="flex flex-col lg:p-[36px_48px] p-[24px_16px] items-start lg:gap-[24px] gap-4 flex-[1_0_0] bg-white"
              style={{
                boxShadow: "0px 4px 20px 0px rgba(194, 194, 194, 0.50)",
              }}
            >
              <SectionHeader title="Đặt hàng" suggestItem={true} />
              <TabNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isFormValid={isFormValid}
              />

              {/* Order Form or Summary */}
              {activeTab === "order" && (
                <OrderForm
                  defaultAddress={defaultAddress}
                  ref={formRef}
                  onSubmit={onSubmit}
                  items={items}
                  totalItems={totalItems}
                />
              )}
              {activeTab === "summary" && (
                <OrderSummary
                  items={items}
                  ref={formRefSummary}
                  onSubmit={onSubmitSummary}
                />
              )}
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 col-span-4">
            <div
              className="flex w-full lg:p-[36px_48px] p-[24px_16px] flex-col items-center gap-6 flex-shrink-0 self-stretch bg-teriaty"
              style={{
                boxShadow: "0px 4px 20px 0px rgba(194, 194, 194, 0.50)",
              }}
            >
              <div className="flex justify-between items-center self-stretch text-normal">
                <span>Tạm tính: </span>
                <div id="totalPrice" className="text-primary-default">
                  {totalPrice.toLocaleString("vi-VN")}{" "}
                  <span className="underline">đ</span>
                </div>
              </div>
              {/* Move the button here */}
              {activeTab === "order" ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      formRef.current?.submit(); // Call the submit method from the form reference
                    }}
                    className="btn bg-primary-default text-white uppercase"
                  >
                    Tiến tục
                  </button>

                  <Link
                    href={Routers.cart.pathCart}
                    className="btn text-primary-default uppercase"
                  >
                    {leftIcon}
                    Quay lại giỏ hàng
                  </Link>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      formRefSummary.current?.submit(); // Call the submit method from the form reference
                    }}
                    className="btn bg-primary-default text-white uppercase"
                  >
                    Thanh Toán
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("order");
                    }}
                    className="btn text-primary-default uppercase"
                  >
                    {leftIcon}
                    Quay lại
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Order;
