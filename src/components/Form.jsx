import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { TYPES, GENDERS } from '../utils/constants';

// Components
import FormSelect from './FormSelect';
import FormSelectSimple from './FormSelectSimple';
import FormText from './FormText';
import FormAutocomplete from './FormAutocomplete';

export default function Form() {
  return (
    <main className="form">
      <FormText type={TYPES.CHARACTER_NAME} classModifier="half" />
      <FormText type={TYPES.PLAYER} classModifier="half" />
      <FormAutocomplete type={TYPES.RACE} classModifier="quarter" />
      <FormAutocomplete type={TYPES.CLASS} classModifier="quarter" />
      <FormSelectSimple type={TYPES.GENDER} classModifier="quarter" data={GENDERS} />
      <FormAutocomplete type={TYPES.BACKSTORY} classModifier="quarter" />
    </main>
  );
}
