import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect } from "react";
function createEmptyUser(): User {
  return {
    usuario_id: "",
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    dni: "",
    celular: "",
    email: "",
    role: "",
  };
}

// export const AuthContext = createContext('');
export interface User {
  usuario_id: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  dni: string;
  celular: string;
  email: string;
  role: string;
}
export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const Router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      const token = sessionStorage.getItem("access_token");
      
      if (token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_VENTA_BOLETOS_API_URL}/api/v1/user`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();          
          setUser(data.user);
        } catch (error) {
          console.error("Error de validación del token", error);
          sessionStorage.removeItem("access_token");
        }
      }
      setLoading(false);
    };

    validateToken();
  }, []);

  const login = async (email: string, password: string) => {
    // Tu lógica de inicio de sesión
    const token: any = await login(email, password);
    sessionStorage.setItem("access_token", token);
    // setUser({ ...user, nombres: "Usuario" });
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    setUser(null);
    Router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
