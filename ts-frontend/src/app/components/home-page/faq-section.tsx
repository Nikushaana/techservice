"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function FaqSection() {
  const router = useRouter();
  const [activeFaq, setActiveFaq] = useState<number | null>();

  const [faq, setFaq] = useState([
    {
      id: 1,
      quest: "როგორ ვაგზავნი სერვისის მოთხოვნას?",
      ans: "მარტივია! უბრალოდ შეავსე მოკლე ფორმა ჩვენს ვებგვერდზე, მიუთითე ტექნიკის ტიპი და პრობლემა, და ჩვენი დელივერი მოვა ადგილზე.",
    },
    {
      id: 2,
      quest: "რამდენ ხანში მოვა დელივერი და რამდენი დრო დასჭირდება შეკეთებას?",
      ans: "დელივერი მოვა 24 საათის განმავლობაში, ხოლო შეკეთება საშუალოდ 1–3 სამუშაო დღეს საჭიროებს, დამოკიდებულია პრობლემის სირთულეზე.",
    },
    {
      id: 3,
      quest: "უსაფრთხოა თუ არა ჩემი ტექნიკა ტრანსპორტირების დროს?",
      ans: "სრულიად! ჩვენს გუნდში გამოცდილი მძღოლები მუშაობენ, ხოლო მანქანები სრულად მომზადებულია უსაფრთხო ტრანსპორტირებისთვის.",
    },
    {
      id: 4,
      quest: "რამდენად სანდოა სერვისი?",
      ans: "ჩვენი გამოცდილი ხელოსნები, პროფესიონალი მძღოლები და ლაივ შეტყობინებები ტელეფონზე ქმნიან სანდო გარემოს, რათა ყოველთვის იცოდეთ, რა ეტაპზეა თქვენი ტექნიკა.",
    },
  ]);

  return (
    <div className="flex flex-col gap-y-[40px]">
      <h2 className="text-[28px] sm:text-[30px]">შესაძლებელია დაგაინტერესოს</h2>
      <div className="flex flex-col items-center gap-[20px] sm:gap-[30px] w-full">
        {faq.map((item) => (
          <div
            key={item.id}
            className="rounded-[10px] border-[2px] border-gray-200 flex flex-col overflow-hidden w-full"
          >
            <div
              onClick={() =>
                setActiveFaq((pre) => (item.id !== pre ? item.id : null))
              }
              className="bg-myLightBlue hover:bg-myBlue duration-200 text-white p-[15px] sm:p-[20px] flex items-center justify-between cursor-pointer"
            >
              <h1 className="text-[14px] sm:text-[16px]">{item.quest}</h1>
              <IoIosArrowDown
                className={`text-[18px] sm:text-[20px] duration-300 ${
                  activeFaq == item.id ? "rotate-[180deg]" : ""
                }`}
              />
            </div>
            <div
              className={`bg-gray-100 duration-300 px-[15px] sm:px-[20px] overflow-y-scroll showScroll ${
                activeFaq == item.id
                  ? "py-[15px] sm:py-[20px] h-[150px]"
                  : "opacity-0 h-0 py-0"
              }`}
            >
              <p className="text-[14px] sm:text-[16px]">{item.ans}</p>
            </div>
          </div>
        ))}

        <Button
          onClick={() => {
            router.push("/auth/login");
          }}
          className="flex h-[45px] px-[20px] sm:px-[30px] self-center cursor-pointer"
        >
          მოითხოვე სერვისი
        </Button>
      </div>
    </div>
  );
}
