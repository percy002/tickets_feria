"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function ModalFB() {
  const [openModal, setOpenModal] = useState(false);
  const [yapeData, setYapeData] = useState();
  const Router = useRouter();

  const pagarYape = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/yape`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(yapeData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);        
      }

      setOpenModal(false);
      Router.push("/boleto");
    } catch (error) {}
  };
  const handleClickYape = () => {
    pagarYape();
  };
  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-primary text-white enabled:hover:bg-primary w-full rounded-full"
      >
        <span className="text-2xl">Pagar</span>
      </Button>
      <Modal
        dismissible
        size={"md"}
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Body>
          <div className="flex justify-center my-4">
            <img src="/images/logos/logo_yape.png" alt="logo yape" />
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="mobileNumber"
                  className="text-xl font-bold text-gray-600"
                  value="Ingrese tu celular yape"
                />
              </div>
              <TextInput id="mobileNumber" type="tel" placeholder="" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="confirmationCode"
                  value="Código de aprobación"
                  className="text-xl font-bold text-gray-600"
                />
              </div>
              <TextInput id="confirmationCode" type="text" required />
            </div>
          </form>
          <div className="mt-6">
            <span className="text-lg font-bold text-gray-600">
              Encuéntralo en el menu de Yape
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-center">
          <Button
            onClick={handleClickYape}
            className="bg-primary text-white enabled:hover:bg-primary w-full rounded-full"
          >
            <span className="text-2xl">YAPEAR</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
