// "use client";

// import React, { useState } from "react";
// import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";

// export default function Footer() {
//   const [menu, setMenu] = useState([
//     {
//       id: 1,
//       text: "მთავარი",
//     },
//     {
//       id: 2,
//       text: "რატომ ჯესი?",
//     },
//     {
//       id: 3,
//       text: "შეფასებები",
//     },
//     {
//       id: 4,
//       text: "FAQ",
//     },
//   ]);

//   const [other, setOther] = useState([
//     {
//       id: 1,
//       text: "ჩვენი კომპანია",
//     },
//     {
//       id: 2,
//       text: "კონფიდენციალურობის პოლიტიკა",
//     },
//     {
//       id: 3,
//       text: "წესები და პირობები",
//     },
//     {
//       id: 4,
//       text: "ჩვენს შესახებ",
//     },
//     {
//       id: 5,
//       text: "პასუხისმგებლობის შეზღუდვა",
//     },
//   ]);
//   return (
//     <div className="max-w-[1140px] w-full rounded-t-[40px] px-[60px] py-[75px] border-[2px] border-gray-300 bg-gray-100 flex justify-between">
//       <div className="flex flex-col gap-y-[40px]">
//         <img src="/images/logo.png" alt="logo" className="w-[60px]" />
//         <div className="text-myLightGray">
//           <p>ჯესი — პირველი სრულად ციფრული სერვისი თქვენი ტექნიკისთვის</p>
//         </div>
//         <div className="flex gap-[40px] text-[30px]">
//           <BsFacebook className="text-myGray hover:text-myLightBlue duration-100 cursor-pointer" />
//           <BsTwitter className="text-myGray hover:text-myLightBlue duration-100 cursor-pointer" />
//           <BsYoutube className="text-myGray hover:text-myLightBlue duration-100 cursor-pointer" />
//         </div>
//       </div>
//       <div className="flex gap-[60px]">
//         <div className="flex flex-col gap-y-[15px]">
//           <h1 className="text-[25px] text-myGray">სწრაფი ძიება</h1>
//           {menu.map((item) => (
//             <p
//               key={item.id}
//               className="cursor-pointer text-myLightGray hover:text-myLightBlue duration-100"
//             >
//               {item.text}
//             </p>
//           ))}
//         </div>
//         <div className="flex flex-col gap-y-[15px]">
//           <h1 className="text-[25px] text-myGray">სხვა ინფორმაცია</h1>
//           {other.map((item) => (
//             <p
//               key={item.id}
//               className="cursor-pointer text-myLightGray hover:text-myLightBlue duration-100"
//             >
//               {item.text}
//             </p>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";

export default function Footer() {
  const [menu] = useState([
    { id: 1, text: "მთავარი" },
    { id: 2, text: "რატომ ჯესი?" },
    { id: 3, text: "შეფასებები" },
    { id: 4, text: "FAQ" },
  ]);

  const [other] = useState([
    { id: 1, text: "ჩვენი კომპანია" },
    { id: 2, text: "კონფიდენციალურობის პოლიტიკა" },
    { id: 3, text: "წესები და პირობები" },
    { id: 4, text: "ჩვენს შესახებ" },
    { id: 5, text: "პასუხისმგებლობის შეზღუდვა" },
  ]);

  return (
    <footer className="w-full bg-gray-100 border-t-[2px] border-gray-300">
      <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-4 py-10 md:py-20 gap-10 md:gap-0 rounded-t-[40px]">
        {/* Logo & Social */}
        <div className="flex flex-col gap-6 md:gap-10 w-full md:w-auto">
          <img src="/images/logo.png" alt="logo" className="w-[60px]" />
          <p className="text-myLightGray text-sm md:text-base max-w-[250px]">
            ჯესი — პირველი სრულად ციფრული სერვისი თქვენი ტექნიკისთვის
          </p>
          <div className="flex gap-6 text-2xl md:text-3xl">
            <BsFacebook className="text-myGray hover:text-myLightBlue duration-100 cursor-pointer" />
            <BsTwitter className="text-myGray hover:text-myLightBlue duration-100 cursor-pointer" />
            <BsYoutube className="text-myGray hover:text-myLightBlue duration-100 cursor-pointer" />
          </div>
        </div>

        {/* Menus */}
        <div className="flex flex-col sm:flex-row gap-10 md:gap-20 w-full md:w-auto">
          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[20px] md:text-[25px] text-myGray font-semibold">
              სწრაფი ძიება
            </h1>
            {menu.map((item) => (
              <p
                key={item.id}
                className="cursor-pointer text-myLightGray hover:text-myLightBlue duration-100 text-sm md:text-base"
              >
                {item.text}
              </p>
            ))}
          </div>

          {/* Other Info */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[20px] md:text-[25px] text-myGray font-semibold">
              სხვა ინფორმაცია
            </h1>
            {other.map((item) => (
              <p
                key={item.id}
                className="cursor-pointer text-myLightGray hover:text-myLightBlue duration-100 text-sm md:text-base"
              >
                {item.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
