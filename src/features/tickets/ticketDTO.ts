import OrderDTO from "../orders/orderDTO";
import ProviderDTO from "../providers/providerDTO";

export default interface TicketDTO {
  id?: string;
  provider: ProviderDTO | string | null;
  date: Date | null;
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
