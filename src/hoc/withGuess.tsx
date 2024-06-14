import React, { useContext, useEffect, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext, AuthContextType } from '@/contexts/AuthContext';

const withGuest = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const ComponentWithGuest = (props: P) => {
      const Router = useRouter();
  
      const authContext = useContext(AuthContext);
    
      if (!authContext) {
        Router.replace('/');
        return;
        // throw new Error("AuthContext is undefined");
      }
    
      const { user, loading } = authContext;
  
      useEffect(() => {
        if (!loading && user) {
          Router.replace('/comprar_boleto'); // Redirige a la página de inicio si el usuario ya está logueado
        }
      }, [user, loading]);
  
      if (loading) {
        return <div>Espere por favor...</div>;
      }
  
      if (user) {
        return null;
      }
  
      return <WrappedComponent {...props} />;
    };
  
    return ComponentWithGuest;
  };
  
  export default withGuest;
