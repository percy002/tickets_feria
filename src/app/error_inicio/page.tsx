import ButtonFB from "@/components/UI/ButtonFB";
import { Button, Card } from "flowbite-react";
import Link from "next/link";
import { FaUserSlash } from "react-icons/fa";

const page = () => {
  return (
    <Card className="px-4">
      <h5 className="text-primary font-bold text-4xl">Datos del comprador</h5>
      <p>Complete sus datos para validar la compra</p>
      <FaUserSlash className="h-[30vh] w-full text-gray-500" />
      <h5 className="text-center font-bold text-3xl">Debe iniciar sesión</h5>
      <p className="text-center">
        Este evento requiere que, los compradores, cuenten con una cuenta en la
        ExpoHuancaro2024. Por favor inicie sesión o cree una cuenta gratis
      </p>
      <div className="flex justify-around text-primary font-bold text-xl">
        <Link href="/iniciar_sesion">
          <span className="">Iniciar Sesión</span>
        </Link>
        <Link href="/registro">
          <span className="">Registrarse</span>
        </Link>
      </div>
      <div className="flex justify-center">
          <Link href={"/comprar_boleto"} className="flex justify-center w-1/2">
            <ButtonFB text="Regresar" />
          </Link>
      </div>
    </Card>
  );
};
export default page;
