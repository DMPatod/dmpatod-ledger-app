import AsynchronousAutocompleteCreatable from "@/components/AsynchronousAutocompleteCreatable";
import ProductCreatorDialog from "@/features/products/components/ProductCreatorDialog";
import ProductDTO, { MesureUnit } from "@/features/products/productDTO";
import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
    <Grid2 container spacing={2}>
      <Grid2 size={4}>
        <AsynchronousAutocompleteCreatable
          label="Product"
          requestUrl="api/products"
          mapper={(data: ProductDTO) => ({ label: data.name })}
          createrDialog={(props) => <ProductCreatorDialog {...props} />}
        />
      </Grid2>
      <Grid2 size={4}>
        <FormControl fullWidth>
          <TextField
            label="Value"
            type="number"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
          />
        </FormControl>
      </Grid2>
      <Grid2 size={4}>
        <FormControl fullWidth>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </FormControl>
      </Grid2>
      <Grid2 size={4}>
        <FormControl fullWidth>
          <InputLabel>Measure Unit</InputLabel>
          <Select
            label="Measure Unit"
            value={measureUnit}
            onChange={(e) => setMeasureUnit(e.target.value)}
          >
            {Object.entries(MesureUnit).map(([key, value]) => {
              return (
                <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 size={4}>
        <FormControl fullWidth>
          <TextField disabled label="Total" type="number" value={value * amount} />
        </FormControl>
      </Grid2>
      <Button type="submit">Add</Button>
    </Grid2>
  );
};

export default OrderCreator;
