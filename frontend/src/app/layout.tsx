import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NotLoggedNavBar from "./components/NotLoggedNavBar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: " SparFinder 🥊",
  description: "SparFinder - Find your sparring partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 
        
        YOU SHOULD ADD LOGIC HERE SO THAT HEADER AND FOOTER ARE ON EVERY PAGE
        IF USER LOGGED IN DISPLAY DIFFERENT HEADER.

        */}
        <NotLoggedNavBar></NotLoggedNavBar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
