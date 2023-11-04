import Link from "next/link";
import AuthButton from "../global/AuthButton";
import userService from "@/services/user";
import Image from "next/image";
import { Button } from "../ui/button";

export default async function Navbar() {
  const isLoggedIn = await userService.isUserLoggedIn();
  const user = await userService.getAuthedUser();
  return (
    <nav className="z-nav fixed top-0 inset-x-0  backdrop-blur-xl bg-white/20">
      <div className="max-app-width mx-auto flex items-center py-6 px-8 justify-between">
        <Link href={"/"}>
          <span className="font-paytone font-black text-4xl tracking-tight">
            FOLIO
          </span>
        </Link>
        <ul className="flex gap-3 items-center">
        <Button variant="secondary">
            Dashboard
        </Button>
        {isLoggedIn && user ? (
            <Image
              src={user.profile_avatar}
              alt="User profile"
              className="rounded-full"
              width={60}
              height={60}
            />
        ) : (
          <AuthButton />
        )}
        </ul>
      </div>
    </nav>
  );
}
