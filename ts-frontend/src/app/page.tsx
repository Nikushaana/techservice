// "use client";

// import { useState } from "react";
// import { BsStarFill } from "react-icons/bs";
// import { IoIosArrowDown } from "react-icons/io";

// export default function Home() {
//   const [activeFaq, setActiveFaq] = useState<number | null>();
//   return (
//     <div className="mt-[-100px] flex flex-col gap-y-[150px] pb-[150px] items-center">
//       <div className="relative flex justify-center w-full">
//         <img
//           src="/images/washingmachine.jpg"
//           alt="logo"
//           className="h-full w-full object-cover absolute inset-0"
//         />

//         <div className="z-[2] w-full bg-[#0000008f] flex justify-center pt-[200px] pb-[150px]">
//           <div className="max-w-[1140px] w-full flex flex-col gap-y-[60px]">
//             <h1 className="text-white text-center text-[50px]">
//               ტექნიკის შეკეთება ასე მარტივი არასდროს ყოფილა.
//             </h1>
//             <hr className="border-gray-300 border-[1px]" />
//             <div className="flex flex-col gap-y-[20px]">
//               <h2 className="text-white text-[30px] mt-[10px]">
//                 შეაკეთე ტექნიკა სახლიდან გაუსვლელად.
//               </h2>
//               <p className="text-white text-[17px]">
//                 შენი კომფორტი ჩვენი პრიორიტეტია – გვაცნობე პრობლემა, ჩვენი
//                 დელივერი ტექნიკას წაიღებს, პროფესიონალი ხელოსანი შეაკეთებს და
//                 ისევ უსაფრთხოდ დაგიბრუნებს.
//               </p>
//               <p className="text-white text-[17px]">
//                 სანდო, სწრაფი და გამჭვირვალე მომსახურება – სწორედ ისე, როგორც
//                 გჭირდება.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-[1140px] w-full flex flex-col gap-y-[150px]">
//         <div className="flex flex-col gap-y-[50px]">
//           <h2 className="text-center text-[30px]">
//             ჩვენ შევაკეთებთ შენს ტექნიკას
//           </h2>
//           <div className="grid grid-cols-5 gap-[40px]">
//             {[
//               {
//                 id: 1,
//                 text: "ჭურჭლის სარეცხი მანქანა",
//                 img: "/images/wurwlissarecxi.png",
//               },
//               {
//                 id: 2,
//                 text: "მაცივარი",
//                 img: "/images/macivari.png",
//               },
//               {
//                 id: 3,
//                 text: "ტელევიზორი",
//                 img: "/images/tv.png",
//               },
//               {
//                 id: 4,
//                 text: "გაზქურა",
//                 img: "/images/gazqura.png",
//               },
//               {
//                 id: 5,
//                 text: "ტელეფონი",
//                 img: "/images/mobile.png",
//               },
//             ].map((item) => (
//               <div
//                 key={item.id}
//                 className="rounded-[10px] border-[2px] border-gray-200 px-[20px] py-[10px] flex flex-col items-center gap-y-[20px]"
//               >
//                 <img
//                   src={item.img}
//                   alt="logo"
//                   className="aspect-square object-contain"
//                 />
//                 <p className="text-center">{item.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 items-stretch gap-[50px]">
//           <div className="flex flex-col gap-y-[40px]">
//             <h2 className="text-[20px] text-gray-400">
//               რატომ უნდა აირჩიოთ ჯესი?
//             </h2>
//             <h2 className="text-[40px] text-myGray">
//               სწრაფი, მარტივი და სანდო სერვისი თქვენი ტექნიკისთვის
//             </h2>
//             <p className="text-myLightGray">
//               ჯესი გაგიმარტივებთ ცხოვრებას: თქვენ მხოლოდ შეავსებთ მოთხოვნას,
//               ჩვენი დელივერი ტექნიკას წაიღებს, ხელოსანი შეაკეთებს და ჩვენ
//               მოგიტანთ უკან. სწრაფი, სანდო და გამჭვირვალე — ყველაფერი ერთი
//               სერვისში.
//             </p>
//             <div className="bg-myLightBlue hover:bg-myBlue self-start duration-100 h-[45px] px-[30px] cursor-pointer rounded-full flex items-center text-white">
//               <p>მოითხოვე სერვისი</p>
//             </div>
//           </div>
//           <img
//             src="/images/washingmachine.jpg"
//             alt="logo"
//             className="rounded-[10px] rounded-tr-[150px] object-cover"
//           />
//         </div>
//       </div>

