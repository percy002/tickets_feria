import FormUserInfo from "@/components/userInfo.tsx/FormUserInfo"
import { Card } from "flowbite-react"

const Page = () => {
  return (
    <Card className="px-4">
      <h5 className="text-primary font-bold text-4xl">Datos del comprador</h5>
      <p>Complete sus datos para validar la compra</p>
      <FormUserInfo />
    </Card>
  )
}
export default Page