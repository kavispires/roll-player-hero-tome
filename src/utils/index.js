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
      gender: getHashData(TYPES.GENDER)[objRef.gender]?.name ?? 'Unkown',
      backstory: getHashData(TYPES.BACKSTORY)[objRef.backstory]?.name ?? '',
      'attribute-rp-scores': getAttributeScores(objRef.attributes, objRef.race),
      'attribute-rpa-scores': getRPAAttributeScores(objRef.attributes, objRef.race),
      alignment: getAlignmentScore(objRef.alignment, objRef.alignmentPos),
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

export function getCharacterTextString(objRef) {
  let result = '';

  function getLine(length, separator = '-') {
    return `${new Array(length).fill(separator).join('')}`;
  }

  function addLine(length = 15) {
    result += getLine(length);
  }

  function addTitle(title) {
    const titleLine = getLine(title.length, '=');
    result += `\n${titleLine}\n${title.toUpperCase()}\n${titleLine}\n\n`;
  }

  function addSection(title) {
    const sLine = getLine(title.length, '-');
    result += `\n${sLine.toUpperCase()}\n${title.toUpperCase()}\n${sLine}\n\n`;
  }

  function addSubSection(title) {
    const ssLine = getLine(title.length, '-');
    result += `\n${title.toUpperCase()}\n${ssLine}\n\n`;
  }

  function addText(text) {
    result += `${text}\n`;
  }

  function addListItem(item) {
    result += `    - ${item}\n`;
  }

  function addList(list = []) {
    console.log({ list });
    if (list.length === 0) {
      result += 'N/A\n';
    } else {
      for (let i = 0; i < list.length; i++) {
        addListItem(list[i]);
      }
    }
  }

  function addLineBreak(num = 1) {
    for (let i = 0; i < num; i++) {
      result += '\n';
    }
  }

  // BUILD
  addTitle('Roll Player Hero Tome');
  addText(`Created by ${objRef.player} on ${objRef.date}`);
  addSection(`Character: ${objRef.characterName}`);
  addText(`Race: ${getHashData(TYPES.RACE)[objRef.race]?.name}`);
  addText(`Class: ${getHashData(TYPES.CLASS)[objRef.class]?.name}`);
  addText(`Gender: ${getHashData(TYPES.GENDER)[objRef.gender]?.name}`);
  addText(`Backstory: ${getHashData(TYPES.BACKSTORY)[objRef.backstory]?.name}`);
  addSubSection('Attributes');
  const attributesObj = getCombinedAttributeScores(objRef.attributes, objRef.race);
  addText(`STR = ${attributesObj.str[1]} (${attributesObj.str[0]})`);
  addText(`DEX = ${attributesObj.dex[1]} (${attributesObj.dex[0]})`);
  addText(`CON = ${attributesObj.con[1]} (${attributesObj.con[0]})`);
  addText(`INT = ${attributesObj.int[1]} (${attributesObj.int[0]})`);
  addText(`WIS = ${attributesObj.wis[1]} (${attributesObj.wis[0]})`);
  addText(`CHA = ${attributesObj.cha[1]} (${attributesObj.cha[0]})`);
  if (attributesObj.addDice) {
    addLine(
      `\n// Add ${attributesObj.addDice} to any attribute score before playing Roll Player Adventures`
    );
  }
  addSubSection('Alignment');
  const alignmentObj = getAlignmentScore(objRef.alignment, objRef.alignmentPos);
  addText(`${alignmentObj.name} (${alignmentObj.title})`);
  addText(`Points: ${alignmentObj.score}`);
  addSection('Stats');
  addListItem(`Health: ${getHealth(objRef.score, objRef.fiends)}`);
  addListItem(`Experience: ${objRef.xp}`);
  addListItem(`Gold: ${objRef.gold}`);
  addSection('Items/Abilities');
  addSubSection('Armor');
  addList(objRef.armor.map((id) => getHashData(TYPES.MARKET_ARMOR)[id]?.name ?? '').sort());
  addSubSection('Weapons');
  addList(objRef.weapons.map((id) => getHashData(TYPES.MARKET_WEAPON)[id]?.name ?? '').sort());
  addSubSection('Scrolls');
  addList(objRef.scrolls.map((id) => getHashData(TYPES.MARKET_SCROLL)[id]?.name ?? '').sort());
  addSubSection('Skills');
  addList(objRef.skills.map((id) => getHashData(TYPES.MARKET_SKILL)[id]?.name ?? '').sort());
  addSubSection('Traits');
  addList(objRef.traits.map((id) => getHashData(TYPES.MARKET_TRAIT)[id]?.name ?? '').sort());
  addSection('Familiar');
  addText(
    `${getHashData(TYPES.FAMILIAR)[objRef.familiar]?.name ?? ''} (Power: ${objRef.familiarPower})`
  );
  addSection('Enemies');
  addSubSection(`Monter: ${getHashData(TYPES.MONSTER)[objRef.monster]?.name ?? ''}`);
  addListItem(
    `Location: ${getHashData(TYPES.MONSTER_LOCATION)[objRef.monsterLocation]?.name ?? ''}`
  );
  addListItem(
    `Obstacle: ${getHashData(TYPES.MONSTER_OBSTACLE)[objRef.monsterObstacle]?.name ?? ''}`
  );
  addListItem(`Attack: ${getHashData(TYPES.MONSTER_ATTACK)[objRef.monsterAttack]?.name ?? ''}`);
  addSubSection('Minions');
  addList(objRef.minions.map((id) => getHashData(TYPES.MINION)[id]?.name ?? '').sort());
  addSubSection('Fiends');
  addList(objRef.fiends.map((id) => getHashData(TYPES.FIENDS)[id]?.name ?? '').sort());
  addLineBreak(2);
  addSection('Final Score');
  addText(`${objRef.score} reputation stars`);
  return result;
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
  const rpAttributes = getAttributeScores(attributes, raceId);

  function getAttrValue(val) {
    if (val < 14) return 0;
    if (val < 16) return 1;
    if (val < 18) return 2;
    return 3;
  }

  return {
    str: getAttrValue(rpAttributes.str),
    dex: getAttrValue(rpAttributes.dex),
    con: getAttrValue(rpAttributes.con),
    int: getAttrValue(rpAttributes.int),
    wis: getAttrValue(rpAttributes.wis),
    cha: getAttrValue(rpAttributes.cha),
  };
}

function getCombinedAttributeScores(attributes, raceId) {
  const rpAttributes = getAttributeScores(attributes, raceId);
  const rpaAttributes = getRPAAttributeScores(attributes, raceId);

  const addDice = Object.values(rpaAttributes).reduce((acc, entry) => {
    acc -= entry;
    if (acc < 0) acc = 0;
    return acc;
  }, 6);

  console.log({ addDice });
  return {
    str: [rpAttributes.str, rpaAttributes.str],
    dex: [rpAttributes.dex, rpaAttributes.dex],
    con: [rpAttributes.con, rpaAttributes.con],
    int: [rpAttributes.int, rpaAttributes.int],
    wis: [rpAttributes.wis, rpaAttributes.wis],
    cha: [rpAttributes.cha, rpaAttributes.cha],
    addDice,
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
