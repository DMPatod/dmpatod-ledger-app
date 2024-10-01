import { AsynchronousAutocompleteCreatableDialogProps } from "@/components/AsynchronousAutocompleteCreatable";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

interface ProductCreatorDialogProps
  extends AsynchronousAutocompleteCreatableDialogProps {}

const ProductCreatorDialog: React.FC<ProductCreatorDialogProps> = ({
  parentState,
  setParentState,
}) => {
  const handleClose = () => {
    setParentState({ ...parentState, open: false });
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  };

  return (
    <Dialog open={parentState.open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a new Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new product, please fill the following form.
          </DialogContentText>
          <TextField
            label="Name"
            variant="standard"
            value={parentState.typed}
            onChange={(ev) => {
              setParentState({ ...parentState, typed: ev.target.value });
            }}
          />
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
