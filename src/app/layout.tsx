import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import React from "react";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import ScrollTop from "./_components/ScrollTop";
config.autoAddCss = false;



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Moklet Portal",
  description: "oluihykgjfth",
   icons:"/assets/icontelkom.ico"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased overflow-x-hidden`}>
        <Navbar />
        <main className="overflow-x-hidden">{children}</main>
        <Footer  />

        {/* Tombol Scroll to Top */}
        <div className="right-5 bottom-5 z-[300] fixed">
          <ScrollTop />
        </div>
      </body>
    </html>
  );
}