//       <div className="w-full bg-myLightBlue flex justify-center">
//         <div className="max-w-[1140px] w-full grid grid-cols-4 gap-[40px] py-[50px]">
//           {[
//             {
//               id: 1,
//               num: "2000 +",
//               text: "მომხმარებელი",
//             },
//             {
//               id: 2,
//               num: "3",
//               text: "წლიანი გამოცდილება",
//             },
//             {
//               id: 3,
//               num: "10000 +",
//               text: "შეკეთებული ტექნიკა",
//             },
//             {
//               id: 4,
//               num: "10",
//               text: "პროფესიონალი ტექნიკოსი",
//             },
//           ].map((item) => (
//             <div key={item.id} className="text-white">
//               <h2 className="text-center text-[35px]">{item.num}</h2>
//               <p className="text-center text-[18px]">{item.text}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="max-w-[1140px] w-full flex flex-col gap-y-[150px]">
//         <div className="flex flex-col gap-y-[50px]">
//           <div className="flex flex-col gap-y-[20px]">
//             <h2 className="text-center text-[20px] text-myBlue">
//               გაიცანით ჩვენი გუნდის წევრები!
//             </h2>
//             <h2 className="text-center text-[35px]">
//               გამოცდილება, რომელსაც შეგიძლიათ ენდოთ
//             </h2>
//           </div>
//           <div className="grid grid-cols-4 gap-[40px]">
//             {[1, 2, 3, 4].map((item) => (
//               <div key={item} className="">
//                 <img
//                   src="/images/washingmachine.jpg"
//                   alt="logo"
//                   className="aspect-square object-cover rounded-[10px]"
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="bg-myLightBlue hover:bg-myBlue self-center duration-100 h-[45px] px-[30px] cursor-pointer rounded-full flex items-center text-white">
//             <p>მოითხოვე სერვისი</p>
//           </div>
//         </div>

//         <div className="flex flex-col gap-y-[50px]">
//           <h2 className="text-center text-[30px]">
//             რას ამბობენ ჩვენი მომხმარებლები
//           </h2>
//           <div className="grid grid-cols-2 gap-[60px]">
//             {[
//               {
//                 id: 1,
//                 comment:
//                   "ასეთი სერვისი ჯერ არ მენახა — სახლიდან არ გავსულვარ, ყველაფერი შესანიშნავად მოხდა, შეაკეთეს და უკან მომიტანეს. ძალიან მადლობელი ვარ!",
//                 user: "ლიკა ანაშვილი",
//               },
//               {
//                 id: 2,
//                 comment:
//                   "სწრაფი და კომფორტული სერვისი! ჩემი ჭურჭლის სარეცხი რამდენიმე დღეში უკვე უკეთეს მდგომარეობაში იყო. დელივერიმ მომიტანა ისევ სახლში, ხელოსანმა ძალიან პროფესიონალურად შეასრულა საქმე. მართლა კარგია!",
//                 user: "შავლეგ კაკულია",
//               },
//             ].map((item) => (
//               <div
//                 key={item.id}
//                 className="rounded-[10px] border-[2px] border-gray-200 p-[20px] flex flex-col justify-between gap-y-[10px]"
//               >
//                 <p>{item.comment}</p>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-[10px]">
//                     <img
//                       src="/images/logo.png"
//                       alt="logo"
//                       className="w-[40px] h-[40px] rounded-full"
//                     />
//                     <h2 className="text-center">{item.user}</h2>
//                   </div>

