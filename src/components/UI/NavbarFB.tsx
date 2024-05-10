"use client";

import { Navbar } from "flowbite-react";
import Link from "next/link";
const NavbarFB = () => {
  return (
    <Navbar fluid className="bg-primary">
      <Navbar.Brand as={Link} href="https://flowbite-react.com"></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {/* <Navbar.Link href="/" active>
          Inicio
        </Navbar.Link> */}
        <Navbar.Link
          as={Link}
          href="/"
          className="bg-white rounded-full md:hover:bg-white"
        >
          <span className="px-2 py-2 text-lg text-primary font-bold">Inicio</span>
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/iniciar_sesion"
          className="bg-white rounded-full md:hover:bg-white"
        >
          <span className="px-2 py-2 text-lg text-primary font-bold">Iniciar Sesion</span>
        </Navbar.Link>
        <Navbar.Link as={Link} href="/registro" className="bg-white rounded-full md:hover:bg-white">
        <span className="px-2 py-2 text-lg text-primary font-bold">Registrarse</span>

        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavbarFB;
