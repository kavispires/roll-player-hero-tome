import React, { useEffect } from 'react';

import { GLOBAL_STATE_ALIAS, TYPES } from '../utils/constants';
import {
  getCharacterJsonApi,
  getCharacterObjectByReference,
  determineCharacterCompletion,
} from '../utils';

import useGlobalState from '../useGlobalState';

export default function FormDataGatherer() {
  const [characterName] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.CHARACTER_NAME]);
  const [player] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.PLAYER]);
  const [raceId] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.RACE]);
  const [classId] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.CLASS]);
  const [gender] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.GENDER]);
  const [backstoryId] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.BACKSTORY]);
  const [attributes] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.ATTRIBUTES]);
  const [alignmentId] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.ALIGNMENT]);
  const [alignmentPosition] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.ALIGNMENT_POSITION]);
  const [armorIds] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.MARKET_ARMOR]);
  const [weaponsIds] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.MARKET_WEAPON]);
  const [skillsIds] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.MARKET_SKILL]);
  const [traitsIds] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.MARKET_TRAIT]);
  const [scrollsIds] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.MARKET_SCROLL]);
  const [minionsIds] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.MINION]);
  const [monsterId] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.MONSTER]);
  const [monsterLocationId] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.MONSTER_LOCATION]);
  const [monsterObstacleId] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.MONSTER_OBSTACLE]);
  const [monsterAttackId] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.MONSTER_ATTACK]);
  const [familiarId] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.FAMILIAR]);
  const [familiarPower] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.FAMILIAR_POWER]);
  const [fiendsIds] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.FIENDS]);
  const [xp] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.XP]);
  const [gold] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.GOLD]);
  const [score] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.SCORE]);
  const [date] = useGlobalState(GLOBAL_STATE_ALIAS[TYPES.DATE]);
  const [characterObject, setCharacterObject] = useGlobalState('characterObject');
  const [characterObjectByReference, setCharacterObjectByReference] = useGlobalState(
    'characterObjectByReference'
  );
  const [, setIsGenerated] = useGlobalState('isCharacterGenerated');
  const [, setIsCharacterComplete] = useGlobalState('isCharacterComplete');

  useEffect(() => {
    try {
      const referenceObj = {
        characterName,
        player,
        raceId,
        classId,
        gender,
        backstoryId,
        attributes,
        alignmentId,
        alignmentPosition,
        armorIds,
        weaponsIds,
        skillsIds,
        traitsIds,
        scrollsIds,
        minionsIds,
        monsterId,
        monsterLocationId,
        monsterObstacleId,
        monsterAttackId,
        familiarId,
        familiarPower,
        fiendsIds,
        xp,
        gold,
        score,
        date,
      };
      setIsCharacterComplete(determineCharacterCompletion(referenceObj));
      setCharacterObjectByReference(getCharacterObjectByReference(referenceObj));
      setCharacterObject(getCharacterJsonApi(referenceObj));

      setIsGenerated(true);
    } catch (err) {
      console.error(err);
      setIsGenerated(false);
    }
  }, [
    characterName,
    player,
    raceId,
    classId,
    gender,
    backstoryId,
    attributes,
    alignmentId,
    alignmentPosition,
    armorIds,
    weaponsIds,
    skillsIds,
    traitsIds,
    scrollsIds,
    minionsIds,
    monsterId,
    monsterLocationId,
    monsterObstacleId,
    monsterAttackId,
    familiarId,
    familiarPower,
    fiendsIds,
    xp,
    gold,
    score,
    date,
    setCharacterObject,
    setCharacterObjectByReference,
    setIsGenerated,
    setIsCharacterComplete,
  ]);

  return <span></span>;
}
