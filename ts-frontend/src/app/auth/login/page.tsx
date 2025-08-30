"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useLoginStore } from "@/app/store/loginStore";
import FormInput from "@/app/components/inputs/FormInput";

export default function Login() {
  const router = useRouter();
  const { values, setValues } = useLoginStore();

  return (
    <div className="w-full flex flex-col gap-y-5 relative">
      <h1 className="text-center text-xl sm:text-2xl font-semibold">
        Tech Service-ში შესვლა
      </h1>
      <FormInput
        id="phone"
        value={values.phone || ""}
        onChange={(e) => setValues("phone", e.target.value)}
        label="ტელეფონის ნომერი"
      />
      <FormInput
        id="password"
        value={values.password || ""}
        onChange={(e) => setValues("password", e.target.value)}
        label="პაროლი"
        type="password"
      />

      <p
        onClick={() => {
          router.push("/auth/send-reset-password-code");
        }}
        className="self-end cursor-pointer hover:underline text-sm"
      >
        დაგავიწყდა პაროლი?
      </p>

      <Button
        onClick={() => {
          router.push("/");
        }}
        className="h-11 cursor-pointer"
      >
        შესვლა
      </Button>

      {/* Footer link */}
      <p
        onClick={() => {
          router.push("/auth/send-register-code");
        }}
        className="absolute bottom-[-95px] self-center cursor-pointer border-b-[1px] border-transparent hover:border-gray-700 text-sm  mt-3 z-10 text-stroke"
      >
        არ გაქვს ანგარიში? - გაიარე რეგისტრაცია
      </p>
    </div>
  );
}
