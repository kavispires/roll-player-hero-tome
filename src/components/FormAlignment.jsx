import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getTypeahead, getHashData } from '../database';
import { TYPES } from '../utils/constants';

import useGlobalState from '../useGlobalState';

export default function FormAlignment() {
  // Global States
  const [alignment, setAlignment] = useGlobalState('alignment');
  const [alignmentPos, setAlignmentPos] = useGlobalState('alignmentPos');

  const alignmentDict = getHashData(TYPES.ALIGNMENT);
  const alignmentTypeahead = getTypeahead(TYPES.ALIGNMENT);

  const handleChange = (event) => {
    const index = event.target.getAttribute('data-option-index');
    if (alignmentTypeahead[index]) {
      const id = alignmentTypeahead[index].value;
      setAlignment(id);
    }
  };

  const handleChangeAlignmentPos = (event) => {
    setAlignmentPos(+event.target.id);
  };

  const alignmentGridPlaceholder = new Array(9).fill(0);

  const alignmentModifiers = alignmentDict?.[alignment]?.values?.split(',').map(Number);

  const activeModifiers = alignmentModifiers ?? alignmentGridPlaceholder;

  return (
    <FormControl className={`form-item form-item--alignment form-item--half`}>
      <Autocomplete
        id="alignment"
        options={alignmentTypeahead}
        getOptionLabel={(option) => option.text}
        getOptionSelected={(option) => option.value === alignmentDict?.[alignment]?.id}
        renderInput={(params) => <TextField {...params} label="Alignment" />}
        onInputChange={handleChange}
        autoHighlight
      />
      <div className="alignment-graph-container">
        <div className="alignment-grid">
          {activeModifiers.map((val, index) => {
            const activeClass = alignmentPos === index ? 'alignment-box--active' : '';
            return (
              <button
                className={`alignment-box ${activeClass}`}
                id={`${index}`}
                key={`al-key-${index}`}
                onClick={handleChangeAlignmentPos}
                disabled={!Boolean(alignment)}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>
    </FormControl>
  );
}
