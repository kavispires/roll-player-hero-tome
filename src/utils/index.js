import { getHashData, getAdventureTypeahead } from '../database';
import { TYPES } from './constants';
import { getCompleteGlobalState, setGlobalState } from '../useGlobalState';

export function getMonsterAdventureData(type, monsterName) {
  const dict = getHashData(type);
  return {
    dict,
    typeahead: getAdventureTypeahead(dict, monsterName),
  };
}

export function prepareObjects() {
  try {
    const referenceObj = getCompleteGlobalState();
    setGlobalState('isCharacterComplete', determineCharacterCompletion(referenceObj));
    setGlobalState('characterObject', getCharacterJsonApi(referenceObj));
    setGlobalState('deserializedCharacter', deserializeCharacter(referenceObj));
    setGlobalState('isCharacterGenerated', true);
  } catch (err) {
    console.error(err);
    setGlobalState('isCharacterGenerated', false);
  }
}

export function determineCharacterCompletion(objRef) {
  // If text fields are empty
  if (!objRef.characterName || !objRef.player) return false;

  // If mandatory fields are empty
  if (!objRef.race || !objRef.class || !objRef.backstory || !objRef.alignment) return false;

  // If attributes are less than 3
  if (Object.values(objRef.attributes).some((attr) => attr < 3)) return false;

  // If monster, but no location, obstacle, or attack
  if (
    objRef.monster &&
    (!objRef.monsterLocation || !objRef.monsterObstacle || !objRef.monsterAttack)
  )
    return false;

  // If has familiar, but power is less then 3
  if (objRef.familiar && !objRef.familiarPower) return false;

  return true;
}

export function deserializeCharacter(objRef) {
  return {
    id: objRef.characterId,
    name: objRef.characterName,
    race: objRef.race,
    class: objRef.class,
    gender: objRef.gender,
    backstory: objRef.backstory,
    'attribute-scores': objRef.attributes,
    alignment: {
      id: objRef.alignment,
      position: objRef.alignmentPos,
    },
    items: {
      armor: objRef.armor?.sort(),
      weapons: objRef.weapons?.sort(),
      scrolls: objRef.scrolls?.sort(),
    },
    skills: objRef.skills?.sort(),
    traits: objRef.traits?.sort(),
    battle: {
      monster: objRef.monster,
      location: objRef.monsterLocation,
      obstacle: objRef.monsterObstacle,
      attack: objRef.monsterAttack,
      minions: objRef.minions?.sort(),
    },
    familiar: {
      id: objRef.familiar,
      power: objRef.familiarPower,
    },
    fiends: objRef.fiends?.sort(),
    counts: {
      experience: objRef.xp,
      gold: objRef.gold,
      score: objRef.score,
    },
    player: objRef.player,
    'created-at': objRef.date ?? new Date(),
  };
}

