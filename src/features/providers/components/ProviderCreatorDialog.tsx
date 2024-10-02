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
  TextField,
} from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
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

  const handleClose = () => {
    setParentState({ ...parentState, open: false });
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setLoading(true);
    const request = await axios.post<ProviderDTO>("/api/providers", {
      name: parentState.typed,
    } as ProviderDTO);
    if (request.status < 200 || request.status >= 400) {
      setError("Failed to create a new provider.");
      return;
    }
    dispatchDialogValue(request.data);
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
          <Box>
            <Button type="submit" variant="contained" disabled={loading}>
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

export default ProviderCreatorDialog;
