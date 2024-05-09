import PurchaseTicketView from "@/components/purchase_ticket.tsx/PurchaseTicketView"
import { Card } from "flowbite-react"

const page = () => {
  return (
    <Card className="px-4">
      <h5 className="text-primary font-bold text-4xl">Compra entrada</h5>
      <PurchaseTicketView/>
    </Card>
  )
}
export default page