export function getCharacterJsonApi(objRef) {
  return {
    id: objRef.character ?? null,
    type: 'roll-player-character',
    attributes: {
      name: objRef.characterName,
      race: getHashData(TYPES.RACE)[objRef.race]?.name ?? '',
      class: getHashData(TYPES.CLASS)[objRef.class]?.name ?? '',
      gender: objRef.gender,
      backstory: getHashData(TYPES.BACKSTORY)[objRef.backstory]?.name ?? '',
      'attribute-rp-scores': getAttributeScores(objRef.attributes, objRef.race),
      'attribute-rpa-scores': getRPAAttributeScores(objRef.attributes, objRef.race),
      alignment: getAlignmentScore(objRef.alignmentId, objRef.alignmentPosition),
      items: {
        armor: objRef.armor.map((id) => getHashData(TYPES.MARKET_ARMOR)[id]?.name ?? '').sort(),
        weapons: objRef.weapons
          .map((id) => getHashData(TYPES.MARKET_WEAPON)[id]?.name ?? '')
          .sort(),
        scrolls: objRef.scrolls
          .map((id) => getHashData(TYPES.MARKET_SCROLL)[id]?.name ?? '')
          .sort(),
      },
      skills: objRef.skills.map((id) => getHashData(TYPES.MARKET_SKILL)[id]?.name ?? '').sort(),
      traits: objRef.traits.map((id) => getHashData(TYPES.MARKET_TRAIT)[id]?.name ?? '').sort(),
      battle: {
        monster: getHashData(TYPES.MONSTER)[objRef.monster]?.name ?? '',
        location: getHashData(TYPES.MONSTER_LOCATION)[objRef.monsterLocation]?.name ?? '',
        obstacle: getHashData(TYPES.MONSTER_OBSTACLE)[objRef.monsterObstacle]?.name ?? '',
        attack: getHashData(TYPES.MONSTER_ATTACK)[objRef.monsterAttack]?.name ?? '',
        minions: objRef.minions.map((id) => getHashData(TYPES.MINION)[id]?.name ?? '').sort(),
      },
      familiar: {
        name: getHashData(TYPES.FAMILIAR)[objRef.familiar]?.name ?? '',
        power: objRef.familiarPower,
      },
      fiends: objRef.fiends.map((id) => getHashData(TYPES.FIENDS)[id]?.name ?? '').sort(),
      counts: {
        experience: objRef.xp,
        gold: objRef.gold,
        score: objRef.score,
        health: getHealth(objRef.score, objRef.fiends),
      },
    },
    meta: {
      'created-by': objRef.player,
      'created-at': objRef.date ?? new Date(),
    },
  };
}

function getAttributeScores(attributes, raceId) {
  const raceData = getHashData(TYPES.RACE)?.[raceId];

  return {
    str: (attributes.str ?? 0) + (raceData?.str ?? 0),
    dex: (attributes.dex ?? 0) + (raceData?.dex ?? 0),
    con: (attributes.con ?? 0) + (raceData?.con ?? 0),
    int: (attributes.int ?? 0) + (raceData?.int ?? 0),
    wis: (attributes.wis ?? 0) + (raceData?.wis ?? 0),
    cha: (attributes.cha ?? 0) + (raceData?.cha ?? 0),
  };
}

function getRPAAttributeScores(attributes, raceId) {
  const raceData = getHashData(TYPES.RACE)?.[raceId];

  function getAttrValue(val) {
    if (val < 14) return 0;
    if (val < 16) return 1;
    if (val < 18) return 2;
    return 3;
  }

  return {
    str: getAttrValue((attributes.str ?? 0) + (raceData?.str ?? 0)),
    dex: getAttrValue((attributes.dex ?? 0) + (raceData?.dex ?? 0)),
    con: getAttrValue((attributes.con ?? 0) + (raceData?.con ?? 0)),
    int: getAttrValue((attributes.int ?? 0) + (raceData?.int ?? 0)),
    wis: getAttrValue((attributes.wis ?? 0) + (raceData?.wis ?? 0)),
    cha: getAttrValue((attributes.cha ?? 0) + (raceData?.cha ?? 0)),
  };
}

function getAlignmentScore(alignmentId, position = 4) {
  const aligmentData = getHashData(TYPES.ALIGNMENT)?.[alignmentId];

  const values = aligmentData?.values?.split(',').map(Number) ?? [];

  const titles = {
    0: 'Lawful-Good',
    1: 'Neutral-Good',
    2: 'Chaotic-Good',
    3: 'Lawful-Neutral',
    4: 'Neutraul-Neutral',
    5: 'Chaotic-Neutral',
    6: 'Lawful-Evil',
    7: 'Neutral-Evil',
    8: 'Chaotic-Evil',
  };

  return {
    name: aligmentData?.name ?? '',
    title: titles[position],
    score: values[position],
  };
}

function getHealth(score, fiends) {
  const fiendsCount = fiends.length;

  if (score < 21) return 14 - fiendsCount;
  if (score < 26) return 15 - fiendsCount;
  if (score < 36) return 16 - fiendsCount;
  if (score < 41) return 17 - fiendsCount;
  return 18 - fiendsCount;
}
