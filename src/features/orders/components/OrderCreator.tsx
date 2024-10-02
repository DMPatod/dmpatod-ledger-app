import AsynchronousAutocompleteCreatable from "@/components/AsynchronousAutocompleteCreatable";
import ProductCreatorDialog from "@/features/products/components/ProductCreatorDialog";
import ProductDTO, { MesureUnit } from "@/features/products/productDTO";
import { Button, FormControl, Grid2, TextField } from "@mui/material";
import { useState } from "react";
import OrderDTO from "../orderDTO";
import styles from "@/pages/styles.scss";

interface OrderCreatorProps {
  dispatch: (order: OrderDTO) => void;
}

const OrderCreator: React.FC<OrderCreatorProps> = ({ dispatch }) => {
  const [product, setProduct] = useState<ProductDTO>({
    id: "",
    name: "",
    mesureUnit: MesureUnit.Kilogram,
  });
  const [value, setValue] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <TextField
            disabled
            label="Total"
            type="number"
            value={value * amount}
          />
        </FormControl>
      </Grid2>
      <Button type="submit" variant="contained">
        Add
      </Button>
    </Grid2>
  );
};

export default OrderCreator;
