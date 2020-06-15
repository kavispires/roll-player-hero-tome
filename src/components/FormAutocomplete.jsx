import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getTypeahead, getHashData } from '../database';
import { GLOBAL_STATE_ALIAS, FORM_LABELS } from '../utils/constants';

import useGlobalState from '../useGlobalState';

export default function FormAutocomplete({ type, classModifier = '' }) {
  // Global States
  const [entry, setEntry] = useGlobalState(GLOBAL_STATE_ALIAS[type]);

  const entryDict = getHashData(type);
  const entryTypeahead = getTypeahead(type);

  const handleChange = (event) => {
    const index = event.target.getAttribute('data-option-index');
    if (entryTypeahead[index]) {
      const id = entryTypeahead[index].value;
      setEntry(id);
    }
  };

  const label = FORM_LABELS[type];

  return (
    <FormControl className={`form-item form-item--autocomplete form-item--${classModifier}`}>
      <Autocomplete
        id={label}
        options={entryTypeahead}
        getOptionLabel={(option) => option.text}
        getOptionSelected={(option) => option.value === entryDict?.[entry]?.id}
        renderInput={(params) => <TextField {...params} label={label} />}
        onInputChange={handleChange}
        autoHighlight
      />
    </FormControl>
  );
}
