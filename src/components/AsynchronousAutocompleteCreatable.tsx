import { Autocomplete, TextField } from "@mui/material";
import React, { Fragment, SetStateAction, useEffect, useState } from "react";

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
  label?: string;
  requestUrl: string;
  mapper: (data: any) => SearchableOption;
  createrDialog: React.FC<AsynchronousAutocompleteCreatableDialogProps>;
  onChange?: (ev: React.SyntheticEvent<Element, Event>, value: any) => void;
}

const AsynchronousAutocompleteCreatable: React.FC<
  AsynchronousAutocompleteCreatableProps
> = ({ label, requestUrl, mapper, createrDialog, onChange }) => {
  const [options, setOptions] = useState<Array<SearchableOption>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [innerValue, setInnerValue] = useState<SearchableOption | null>(null);
  const [dialogProps, setDialogProps] = useState<DialogParentProps>({
    typed: "",
    open: false,
  });

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      const request = await fetch(requestUrl);
      if (request.status < 200 || request.status >= 400) {
        setError("Failed to fetch data.");
        return;
      }
      const response = await request.json();
      setLoading(false);
      setOptions(response.map(mapper));
    };

    fetchOptions();
  }, [innerValue]);

  const dispatchDialogValue = (value: any) => {
    setInnerValue(mapper(value));
    onChange && onChange(null!, value);
  };

  const onChangeHandler = (
    ev: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    if (typeof value === "string") {
      setDialogProps({ typed: value, open: true });
    } else if (value && value.inputValue) {
      setDialogProps({ typed: value.inputValue, open: true });
    } else if (value && value.label) {
      setInnerValue(value);
      onChange &&
        onChange(
          ev,
          options.find((item) => mapper(item).label === value.label)
        );
    } else {
      setInnerValue(null);
      onChange && onChange(ev, null);
    }
  };

  return (
    <Fragment>
      <Autocomplete
        loading={loading}
        value={innerValue}
        onChange={onChangeHandler}
        filterOptions={(options, state) => {
          const filtered = options.filter((option) => {
            if (option.label === undefined) {
              return false;
            }
            return option.label.includes(state.inputValue);
          });
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
        renderInput={(params) => (
          <TextField
            {...params}
            error={error !== null}
            helperText={error}
            label={label}
          />
        )}
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
