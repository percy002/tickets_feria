import React, { createContext, useContext, useState, ReactNode } from 'react';

interface State {
  generalTickets: any[];
  setGeneralTickets: React.Dispatch<React.SetStateAction<any[]>>;
  starTickets: any[];
  setStarTickets: React.Dispatch<React.SetStateAction<any[]>>;
  userData: object;
  setUserData: React.Dispatch<React.SetStateAction<object>>;
}

const GlobalStateContext = createContext<State | undefined>(undefined);

export const useGlobalState = () => useContext(GlobalStateContext);

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [generalTickets, setGeneralTickets] = useState<any[]>([]);
  const [starTickets, setStarTickets] = useState<any[]>([]);
  const [userData, setUserData] = useState<object>({});

  return (
    <GlobalStateContext.Provider value={{ generalTickets, setGeneralTickets, starTickets, setStarTickets, userData, setUserData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};