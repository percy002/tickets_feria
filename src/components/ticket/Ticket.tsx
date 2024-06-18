"use client";
import { useGlobalState } from "@/contexts/GlobalStateContext";
import { Button } from "flowbite-react";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";
import TicketPDF from "../pdf/TicketPDF";
import ModalTicket from "./ModalTicket";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import QRCode from "qrcode";

interface GetTicket {
  ticket_id: string;
  tipo_ticket_id: string;
  cantidad: string;
  precio: string;
  fecha: string;
  QR_ticket?: string;
}

const Ticket = () => {
  const Router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    Router.replace("/");
    return;
    // throw new Error("AuthContext is undefined");
  }
  const { user, setUser } = authContext;
  const [qrCode, setQrCode] = useState<string | null>(null);

  const { userData, generalTickets, starTickets, venta_id } = useGlobalState();
  const [isClient, setIsClient] = useState(false);
  const [ticket, setTicket] = useState<GetTicket>({
    ticket_id: "",
    tipo_ticket_id: "",
    cantidad: "",
    precio: "",
    fecha: "",
  });

  const getVentaById = async () => {
    const token = sessionStorage.getItem("access_token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VENTA_BOLETOS_API_URL}/api/v1/venta/${venta_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      Router.replace("/");
    }
    console.log(data);

    setTicket(data?.venta.tickets[0]);
  };
  const getVenta = async () => {
    const token = sessionStorage.getItem("access_token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VENTA_BOLETOS_API_URL}/api/v1/ventas/${user?.usuario_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      Router.replace("/");
    }
    console.log(data);

    setTicket(data?.ventas[0].tickets[0]);
  };
  useEffect(() => {
    // console.log(user);
    if (venta_id) {
      getVentaById();
    } else {
      getVenta();
    }
    console.log("ticket", ticket);

    setIsClient(true);
  }, []);
  useEffect(() => {
    if (ticket.QR_ticket) {
      QRCode.toDataURL(ticket.QR_ticket?.toString() || "")
        .then((url: any) => {
          setQrCode(url);
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  }, [ticket]);
  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <img
          src="/images/logos/logo_expoferia_2024.png"
          alt=""
          className="w-1/2"
        />
        {qrCode && <img src={qrCode} alt="QR Code" className="w-1/2" />}
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
              <span className="font-bold">{user?.nombres}</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Apellidos</h6>
              <span className="font-bold">
                {user?.apellido_paterno} {user?.apellido_materno}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6>Dni</h6>
              <span className="font-bold">{user?.dni}</span>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row xl:justify-between mt-4 gap-y-4 ">
            <div className="flex flex-col">
              <h6>Celular</h6>
              <span className="font-bold">{user?.celular}</span>
            </div>
            <div className="flex flex-col">
              <h6>Correo Electrónico</h6>
              <span className="font-bold">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="">
          <h5 className="font-bold text-xl">Entradas</h5>
          <div className="flex">
            <div className="flex-1 flex flex-col gap-2">
              <h6>Descripción</h6>
              <span className="font-bold text-sm">
                {ticket?.tipo_ticket_id == "1" && "Entrada General"}
              </span>
              <span className="font-bold text-sm">
                {ticket?.tipo_ticket_id == "2" && "Entrada Estelar"}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6 className="text-right">Precio Unit.</h6>
              <span className="font-bold text-right">
                {ticket?.tipo_ticket_id == "1" && "S/. 10.00"}
              </span>
              <span className="font-bold text-right">
                {ticket?.tipo_ticket_id == "2" && "S/. 30.00"}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6 className="text-right">Cantidad</h6>
              <span className="font-bold text-right">{ticket?.cantidad}</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h6 className="text-right">Total</h6>
              <span className="font-bold text-right">{ticket?.precio}</span>
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
        {/* <ModalTicket/> */}
        {isClient && (
          <PDFDownloadLink
            document={
              <TicketPDF
                userData={user}
                tickets={parseInt(ticket.cantidad)}
                tipoTicket={ticket.tipo_ticket_id}
                qr={ticket.QR_ticket || ""}
              />
            }
            fileName="ticket.pdf"
          >
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
        )}
      </div>
    </div>
  );
};
export default Ticket;
