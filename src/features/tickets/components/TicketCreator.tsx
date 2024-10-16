import AsynchronousAutocompleteCreatable from "@/components/AsynchronousAutocompleteCreatable";
import OrderCreator from "@/features/orders/components/OrderCreator";
import OrderDisplay from "@/features/orders/components/OrderDisplay";
import ProviderCreatorDialog from "@/features/providers/components/ProviderCreatorDialog";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import TicketDTO, { Currency, Direction } from "../ticketDTO";
import OrderDTO from "@/features/orders/orderDTO";
import axios from "axios";
import { green } from "@mui/material/colors";
import ProviderDTO from "@/features/providers/providerDTO";

const TicketCreator = () => {
  const [value, setValue] = useState<TicketDTO>({
    provider: null,
    date: null,
    orders: [],
    installments: 1,
    currency: Currency.BRL,
    direction: Direction.Income,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pushOrder = (order: OrderDTO) => {
    setValue({ ...value, orders: [...value.orders, order] });
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={2}>
        <AsynchronousAutocompleteCreatable
          label="Provider"
          requestUrl="/api/providers"
          mapper={(data: ProviderDTO) => ({ label: data.name })}
          createrDialog={(props) => <ProviderCreatorDialog {...props} />}
          onChange={(provider) => setValue({ ...value, provider: provider })}
        />
      </Grid2>
      <Grid2 size={2}>
        <FormControl fullWidth>
          <DatePicker
            label="Date"
            value={value.date}
            onChange={(val) => setValue({ ...value, date: val })}
          />
        </FormControl>
      </Grid2>
      <Grid2 size={6}>
        <Paper className="formPadding">
          <Grid2 container spacing={2}>
            <OrderDisplay orders={value.orders} />
            <OrderCreator onSubmit={pushOrder} />
          </Grid2>
        </Paper>
      </Grid2>
      <Grid2 size={2}>
        <TextField
          type="number"
          label="installments"
          value={value.installments}
          onChange={(ev) =>
            setValue({ ...value, installments: parseInt(ev.target.value) })
          }
        />
      </Grid2>
      <Grid2 size={2}>
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select
            label="Currency"
            value={value.currency}
            onChange={(ev) =>
              setValue({
                ...value,
                currency: Currency[ev.target.value as keyof typeof Currency],
              })
            }
          >
            {Object.keys(Currency).map((value, index) => {
              return (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 size={2}>
        <FormControl fullWidth>
          <InputLabel>Direction</InputLabel>
          <Select
            label="Direction"
            value={value.direction}
            onChange={(ev) =>
              setValue({
                ...value,
                direction: Direction[ev.target.value as keyof typeof Direction],
              })
            }
          >
            {Object.keys(Direction).map((value, index) => {
              return (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 size={4}>
        <Box>
          <Button
            type="submit"
            variant="contained"
            onClick={async () => {
              setLoading(true);
              const request = await axios.post("/api/tickets", value);
              if (request.status < 200 || request.status >= 400) {
                setLoading(false);
                setError("Error");
                return;
              }
              setLoading(false);
              setValue({
                provider: null,
                date: null,
                orders: [],
                installments: 1,
                currency: Currency.BRL,
                direction: Direction.Income,
              });
            }}
          >
            Post
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                color: green[500],
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </Grid2>
      {error && <p>{error}</p>}
    </Grid2>
  );
};

export default TicketCreator;
