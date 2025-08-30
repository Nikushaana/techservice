"use client";

import { useBurgerMenuStore } from "@/app/store/burgerMenuStore";
import { useMenuStore } from "@/app/store/useMenuStore";
import { scrollToSection } from "@/app/utils/scroll";
import React from "react";

export default function BurgerMenu() {
  const menu = useMenuStore((state) => state.menu);
  const { isOpen, closeBurgerMenu } = useBurgerMenuStore();
  return (
    <div
      className={`${
        isOpen
          ? "rounded-tr-[180px] inset-0"
          : "rounded-tr-[700px] ml-[-100vw] top-[200px] left-[-100vw]"
      } duration-300 fixed z-20 bg-[#000000a7] w-[100vw] h-[100vh] overflow-hidden`}
    >
      <div
        className={`
      ${!isOpen && "ml-[-300px]"}      
          duration-1000 bg-white h-full w-[300px] px-4 overflow-hidden`}
      >
        <div
          className={`w-full h-full ${
            isOpen ? "" : "ml-[320px]"
          } duration-1000 py-[20px] flex flex-col gap-6`}
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-[60px] aspect-square self-start"
          />

          <nav className="flex flex-col gap-6">
            {menu.map((item) => (
              <h1
                key={item.id}
                onClick={() => {
                  scrollToSection(item.target);
                  closeBurgerMenu();
                }}
                className="cursor-pointer text-myLightGray hover:text-myLightBlue duration-100"
              >
                {item.text}
              </h1>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
