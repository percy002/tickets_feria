'use client'
import ButtonFB from "@/components/UI/ButtonFB";
import ModalFB from "@/components/UI/ModalFB";
import { useGlobalState } from "@/contexts/GlobalStateContext";
import { Button } from "flowbite-react";

const page = () => {
  const {userData,setUserData,generalTickets,starTickets} = useGlobalState();
 
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
              <span className="font-bold">{userData.name}</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Apellidos</h6>
              <span className="font-bold">{userData.lastName}</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Dni</h6>
              <span className="font-bold">{userData.dni}</span>
            </div>
          </div>
          <div className="flex justify-between mt-4 ">
            <div className="flex flex-col">
              <h6>Telefono</h6>
              <span className="font-bold">{userData.phone}</span>
            </div>
            <div className="flex flex-col">
              <h6>Correo Electrónico</h6>
              <span className="font-bold">{userData.email}</span>
            </div>
          </div>
        </div>
        <div className="">
          <h5 className="font-bold text-xl">Entradas</h5>
          <div className="flex">
            <div className="flex-1 flex flex-col gap-2">
              <h6>Descripción</h6>
              <span className="font-bold text-sm">{generalTickets > 0 && "Entrada General"}</span>
              <span className="font-bold text-sm">{starTickets > 0 && "Entrada Estelar"}</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Precio Unit.</h6>
              <span className="font-bold">{generalTickets  > 0 && "S/. 10.00"}</span>
              <span className="font-bold">{starTickets > 0 && "S/. 30.00"}</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Cantidad</h6>
              <span className="font-bold">{generalTickets > 0 && generalTickets}</span>
              <span className="font-bold">{starTickets > 0 && starTickets}</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Total</h6>
              <span className="font-bold"> {generalTickets > 0 && `S/. ${generalTickets * 10}.00`}</span>
              <span className="font-bold"> {starTickets > 0 && `S/. ${starTickets * 30}.00`}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="font-bold">{(generalTickets > 0 || starTickets > 0) && `S/. ${generalTickets * 10 + starTickets * 30}.00` }</span>
        </div>
        <div className="flex justify-center">
          {/* <Button className="bg-primary text-white enabled:hover:bg-primary w-full rounded-full">
            <span className="text-2xl">Pagar</span>
          </Button> */}
          <ModalFB/>
        </div>
      </div>
    </div>
  );
};
export default page;
