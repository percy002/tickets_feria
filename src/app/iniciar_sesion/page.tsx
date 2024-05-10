import FormLogin from "@/components/register/FormLogin";
import { Card } from "flowbite-react";

const Page = () => {
  return (
    <Card className="px-4">
      <h5 className="text-primary font-bold text-4xl">Iniciar Sesión</h5>
      <FormLogin />
    </Card>
  );
};
export default Page;
