"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import Image from "next/image";
export default function ModalFB() {
  const [openModal, setOpenModal] = useState(false);
  const [yapeData, setYapeData] = useState();

  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     yapeData({
  //       ...userData,
  //       [event.target.id]: event.target.value,
  //     });
  //   };
  const handleClickYape = () => {
    setOpenModal(false);
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
              <TextInput id="confirmationCode" type="password" required />
            </div>
          </form>
          <div className="mt-6">
            <span className="text-lg font-bold text-gray-600">
              Encuéntralo en el menu de Yape
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
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
