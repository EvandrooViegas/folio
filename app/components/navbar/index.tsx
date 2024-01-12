import Link from "next/link";
import AuthButton from "../../../components/global/AuthButton";
import { Button } from "../../../components/ui/button";
import Image from "next/image"
export default async function Navbar() {
  return (
    <nav className="z-nav fixed top-0 inset-x-0  backdrop-blur-xl bg-white/20">
      <div className="max-app-width mx-auto flex items-center py-3 px-8 justify-between">
        <Link href={"/"}>
          <Image src="/logo/white-green.png" width={70} height={70}  />
        </Link>
        <ul className="flex gap-3 items-center">
        <Link href="/dashboard">
          <Button variant="secondary">
            Dashboard
          </Button>
          </Link>
          <Link href="/auth">
            <AuthButton />
          </Link>
        </ul>
      </div>
    </nav>
  );
}
