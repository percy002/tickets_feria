'use client'

import { Label, Select, TextInput } from "flowbite-react";
import ButtonFB from "../UI/ButtonFB";
import Link from "next/link";
import { useGlobalState } from "@/contexts/GlobalStateContext";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const FormUserInfo = () => {
  const Router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    Router.replace('/');
    return;
    // throw new Error("AuthContext is undefined");
  }
  const { user, setUser } = authContext;

  // const { userData, setUserData } = useGlobalState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setUser({
    //   ...user,
    //   [event.target.id]: event.target.value,
    // });
  };
  return (
    <form className="flex flex-col gap-4">
      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nombres" />
          </div>
          <TextInput
            id="nombres"
            type="text"
            placeholder="Nombres"
            value={user?.nombres || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <div className="mb-2 block">
            <Label htmlFor="lastName" value="Apellidos" />
          </div>
          <TextInput
            id="lastName"
            type="text"
            placeholder="Apellidos"
            value={user?.apellido_paterno || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Correo Electrónico" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="Correo Electrónico"
          value={user?.email || ''}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Confirme su Correo Electrónico" />
        </div>
        <TextInput
          id="emailConfirm"
          type="email"
          placeholder="Confirme Correo Electrónico"
          value={user.emailConfirm || ''}
          onChange={handleChange}
          required
        />
      </div> */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="mb-2 block">
            <Label htmlFor="dni" value="Dni" />
          </div>
          <TextInput
            id="dni"
            type="text"
            placeholder="Dni"
            value={user?.dni}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Celular" />
          </div>
          <TextInput
            id="phone"
            type="tel"
            placeholder="Celular"
            value={user?.celular}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="flex mt-8 gap-8">
        <Link href={"/comprar_boleto"} className="flex justify-center w-1/2">
          <ButtonFB text="Regresar" />
        </Link>
        <Link href={"/resumen"} className="flex justify-center w-1/2">
          <ButtonFB text="Continuar" />
        </Link>
      </div>
    </form>
  );
};
export default FormUserInfo;
