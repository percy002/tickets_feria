"use client";
import { Alert, Button } from "flowbite-react";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="bg-portada w-screen h-screen bg-center bg-cover">
        <div className="flex flex-col justify-between py-8 h-4/6">
          <div className="w-full flex justify-between px-8">
            <img
              src="images/logos/logo_gore2.png"
              alt="logo gobierno regional del cusco"
              className="w-36 md:w-48 object-contain"
            />
            <img
              src="images/logos/logo_feria_huancaro.png"
              alt="logo gobierno regional del cusco"
              className="w-36 md:w-52 object-contain"
            />
          </div>
          <div className="flex justify-center">
            <p className="text-white font-bold text-3xl text-center">
              !Compre su entrada ahora¡
            </p>
          </div>
          <div className="flex justify-center">
            <Link href={"/comprar_boleto"}>
              <Button className="bg-primary enabled:hover:bg-white enabled:hover:text-primary border-4 border-white enabled:hover:border-primary px-6 font-bold rounded-3xl">
                <span className="text-2xl font-bold">COMPRA TU ENTRADA</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
