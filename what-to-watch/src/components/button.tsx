import { Button } from "flowbite-react";
import React from "react";

export default function ButtonComponent({ children }: React.PropsWithChildren) {
  return (
    <Button
      className="rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.25)] bg-gradient-to-l from-wine-950 to-wine-300 
        px-6 py-2 text-white duration-300 transition hover:contrast-150 cursor-pointer"
    >
      {children}
    </Button>
  );
}
