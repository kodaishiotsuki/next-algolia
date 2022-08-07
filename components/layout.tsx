import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import Footer from "./footer";
import { Header } from "./header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
