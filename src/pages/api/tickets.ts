import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import TicketDTO from "@/features/tickets/ticketDTO";
import OrderDTO from "@/features/orders/orderDTO";
import ProductDTO from "@/features/products/productDTO";

const serverUrl = process.env.SERVER_URL;

async function retrieveTickets(req: NextApiRequest, res: NextApiResponse) {
  const request = await axios.get<Array<TicketDTO>>(`${serverUrl}/tickets`);
  if (request.status < 200 && request.status >= 400) {
    console.error("Request Error");
    res.status(500).end();
  }
  res.status(200).json(request.data);
}

async function createTicket(req: NextApiRequest, res: NextApiResponse) {
  const request = await axios.post<TicketDTO>(`${serverUrl}/tickets`, {
    provider: req.body.provider.id,
    date: req.body.date,
    orders: req.body.orders.map((item: OrderDTO) => ({
      product: (item.product as ProductDTO).id,
      value: item.value,
      amount: item.amount,
    })),
    installments: req.body.installments,
    currency: req.body.currency,
    direction: req.body.direction,
  } as TicketDTO);
  if (request.status < 200 && request.status >= 400) {
    console.error("Request Error");
    res.status(500).end();
  }
  res.status(201).json(request.data);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await retrieveTickets(req, res);
      return;
    case "POST":
      await createTicket(req, res);
      return;
  }

  res.status(405).end();
}
