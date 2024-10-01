import useFetchApi from "@/features/utils/useFetchApi";
import { Autocomplete, TextField } from "@mui/material";
import React, { Fragment, SetStateAction, useCallback, useState } from "react";

interface SearchableOption {
  inputValue?: string;
  label: string;
}

interface DialogParentProps {
  typed: string;
  open: boolean;
}

export interface AsynchronousAutocompleteCreatableDialogProps {
  parentState: DialogParentProps;
  setParentState: React.Dispatch<SetStateAction<DialogParentProps>>;
  dispatchDialogValue: (value: any) => void;
}

export interface AsynchronousAutocompleteCreatableProps {
  label: string;
  requestUrl: string;
  mapper: (data: any) => SearchableOption;
  createrDialog: React.FC<AsynchronousAutocompleteCreatableDialogProps>;
}

const AsynchronousAutocompleteCreatable: React.FC<
  AsynchronousAutocompleteCreatableProps
> = ({ label, requestUrl, mapper, createrDialog }) => {
  const [options, loading, error] = useFetchApi<Array<object>>(requestUrl, []);
  const [value, setValue] = useState<SearchableOption | null>(null);
  const [dialogProps, setDialogProps] = useState<DialogParentProps>({
    typed: "",
    open: false,
  });

  const dispatchDialogValue = (value: any) => {
    setValue(value);
  };

  return (
    <Fragment>
      <Autocomplete
        loading={loading}
        value={value}
        onChange={(_, typed) => {
          if (typeof typed === "string") {
            setDialogProps({ typed, open: true });
          } else if (typed && typed.inputValue) {
            setDialogProps({ typed: typed.inputValue, open: true });
          } else {
            setValue(typed);
          }
        }}
        filterOptions={(options, state) => {
          const filtered = options.filter((option) =>
            option.label.includes(state.inputValue)
          );

          if (state.inputValue !== "") {
            filtered.push({
              inputValue: state.inputValue,
              label: `Add "${state.inputValue}"`,
            });
          }

          return filtered;
        }}
        options={options.map(mapper)}
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
      {createrDialog({
        parentState: dialogProps,
        setParentState: setDialogProps,
        dispatchDialogValue,
      })}
    </Fragment>
  );
};

export default AsynchronousAutocompleteCreatable;
