"use client";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const [compras, setCompras] = useState([]);
  const token = localStorage.getItem("auth_token");
  const getMyPurchases = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_VENTA_BOLETOS_API_URL}/api/v1/boletos`,
        {
          headers: { autorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors);
        console.log(data.errors);
      }

      setCompras(data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "¡Algo salió mal!",
        icon: "error",
      });
    }
  };
  useEffect(() => {
    getMyPurchases();

    console.log(compras);
  }, []);
  return (
    <div>
      {compras.map((compra, index) => {
        return (
          <Card key={index}>
            {/* <h2>{compra.evento}</h2>
                    <p>{compra.fecha}</p>
                    <p>{compra.hora}</p>
                    <p>{compra.cantidad}</p>
                    <p>{compra.total}</p> */}
          </Card>
        );
      })}
    </div>
  );
};
export default Page;
