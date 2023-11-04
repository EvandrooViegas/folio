"use client";

import { Button } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import env from "@/services/env";

export default function AuthButton() {
    const supabase = createClientComponentClient({
        supabaseKey: env.supabaseKey,
        supabaseUrl: env.supabaseUrl,
      });
    const onClick = async () => {
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: location.origin + "/dashboard",
          },
        });
      };
    return (
        <Button onClick={onClick}>Start for free!</Button>

    )
}