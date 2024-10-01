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
import React, { useState } from "react";

interface ProviderCreatorDialogProps
  extends AsynchronousAutocompleteCreatableDialogProps {}

const ProviderCreatorDialog: React.FC<ProviderCreatorDialogProps> = ({
  parentState,
  setParentState,
  dispatchDialogValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogState, setDialogState] = useState({});

  const handleClose = () => {
    setParentState({ ...parentState, open: false });
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setLoading(true);
    const request = await fetch("/api/providers", {
      method: "POST",
      body: JSON.stringify({ name: parentState.typed }),
    });
    setLoading(false);
    if (request.status < 200 || request.status >= 400) {
      setError("Failed to create a new provider.");
      return;
    }
    const response = await request.json();
    dispatchDialogValue(response);
    handleClose();
  };

  return (
    <Dialog open={parentState.open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a new Provider</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new provider, please fill the following form.
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

export default ProviderCreatorDialog;
