"use client";

import { useBurgerMenuStore } from "@/app/store/burgerMenuStore";
import { useMenuStore } from "@/app/store/useMenuStore";
import { scrollToSection } from "@/app/utils/scroll";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "../ui/button";

export default function BurgerMenu() {
  const menu = useMenuStore((state) => state.menu);
  const { isOpen, closeBurgerMenu } = useBurgerMenuStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`${
        isOpen
          ? "rounded-tr-[180px] inset-0"
          : "rounded-tr-[700px] ml-[-100vw] top-[200px] left-[-100vw]"
      } duration-300 fixed z-20 bg-[#000000a7] w-[100vw] h-[100vh] overflow-hidden shadow-2xl shadow-[black]`}
    >
      <div
        className={`
      ${!isOpen && "ml-[-300px]"}      
          duration-1000 bg-gray-100 h-full w-[300px] px-4 overflow-hidden`}
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

          <Button
            onClick={() => {
              router.push("/auth/login");
            }}
            className="flex h-[45px] cursor-pointer"
          >
            მოითხოვე სერვისი
          </Button>

          <nav className="flex flex-col gap-6">
            {menu.map((item) => (
              <h1
                key={item.id}
                onClick={() => {
                  if (pathname.split("/")[1]) {
                    router.push("/");
                  } else {
                    scrollToSection(item.target);
                    closeBurgerMenu();
                  }
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
