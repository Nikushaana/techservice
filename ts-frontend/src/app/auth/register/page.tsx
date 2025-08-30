"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { useRegisterStore } from "@/app/store/registerStore";
import FormInput from "@/app/components/inputs/FormInput";

export default function Register() {
  const router = useRouter();
  const { userType, setUserType, values, setValues } = useRegisterStore();

  return (
    <div className="w-full flex flex-col gap-y-5 relative">
      <h1 className="text-center text-xl sm:text-2xl font-semibold">
        Tech Service-ში რეგისტრაცია
      </h1>

      <div className="flex gap-6 items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={userType === "individual"}
            onCheckedChange={() => setUserType("individual")}
          />
          <p>ფიზიკური პირი</p>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={userType === "company"}
            onCheckedChange={() => setUserType("company")}
          />
          <p>კომპანია</p>
        </label>
      </div>
      {userType === "individual" ? (
        <>
          <FormInput
            id="name"
            value={values.name || ""}
            onChange={(e) => setValues("name", e.target.value)}
            label="სახელი"
          />
          <FormInput
            id="lastName"
            value={values.lastName || ""}
            onChange={(e) => setValues("lastName", e.target.value)}
            label="გვარი"
          />
        </>
      ) : (
        <>
          <FormInput
            id="companyAgentName"
            value={values.companyAgentName || ""}
            onChange={(e) => setValues("companyAgentName", e.target.value)}
            label="კომპანიის წარმომადგენლის სახელი"
          />
          <FormInput
            id="companyAgentLastName"
            value={values.companyAgentLastName || ""}
            onChange={(e) => setValues("companyAgentLastName", e.target.value)}
            label="კომპანიის წარმომადგენლის გვარი"
          />
          <FormInput
            id="companyName"
            value={values.companyName || ""}
            onChange={(e) => setValues("companyName", e.target.value)}
            label="კომპანიის სახელი"
          />
          <FormInput
            id="companyIdentificationCode"
            value={values.companyIdentificationCode || ""}
            onChange={(e) =>
              setValues("companyIdentificationCode", e.target.value)
            }
            label="კომპანიის საიდენტიფიკაციო კოდი"
          />
        </>
      )}

      <FormInput
        id="password"
        value={values.password || ""}
        onChange={(e) => setValues("password", e.target.value)}
        label="პაროლი"
        type="password"
      />
      <FormInput
        id="repeatPassword"
        value={values.repeatPassword || ""}
        onChange={(e) => setValues("repeatPassword", e.target.value)}
        label="გაიმეორე პაროლი"
        type="password"
      />

      <Button
        onClick={() => {
          router.push("/auth/register");
        }}
        className="h-11 cursor-pointer"
      >
        რეგისტრაცია
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
