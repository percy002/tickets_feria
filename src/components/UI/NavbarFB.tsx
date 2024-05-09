"use client";


import { Navbar } from "flowbite-react";
import Link from "next/link";
const NavbarFB = () => {
  return (
    <Navbar fluid>
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        
        </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Inicio
        </Navbar.Link>
        <Navbar.Link as={Link} href="/iniciar_sesion">
          Iniciar Sesion
        </Navbar.Link>
        <Navbar.Link as={Link} href="/registro">
          Registrase
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavbarFB