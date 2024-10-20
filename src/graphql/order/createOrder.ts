import { gql } from "@apollo/client";

export const CREATE_ORDER = gql `
mutation CreateOrder($prods: [OrderItemInput]!, $subTotal: Int!, $paymentMethod: Int!, $deliveryAddress: String!, $userName: String!, $userPhone: String!, $shopId: String!, $trackingNumber: String!) {
  createOrder(prods: $prods, subTotal: $subTotal, paymentMethod: $paymentMethod, deliveryAddress: $deliveryAddress, userName: $userName, userPhone: $userPhone, shopId: $shopId, trackingNumber: $trackingNumber) {
    message
    success
    data {
      _id
      subTotal
      quantity
      paymentStatus
      paymentMethod
      deliveryAddress
      userName
      userPhone
      userId
      shopId
      createdAt
      orderItem {
        _id
        name
        price
        itemQuantity
        thumbnail
        orderId
        createdAt
      }
    }
  }
}
`