"use client";

import { Navbar } from "flowbite-react";
import Link from "next/link";

const NavbarCustomTheme = {
  collapse: {
    base: "w-full md:block md:w-auto flex justify-center",
    list: "mt-4 flex flex-col gap-1 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
    hidden: {
      on: "hidden",
      off: "",
    },
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-sm text-white hover:bg-primary focus:outline-none md:hidden",
    icon: "h-6 w-6 shrink-0",
  },
};
const NavbarFB = () => {
  return (
    <Navbar fluid className="bg-primary" theme={NavbarCustomTheme}>
      <Navbar.Brand as={Link} href="https://flowbite-react.com"></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-center">
        <Navbar.Link
          as={Link}
          href="/"
          className="bg-white rounded-full md:hover:bg-white flex justify-center p-0 md:px-4"
        >
          <span className="px-2 py-2 text-lg text-primary font-bold">
            Inicio
          </span>
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/iniciar_sesion"
          className="bg-white rounded-full md:hover:bg-white flex justify-center p-0 md:px-4"
        >
          <span className="px-2 py-2 text-lg text-primary font-bold ">
            Iniciar Sesion
          </span>
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/registro"
          className="bg-white rounded-full md:hover:bg-white flex justify-center p-0 md:px-4"
        >
          <span className="px-2 py-2 text-lg text-primary font-bold ">
            Registrarse
          </span>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavbarFB;
