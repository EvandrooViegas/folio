"use client";
import { Button } from "@/components/ui/button";
import { isCheckoutSessionComplete } from "@/services/stripe";
import { getUserByID, updateUser } from "@/services/user";
import errorToast from "@/utils/errorToast";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";


export default function PageWrapper() {
  const params = useSearchParams();
  const sessionID = params.get("session_id") || undefined;

  const check = async () => {
    const isValid = await isCheckoutSessionComplete(sessionID);
    const usrID = localStorage.getItem("user");
    localStorage.removeItem("user");
    if (!usrID) return errorToast();
    const usr = await getUserByID(usrID);

    if (usr?.pretended_plan && isValid) {
      updateUser(usrID, {
        ...usr,
        plan: usr.pretended_plan,
      });
    } else {
      return errorToast();
    }
  };
  useEffect(() => {
    check();
  }, []);

  return (
    <div>
      <Button>Create portal session</Button>
    </div>
  );
}
