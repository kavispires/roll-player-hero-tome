import { getHashData, getAdventureTypeahead } from '../database';
import { TYPES } from './constants';

const removeFalsy = (item) => item;

/**
 * Check if all required fields in a character object are filled
 * @param {object} tome the object with the tome data
 * @returns {boolean}
 */
export function determineCharacterCompletion(tome) {
  // If text fields are empty
  if (!tome.characterName || !tome.player) return false;

  // If mandatory fields are empty
  if (!tome.race || !tome.class || !tome.backstory || !tome.alignment) return false;

  // If attributes are less than 3
  if (Object.values(tome.attributes).some((attr) => attr < 3)) return false;

  // If monster, but no location, obstacle, or attack
  if (tome.monster && (!tome.monsterLocation || !tome.monsterObstacle || !tome.monsterAttack))
    return false;

  // If has familiar, but power is less then 3
  if (tome.familiar && tome.familiarPower < 3) return false;

  return true;
}

/**
 * Parses a character tome object to be database ready before saving
 * @param {object} tome the object with the tome data
 * @returns {object}
 */
export function deserializeCharacter(tome) {
  const result = {
    id: tome.characterId,
    name: tome.characterName,
    race: tome.race,
    class: tome.class,
    gender: tome.gender,
    backstory: tome.backstory,
    'attribute-scores': tome.attributes,
    alignment: {
      id: tome.alignment,
      position: Number(tome.alignmentPos),
    },
    items: {
      armor: tome.armor?.sort(),
      weapons: tome.weapons?.sort(),
      scrolls: tome.scrolls?.sort(),
    },
    skills: tome.skills?.sort(),
    traits: tome.traits?.sort(),
    battle: {
      monster: tome.monster,
      alternativeLenticularVersion: tome.isLenticularVersion || null,
      location: tome.monsterLocation,
      obstacle: tome.monsterObstacle,
      attack: tome.monsterAttack,
      minions: tome.minions?.sort(),
      score: Number(tome.monsterScore),
    },
    fiends: tome.fiends?.sort(),
    counts: {
      experience: Number(tome.xp),
      gold: Number(tome.gold),
      score: Number(tome.score),
    },
    player: tome.player,
    'created-at': tome.date ?? getTodaysDate(),
  };

  if (tome.familiar) {
    result.familiar = {
      id: tome.familiar,
      name: tome.familiarName ?? 'Unnamed',
      power: Number(tome.familiarPower),
    };
  }

  return result;
}

/**
 * Parses a character tome object to JsonApi format
 * @param {object} tome the object with the tome data
 * @return {object}
 */
