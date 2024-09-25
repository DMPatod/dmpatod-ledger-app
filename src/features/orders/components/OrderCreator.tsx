import useFetchApi from "@/features/utils/useFetchApi";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";

interface OrderCreatorProps {
  dispatch: (order: OrderDTO) => void;
}

const OrderCreator: React.FC<OrderCreatorProps> = ({ dispatch }) => {
  const [data, loading, error] = useFetchApi<Array<ProductDTO>>(
    "api/products",
    []
  );
  const [product, setProduct] = React.useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });
  const [value, setValue] = React.useState<number>(0);
  const [amount, setAmount] = React.useState<number>(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ product, value, amount });
  };

  return (
    // <form onSubmit={handleSubmit}>
    <Paper>
      <Autocomplete
        freeSolo
        options={[]}
        value={product}
        renderInput={(params) => <TextField {...params} label="Product" />}
      />
      <TextField
        label="Value"
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <TextField
        label="Amount"
        type="number"
        value={product}
        onChange={(e) => {}}
      />
      <TextField
        label="Mesure Unit"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <TextField
        label="Total"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Button type="submit">Add</Button>
    </Paper>
    //</form>
  );
};

export default OrderCreator;
