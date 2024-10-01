import AsynchronousAutocompleteCreatable from "@/components/AsynchronousAutocompleteCreatable";
import ProductCreatorDialog from "@/features/products/components/ProductCreatorDialog";
import ProductDTO from "@/features/products/productDTO";
import useFetchApi from "@/features/utils/useFetchApi";
import { Autocomplete, Button, Paper, Select, TextField } from "@mui/material";
import { useState } from "react";

interface OrderCreatorProps {
  dispatch: (order: OrderDTO) => void;
}

const OrderCreator: React.FC<OrderCreatorProps> = ({ dispatch }) => {
  const [product, setProduct] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });
  const [value, setValue] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);
  const [measureUnit, setMeasureUnit] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ product, value, amount });
  };

  return (
    <Paper>
      <AsynchronousAutocompleteCreatable
        label="Product"
        requestUrl="api/products"
        mapper={(data: ProductDTO) => ({ label: data.name })}
        createrDialog={(props) => <ProductCreatorDialog {...props} />}
      />
      <TextField
        label="Value"
        type="number"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
      />
      <TextField
        label="Amount"
        type="number"
        value={product}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <Select
        label="Measure Unit"
        value={measureUnit}
        onChange={(e) => setMeasureUnit(e.target.value)}
      ></Select>
      <TextField label="Total" type="number" value={value * amount} />
      <Button type="submit">Add</Button>
    </Paper>
  );
};

export default OrderCreator;
