"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { useRegisterStore } from "@/app/store/registerStore";
import FormInput from "@/app/components/inputs/FormInput";

export default function SendRegisterCode() {
  const router = useRouter();
  const { values, setValues } = useRegisterStore();

  return (
    <div className="w-full flex flex-col gap-y-5 relative">
      <h1 className="text-center text-xl sm:text-2xl font-semibold">
        რეგისტრაცია
      </h1>
      <p className="text-center text-sm">
        Tech Service-ში რეგისტრაციისთვის საჭიროა ტელეფონის ნომრით ვერიფიკაცია
      </p>

      <FormInput
        id="phone"
        value={values.phone || ""}
        onChange={(e) => setValues("phone", e.target.value)}
        label="ტელეფონის ნომერი"
      />

      <Button
        onClick={() => {
          router.push("/auth/verify-register-code");
        }}
        className="h-11 cursor-pointer"
      >
        გაგზავნა
      </Button>

      {/* Footer link */}
      <p
        onClick={() => {
          router.push("/auth/login");
        }}
        className="absolute bottom-[-95px] self-center cursor-pointer border-b-[1px] border-transparent hover:border-gray-700 text-sm  mt-3 z-10 text-stroke"
      >
        გაქვს ანგარიში? - გაიარე ავტორიზაცია
      </p>
    </div>
  );
}
