// components/hoc/withAuth.tsx
import React, { useContext, useEffect, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext, AuthContextType } from '@/contexts/AuthContext';

interface AuthProps {
  user: any; // Define el tipo de tu usuario, por ejemplo, `User` si tienes una interfaz definida
  loading: boolean;
}

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const Router = useRouter();

    const authContext = useContext(AuthContext);
  
    if (!authContext) {
      Router.replace('/');
      return;
      // throw new Error("AuthContext is undefined");
    }
  
    const { user, loading } = authContext;

    useEffect(() => {
      if (!loading && !user) {
        Router.replace('/error_inicio');
      }
      // if (!loading && user) {
        
      // }
    }, [user, loading]);

    if (loading) {
      return <div>Espere por favor...</div>;
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
