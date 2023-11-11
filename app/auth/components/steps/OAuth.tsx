import { Button } from "@/components/ui/button";
import { getUserByEmail } from "@/services/user";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { PiSpinnerLight } from "react-icons/pi";
import { useAuthContext } from "../../context/auth";
import errorToast from "@/utils/errorToast";

export default function OAuth() {
  const supabase = createClientComponentClient();
  const sessionUser = useRef<null | User>(null);
  const router = useRouter();
  const {  setNewUser, setIsLoading, isLoading, setCanChangeStep } =
    useAuthContext();

  const onClick = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth",
      },
    });
  };
  const auth = async () => {
    try {
      setIsLoading(true);
      const session = await supabase.auth.getSession();
      sessionUser.current = session?.data?.session?.user || null;
      const email = sessionUser.current?.email;
      const profileAvatar = sessionUser.current?.user_metadata.avatar_url;
      
      if (!profileAvatar || !email) return
      
      const usr = await getUserByEmail(email);
      const isNewUsr = !!!usr;
      await supabase.auth.signOut();

      if (isNewUsr) {
        setNewUser({
          email,
          profile_avatar: profileAvatar,
        });
        setCanChangeStep(true);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    auth();
  }, []);
  return (
    <div className="flex justify-center flex-col gap-2 min-w-[300px]">
      <Button
        disabled={isLoading}
        variant={"outline"}
        className="flex gap-2 items-center text-lg"
        onClick={onClick}
      >
        <span>Auth with Google</span>
        <span>
          <FcGoogle />
        </span>
        {isLoading && (
          <span className="animate-spin">
            <PiSpinnerLight />
          </span>
        )}
      </Button>
    </div>
  );
}
