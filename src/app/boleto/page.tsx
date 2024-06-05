'use client'
import Ticket from "@/components/ticket/Ticket";
import { Card } from "flowbite-react";
import withAuth from "@/hoc/withAuth";
const page = () => {
  return (
    <Card className="px-4">
      <Ticket />
    </Card>
  );
};
export default withAuth(page);
