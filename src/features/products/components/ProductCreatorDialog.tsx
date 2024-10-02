import { AsynchronousAutocompleteCreatableDialogProps } from "@/components/AsynchronousAutocompleteCreatable";
import {
  Button,
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

interface ProductCreatorDialogProps
  extends AsynchronousAutocompleteCreatableDialogProps {}

const ProductCreatorDialog: React.FC<ProductCreatorDialogProps> = ({
  parentState,
  setParentState,
}) => {
  const [value, setValue] = useState<ProductDTO>({
    name: parentState.typed,
    mesureUnit: MesureUnit.Unit,
  });

  const handleClose = () => {
    setParentState({ ...parentState, open: false });
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    console.log(value);
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
            </Grid2>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductCreatorDialog;
