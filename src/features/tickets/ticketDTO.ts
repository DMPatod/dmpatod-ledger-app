import { Moment } from "moment";
import OrderDTO from "../orders/orderDTO";
import ProviderDTO from "../providers/providerDTO";

export default interface TicketDTO {
  id?: string;
  provider: ProviderDTO | string | null;
  date: Moment | null;
  orders: Array<OrderDTO>;
  installments: number;
  currency: Currency | number;
  direction: Direction | number;
}

export enum Currency {
  USD,
  BRL,
  NZD,
}

export enum Direction {
  Income,
  Outcome,
}