export function getCharacterJsonApi(tome) {
  return {
    id: tome.character ?? null,
    type: 'roll-player-character',
    attributes: {
      name: tome.characterName,
      race: getHashData(TYPES.RACE)[tome.race]?.name ?? '',
      class: getHashData(TYPES.CLASS)[tome.class]?.name ?? '',
      gender: getHashData(TYPES.GENDER)[tome.gender]?.name ?? 'Unkown',
      backstory: getHashData(TYPES.BACKSTORY)[tome.backstory]?.name ?? '',
      'attribute-rp-scores': getAttributeScores(tome.attributes, tome.race),
      'attribute-rpa-scores': getRPAAttributeScores(tome.attributes, tome.race),
      alignment: getAlignmentScore(tome.alignment, tome.alignmentPos),
      items: {
        armor: tome.armor
          .map((id) => getHashData(TYPES.MARKET_ARMOR)[id]?.name ?? '')
          .sort()
          .filter(removeFalsy),
        weapons: tome.weapons
          .map((id) => getHashData(TYPES.MARKET_WEAPON)[id]?.name ?? '')
          .sort()
          .filter(removeFalsy),
        scrolls: tome.scrolls
          .map((id) => getHashData(TYPES.MARKET_SCROLL)[id]?.name ?? null)
          .sort()
          .filter(removeFalsy),
      },
      skills: tome.skills
        .map((id) => getHashData(TYPES.MARKET_SKILL)[id]?.name ?? '')
        .sort()
        .filter(removeFalsy),
      traits: tome.traits
        .map((id) => getHashData(TYPES.MARKET_TRAIT)[id]?.name ?? '')
        .sort()
        .filter(removeFalsy),
      battle: {
        monster: `${getHashData(TYPES.MONSTER)[tome.monster]?.name ?? ''}${
          tome.isLenticularVersion ? ' (Lenticular version)' : ''
        }`,
        location: getHashData(TYPES.MONSTER_LOCATION)[tome.monsterLocation]?.name ?? '',
        obstacle: getHashData(TYPES.MONSTER_OBSTACLE)[tome.monsterObstacle]?.name ?? '',
        attack: getHashData(TYPES.MONSTER_ATTACK)[tome.monsterAttack]?.name ?? '',
        minions: tome.minions
          .map((id) => getHashData(TYPES.MINION)[id]?.name ?? '')
          .sort()
          .filter(removeFalsy),
        score: Number(tome.monsterScore) ?? 0,
      },
      familiar: {
        species: getHashData(TYPES.FAMILIAR)[tome.familiar]?.name ?? '',
        name: tome.familiarName,
        power: Number(tome.familiarPower),
      },
      fiends: {
        active: tome.fiends
          .map((id) => getHashData(TYPES.FIENDS)[id]?.name ?? '')
          .sort()
          .filter(removeFalsy),
        banished: [],
        // banished: tome.fiendsBanished((id) =>  getHa)
      },
      counts: {
        experience: Number(tome.xp),
        gold: Number(tome.gold),
        score: Number(tome.score),
        health: getHealth(tome.score, tome.fiends),
      },
    },
    meta: {
      'created-by': tome.player,
      'created-at': tome.date ?? new Date(),
    },
  };
}

/**
 * Gets the specific adventure data (location, obstable, attack) based on the given monster name
 * @param {symbol} type the type symbol
 * @param {string} monsterName the monster name
 * @returns {object} the hash dictionary and typeahead for the adventure type
 */
export function getMonsterAdventureData(type, monsterName) {
  const dict = getHashData(type);
  return {
    dict,
    typeahead: getAdventureTypeahead(dict, monsterName),
  };
}

