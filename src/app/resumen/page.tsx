import ButtonFB from "@/components/UI/ButtonFB";
import { Button } from "flowbite-react";

const page = () => {
  return (
    <div>
      <div className="border-b-4 border-gray-500 pb-6">
        <h5 className="text-primary font-bold text-4xl mb-4">Resumen</h5>
        <p>Revise toda la información antes de continuar</p>
      </div>
      <div className="flex flex-col gap-4 text-gray-700 text-xl">
        <div className="border-b-4 border-gray-500 pb-6">
          <h5 className="font-bold mt-4">Comprador</h5>
          <div className="flex mt-4">
            <div className="flex-1 flex flex-col gap-2">
              <h6>Nombre</h6>
              <span className="font-bold">Juan</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Apellidos</h6>
              <span className="font-bold">Perez</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Dni</h6>
              <span className="font-bold">12345678</span>
            </div>
          </div>
          <div className="flex justify-between mt-4 ">
            <div className="flex flex-col">
              <h6>Telefono</h6>
              <span className="font-bold">958545566</span>
            </div>
            <div className="flex flex-col">
              <h6>Correo Electrónico</h6>
              <span className="font-bold">percy001@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="">
          <h5 className="font-bold text-xl">Entradas</h5>
          <div className="flex">
            <div className="flex-1 flex flex-col gap-2">
              <h6>Descripción</h6>
              <span className="font-bold">Juan</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Precio Unit.</h6>
              <span className="font-bold">Perez</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Cantidad</h6>
              <span className="font-bold">1</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Total</h6>
              <span className="font-bold">S/. 30.00</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="font-bold">Total: S/. 30.00</span>
        </div>
        <div className="flex justify-center">
          <Button className="bg-primary text-white enabled:hover:bg-primary w-full rounded-full">
            <span className="text-2xl">Pagar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default page;
