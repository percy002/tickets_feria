"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import TicketPDF from "../pdf/TicketPDF";
import { useGlobalState } from "@/contexts/GlobalStateContext";
export default function ModalTicket() {
  const [openModal, setOpenModal] = useState(false);
  const { userData, generalTickets, starTickets } = useGlobalState();

  return (
    <>
      {/* <Button
        onClick={() => setOpenModal(true)}
        className="bg-primary text-white enabled:hover:bg-primary w-full rounded-full"
      >
        <span className="text-2xl">ver PDF</span>
      </Button> */}
      <Modal
        dismissible
        size={"md"}
        show={openModal}
        onClose={() => setOpenModal(false)} 
        className=""
      >
        <Modal.Body className="">
          <PDFViewer style={{ width: "100%", height: "90vh" }}>
            <TicketPDF userData={userData} generalTickets={generalTickets} startTickets={starTickets}/>
          </PDFViewer>
        </Modal.Body>
      </Modal>
    </>
  );
}
