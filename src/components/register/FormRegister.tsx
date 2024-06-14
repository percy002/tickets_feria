"use client";

import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import ButtonFB from "../UI/ButtonFB";
import Link from "next/link";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import withGuest from "@/hoc/withGuess";
function FormRegister() {
  const router = useRouter();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    router.replace("/");
    return;
    // throw new Error("AuthContext is undefined");
  }

  const { user, setUser, loading } = authContext;
  const [formData, setFormData] = useState({
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    dni: "",
    genero: "",
    email: "",
    celular: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Expresión regular que coincide con los caracteres no deseados
    const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (e.target.id == "dni" && value.length > 8) {
      return;
    }
    if (!regex.test(value)) {
      setFormData({
        ...formData,
        [e.target.id]: value,
      });
    }
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
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.target.value;

    setFormData({
      ...formData,
      [e.target.id]: value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(JSON.stringify(formData));
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_VENTA_BOLETOS_API_URL}/api/register`,
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

      sessionStorage.setItem("access_token", data.token);
      sessionStorage.setItem("token_type", data.token_type);
      setUser(data.user);

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Por favor, inicie sesión para continuar",
      }).then(() => {
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

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        {/* <div className="mb-2 block">
          <Label htmlFor="name" value="Nombres" />
        </div> */}
        <TextInput
          id="nombres"
          type="text"
          placeholder="Nombres"
          onChange={handleInputChange}
          value={formData.nombres}
        />
      </div>
      <div>
        {/* <div className="mb-2 block">
          <Label htmlFor="lastName" value="Apellidos" />
        </div> */}
        <TextInput
          id="apellido_paterno"
          type="text"
          placeholder="Apellido Paterno"
          onChange={handleInputChange}
          value={formData.apellido_paterno}
        />
      </div>
      <div>
        {/* <div className="mb-2 block">
          <Label htmlFor="lastName" value="Apellidos" />
        </div> */}
        <TextInput
          id="apellido_materno"
          type="text"
          placeholder="Apellido Materno"
          onChange={handleInputChange}
          value={formData.apellido_materno}
        />
      </div>
      <div>
        {/* <div className="mb-2 block">
          <Label htmlFor="dni" value="Dni" />
        </div> */}
        <TextInput
          id="dni"
          type="text"
          placeholder="Dni"
          onChange={handleInputChange}
          value={formData.dni}
        />
      </div>
      <Select id="genero" value={formData.genero} onChange={handleChangeSelect}>
        <option value="">Genero</option>
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
      </Select>
      <div>
        {/* <div className="mb-2 block">
          <Label htmlFor="email" value="Correo Electrónico" />
        </div> */}
        <TextInput
          id="email"
          type="email"
          placeholder="Correo Electrónico"
          onChange={handleEmailChange}
          value={formData.email}
        />
      </div>
      <div>
        <TextInput
          id="celular"
          type="phone"
          placeholder="Numero de Celular"
          onChange={handleEmailChange}
          value={formData.celular}
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
          onChange={handleInputChange}
          value={formData.password}
        />
      </div>
      <div>
        {/* <div className="mb-2 block">
          <Label htmlFor="password" value="Contraseña" />
        </div> */}
        <TextInput
          id="password_confirmation"
          type="password"
          required
          placeholder="Confirmar Contraseña"
          onChange={handleInputChange}
          value={formData.password_confirmation}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="terms" size={5} />
        <Label htmlFor="terms">
          Acepto los términos y condiciones del servicio
        </Label>
      </div>
      {/* <Link href="/iniciar_sesion"> */}
      <ButtonFB text="Registro" isSubmit={true} />
      {/* </Link> */}
    </form>
  );
}

export default withGuest(FormRegister);
