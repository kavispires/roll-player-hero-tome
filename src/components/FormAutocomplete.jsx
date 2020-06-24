import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getTypeahead, getHashData } from '../database';
import { getEntryById } from '../utils';
import { GLOBAL_STATE_ALIAS, FORM_LABELS } from '../utils/constants';

import useGlobalState from '../useGlobalState';

export default function FormAutocomplete({
  type,
  classModifier = '',
  data = null,
  isDisabled = false,
}) {
  // Global States
  const [entry, setEntry] = useGlobalState(GLOBAL_STATE_ALIAS[type]);

  let entryDict = {};
  let entryTypeahead = [];

  if (data) {
    entryDict = data.dict;
    entryTypeahead = data.typeahead;
  } else {
    entryDict = getHashData(type);
    entryTypeahead = getTypeahead(type);
  }

  const handleInputChange = (event) => {
    const index = event?.target.getAttribute('data-option-index');
    if (entryTypeahead[index]) {
      const id = entryTypeahead[index].value;
      setEntry(id);
    }
  };

  const handleChange = (_, selectedEntry) => {
    console.log('HANDLING HCANGE?');
    if (entryDict[selectedEntry?.value]) {
      setEntry(selectedEntry.value);
    } else {
      setEntry(null);
    }
  };

  const label = FORM_LABELS[type];

  return (
    <FormControl className={`form-item form-item--autocomplete form-item--${classModifier}`}>
      <Autocomplete
        id={label}
        options={entryTypeahead}
        defaultValue={getEntryById(entryTypeahead, entry)}
        getOptionLabel={(option) => option.text}
        getOptionSelected={(option) => option.value === entryDict?.[entry]?.id}
        renderInput={(params) => <TextField {...params} label={label} />}
        onInputChange={handleInputChange}
        onChange={handleChange}
        disabled={isDisabled}
        autoHighlight
      />
    </FormControl>
  );
}