//                   <div className="flex gap-[5px]">
//                     {[1, 2, 3, 4, 5].map((item) => (
//                       <BsStarFill key={item} className="text-amber-300" />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col gap-y-[50px]">
//           <h2 className="text-[30px]">შესაძლოა დაგაინტერესოს</h2>
//           <div className="flex flex-col items-center gap-[30px]">
//             {[
//               {
//                 id: 1,
//                 quest: "როგორ ვაგზავნი სერვისის მოთხოვნას?",
//                 ans: "მარტივია! უბრალოდ შეავსე მოკლე ფორმა ჩვენს ვებგვერდზე, მიუთითე ტექნიკის ტიპი და პრობლემა, და ჩვენი დელივერი მოვა ადგილზე.",
//               },
//               {
//                 id: 2,
//                 quest:
//                   "რამდენ ხანში მოვა დელივერი და რამდენი დრო დასჭირდება შეკეთებას?",
//                 ans: "დელივერი მოვა 24 საათის განმავლობაში, ხოლო შეკეთება საშუალოდ 1–3 სამუშაო დღეს იძენს, დამოკიდებულია პრობლემის სირთულეზე.",
//               },
//               {
//                 id: 3,
//                 quest: "უსაფრთხოა თუ არა ჩემი ტექნიკა ტრანსპორტირების დროს?",
//                 ans: "სრულიად! ჩვენს გუნდში გამოცდილი მძღოლები მუშაობენ, ხოლო მანქანები სრულად მომზადებულია უსაფრთხო ტრანსპორტირებისთვის.",
//               },
//               {
//                 id: 4,
//                 quest: "რამდენად სანდოა სერვისი?",
//                 ans: "ჩვენი გამოცდილი ხელოსნები, პროფესიონალი მძღოლები და ლაივ შეტყობინებები ტელეფონზე ქმნიან სანდო გარემოს, რათა ყოველთვის იცოდეთ, რა ეტაპზეა თქვენი ტექნიკა.",
//               },
//             ].map((item) => (
//               <div
//                 key={item.id}
//                 className="rounded-[10px] border-[2px] border-gray-200 flex flex-col overflow-hidden w-full"
//               >
//                 <div
//                   onClick={() => {
//                     setActiveFaq((pre) => (item.id !== pre ? item.id : null));
//                   }}
//                   className="bg-myLightBlue text-white p-[20px] flex items-center justify-between cursor-pointer"
//                 >
//                   <h1>{item.quest}</h1>
//                   <IoIosArrowDown
//                     className={`text-[20px] duration-300 ${
//                       activeFaq == item.id ? "rotate-[180deg]" : ""
//                     }`}
//                   />
//                 </div>
//                 <div
//                   className={`bg-gray-100 duration-300 px-[20px] ${
//                     activeFaq == item.id ? "py-[20px]" : "opacity-0 h-0 py-0"
//                   }`}
//                 >
//                   <p>{item.ans}</p>
//                 </div>
//               </div>
//             ))}

