"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { Button, Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withAuth from "@/hoc/withAuth";
import { format } from "date-fns";
import { useGlobalState } from "@/contexts/GlobalStateContext";


interface Venta {
  venta_id: number;
  usuario_id: number;
  monto_total: string;
  tipo_pago: string;
  fecha: string;
  tickets: Ticket[];
}
interface Ticket {
  ticket_id: number;
  venta_id: number;
  tipo_ticket_id: number;
  turno: string;
  cantidad: number;
  precio: string;
  QR_ticket: string;
  created_at: string;
  updated_at: string;
}
const Page = () => {
  const Router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    Router.replace("/");
    return;
    // throw new Error("AuthContext is undefined");
  }
  const { user, setUser } = authContext;
  const [ventas, setVentas] = useState<Venta[] | null>();
  const { venta_id,setVenta_id} = useGlobalState();

  const getMyPurchases = async () => {
    const token = sessionStorage.getItem("access_token");
    try {
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
        console.log(data.errors);
        throw new Error(data.errors);
      }
      console.log(data?.ventas);

      setVentas(data?.ventas);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "¡Algo salió mal!",
        icon: "error",
      });
    }
  };
  useEffect(() => {
    console.log(user);

    getMyPurchases();

    console.log(ventas);
  }, []);

  const handdleVerCompra = (idVenta: string) => {
    setVenta_id(idVenta);
    Router.push(`/boleto`);
  }
  return (
    <div>
      <Button className="my-4 bg-primary text-white enabled:hover:bg-primary" onClick={()=> Router.push('/comprar_boleto')}>Comprar Boleto</Button>
      <h1 className="text-3xl font-bold">Mis Compras</h1>
      {ventas &&
        ventas.map((venta, index) => {
          return (
            <Card key={index} className="mb-2">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h4 className="text-center">Fecha</h4>
                  <p>
                    {format(new Date(venta.fecha), "dd/MM/yyyy HH:mm:ss")}
                  </p>
                </div>
                <div className="flex flex-col text-right">
                  <h4>Cantidad</h4>
                  <p>{venta.tickets[0].cantidad}</p>
                </div>
                <div className="flex flex-col text-right">
                  <h4>P. Unit</h4>
                  <p>{parseInt(venta.tickets[0].precio)/venta.tickets[0].cantidad}</p>
                </div>
                <div className="flex flex-col text-right">
                  <h4>Total</h4>
                  <p>S/.{venta.tickets[0].precio}</p>
                </div>
                <div className="flex flex-col text-right">
                  <Button onClick={()=> handdleVerCompra(venta.venta_id.toString())} className="bg-primary text-white enabled:hover:bg-primary">Ver</Button>
                </div>
              </div>
              
            </Card>
          );
        })}
    </div>
  );
};
export default withAuth(Page);
