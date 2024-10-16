/* eslint-disable */
import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import axios from "axios";
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
  onChange?: (value: any) => void;
}

const filter = createFilterOptions<SearchableOption>({});

const AsynchronousAutocompleteCreatable: React.FC<
  AsynchronousAutocompleteCreatableProps
> = ({ label, requestUrl, mapper, createrDialog, onChange }) => {
  const [memory, setMemory] = useState<Array<any>>([]);
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
      const request = await axios.get<Array<any>>(requestUrl);
      if (request.status < 200 || request.status >= 400) {
        setError("Failed to fetch data.");
        return;
      }
      setLoading(false);
      setMemory(request.data);
      setOptions(request.data.map(mapper));
    };

    fetchOptions();
  }, [innerValue, mapper, requestUrl]);

  const dispatchDialogValue = (value: any) => {
    setInnerValue(mapper(value));
    onChange && onChange(value);
  };

  const onChangeHandler = (
    _: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    if (typeof value === "string") {
      setDialogProps({ typed: value, open: true });
    } else if (value && value.inputValue) {
      setDialogProps({ typed: value.inputValue, open: true });
    } else if (value && value.label) {
      setInnerValue(value);
      onChange &&
        onChange(memory.find((item) => mapper(item).label === value.label));
    } else {
      setInnerValue(null);
      onChange && onChange(null);
    }
  };

  return (
    <Fragment>
      <Autocomplete
        loading={loading}
        value={innerValue}
        onChange={onChangeHandler}
        filterOptions={(options, state) => {
          const filtered = filter(options, state);
          if (state.inputValue !== "") {
            filtered.push({
              inputValue: state.inputValue,
              label: `Add "${state.inputValue}"`,
            });
          }
          return filtered;
        }}
        options={options}
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
