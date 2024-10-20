// lib/apolloClient.ts

import { appConfig } from "@/utils/config";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client";

// Tạo httpLink để kết nối tới API GraphQL
const httpLink = createHttpLink({
  uri: appConfig.uri, // URL của API GraphQL
});

// Tạo authLink để thêm token vào header
const authLink = setContext((_, { headers }) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "", // Thêm token vào header
    },
  };
});

// Link để bắt và xử lý lỗi
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      console.log(`[GraphQL error]: Message: ${message}`);
      if (message === "UNAUTHENTICATED" || message === "Token Expired") {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token"); // Xóa token khi không hợp lệ
          window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
        }
      }
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// Kết hợp các link lại với nhau
const link = ApolloLink.from([errorLink, authLink.concat(httpLink)]);

// Khởi tạo Apollo Client
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;