"use client";

import { Button, Checkbox, Label, TextInput, Card } from "flowbite-react";
import Link from "next/link";

export default function FormLogin() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Correo Electrónico" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="Correo Electrónico"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Contraseña" />
        </div>
        <TextInput
          id="password1"
          type="password"
          required
          placeholder="Contraseña"
          width={1}
        />
      </div>
      <Link href={"/compra_boleto"}>
        <Button
          type="submit"
          className="bg-primary rounded-3xl enabled:hover:bg-primary"
          size={"xl"}
        >
          <span className="font-bold text-2xl">Iniciar Sesión</span>
        </Button>
      </Link>
      <div className="flex text-primary justify-between w-full">
        <Link href={"/registro"}>
          <p className="font-bold">Registrarme</p>
        </Link>
        <Link href={"/#"}>
          <p className="font-bold">Olvide mi contraseña</p>
        </Link>
      </div>
    </form>
  );
}
