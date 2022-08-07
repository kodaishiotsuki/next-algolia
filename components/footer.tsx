import Image from "next/image";
import Link from "next/link";
import React from "react";

const links = [
  {
    label: "ホーム",
    path: "/",
  },
  {
    label: "記事検索",
    path: "/search",
  },
  {
    label: "設定",
    path: "/setting",
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-100 py-10 border-t mt-10">
      <div className="container">
        <div className="mb-6">
          <Link href="/">
            <a className="flex">
              <Image src="/logo.svg" width={160} height={32} alt="Logo" />
            </a>
          </Link>
        </div>
        <div className="container">
          <h2 className="mb-3 text-slate-600">メニュー</h2>
          <ul className="space-y-2">
            {links.map((link) => (
              <>
                <li>
                  <Link href={link.path} key={link.label}>
                    <a className="hover:text-blue-500">{link.label}</a>
                  </Link>
                </li>
              </>
            ))}
          </ul>
          <p className="mt-4 text-slate-500">© 2022 kodai</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
