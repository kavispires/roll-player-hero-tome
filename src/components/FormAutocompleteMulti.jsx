import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getTypeahead } from '../database';
import { GLOBAL_STATE_ALIAS, FORM_LABELS } from '../utils/constants';

import useGlobalState from '../useGlobalState';

export default function FormAutocompleteMulti({ type, classModifier = '' }) {
  // Global States
  const [, setEntry] = useGlobalState(GLOBAL_STATE_ALIAS[type]);

  const entryTypeahead = getTypeahead(type);

  const handleChange = (event, newInput) => {
    const ids = newInput.map((o) => o.value);
    setEntry(ids);
  };

  const label = FORM_LABELS[type];

  return (
    <FormControl className={`form-item form-item--autocomplete form-item--${classModifier}`}>
      <Autocomplete
        multiple
        id={label}
        options={entryTypeahead}
        getOptionLabel={(option) => option.text}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
        onChange={handleChange}
        autoHighlight
      />
    </FormControl>
  );
}
