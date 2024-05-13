"use client";
import { useGlobalState } from "@/contexts/GlobalStateContext";
import { Button } from "flowbite-react";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";
import TicketPDF from "../pdf/TicketPDF";
import ModalTicket from "./ModalTicket";

const Ticket = () => {
  const { userData, generalTickets, starTickets } = useGlobalState();

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <img
          src="/images/logos/logo_expoferia_2024.png"
          alt=""
          className="w-1/2"
        />
        <img src="/images/QR.jpg" alt="" className="w-1/2" />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <h4 className="text-xl font-bold text-primary text-center">
            Cantidad 3 Entradas
          </h4>
        </div>
        <div className="flex justify-between w-9/12">
          <span>10/05/2024 10:00 pm</span>
          <span>Expo Cusco 2024</span>
        </div>
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
              <span className="font-bold text-sm">
                {generalTickets > 0 && "Entrada General"}
              </span>
              <span className="font-bold text-sm">
                {starTickets > 0 && "Entrada Estelar"}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Precio Unit.</h6>
              <span className="font-bold">
                {generalTickets > 0 && "S/. 10.00"}
              </span>
              <span className="font-bold">
                {starTickets > 0 && "S/. 30.00"}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Cantidad</h6>
              <span className="font-bold">
                {generalTickets > 0 && generalTickets}
              </span>
              <span className="font-bold">
                {starTickets > 0 && starTickets}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Total</h6>
              <span className="font-bold">
                {" "}
                {generalTickets > 0 && `S/. ${generalTickets * 10}.00`}
              </span>
              <span className="font-bold">
                {" "}
                {starTickets > 0 && `S/. ${starTickets * 30}.00`}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="font-bold">
            {(generalTickets > 0 || starTickets > 0) &&
              `S/. ${generalTickets * 10 + starTickets * 30}.00`}
          </span>
        </div>
      </div>
      <div className="mt-6">
        <ModalTicket/>
        <PDFDownloadLink document={<TicketPDF userData={userData} generalTickets={generalTickets} startTickets = {starTickets}/>} fileName="ticket.pdf">
          {({ blob, url, loading, error }) =>
            loading ? (
              "Cargando documento..."
            ) : (
              <Button className="bg-primary text-white enabled:hover:bg-primary w-full rounded-full">
                <span className="text-xl">Descargar Boleto</span>
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};
export default Ticket;
