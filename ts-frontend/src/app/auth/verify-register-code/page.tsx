"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { useRegisterStore } from "@/app/store/registerStore";
import FormInput from "@/app/components/inputs/FormInput";

export default function VerifyRegisterCode() {
  const router = useRouter();
  const { values, setValues } = useRegisterStore();

  return (
    <div className="w-full flex flex-col gap-y-5 relative">
      <h1 className="text-center text-xl sm:text-2xl font-semibold">
        რეგისტრაცია
      </h1>
      <p className="text-center text-sm">
        შეიყვანე ტელეფონის ნომერზე გამოგზავნილი 4 ნიშნა კოდი
      </p>

      <FormInput
        id="code"
        value={values.code || ""}
        onChange={(e) => setValues("code", e.target.value)}
        label="კოდი"
      />

      <Button
        onClick={() => {
          router.push("/auth/register");
        }}
        className="h-11 cursor-pointer"
      >
        შემოწმება
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
