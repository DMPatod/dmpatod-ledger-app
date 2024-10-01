import AsynchronousAutocompleteCreatable from "@/components/AsynchronousAutocompleteCreatable";
import OrderCreator from "@/features/orders/components/OrderCreator";
import OrderDisplay from "@/features/orders/components/OrderDisplay";
import ProviderCreatorDialog from "@/features/providers/components/ProviderCreatorDialog";
import { Button, MenuItem, Paper, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";
import { useState } from "react";
import { Currency, Direction } from "../ticketDTO";

const TicketCreator = () => {
  const [date, setDate] = useState<Moment | null>(null);
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
    <Paper>
      <AsynchronousAutocompleteCreatable
        label="Provider"
        requestUrl="api/providers"
        mapper={(data: ProviderDTO) => ({ label: data.name })}
        createrDialog={(props) => <ProviderCreatorDialog {...props} />}
      />
      <DatePicker label="Date" value={date} onChange={(val) => setDate(val)} />
      <Paper>
        <OrderDisplay orders={orders} />
        <OrderCreator dispatch={pushOrder} />
      </Paper>
      <TextField
        type="number"
        label="installments"
        value={installments}
        onChange={(ev) => {
          setInstallments(parseInt(ev.target.value));
        }}
      />
      <Select
        label="Currency"
        value={currency}
        onChange={(ev) => {
          setCurrency(ev.target.value);
        }}
      >
        {Object.entries(Currency).map(([key, value]) => {
          return (
            <MenuItem key={key} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
      <Select
        label="Direction"
        value={direction}
        onChange={(ev) => {
          setDirection(ev.target.value);
        }}
      >
        {Object.entries(Direction).map(([key, value]) => {
          return (
            <MenuItem key={key} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
      <Button
        type="submit"
        onClick={() => {
          console.log("Post");
          console.log({ date, orders, installments, currency, direction });
        }}
      >
        Post
      </Button>
    </Paper>
  );
};

export default TicketCreator;
