import Link from "next/link";
import AuthButton from "../global/AuthButton";

export default async function Navbar() {
  return (
    <nav className="z-nav fixed top-0 inset-x-0  backdrop-blur-xl bg-white/20">
      <div className="max-app-width mx-auto flex items-center py-6 px-8 justify-between">
        <Link href={"/"}>
          <span className="font-paytone font-black text-4xl tracking-tight">
            FOLIO
          </span>
        </Link>
        <ul className="flex gap-3 items-center">
            <Link href="/auth">
            <AuthButton />
            </Link>
        </ul>
      </div>
    </nav>
  );
}
