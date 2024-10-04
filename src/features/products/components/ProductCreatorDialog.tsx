import { AsynchronousAutocompleteCreatableDialogProps } from "@/components/AsynchronousAutocompleteCreatable";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import ProductDTO, { MesureUnit } from "../productDTO";
import { useState } from "react";
import styles from "@/pages/styles.module.scss";
import axios from "axios";
import { green } from "@mui/material/colors";

interface ProductCreatorDialogProps
  extends AsynchronousAutocompleteCreatableDialogProps {}

const ProductCreatorDialog: React.FC<ProductCreatorDialogProps> = ({
  parentState,
  setParentState,
  dispatchDialogValue,
}) => {
  const [value, setValue] = useState({
    mesureUnit: MesureUnit.Unit,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setParentState({ ...parentState, open: false });
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setLoading(true);
    const request = await axios.post<ProductDTO>("/api/products", {
      name: parentState.typed,
      ...value,
    } as ProductDTO);
    if (request.status < 200 || request.status >= 400) {
      setError("Failed to create a new product.");
      return;
    }
    dispatchDialogValue(request.data);
    handleClose();
  };

  return (
    <Dialog open={parentState.open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a new Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new product, please fill the following form.
          </DialogContentText>
          <Paper className={styles.formPadding}>
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <TextField
                  label="Name"
                  variant="standard"
                  value={parentState.typed}
                  onChange={(ev) => {
                    setParentState({ ...parentState, typed: ev.target.value });
                  }}
                />
              </Grid2>
              <Grid2 size={6}>
                <FormControl fullWidth>
                  <InputLabel>Mesure Unit</InputLabel>
                  <Select
                    label="Mesure Unit"
                    value={value.mesureUnit}
                    onChange={(ev) => {
                      if (typeof ev.target.value === "string") {
                        setValue({
                          ...value,
                          mesureUnit:
                            MesureUnit[
                              ev.target.value as keyof typeof MesureUnit
                            ],
                        });
                      } else {
                        setValue({ ...value, mesureUnit: ev.target.value });
                      }
                    }}
                  >
                    {Object.values(MesureUnit).map((value, index) => {
                      return (
                        <MenuItem key={index} value={value}>
                          {value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid2>
            </Grid2>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Box>
            <Button type="submit" variant="contained">
              Add
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
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductCreatorDialog;
