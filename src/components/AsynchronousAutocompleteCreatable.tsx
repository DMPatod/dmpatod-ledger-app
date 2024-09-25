import useFetchApi from "@/features/utils/useFetchApi";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { Fragment, useState } from "react";

interface SearchableOption {
  inputValue?: string;
  label: string;
}

interface AsynchronousAutocompleteCreatableProps<
  TIn,
  TOpt extends SearchableOption
> {
  label: string;
  requestUrl: string;
  mapToOption: (data: TIn) => TOpt;
}

const AsynchronousAutocompleteCreatable = <TIn, TOpt extends SearchableOption>({
  requestUrl,
  label,
  mapToOption: optionMap,
}: AsynchronousAutocompleteCreatableProps<TIn, TOpt>) => {
  const [options, loading, error] = useFetchApi<Array<TIn>>(requestUrl, []);
  const [value, setValue] = useState<TOpt | null>(null);
  const [open, toggleOpen] = useState<boolean>(false);
  const [dialogValue, setDialogValue] = useState({ name: "" });

  const handleClose = () => {
    toggleOpen(false);
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    handleClose();
  };

  return (
    <Fragment>
      <Autocomplete
        loading={loading}
        value={value}
        onChange={(ev, newValue) => {}}
        filterOptions={(options, state) => {
          const filtered = options.filter((opt) =>
            opt.label.includes(state.inputValue)
          );

          if (state.inputValue !== "") {
            filtered.push({
              inputValue: state.inputValue,
              label: `Add "${state.inputValue}"`,
            } as TOpt);
          }

          return filtered;
        }}
        options={options.map(optionMap)}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.label;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              {option.label}
            </li>
          );
        }}
        freeSolo
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new {label}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Define details of the new {label}
            </DialogContentText>
            <TextField
              value={dialogValue.name}
              onChange={(ev) => {
                setDialogValue({ ...dialogValue, name: ev.target.value });
              }}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default AsynchronousAutocompleteCreatable;
