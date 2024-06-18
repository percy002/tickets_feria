"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useGlobalState } from "@/contexts/GlobalStateContext";
import { Button, Dropdown, Navbar, Popover } from "flowbite-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiChevronDown, HiShoppingCart } from "react-icons/hi";
import { useRouter } from "next/navigation";

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
  const [islogin, setIslogin] = useState(false);
  const Router = useRouter();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return;
    // throw new Error("AuthContext is undefined");
  }
  const { user, loading, logout } = authContext;
  const { starTickets, generalTickets } = useGlobalState();

  useEffect(() => {

    if (!user && !loading) {
      logout();
      setIslogin(false);
    }
    if (user && !loading) {
      setIslogin(true);
    }
  }, [user, loading]);
  return (
    <Navbar
      fluid
      className="bg-primary md:px-16 fixed w-full z-50"
      theme={NavbarCustomTheme}
    >
      <Navbar.Brand as={Link} href="https://flowbite-react.com"></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-center">
        {!islogin && (
          <>
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
          </>
        )}
        <Navbar.Link className="cursor-pointer relative" as={"div"}>
          <div className="relative" onClick={() => {generalTickets + starTickets > 0 && Router.push('resumen')}}>
            <HiShoppingCart className="h-8 w-8 text-white" />
            {generalTickets + starTickets > 0 && (
              <span className="text-primary font-bold bg-white rounded-full px-1 absolute -bottom-2 -right-2 w-6 h-6 inline-flex justify-center items-center">
                {starTickets + generalTickets}
              </span>
            )}
          </div>
        </Navbar.Link>

        {user && (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <span className="text-xl font-bold text-white flex flex-nowrap gap-2 items-center cursor-pointer">
                  <FaUser className="h-6 w-6" />
                  {user.nombres} {user.apellido_paterno}
                  <HiChevronDown className="h-6 w-6" />
                </span>
              }
            >
              <Dropdown.Item>
                <Link href="/mis_compras">Ver mis compras</Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>Cerrar Sesión</Dropdown.Item>
            </Dropdown>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavbarFB;
