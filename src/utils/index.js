import { getHashData, getAdventureTypeahead } from '../database';
import { TYPES } from './constants';

export function getMonsterAdventureData(type, monsterName) {
  const dict = getHashData(type);
  return {
    dict,
    typeahead: getAdventureTypeahead(dict, monsterName),
  };
}

export function determineCharacterCompletion(objRef) {
  // If text fields are empty
  if (!objRef.characterName || !objRef.player) return false;
  console.log('PASSED LEVEL 1');
  // If mandatory fields are empty
  if (!objRef.raceId || !objRef.classId || !objRef.backstoryId || !objRef.alignmentId) return false;
  console.log('PASSED LEVEL 2');
  // If attributes are less than 3
  if (Object.values(objRef.attributes).some((attr) => attr < 3)) return false;
  console.log('PASSED LEVEL 3');
  // If monster, but no location, obstacle, or attack
  if (
    objRef.monsterId &&
    (!objRef.monsterLocationId || objRef.monsterObstacleId || objRef.monsterAttackId)
  )
    return false;
  console.log('PASSED LEVEL 4');
  // If has familiar, but power is less then 3
  if (objRef.familiarId && !objRef.familiarPower) return false;
  console.log('PASSED LEVEL 5');
  return true;
}

export function deserializeCharacter(objRef) {
  return {
    name: objRef.characterName,
    race: objRef.raceId,
    class: objRef.classId,
    gender: objRef.gender,
    backstory: objRef.backstoryId,
    'attribute-scores': objRef.attributes,
    alignment: {
      id: objRef.alignmentId,
      position: objRef.alignmentPosition,
    },
    items: {
      armor: objRef.armorIds.sort(),
      weapons: objRef.weaponsIds.sort(),
      scrolls: objRef.scrollsIds.sort(),
    },
    skills: objRef.skillsIds.sort(),
    traits: objRef.traitsIds.sort(),
    battle: {
      monster: objRef.monsterId,
      location: objRef.monsterLocationId,
      obstacle: objRef.monsterObstacleId,
      attack: objRef.monsterAttackId,
      minions: objRef.minionsIds.sort(),
    },
    familiar: {
      id: objRef.familiarId,
      power: objRef.familiarPower,
    },
    fiends: objRef.fiendsIds.sort(),
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
    id: objRef.id,
    type: 'roll-player-character',
    attributes: {
      name: objRef.characterName,
      race: getHashData(TYPES.RACE)[objRef.raceId]?.name ?? '',
      class: getHashData(TYPES.CLASS)[objRef.classId]?.name ?? '',
      gender: objRef.gender,
      backstory: getHashData(TYPES.BACKSTORY)[objRef.backstoryId]?.name ?? '',
      'attribute-rp-scores': getAttributeScores(objRef.attributes, objRef.raceId),
      'attribute-rpa-scores': getRPAAttributeScores(objRef.attributes, objRef.raceId),
      alignment: getAlignmentScore(objRef.alignmentId, objRef.alignmentPosition),
      items: {
        armor: objRef.armorIds.map((id) => getHashData(TYPES.MARKET_ARMOR)[id]?.name ?? '').sort(),
        weapons: objRef.weaponsIds
          .map((id) => getHashData(TYPES.MARKET_WEAPON)[id]?.name ?? '')
          .sort(),
        scrolls: objRef.scrollsIds
          .map((id) => getHashData(TYPES.MARKET_SCROLL)[id]?.name ?? '')
          .sort(),
      },
      skills: objRef.skillsIds.map((id) => getHashData(TYPES.MARKET_SKILL)[id]?.name ?? '').sort(),
      traits: objRef.traitsIds.map((id) => getHashData(TYPES.MARKET_TRAIT)[id]?.name ?? '').sort(),
      battle: {
        monster: getHashData(TYPES.MONSTER)[objRef.monsterId]?.name ?? '',
        location: getHashData(TYPES.MONSTER_LOCATION)[objRef.monsterLocationId]?.name ?? '',
        obstacle: getHashData(TYPES.MONSTER_OBSTACLE)[objRef.monsterObstacleId]?.name ?? '',
        attack: getHashData(TYPES.MONSTER_ATTACK)[objRef.monsterAttackId]?.name ?? '',
        minions: objRef.minionsIds.map((id) => getHashData(TYPES.MINION)[id]?.name ?? '').sort(),
      },
      familiar: {
        name: getHashData(TYPES.FAMILIAR)[objRef.familiarId]?.name ?? '',
        power: objRef.familiarPower,
      },
      fiends: objRef.fiendsIds.map((id) => getHashData(TYPES.FIENDS)[id]?.name ?? '').sort(),
      counts: {
        experience: objRef.xp,
        gold: objRef.gold,
        score: objRef.score,
        health: getHealth(objRef.score, objRef.fiendsIds),
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
