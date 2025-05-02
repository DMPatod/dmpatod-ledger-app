import AsynchronousAutocompleteCreatable from "@/components/AsynchronousAutocompleteCreatable";
import ProductCreatorDialog from "@/features/products/components/ProductCreatorDialog";
import ProductDTO from "@/features/products/productDTO";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { useState } from "react";
import OrderDTO from "../orderDTO";

interface OrderCreatorProps {
  onSubmit: (order: OrderDTO) => void;
}

const OrderCreator: React.FC<OrderCreatorProps> = ({ onSubmit }) => {
  const [order, setOrder] = useState<OrderDTO>({
    product: null,
    value: 0,
    amount: 1,
  });

  const handleSubmit = async () => {
    onSubmit(order);
    setOrder({ product: null, value: 0, amount: 1 });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <AsynchronousAutocompleteCreatable
          label="Product"
          requestUrl="/api/products"
          mapper={(data: ProductDTO) => ({ label: data.name })}
          createrDialog={(props) => <ProductCreatorDialog {...props} />}
          onChange={(product) => setOrder({ ...order, product: product })}
        />
      </Grid>
      <Grid size={4}>
        <FormControl fullWidth>
          <TextField
            label="Value"
            type="number"
            value={order.value}
            onChange={(e) =>
              setOrder({ ...order, value: parseFloat(e.target.value) })
            }
          />
        </FormControl>
      </Grid>
      <Grid size={4}>
        <FormControl fullWidth>
          <TextField
            label="Amount"
            type="number"
            value={order.amount}
            onChange={(e) =>
              setOrder({ ...order, amount: parseFloat(e.target.value) })
            }
          />
        </FormControl>
      </Grid>
      <Grid size={4}>
        <FormControl fullWidth>
          <TextField
            label="Total"
            type="number"
            value={order.value * order.amount}
          />
        </FormControl>
      </Grid>
      <Button variant="contained" onClick={handleSubmit}>
        Add
      </Button>
    </Grid>
  );
};

export default OrderCreator;
