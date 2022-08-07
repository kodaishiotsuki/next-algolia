import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header>
      <div className="flex items-center h-14 border-b container">
        <Link href="/">
          <a className="flex">
            <Image src="/logo.svg" width={160} height={32} alt="Logo" />
          </a>
        </Link>
        <span className="flex-1" />
        <span className="rounded-full bg-slate-300 w-9 h-9" />
      </div>
    </header>
  );
};
