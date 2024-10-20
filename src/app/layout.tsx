import ApolloWrapper from "@/lib/apolloProvider";
import { Mulish } from "@next/font/google";
import type { Metadata } from "next";
import "../app/globals.css";

const mulish = Mulish({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  weight: ["200", "400", "600", "700", "800", "1000", "900"], // Specify the weights you want to use
});

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_METADATA_TITLE}`,
  description: `${process.env.NEXT_PUBLIC_METADATA_DESCRIPTION}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body className={mulish.className}>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
