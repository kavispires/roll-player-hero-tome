import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import { GLOBAL_STATE_ALIAS, FORM_LABELS } from '../utils/constants';

import useGlobalState from '../useGlobalState';

export default function FormText({ type, inputType = 'text', classModifier = '' }) {
  // Global States
  const [entry, setEntry] = useGlobalState(GLOBAL_STATE_ALIAS[type]);

  const handleChange = (event) => {
    setEntry(event.target.value);
  };

  return (
    <FormControl className={`form-item form-item--text form-item--${classModifier}`}>
      <TextField
        id={GLOBAL_STATE_ALIAS[type]}
        label={FORM_LABELS[type]}
        onChange={handleChange}
        defaultValue={entry}
        type={inputType}
      />
    </FormControl>
  );
}
