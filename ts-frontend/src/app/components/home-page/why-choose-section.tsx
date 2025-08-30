"use client"

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function WhyChooseSection() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-[30px] sm:gap-[50px]">
      <div className="flex flex-col gap-y-[25px] sm:gap-y-[40px]">
        <h2 className="text-[18px] sm:text-[20px] text-gray-400">
          რატომ უნდა აირჩიოთ Tech-Service?
        </h2>
        <h2 className="text-[30px] sm:text-[40px] text-myGray">
          სწრაფი, მარტივი და სანდო სერვისი თქვენი ტექნიკისთვის
        </h2>
        <p className="text-myLightGray text-[14px] sm:text-[16px]">
          Tech-Service გაგიმარტივებთ ცხოვრებას: თქვენ მხოლოდ შეავსებთ მოთხოვნას,
          ჩვენი დელივერი ტექნიკას წაიღებს, ხელოსანი შეაკეთებს და ისევ მოგიტანთ
          უკან. სწრაფი, სანდო და გამჭვირვალე — ყველაფერი ერთ სერვისში.
        </p>
        <Button
          onClick={() => {
            router.push("/auth/login");
          }}
          className="flex h-[45px] px-[20px] sm:px-[30px] self-start cursor-pointer"
        >
          მოითხოვე სერვისი
        </Button>
      </div>
      <img
        src="/images/washingmachine.jpg"
        alt="washing machine"
        className="rounded-[10px] rounded-tr-[100px] sm:rounded-tr-[150px] object-cover w-full h-full"
      />
    </div>
  );
}
