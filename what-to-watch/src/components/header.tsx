"use client";

import Link from "next/link";
import ButtonComponent from "./button";
import LinkComponent from "./link";
import Image from "next/image";
import { Button, MegaMenu } from "flowbite-react";
import MenuHamburguer from "./menu-hamburguer";

export default function Header() {
  return (
    <header className="w-full h-16 px-4 bg-transparent absolute top-0 left-0 z-10">
      <div className="flex items-center justify-between p-4 container">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            className="filter-[blur(2.5px)_blur(5px)_blur(7.5px)_blur(10px)_saturate(10)_brightness(.2)]
             overflow-hidden absolute"
            width={200}
            height={100}
            alt="Logo"
          />

          <Image
            className="relative z-10"
            src="/logo.svg"
            width={200}
            height={100}
            alt="Logo"
          />
        </Link>

        <MegaMenu className="bg-black/60 hidden md:block gap-2 p-2 rounded-sm border border-stone-900/45">
          <ul className="flex gap-2">
            <li>
              <LinkComponent href="/">Item One</LinkComponent>
            </li>
            <li>
              <LinkComponent href="/">Item One</LinkComponent>
            </li>
            <li>
              <LinkComponent href="/">Item One</LinkComponent>
            </li>
          </ul>
        </MegaMenu>

        <MenuHamburguer />

        <div className="hidden items-center gap-6   md:flex">
          <Button
            color={"primary"}
            className="text-amber-400 cursor-pointer hover:text-white bg-black/70 hover:bg-amber-500 border py-2 px-4 border-amber-500 rounded-full
             transition "
          >
            <Link href={"/login"}>Login</Link>
          </Button>
          <ButtonComponent>
            <Link href={"/"}>Registrar</Link>
          </ButtonComponent>
        </div>
      </div>
    </header>
  );
}
