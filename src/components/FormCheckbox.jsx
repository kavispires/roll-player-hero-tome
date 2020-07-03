import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { GLOBAL_STATE_ALIAS, FORM_LABELS } from '../utils/constants';

import useGlobalState from '../useGlobalState';

export default function FormCheckbox({ type, classModifier = '' }) {
  // Global States
  const [entry, setEntry] = useGlobalState(GLOBAL_STATE_ALIAS[type]);

  const handleChange = (event) => {
    setEntry(event.target.checked);
  };

  return (
    <FormControl className={`form-item form-item--checkbox form-item--${classModifier}`}>
      <FormControlLabel
        control={
          <Checkbox
            checked={entry}
            onChange={handleChange}
            name={GLOBAL_STATE_ALIAS[type]}
            color="primary"
          />
        }
        label={FORM_LABELS[type]}
      />
    </FormControl>
  );
}
