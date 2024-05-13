import PurchaseTicketView from "@/components/purchase_ticket.tsx/PurchaseTicketView";
import Ticket from "@/components/ticket/Ticket";
import { Card } from "flowbite-react";

const page = () => {
  return (
    <Card className="px-4">
      <Ticket />
    </Card>
  );
};
export default page;
