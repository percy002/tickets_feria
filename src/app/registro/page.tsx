import FormRegister from "@/components/register/FormRegister"
import { Card } from "flowbite-react";

const Page = () => {
  return (
    <Card className="px-4">
      <h5 className="text-primary font-bold text-4xl">Regístrate</h5>
      <FormRegister />
    </Card>
  );
}
export default Page