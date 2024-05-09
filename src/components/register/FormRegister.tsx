"use client";

import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import ButtonFB from "../UI/ButtonFB";
import Link from "next/link";

export default function FormRegister() {
  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        {/* <div className="mb-2 block">
          <Label htmlFor="name" value="Nombres" />
        </div> */}
        <TextInput id="name" type="email" placeholder="Nombres" required />
      </div>
      <div>
        {/* <div className="mb-2 block">
          <Label htmlFor="lastName" value="Apellidos" />
        </div> */}
        <TextInput
          id="lastName"
          type="text"
          placeholder="Apellidos"
          required
        />
      </div>
      <div>
        {/* <div className="mb-2 block">
          <Label htmlFor="dni" value="Dni" />
        </div> */}
        <TextInput id="dni" type="text" placeholder="Dni" required />
      </div>
      <Select id="Genero" required>
        <option>Genero</option>
        <option>Masculino</option>
        <option>Femenino</option>
        <option>Otro</option>
      </Select>
      <div>
        {/* <div className="mb-2 block">
          <Label htmlFor="email" value="Correo Electrónico" />
        </div> */}
        <TextInput
          id="email"
          type="email"
          placeholder="Correo Electrónico"
          required
        />
      </div>
      <div>
        {/* <div className="mb-2 block">
          <Label htmlFor="password" value="Contraseña" />
        </div> */}
        <TextInput
          id="password"
          type="password"
          required
          placeholder="Contraseña"
        />
      </div>
      <div>
        {/* <div className="mb-2 block">
          <Label htmlFor="password" value="Contraseña" />
        </div> */}
        <TextInput
          id="password"
          type="password"
          required
          placeholder="Confirmar Contraseña"
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">
          Acepto los términos y condiciones del servicio
        </Label>
      </div>
      <Link href="/iniciar_sesion">
        <ButtonFB text="Registro" />
      </Link>
    </form>
  );
}
