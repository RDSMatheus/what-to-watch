"use client";

import ButtonComponent from "./button";
import Divider from "./divider";
import useRandomBgPosition from "@/hooks/useRandomBgPosition";

export default function HeroSection() {
  const bgPosition = useRandomBgPosition();
  const position = {
    top: "bg-top",
    center: "bg-center",
    bottom: "bg-bottom",
  };

  return (
    <main
      className={`h-dvh w-full pt-16 bg-[url(/posters.jpg)] relative grid gap-4 place-content-center bg-cover ${position[bgPosition]} bg-fixed  text-white`}
    >
      <div className="absolute w-full h-dvh bg-black/80 sm:bg-black/60 top-0 left-0"></div>
      <div className="container grid gap-4 place-items-start relative shadow z-10">
        <h1 className="font-montserrat uppercase font-extrabold text-3xl md:text-5xl tracking-wider text-shadow-[0_1px_0_rgba(0,0,0,0.8),_0_2px_2px_rgba(0,0,0,0.6),_0_4px_4px_rgba(0,0,0,0.4)]">
          Descubra filmes perfeitos pra você
        </h1>
        <p className="text-lg text-shadow-[0_1px_0_rgba(0,0,0,0.8),_0_2px_2px_rgba(0,0,0,0.6),_0_4px_4px_rgba(0,0,0,0.4)]">
          Recomendações personalizadas, lançamentos e clássicos selecionados
          para seu gosto.
        </p>
        <ButtonComponent>Comece agora</ButtonComponent>
      </div>
      <Divider />
    </main>
  );
}
