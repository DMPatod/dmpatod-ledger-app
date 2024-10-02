import { Moment } from "moment";
import OrderDTO from "../orders/orderDTO";

export default interface TicketDTO {
  id?: string;
  provider: ProviderDTO | null;
  date: Moment | null;
  orders: Array<OrderDTO>;
  installments: number;
  currency: Currency;
  direction: Direction;
}

export enum Currency {
  BRL,
  USD,
  EUR,
}

export enum Direction {
  Income,
  Outcome,
}
