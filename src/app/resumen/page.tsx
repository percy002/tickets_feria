"use client";
import ButtonFB from "@/components/UI/ButtonFB";
import ModalFB from "@/components/UI/ModalFB";
import { AuthContext } from "@/contexts/AuthContext";
import { useGlobalState } from "@/contexts/GlobalStateContext";
import { Button, Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import withAuth from "@/hoc/withAuth";
import Swal from "sweetalert2";
const Page = () => {
  const Router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    Router.replace("/");
    return;
    // throw new Error("AuthContext is undefined");
  }
  const { user, setUser } = authContext;
  const { generalTickets, starTickets, setStarTickets, setGeneralTickets } = useGlobalState();

  const pagarYape = async () => {
    const token = sessionStorage.getItem("access_token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_VENTA_BOLETOS_API_URL}/api/v1/pagar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...user, generalTickets, starTickets }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.errors);
      }

      localStorage.setItem("generalTickets", '0');
      localStorage.setItem("starTickets", '0');
      setGeneralTickets(0);
      setStarTickets(0);
      Swal.fire({
        title: "Pago exitoso",
        text: "¡Gracias por su compra!",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      }).then(() => {
        
        Router.push("/boleto");
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "¡Algo salió mal!";
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
      });
    }
  };
  const handlePagar = () => {
    console.log(user);
    pagarYape();
  };
  return (
    <Card className="px-4">
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
            <div className="flex flex-col lg:flex-row justify-between mt-4 ">
              <div className="flex flex-col">
                <h6>Telefono</h6>
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
            <div className="flex text-xs sm:text-base">
              <div className="flex-1 flex flex-col gap-2">
                <h6>Descripción</h6>
                <span className="font-bold text-nowrap">
                  {generalTickets > 0 && "Entrada General"}
                </span>
                <span className="font-bold text-nowrap">
                  {starTickets > 0 && "Entrada Estelar"}
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-2 items-end">
                <h6>Precio Unit.</h6>
                <span className="font-bold">
                  {generalTickets > 0 && "S/. 10.00"}
                </span>
                <span className="font-bold">
                  {starTickets > 0 && "S/. 30.00"}
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-2 items-end">
                <h6>Cantidad</h6>
                <span className="font-bold">
                  {generalTickets > 0 && generalTickets}
                </span>
                <span className="font-bold">
                  {starTickets > 0 && starTickets}
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-2 items-end">
                <h6>Total</h6>
                <span className="font-bold">
                  {generalTickets > 0 && `S/. ${generalTickets * 10}.00`}
                </span>
                <span className="font-bold">
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
          <div className="flex justify-center">
            <Button
              onClick={handlePagar}
              className="bg-primary text-white enabled:hover:bg-primary w-full rounded-full"
            >
              <span className="text-2xl">Pagar</span>
            </Button>
            {/* <ModalFB /> */}
          </div>
        </div>
      </div>
    </Card>
  );
};
export default withAuth(Page);
