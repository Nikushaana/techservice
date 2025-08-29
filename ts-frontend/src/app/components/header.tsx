// "use client";

// import React, { useState } from "react";

// export default function Header() {
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
//   return (
//     <div className="z-20 h-[100px] max-w-[1140px] w-full flex items-center justify-between">
//       <img src="/images/logo.png" alt="logo" className="h-[60px]" />

//       <div className="flex">
//         {menu.map((item) => (
//           <h1
//             key={item.id}
//             className="px-[20px] cursor-pointer text-white hover:text-myLightBlue duration-100"
//           >
//             {item.text}
//           </h1>
//         ))}
//       </div>

//       <div className="bg-myLightBlue hover:bg-myBlue duration-100 h-[45px] px-[30px] cursor-pointer rounded-full flex items-center text-white">
//         <p>მოითხოვე სერვისი</p>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [menu, setMenu] = useState([
    { id: 1, text: "მთავარი" },
    { id: 2, text: "რატომ ჯესი?" },
    { id: 3, text: "შეფასებები" },
    { id: 4, text: "FAQ" },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="z-20 w-full">
      <div className="max-w-[1140px] mx-auto flex items-center justify-between h-[100px] px-4">
        <img src="/images/logo.png" alt="logo" className="h-[60px]" />

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          {menu.map((item) => (
            <h1
              key={item.id}
              className="cursor-pointer text-white hover:text-myLightBlue duration-100"
            >
              {item.text}
            </h1>
          ))}
        </nav>

        {/* Request Button (Desktop) */}
        <div className="hidden md:flex bg-myLightBlue hover:bg-myBlue duration-100 h-[45px] px-[20px] sm:px-[30px] cursor-pointer rounded-full items-center text-white">
          <p>მოითხოვე სერვისი</p>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
