import Link from "next/link";
import { PropsWithChildren } from "react";

export default function LinkComponent({
  children,
  href,
}: PropsWithChildren<{ href: string }>) {
  return (
    <Link
      href={href}
      className="flex group items-center gap-1 text-gray-300 hover:text-white hover:contrast-150 transition duration-300 relative 
      before:absolute before:transition-all before:block before:h-[1px] before:w-0 before:bg-amber-500 before:-bottom-1 hover:before:w-full
      "
    >
      {children}
    </Link>
  );
}
