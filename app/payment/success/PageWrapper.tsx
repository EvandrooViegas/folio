"use client";
import { Button } from "@/components/ui/button";
import { isCheckoutSessionComplete } from "@/services/stripe";
import { getAuthedUserID, getUserByID, updateUser } from "@/services/user";
import errorToast from "@/utils/errorToast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PageWrapper() {
  const params = useSearchParams();
  const sessionID = params.get("session_id") || undefined;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const check = async () => {
    setIsLoading(true);
    const isValid = await isCheckoutSessionComplete(sessionID);
    console.log(isValid);
    if (!isValid) return;
    const usrID = await getAuthedUserID();
    if (!usrID) return errorToast();
    const usr = await getUserByID(usrID);
    console.log(usr);

    if (usr?.pretended_plan && isValid) {
      const d = new Date();
      d.setMonth(d.getMonth() + 1);
      await updateUser(usrID, {
        ...usr,
        plan: usr.pretended_plan,
        plan_end_date: d.toISOString(),
      });
      toast.success(`Plan updated successfully: ${usr.plan}`);
    } else {
      return errorToast();
    }
    setIsLoading(false);
  };

  const onClick = () => {
    router.push("/dashboard");
  };
  useEffect(() => {
    check();
  }, []);

  return (
    <div>
      <Button disabled={isLoading} onClick={onClick}>
        Continue
      </Button>
    </div>
  );
}
