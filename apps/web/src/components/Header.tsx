"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

type SubMenu = {
  title: string;
  items: Array<{ title: string, link: string }>;
};

type MenuItem = {
  title: string;
  link: string;
  subMenu?: SubMenu;
};

type HeaderProps = {
  logo: string;
  menuItems: MenuItem[];
  onClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ logo, menuItems, onClick }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleMenuClick = (index: number, menuItem: MenuItem) => {
    console.log(menuItem);
    if (menuItem.subMenu) {
      setOpenMenuIndex(openMenuIndex === index ? null : index);
    } else {
      router.push(`/${menuItem.title.toLowerCase()}`);
    }
  };

  const handleSubmenuClick = (parent: string | undefined, subMenu: string) => {
    router.push(`/${parent?.toLowerCase()}/${subMenu.toLowerCase()}`);
  };

  return (
    <div className="bg-white shadow-md mx-[30px] rounded-md px-4">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <div className="lg:flex space-x-4">
          {menuItems.map((menuItem, index) => (
            <div
              key={index}
              className="relative group hover:bg-slate-200 p-3 rounded-lg"
            >
              <Link href={menuItem.link}>
                <a className="text-gray-700 hover:text-gray-900 flex items-center">
                  {menuItem.title}
                </a>
                {menuItem.subMenu && (
                  <svg
                    className={`ml-1 fill-current transition-transform duration-200 ${
                      openMenuIndex === index ? "rotate-90" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 7l5 5-5 5V7z" />
                  </svg>
                )}
              </Link>
              {menuItem.subMenu && openMenuIndex === index && (
                <div className="absolute w-[120px] left-[-10px] mt-[30px] bg-white shadow-md  justify-center items-center text-center  rounded-xl">
                  {menuItem.subMenu.items.map((subItem, subIndex) => (
                    <Link
                    href={subItem.link}
                      key={subIndex}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          onClick={onClick}
        >
          Button
        </button>
      </div>
    </div>
  );
};

export default Header;
