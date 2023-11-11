"use client";
import { Button } from "@/components/ui/button";
import { isCheckoutSessionComplete } from "@/services/stripe";
import { getUserByID, updateUser } from "@/services/user";
import errorToast from "@/utils/errorToast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";


export default function PageWrapper() {
  const params = useSearchParams();
  const sessionID = params.get("session_id") || undefined;
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const check = async () => {
    setIsLoading(true)
    const isValid = await isCheckoutSessionComplete(sessionID);
    const usrID = localStorage.getItem("user");
    localStorage.removeItem("user");
    if (!usrID) return errorToast();
    const usr = await getUserByID(usrID);

    if (usr?.pretended_plan && isValid) {
      const d = new Date()
      d.setMonth(d.getMonth() + 1)
      updateUser(usrID, {
        ...usr,
        plan: usr.pretended_plan,
        plan_end_date: d.toISOString()
      });
    } else {
      return errorToast();
    }
    setIsLoading(false)

  };

  const onClick= () => {
    router.push("/dashboard")
  }
  useEffect(() => {
    check();
  }, []);

  return (
    <div>
      <Button disabled={isLoading} onClick={onClick}>Continue</Button>
    </div>
  );
}
