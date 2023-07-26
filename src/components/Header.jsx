import DropdownMenu from "./DropdownMenu";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div class="flex h-16 items-center justify-between border-b-2 border-b-sunset bg-klein-blue">
      <Link href="/" class="flex items-center ml-32">
        <Image src="/logo.png" alt="Logo" width={30} height={30} />
      </Link>
      <div class="flex items-center space-x-16">
        <Link
          href="/"
          className="px-4 py-2 text-lg font-mono font-bold text-slate-300 "
        >
          Home
        </Link>
        <div>
          <DropdownMenu />
        </div>
      </div>
      <a href="#" class="mr-32  text-slate-300 font-mono font-bold">
        Login
      </a>
    </div>
  );
}
