"use client";

import { Button, Checkbox, Label, TextInput, Card } from "flowbite-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState,useContext } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
export default function FormLogin() {
  const router = useRouter();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    router.replace('/');
    return;
    // throw new Error("AuthContext is undefined");
  }

  const { user, setUser, loading } = authContext;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try{

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_VENTA_BOLETOS_API_URL}/api/v1/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
  
      if (!response.ok) {
        const errors = Object.values(data.errors).flat().join("\n");
        console.log(errors);

        throw new Error(errors || "¡Algo salió mal!");        
      }
      sessionStorage.setItem('access_token', data.token);
      sessionStorage.setItem('token_type', data.token_type);
      setUser(data.user);
      console.log(user);
      
      Swal.fire({
        title: "Bienvenido",
        text: "Iniciaste sesión correctamente",
        icon: "success",
        // timer: 1000,
        showConfirmButton: true,
      }).then(() => {
        console.log(user);
        router.push("/comprar_boleto");
      });
    } catch (error: any) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error desconocido.";
      Swal.fire("¡Error!", message, "error");
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
    console.log(formData);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Expresión regular que excluye caracteres especiales
    const regex = /^[a-zA-Z0-9@._-]*$/;

    if (regex.test(value)) {
      setFormData({
        ...formData,
        [e.target.id]: value,
      });
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Expresión regular que coincide con los caracteres no deseados
    const regex = /[^a-zA-Z0-9]/;

    if (!regex.test(value)) {
      setFormData({
        ...formData,
        [e.target.id]: value,
      });
    }
  };
  return (
    <div className="">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Correo Electrónico" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="Correo Electrónico"
            
            onChange={handleEmailChange}
            value={formData.email}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Contraseña" />
          </div>
          <TextInput
            id="password"
            type="password"
            
            placeholder="Contraseña"
            width={1}
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <Button
          type="submit"
          className="bg-primary rounded-3xl enabled:hover:bg-primary"
          size={"xl"}
        >
          <span className="font-bold text-2xl">Iniciar Sesión</span>
        </Button>
      </form>
      <div className="flex text-primary justify-between w-full mt-4">
        <Link href={"/registro"}>
          <p className="font-bold">Registrarme</p>
        </Link>
        <Link href={"/#"}>
          <p className="font-bold">Olvide mi contraseña</p>
        </Link>
      </div>
    </div>
  );
}
