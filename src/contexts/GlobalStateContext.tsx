import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface UserData {
  name?: string;
  lastName?: string;
  email?: string;
  emailConfirm?: string;
  dni?: string;
  phone?: string;
}
interface State {
  generalTickets: number;
  setGeneralTickets: React.Dispatch<React.SetStateAction<number>>;
  starTickets: number;
  setStarTickets: React.Dispatch<React.SetStateAction<number>>;
  userData: UserData;
  venta_id: string;
  setVenta_id: React.Dispatch<React.SetStateAction<string>>;
  setUserData: React.Dispatch<React.SetStateAction<object>>;
}

const initialState: State = {
  generalTickets: 0,
  setGeneralTickets: () => {},
  starTickets: 0,
  setStarTickets: () => {},
  venta_id: "",
  setVenta_id: () => {},
  userData: {
    name: "Juan",
    lastName: "Perez",
    email: "juan.perez@gmail.com",
    emailConfirm: "juan.perez@gmail.com",
    dni: "12345678",
    phone: "933669933",
  },
  setUserData: () => {},
};

const GlobalStateContext = createContext<State>(initialState);

export const useGlobalState = () => useContext(GlobalStateContext);

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [generalTickets, setGeneralTickets] = useState<number>(0);
  const [starTickets, setStarTickets] = useState<number>(0);
  const [userData, setUserData] = useState<UserData>(initialState.userData);
  const [venta_id, setVenta_id] = useState<string>("");

  useEffect(() => {
    const generalTickets = localStorage.getItem("generalTickets");
    const starTickets = localStorage.getItem("starTickets");
    
    if (generalTickets) {
      setGeneralTickets(parseInt(generalTickets));
    }
    if (starTickets) {
      setStarTickets(parseInt(starTickets));
    }
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        generalTickets,
        setGeneralTickets,
        starTickets,
        setStarTickets,
        venta_id,
        setVenta_id,
        userData,
        setUserData,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
