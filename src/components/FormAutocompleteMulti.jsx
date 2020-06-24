import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getTypeahead } from '../database';
import { getEntriesByIds } from '../utils';
import { GLOBAL_STATE_ALIAS, FORM_LABELS } from '../utils/constants';

import useGlobalState from '../useGlobalState';

export default function FormAutocompleteMulti({ type, classModifier = '' }) {
  // Global States
  const [entry, setEntry] = useGlobalState(GLOBAL_STATE_ALIAS[type]);

  const entryTypeahead = getTypeahead(type);

  const handleChange = (_, newInput) => {
    const ids = newInput.map((o) => o.value);
    console.log(ids);
    setEntry(ids);
  };

  const label = FORM_LABELS[type];

  return (
    <FormControl className={`form-item form-item--autocomplete form-item--${classModifier}`}>
      <Autocomplete
        multiple
        id={label}
        options={entryTypeahead}
        defaultValue={getEntriesByIds(entryTypeahead, entry)}
        getOptionLabel={(option) => option.text}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
        onChange={handleChange}
        autoHighlight
      />
    </FormControl>
  );
}
