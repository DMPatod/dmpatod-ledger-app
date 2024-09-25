import AsynchronousAutocompleteCreatable from "@/components/AsynchronousAutocompleteCreatable";
import OrderCreator from "@/features/orders/components/OrderCreator";
import OrderDisplay from "@/features/orders/components/OrderDisplay";
import { Autocomplete, Paper, TextField } from "@mui/material";
import { useState } from "react";

const TicketCreator = () => {
  const [date, setDate] = useState<string>("");
  const [orders, setOrders] = useState<Array<OrderDTO>>([]);
  const [installments, setInstallments] = useState<number>(1);
  const [currency, setCurrency] = useState<string>("");
  const [direction, setDirection] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const pushOrder = (order: OrderDTO) => {
    setOrders([...orders, order]);
  };

  return (
    // <form onSubmit={handleSubmit}>
    <Paper>
      <AsynchronousAutocompleteCreatable
        label="Provider"
        requestUrl="api/providers"
        mapToOption={(data: ProviderDTO) => ({label: data.name})}
      />
      {/* <TextField
        label="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <OrderDisplay orders={orders} />
      <OrderCreator dispatch={pushOrder} />
      <TextField
        label="Date"
        value={installments}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        label="Date"
        value={currency}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        label="Date"
        value={direction}
        onChange={(e) => setDate(e.target.value)}
      /> */}
    </Paper>
    // </form>
  );
};

export default TicketCreator;
