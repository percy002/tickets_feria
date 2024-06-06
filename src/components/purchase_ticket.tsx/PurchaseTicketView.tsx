"use client";
import { Alert, Checkbox, Label, List } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import ButtonFB from "../UI/ButtonFB";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/contexts/GlobalStateContext";

const PurchaseTicketView = () => {
  // const [generalTicketTotal, setGeneralTicketTotal] = useState(0);
  // const [presentationTicketTotal, setPresentationTicketTotal] = useState(0);
  const { generalTickets, setGeneralTickets } = useGlobalState();
  const {starTickets, setStarTickets} = useGlobalState();

  const incrementGeneralTickets = () => { 
    if (generalTickets < 10) {
      setGeneralTickets(generalTickets + 1);
    }
  };
  const decrementGeneralTickets = () => {
    if (generalTickets > 0) {
      setGeneralTickets(generalTickets - 1);
    }
  };
  const incrementPresentationTickets = () => {
    if (starTickets < 10) {
      setStarTickets(starTickets + 1);
    }
  };
  const decrementPresentationTickets = () => {
    if (starTickets > 0) {
      setStarTickets(starTickets - 1);
    }
  };

  

  useEffect(() => {
    localStorage.setItem("generalTickets", generalTickets.toString());
    localStorage.setItem("starTickets", starTickets.toString());
  }, [generalTickets, starTickets]);

  return (
    <div className="flex flex-col gap-8">
      <Alert color="failure">
        <List>
          <List.Item>Máximo 10 entradas por persona.</List.Item>
          <List.Item>Mayores de 10 años pagan su entrada.</List.Item>
          <List.Item>
            Niños menores a 10 años no pagan, previa presentación de un
            documento, pasaporte o DNI que acredite la edad.{" "}
          </List.Item>
        </List>
      </Alert>
      <div className="px-8 py-4 rounded-md bg-primary bg-opacity-20">
        <h5 className="text-primary font-bold text-xl">Entradas</h5>
        <div className="flex flex-col mt-6">
          <span className="font-bold text-xl">General</span>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-bold">s/. 10.00</span>
            <div className="flex gap-8 bg-white border border-black rounded-2xl px-8 text-2xl font-bold">
              <button onClick={decrementGeneralTickets}>-</button>
              <span>{generalTickets}</span>
              <button onClick={incrementGeneralTickets}>+</button>
            </div>
          </div>
          <span className="text-gray-600 font-bold">
            *Entrada valida para horario de 9:00a.m. a 13.00p.m.
          </span>
        </div>
        <div className="flex flex-col mt-8">
          <span className="font-bold text-xl">General - Presentación</span>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-bold">s/. 30.00</span>
            <div className="flex gap-8 bg-white border border-black rounded-2xl px-8 text-2xl font-bold">
              <button onClick={decrementPresentationTickets}>-</button>
              <span>{starTickets}</span>
              <button onClick={incrementPresentationTickets}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <span className="font-bold text-xl">Total : S/. {generalTickets * 10 + starTickets * 30}</span>
        
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="promotion" />
        <Label htmlFor="promotion">
          Acepto los términos y condiciones del servicio
        </Label>
      </div>
      <Link href="/info_usuario" className="flex justify-center">
        <ButtonFB text={"Continuar"} />
      </Link>
    </div>
  );
};
export default PurchaseTicketView;
