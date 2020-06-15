import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { getTypeahead, getHashData } from '../database';
import { GLOBAL_STATE_ALIAS, FORM_LABELS } from '../utils/constants';

import useGlobalState from '../useGlobalState';

export default function FormSelect({ type, classModifier = '' }) {
  // Global States
  const [entry, setEntry] = useGlobalState(GLOBAL_STATE_ALIAS[type]);

  const entryDict = getHashData(type);
  const entryTypeahead = getTypeahead(type);

  const handleChange = (event) => {
    const id = event.target.value;
    if (entryDict[id]) {
      setEntry(id);
    }
  };

  const label = FORM_LABELS[type];

  return (
    <FormControl className={`form-item form-item--select form-item--${classModifier}`}>
      <InputLabel id={`${label}-label"`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label"`}
        id={label}
        value={entryDict?.[entry]?.id ?? ''}
        onChange={handleChange}
      >
        <MenuItem value="">Select...</MenuItem>
        {Object.values(entryTypeahead).map((entry) => (
          <MenuItem key={entry.value} value={entry.value}>
            {entry.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
