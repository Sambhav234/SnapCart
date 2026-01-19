import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/Provider";

export const metadata: Metadata = {
  title: "SnapCart | Your Own Delivery App",
  description: "Feels like your local kirana store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body   className="w-full min-h-screen bg-linear-to-b from-green-100">
      <Provider>
        {children}
      </Provider>
      </body>
    </html>
  );
}
