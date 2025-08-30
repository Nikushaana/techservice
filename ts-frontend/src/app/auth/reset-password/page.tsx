"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import FormInput from "@/app/components/inputs/FormInput";
import { useResetPasswordStore } from "@/app/store/resetPasswordStore";

export default function SendResetPasswordCode() {
  const router = useRouter();
  const { values, setValues } = useResetPasswordStore();

  return (
    <div className="w-full flex flex-col gap-y-5 relative">
      <h1 className="text-center text-xl sm:text-2xl font-semibold">
        პაროლის აღდგენა
      </h1>
      <p className="text-center text-sm">
        შეიყვანე გამოგზავნილი კოდი და ახალი პაროლი
      </p>

      <FormInput
        id="code"
        value={values.code || ""}
        onChange={(e) => setValues("code", e.target.value)}
        label="კოდი"
      />
      <FormInput
        id="newPassword"
        value={values.newPassword || ""}
        onChange={(e) => setValues("newPassword", e.target.value)}
        label="ახალი პაროლი"
        type="password"
      />
      <FormInput
        id="repeatNewPassword"
        value={values.repeatNewPassword || ""}
        onChange={(e) => setValues("repeatNewPassword", e.target.value)}
        label="გაიმეორე ახალი პაროლი"
        type="password"
      />

      <Button
        onClick={() => {
          router.push("/auth/login");
        }}
        className="h-11 cursor-pointer"
      >
        აღდგენა
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