export function getCharacterTextString(tome) {
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
  addText(`Created by ${tome.player} on ${tome.date}`);
  addSection(`Character: ${tome.characterName}`);
  addText(`Race: ${getHashData(TYPES.RACE)[tome.race]?.name}`);
  addText(`Class: ${getHashData(TYPES.CLASS)[tome.class]?.name}`);
  addText(`Gender: ${getHashData(TYPES.GENDER)[tome.gender]?.name}`);
  addText(`Backstory: ${getHashData(TYPES.BACKSTORY)[tome.backstory]?.name}`);
  addSubSection('Attributes');
  const attributesObj = getCombinedAttributeScores(tome.attributes, tome.race);
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
  const alignmentObj = getAlignmentScore(tome.alignment, tome.alignmentPos);
  addText(`${alignmentObj.name} (${alignmentObj.title})`);
  addText(`Points: ${alignmentObj.score}`);
  addSection('Stats');
  addListItem(`Health: ${getHealth(tome.score, tome.fiends)}`);
  addListItem(`Experience: ${tome.xp}`);
  addListItem(`Gold: ${tome.gold}`);
  addSection('Items/Abilities');
  addSubSection('Armor');
  addList(tome.armor.map((id) => getHashData(TYPES.MARKET_ARMOR)[id]?.name ?? '').sort());
  addSubSection('Weapons');
  addList(tome.weapons.map((id) => getHashData(TYPES.MARKET_WEAPON)[id]?.name ?? '').sort());
  addSubSection('Scrolls');
  addList(tome.scrolls.map((id) => getHashData(TYPES.MARKET_SCROLL)[id]?.name ?? '').sort());
  addSubSection('Skills');
  addList(tome.skills.map((id) => getHashData(TYPES.MARKET_SKILL)[id]?.name ?? '').sort());
  addSubSection('Traits');
  addList(tome.traits.map((id) => getHashData(TYPES.MARKET_TRAIT)[id]?.name ?? '').sort());
  addSection('Familiar');
  if (tome.familiarName) {
    addText(
      `${tome.familiarName}, the ${
        getHashData(TYPES.FAMILIAR)[tome.familiar]?.species ?? ''
      } (Power: ${tome.familiarPower})`
    );
  } else {
    addText(
      `${getHashData(TYPES.FAMILIAR)[tome.familiar]?.species ?? ''} (Power: ${tome.familiarPower})`
    );
  }
  addSection('Enemies');
  addSubSection(`Monter: ${getHashData(TYPES.MONSTER)[tome.monster]?.name ?? ''}`);
  addListItem(`Location: ${getHashData(TYPES.MONSTER_LOCATION)[tome.monsterLocation]?.name ?? ''}`);
  addListItem(`Obstacle: ${getHashData(TYPES.MONSTER_OBSTACLE)[tome.monsterObstacle]?.name ?? ''}`);
  addListItem(`Attack: ${getHashData(TYPES.MONSTER_ATTACK)[tome.monsterAttack]?.name ?? ''}`);
  addListItem(`Monster Score: ${tome.monsterScore || 'Unknown'}`);
  addSubSection('Minions');
  addList(tome.minions.map((id) => getHashData(TYPES.MINION)[id]?.name ?? '').sort());
  addSubSection('Fiends');
  addList(tome.fiends.map((id) => getHashData(TYPES.FIENDS)[id]?.name ?? '').sort());
  addLineBreak(2);
  addSection('Final Score');
  addText(`${tome.score} reputation stars`);
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

export function loadCharacterFromDatabase(characters, id, initialState) {
  // Find character
  const character = characters.filter((c) => c.id === id)[0];

  const state = {
    ...initialState,
    alignment: character.alignment.id,
    alignmentPos: character.alignment.position,
    armor: character?.items.armor ?? [],
    attributes: {
      str: character['attribute-scores'].str ?? 0,
      dex: character['attribute-scores'].dex ?? 0,
      con: character['attribute-scores'].con ?? 0,
      int: character['attribute-scores'].int ?? 0,
      wis: character['attribute-scores'].wis ?? 0,
      cha: character['attribute-scores'].cha ?? 0,
    },
    backstory: character.backstory,
    characterId: character.id,
    characterName: character.name,
    class: character.class,
    date: character['created-at'],
    familiar: character.familiar.id,
    familiarPower: Number(character.familiar.power ?? 0),
    familiarName: character.familiar.name,
    fiends: character?.fiends ?? [],
    gender: character.gender,
    gold: Number(character.counts.gold),
    minions: character?.battle?.minions ?? [],
    monster: character?.battle?.monster ?? null,
    monsterAttack: character?.battle?.attack ?? null,
    monsterLocation: character?.battle?.location ?? null,
    monsterObstacle: character?.battle?.obstacle ?? null,
    monsterScore: character?.battle?.score ?? 0,
    isLenticularVersion: character?.battle?.alternativeLenticularVersion ?? false,
    player: character?.player,
    race: character.race,
    score: Number(character.counts.score),
    scrolls: character?.items.scrolls ?? [],
    skills: character?.skills ?? [],
    traits: character?.traits ?? [],
    weapons: character?.items.weapons ?? [],
    xp: 0,
  };

  return state;
}

export function getTodaysDate() {
  const now = new Date();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  const year = now.getFullYear();

  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  return `${year}-${month}-${day}`;
}

export function getEntryById(list, id) {
  return list.filter((o) => o.value === id)[0];
}

export function getEntriesByIds(list, ids) {
  return list.filter((o) => ids.includes(o.value));
}
