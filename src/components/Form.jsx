import React, { useEffect, useState } from 'react';

import { getHashData } from '../database';
import { getMonsterAdventureData, getClassColor } from '../utils';
import { TYPES, GLOBAL_STATE_ALIAS } from '../utils/constants';
import useGlobalState from '../useGlobalState';

// Components
import FormInput from './FormInput';
import FormAutocomplete from './FormAutocomplete';
import FormAutocompleteMulti from './FormAutocompleteMulti';
import FormAttributes from './FormAttributes';
import FormAlignment from './FormAlignment';
import FormCheckbox from './FormCheckbox';

export default function Form() {
  const [monster] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.MONSTER]);
  const [characterClass] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.CLASS]);
  const [, setColor] = useGlobalState('color');
  // LocalState
  const [adventureData, setAdventureData] = useState(null);

  // When a monster is selected, determine available adventure cards for it
  useEffect(() => {
    if (monster) {
      const monsterName = getHashData(TYPES.MONSTER)[monster].name;

      setAdventureData({
        location: getMonsterAdventureData(TYPES.MONSTER_LOCATION, monsterName),
        obstacle: getMonsterAdventureData(TYPES.MONSTER_OBSTACLE, monsterName),
        attack: getMonsterAdventureData(TYPES.MONSTER_ATTACK, monsterName),
      });
    }
  }, [monster]);

  // When a class is selected, set the global color
  useEffect(() => {
    setColor(getClassColor(characterClass));
  }, [characterClass, setColor]);

  return (
    <main className="form">
      <FormInput type={TYPES.CHARACTER_NAME} classModifier="half" />
      <FormInput type={TYPES.PLAYER} classModifier="half" />
      <FormAutocomplete type={TYPES.RACE} classModifier="quarter" />
      <FormAutocomplete type={TYPES.CLASS} classModifier="quarter" />
      <FormAutocomplete type={TYPES.GENDER} classModifier="quarter" />
      <FormAutocomplete type={TYPES.BACKSTORY} classModifier="quarter" />
      <FormAttributes />
      <FormAlignment />
      <FormAutocompleteMulti type={TYPES.MARKET_ARMOR} classModifier="half" />
      <FormAutocompleteMulti type={TYPES.MARKET_WEAPON} classModifier="half" />
      <FormAutocompleteMulti type={TYPES.MARKET_SKILL} classModifier="half" />
      <FormAutocompleteMulti type={TYPES.MARKET_TRAIT} classModifier="half" />
      <FormAutocompleteMulti type={TYPES.MARKET_SCROLL} classModifier="half" />
      <FormAutocompleteMulti type={TYPES.MINION} classModifier="half" />
      <hr />
      <FormAutocomplete type={TYPES.MONSTER} classModifier="half" />
      <FormCheckbox type={TYPES.MONSTER_LENTICULAR} classModifier="half" />
      <FormAutocomplete
        type={TYPES.MONSTER_LOCATION}
        classModifier="quarter"
        isDisabled={!monster}
        data={adventureData?.location}
      />
      <FormAutocomplete
        type={TYPES.MONSTER_OBSTACLE}
        classModifier="quarter"
        isDisabled={!monster}
        data={adventureData?.obstacle}
      />
      <FormAutocomplete
        type={TYPES.MONSTER_ATTACK}
        classModifier="quarter"
        isDisabled={!monster}
        data={adventureData?.attack}
      />
      <FormInput type={TYPES.MONSTER_SCORE} inputType="number" classModifier="quarter" />
      <hr />
      <FormAutocomplete type={TYPES.FAMILIAR} classModifier="half" />
      <FormInput type={TYPES.FAMILIAR_POWER} inputType="number" classModifier="quarter" />
      <FormInput type={TYPES.FAMILIAR_NAME} classModifier="quarter" />
      <FormAutocompleteMulti type={TYPES.FIENDS} classModifier="half" />
      <hr />
      <FormInput type={TYPES.XP} inputType="number" classModifier="quarter" />
      <FormInput type={TYPES.GOLD} inputType="number" classModifier="quarter" />
      <FormInput type={TYPES.SCORE} inputType="number" classModifier="quarter" />
      <FormInput type={TYPES.DATE} inputType="date" classModifier="quarter" />
    </main>
  );
}
