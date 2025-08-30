"use client";

import React from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "./ui/button";
import { useMenuStore } from "../store/useMenuStore";
import { scrollToSection } from "../utils/scroll";
import { useBurgerMenuStore } from "../store/burgerMenuStore";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const menu = useMenuStore((state) => state.menu);
  const { isOpen, toggleBurgerMenu } = useBurgerMenuStore();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="z-10 w-full">
      <div className="max-w-[1140px] mx-auto flex items-center justify-between h-[100px] px-4">
        <img
          onClick={() => {
            router.push("/");
          }}
          src="/images/logo.png"
          alt="logo"
          className="h-[60px] cursor-pointer"
        />

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          {menu.map((item) => (
            <h1
              key={item.id}
              onClick={() => {
                if (pathname.split("/")[1]) {
                  router.push("/");
                } else {
                  scrollToSection(item.target);
                }
              }}
              className={`${
                pathname.split("/")[1] ? "text-myGray" : "text-white"
              } cursor-pointer hover:text-myLightBlue duration-100`}
            >
              {item.text}
            </h1>
          ))}
        </nav>

        {/* Request Button (Desktop) */}
        <Button
          onClick={() => {
            router.push("/auth/login");
          }}
          className="hidden md:flex h-[45px] px-[20px] sm:px-[30px] cursor-pointer"
        >
          მოითხოვე სერვისი
        </Button>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleBurgerMenu}
            className={`${
              pathname.split("/")[2] ? "text-myGray" : "text-white"
            } text-2xl focus:outline-none duration-150 ${
              isOpen && "rotate-[180deg]"
            }`}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
