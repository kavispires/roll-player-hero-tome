import React from 'react';
import FormControl from '@material-ui/core/FormControl';

import { getHashData } from '../database';
import { ATTRIBUTES, TYPES } from '../utils/constants';

import useGlobalState from '../useGlobalState';

export default function FormAttributes() {
  // Global States
  const [attributes] = useGlobalState('attributes');
  const [race] = useGlobalState('race');

  const raceData = getHashData(TYPES.RACE)?.[race];

  console.log(raceData);

  return (
    <FormControl className={`form-item form-item--attributes`}>
      <div className="attributes-grid attribute-header">
        <span className="attribute-header-label">Attributes</span>
        <span className="attribute-header--label">Attribute Score</span>
        <span className="attribute-sign invisible">-</span>
        <span className="attribute-header--label">Racial Modifier</span>
        <span className="attribute-sign invisible">-</span>
        <span className="attribute-header--label">Total</span>
      </div>
      {Object.entries(ATTRIBUTES).map(([key, name]) => {
        return (
          <Attribute
            key={key}
            type={key}
            name={name}
            modifier={raceData?.[key]}
            value={attributes[key]}
            isDisabled={!Boolean(race)}
          />
        );
      })}
    </FormControl>
  );
}

function Attribute({ type, name, modifier, value, isDisabled }) {
  // Global States
  const [, setAttributes] = useGlobalState('attributes');

  const handleChange = (event) => {
    setAttributes((s) => ({ ...s, [type]: +event.target.value }));
  };

  const total = (value ?? 0) + (modifier ?? 0);

  return (
    <div className="attributes-grid attribute">
      <label className="attribute-label">
        <span className="attribute-label__key">{type}</span>
        <span className="attribute-label__name">{name}</span>
      </label>
      <input
        type="number"
        className="attribute-score"
        disabled={isDisabled}
        defaultValue={value}
        onChange={handleChange}
      />
      <span className="attribute-sign">+</span>
      <input type="number" className="attribute-race-modifier" value={modifier ?? 0} readOnly />
      <span className="attribute-sign">=</span>
      <input
        type="number"
        className="attribute-race-total"
        value={total}
        min="0"
        max="30"
        readOnly
      />
    </div>
  );
}