//             <div className="bg-myLightBlue hover:bg-myBlue self-center duration-100 h-[45px] px-[30px] cursor-pointer rounded-full flex items-center text-white">
//               <p>მოითხოვე სერვისი</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>();
  return (
    <div className="mt-[-100px] flex flex-col gap-y-[150px] pb-[150px] items-center">
      {/* Hero Section */}
      <div className="relative flex justify-center w-full">
        <img
          src="/images/1.webp"
          alt="logo"
          className="h-full w-full object-cover absolute inset-0 blur-[3px]"
        />

        <div className="z-[2] w-full bg-[#0000008f] flex justify-center pt-[150px] sm:pt-[200px] pb-[100px] sm:pb-[150px]">
          <div className="max-w-[1140px] w-full flex flex-col gap-y-[40px] sm:gap-y-[60px] px-4">
            <h1 className="text-white text-center text-[30px] sm:text-[50px]">
              ტექნიკის შეკეთება ასე მარტივი არასდროს ყოფილა.
            </h1>
            <hr className="border-gray-300 border-[1px]" />
            <div className="flex flex-col gap-y-[15px] sm:gap-y-[20px]">
              <h2 className="text-white text-[22px] sm:text-[30px] mt-[10px]">
                შეაკეთე ტექნიკა სახლიდან გაუსვლელად.
              </h2>
              <p className="text-white text-[15px] sm:text-[17px]">
                შენი კომფორტი ჩვენი პრიორიტეტია – გვაცნობე პრობლემა, ჩვენი
                დელივერი ტექნიკას წაიღებს, პროფესიონალი ხელოსანი შეაკეთებს და
                ისევ უსაფრთხოდ დაგიბრუნებს.
              </p>
              <p className="text-white text-[15px] sm:text-[17px]">
                სანდო, სწრაფი და გამჭვირვალე მომსახურება – სწორედ ისე, როგორც
                გჭირდება.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-[1140px] w-full flex flex-col gap-y-[100px] sm:gap-y-[150px] px-4">
        <div className="flex flex-col gap-y-[30px] sm:gap-y-[50px]">
          <h2 className="text-center text-[24px] sm:text-[30px]">
            ჩვენ შევაკეთებთ შენს ტექნიკას
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[20px] sm:gap-[40px]">
            {[
              {
                id: 1,
                text: "ჭურჭლის სარეცხი მანქანა",
                img: "/images/wurwlissarecxi.png",
              },
              { id: 2, text: "მაცივარი", img: "/images/macivari.png" },
              { id: 3, text: "ტელევიზორი", img: "/images/tv.png" },
              { id: 4, text: "გაზქურა", img: "/images/gazqura.png" },
              { id: 5, text: "ტელეფონი", img: "/images/mobile.png" },
            ].map((item) => (
              <div
                key={item.id}
                className="rounded-[10px] border-[2px] border-gray-200 px-[10px] sm:px-[20px] py-[10px] flex flex-col items-center gap-y-[15px] sm:gap-y-[20px]"
              >
                <img
                  src={item.img}
                  alt={item.text}
                  className="aspect-square object-contain w-[50px] sm:w-full"
                />
                <p className="text-center text-[14px] sm:text-[16px]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-[30px] sm:gap-[50px]">
          <div className="flex flex-col gap-y-[25px] sm:gap-y-[40px]">
            <h2 className="text-[18px] sm:text-[20px] text-gray-400">
              რატომ უნდა აირჩიოთ ჯესი?
            </h2>
            <h2 className="text-[30px] sm:text-[40px] text-myGray">
              სწრაფი, მარტივი და სანდო სერვისი თქვენი ტექნიკისთვის
            </h2>
            <p className="text-myLightGray text-[14px] sm:text-[16px]">
              ჯესი გაგიმარტივებთ ცხოვრებას: თქვენ მხოლოდ შეავსებთ მოთხოვნას,
              ჩვენი დელივერი ტექნიკას წაიღებს, ხელოსანი შეაკეთებს და ჩვენ
              მოგიტანთ უკან. სწრაფი, სანდო და გამჭვირვალე — ყველაფერი ერთი
              სერვისში.
            </p>
            <div className="bg-myLightBlue hover:bg-myBlue self-start duration-100 h-[40px] sm:h-[45px] px-[20px] sm:px-[30px] cursor-pointer rounded-full flex items-center text-white">
              <p>მოითხოვე სერვისი</p>
            </div>
          </div>
          <img
            src="/images/washingmachine.jpg"
            alt="washing machine"
            className="rounded-[10px] rounded-tr-[100px] sm:rounded-tr-[150px] object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-myLightBlue flex justify-center">
        <div className="max-w-[1140px] w-full grid grid-cols-2 sm:grid-cols-4 gap-[20px] sm:gap-[40px] py-[40px] sm:py-[50px] px-4">
          {[
            { id: 1, num: "2000 +", text: "მომხმარებელი" },
            { id: 2, num: "3", text: "წლიანი გამოცდილება" },
            { id: 3, num: "10000 +", text: "შეკეთებული ტექნიკა" },
            { id: 4, num: "10", text: "პროფესიონალი ტექნიკოსი" },
          ].map((item) => (
            <div key={item.id} className="text-white text-center">
              <h2 className="text-[28px] sm:text-[35px]">{item.num}</h2>
              <p className="text-[16px] sm:text-[18px]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-[1140px] w-full flex flex-col gap-y-[100px] sm:gap-y-[150px] px-4">
        <div className="flex flex-col gap-y-[40px]">
          <h2 className="text-center text-[28px] sm:text-[35px]">
            რას ამბობენ ჩვენი მომხმარებლები
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] sm:gap-[60px]">
            {[
              {
                id: 1,
                comment:
                  "ასეთი სერვისი ჯერ არ მენახა — სახლიდან არ გავსულვარ, ყველაფერი შესანიშნავად მოხდა, შეაკეთეს და უკან მომიტანეს. ძალიან მადლობელი ვარ!",
                user: "ლიკა ანაშვილი",
              },
              {
                id: 2,
                comment:
                  "სწრაფი და კომფორტული სერვისი! ჩემი ჭურჭლის სარეცხი რამდენიმე დღეში უკვე უკეთეს მდგომარეობაში იყო. დელივერიმ მომიტანა ისევ სახლში, ხელოსანმა ძალიან პროფესიონალურად შეასრულა საქმე. მართლა კარგია!",
                user: "შავლეგ კაკულია",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="rounded-[10px] border-[2px] border-gray-200 p-[15px] sm:p-[20px] flex flex-col justify-between gap-y-[10px]"
              >
                <p>{item.comment}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[10px]">
                    <img
                      src="/images/logo.png"
                      alt={item.user}
                      className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] rounded-full"
                    />
                    <h2 className="text-center text-[14px] sm:text-[16px]">
                      {item.user}
                    </h2>
                  </div>
                  <div className="flex gap-[5px]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <BsStarFill
                        key={star}
                        className="text-amber-300 text-[12px] sm:text-[16px]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-y-[40px]">
          <h2 className="text-[28px] sm:text-[30px]">
            შესაძლებელია დაგაინტერესოს
          </h2>
          <div className="flex flex-col items-center gap-[20px] sm:gap-[30px] w-full">
            {[
              {
                id: 1,
                quest: "როგორ ვაგზავნი სერვისის მოთხოვნას?",
                ans: "მარტივია! უბრალოდ შეავსე მოკლე ფორმა ჩვენს ვებგვერდზე, მიუთითე ტექნიკის ტიპი და პრობლემა, და ჩვენი დელივერი მოვა ადგილზე.",
              },
              {
                id: 2,
                quest:
                  "რამდენ ხანში მოვა დელივერი და რამდენი დრო დასჭირდება შეკეთებას?",
                ans: "დელივერი მოვა 24 საათის განმავლობაში, ხოლო შეკეთება საშუალოდ 1–3 სამუშაო დღეს იძენს, დამოკიდებულია პრობლემის სირთულეზე.",
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
            ].map((item) => (
              <div
                key={item.id}
                className="rounded-[10px] border-[2px] border-gray-200 flex flex-col overflow-hidden w-full"
              >
                <div
                  onClick={() =>
                    setActiveFaq((pre) => (item.id !== pre ? item.id : null))
                  }
                  className="bg-myLightBlue text-white p-[15px] sm:p-[20px] flex items-center justify-between cursor-pointer"
                >
                  <h1 className="text-[14px] sm:text-[16px]">{item.quest}</h1>
                  <IoIosArrowDown
                    className={`text-[18px] sm:text-[20px] duration-300 ${
                      activeFaq == item.id ? "rotate-[180deg]" : ""
                    }`}
                  />
                </div>
                <div
                  className={`bg-gray-100 duration-300 px-[15px] sm:px-[20px] ${
                    activeFaq == item.id
                      ? "py-[15px] sm:py-[20px]"
                      : "opacity-0 h-0 py-0"
                  }`}
                >
                  <p className="text-[14px] sm:text-[16px]">{item.ans}</p>
                </div>
              </div>
            ))}

            <div className="bg-myLightBlue hover:bg-myBlue self-center duration-100 h-[40px] sm:h-[45px] px-[20px] sm:px-[30px] cursor-pointer rounded-full flex items-center text-white">
              <p>მოითხოვე სერვისი</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
