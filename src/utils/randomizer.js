import { getHashData, getTypeahead, getAdventureTypeahead } from '../database';
import { TYPES } from './constants';
import { getClassColor } from './index';

const sessionUsedChache = {};
const sessionResetThreshold = {
  [TYPES.RACE]: getTypeahead(TYPES.RACE).length,
  [TYPES.CLASS]: getTypeahead(TYPES.CLASS).length,
  [TYPES.ALIGNMENT]: getTypeahead(TYPES.ALIGNMENT).length,
  [TYPES.FAMILIAR]: getTypeahead(TYPES.FAMILIAR).length,
  [TYPES.FIENDS]: getTypeahead(TYPES.FIENDS).length,
  [TYPES.BACKSTORY]: getTypeahead(TYPES.BACKSTORY).length,
  [TYPES.MARKET_ARMOR]: getTypeahead(TYPES.MARKET_ARMOR).length,
  [TYPES.MARKET_WEAPON]: getTypeahead(TYPES.MARKET_WEAPON).length,
  [TYPES.MARKET_SKILL]: getTypeahead(TYPES.MARKET_SKILL).length,
  [TYPES.MARKET_SCROLL]: getTypeahead(TYPES.MARKET_SCROLL).length,
  [TYPES.MARKET_TRAIT]: getTypeahead(TYPES.MARKET_TRAIT).length,
  [TYPES.MINION]: getTypeahead(TYPES.MINION).length,
  [TYPES.MONSTER]: getTypeahead(TYPES.MONSTER).length,
};

export function randomizeCharacter(initialState) {
  const result = { ...initialState };
  // Determine gender
  result.gender = getRandomValueFromList(['male', 'female']);
  // Deterime name
  const firstName = getRandomValueFromList(NAMES[result.gender]);
  const lastName = getLastName();
  result.characterName = `${firstName}${lastName ? ` ${lastName}` : ''}`;
  // Determine Race
  result.race = getRandomUniqueEntryFromList(TYPES.RACE).id;
  // Determine Class
  result.class = getRandomUniqueEntryFromList(TYPES.CLASS).id;
  // Determine Color
  result.color = getClassColor(result.class);
  // Determine Backstory
  result.backstory = getRandomUniqueEntryFromList(TYPES.BACKSTORY).id;
  // Determine Alignment
  result.alignment = getRandomUniqueEntryFromList(TYPES.ALIGNMENT).id;
  result.alignmentPos = getRandomValueFromList([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  // Determine Items
  const itemsQuantity = generateItemsQuantities();
  result.weapons = getUniqueValuesFromList(TYPES.MARKET_WEAPON, itemsQuantity[0]);
  result.armor = getUniqueValuesFromList(TYPES.MARKET_ARMOR, itemsQuantity[2]);
  result.skills = getUniqueValuesFromList(TYPES.MARKET_SKILL, itemsQuantity[3]);
  result.traits = getUniqueValuesFromList(TYPES.MARKET_TRAIT, itemsQuantity[4]);
  result.scrolls = getUniqueValuesFromList(TYPES.MARKET_SCROLL, itemsQuantity[5]);
  // Determine Trophies
  result.minions = getUniqueValuesFromList(TYPES.MINION, getRandomNumber(0, 5));
  // Determine Monster
  const monster = getAppropriateMonster(result.class);
  result.monster = monster.id;
  result.isLenticularVersion = getRandomValueFromList([true, false]);
  const adventureCards = getAppropriateAdventureCards(monster);
  result.monsterLocation = adventureCards.location;
  result.monsterObstacle = adventureCards.obstacle;
  result.monsterAttack = adventureCards.attack;
  result.monsterScore = getRandomNumber(10, 35);
  // Determine Familiar
  const familiar = getRandomUniqueEntryFromList(TYPES.FAMILIAR);
  result.familiar = familiar.id;
  result.familiarName = getRandomValueFromList(FAMILIAR_NAMES);
  result.familiarPower = generateFamiliarPower(familiar['power-min'], familiar['power-max']);
  // Determine Fiends
  result.fiends = getUniqueValuesFromList(TYPES.FIENDS, getRandomNumber(0, 3));
  result.fiendsBanished = getUniqueValuesFromList(TYPES.FIENDS, getRandomNumber(0, 3));
  // Determine Numbers
  result.xp = getRandomNumber(0, 8);
  result.gold = getRandomNumber(0, 10);
  result.score = getRandomNumber(20, 45);
  // Determine Attributes
  result.attributes = getAttributes(result.class, result.race);

  return result;
}

function getRandomValueFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomUniqueEntryFromList(type) {
  let tries = 0;
  // Create cache type entry, if it doesn't exist
  if (sessionUsedChache[type] === undefined) {
    sessionUsedChache[type] = {};
  }

  // If threshold was reached, reset cache
  if (Object.keys(sessionUsedChache?.[type] ?? {}).length === sessionResetThreshold[type]) {
    sessionUsedChache[type] = {};
  }

  // Get unique value
  let result;
  do {
    result = getRandomValueFromList(getTypeahead(type));
    ++tries;
  } while (sessionUsedChache?.[type]?.[result.value] !== undefined && tries < 15);

  // Update cache
  sessionUsedChache[type][result.value] = true;

  return getHashData(type)[result.value];
}

function getUniqueValuesFromList(type, quantity) {
  return new Array(quantity).fill(null).map(() => getRandomUniqueEntryFromList(type).id);
}

function generateItemsQuantities() {
  let left = 7;
  const result = new Array(5).fill(0).map((i) => {
    if (left > 0) {
      let value = getRandomValueFromList([0, 1, 1, 2, 2]);
      if (value > left) value = left;
      left -= value;
      return value;
    }
    return i;
  });

  if (left > 0) {
    result.forEach((i) => {
      if (left > 0 && i < 2) {
        left -= 1;
        i += 1;
      }
    });
  }

  return shuffleList(result);
}

function getRandomNumber(min = 0, max = 6) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleList(list) {
  return list.sort(() => Math.random() - 0.5);
}

function generateFamiliarPower(min, max) {
  const numberOfOptions = max - min + getRandomNumber(1, 3);
  const options = [min, max];
  for (let i = -2; i < numberOfOptions; i++) {
    options.push(min + i);
  }
  return getRandomValueFromList(options);
}

function getAppropriateMonster(classId) {
  // Create cache type entry, if it doesn't exist
  if (sessionUsedChache[TYPES.MONSTER] === undefined) {
    sessionUsedChache[TYPES.MONSTER] = {};
  }

  // If threshold was reached, reset cache
  if (
    Object.keys(sessionUsedChache?.[TYPES.MONSTER] ?? {}).length ===
    sessionResetThreshold[TYPES.MONSTER]
  ) {
    sessionUsedChache[TYPES.MONSTER] = {};
  }

  // Get unique value
  let result;
  let allowed = false;
  let tries = 0;
  do {
    allowed = true;
    result = getRandomValueFromList(getTypeahead(TYPES.MONSTER));
    if (result.color === getHashData(TYPES.CLASS)[classId]) {
      allowed = false;
    }

    ++tries;
  } while (
    sessionUsedChache?.[TYPES.MONSTER]?.[result.value] !== undefined &&
    !allowed &&
    tries < 15
  );

  // Update cache
  sessionUsedChache[TYPES.MONSTER][result.value] = true;

  return getHashData(TYPES.MONSTER)[result.value];
}

function getAppropriateAdventureCards(monster) {
  return {
    location: getRandomValueFromList(
      getAdventureTypeahead(getHashData(TYPES.MONSTER_LOCATION), monster.name)
    ).value,
    obstacle: getRandomValueFromList(
      getAdventureTypeahead(getHashData(TYPES.MONSTER_OBSTACLE), monster.name)
    ).value,
    attack: getRandomValueFromList(
      getAdventureTypeahead(getHashData(TYPES.MONSTER_ATTACK), monster.name)
    ).value,
  };
}

function getAttributes(classId, raceId) {
  const characterClass = getHashData(TYPES.CLASS)[classId];
  const characterRace = getHashData(TYPES.RACE)[raceId];

  const result = [
    getAttribute(characterClass.str, characterRace.str),
    getAttribute(characterClass.dex, characterRace.dex),
    getAttribute(characterClass.con, characterRace.con),
    getAttribute(characterClass.int, characterRace.int),
    getAttribute(characterClass.wis, characterRace.wis),
    getAttribute(characterClass.cha, characterRace.cha),
  ];

  return {
    str: result[0],
    dex: result[1],
    con: result[2],
    int: result[3],
    wis: result[4],
    cha: result[5],
  };
}

function getAttribute(baseGoal, modifier) {
  const base = Number(`${baseGoal}`.substring(0, 2));

  const goal = base + modifier;

  let deviation = 0;
  if (goal > 18) {
    deviation = getRandomNumber(-2, 0);
  } else if (goal >= 14 && baseGoal.length > 3) {
    deviation = getRandomNumber(-1, 2);
  } else {
    deviation = getRandomNumber(-2, 3);
  }

  return base + deviation;
}

function getLastName() {
  const prefix = getRandomValueFromList(FAMILY_NAMES.prefix);
  const suffix = getRandomValueFromList(FAMILY_NAMES.suffix);
  const separator = prefix === suffix ? '-' : '';
  const familyName = `${prefix}${separator}${suffix}`;
  return familyName.charAt(0).toUpperCase() + familyName.slice(1);
}

const NAMES = {
  male: [
    'Arnold',
    'Benji',
    'Carlus',
    'Dominique',
    'Eldrin',
    'Fin',
    'Gustavos',
    'Helius',
    'Igor',
    'John',
    'Karl',
    'Lynus',
    'Lazarus',
    'Magnus',
    'Nimbus',
    'Otto',
    'Odo',
    'Papa',
    'Rashi',
    'Serpentine',
    'Tweedey',
    'Thomas',
    'Uurl',
    'Vance',
    'Willy',
    'Wellington',
    'Xanadu',
    'Yvanhoe',
    'Zulu',
  ],
  female: [
    'Anna',
    'Bella',
    'Corrie',
    'Dame',
    'Ella',
    'Fang',
    'Gemma',
    'Gala',
    'Helena',
    'Higrid',
    'Indi',
    'June',
    'Kiara',
    'Lana',
    'Mim',
    'Nina',
    'Olga',
    'Pat',
    'Reika',
    'Rashina',
    'Sansa',
    'Titi',
    'Ursula',
    'Una',
    'Vara',
    'Wholpi',
    'Xaxa',
    'Xena',
    'Yanna',
    'Zoe',
  ],
};

const FAMILY_NAMES = {
  prefix: [
    'thunder',
    'scar',
    'star',
    'brave',
    'heart',
    'oak',
    'iron',
    'golden',
    'silver',
    'oath',
    'snow',
    'dark',
    '',
  ],
  suffix: [
    'sun',
    'moon',
    'bolt',
    'lion',
    'wolf',
    'light',
    'soul',
    'scare',
    'dust',
    'eye',
    'shot',
    'heart',
    'keeper',
    'white',
    'lord',
    '',
  ],
};

const FAMILIAR_NAMES = [
  'Buddy',
  'Spark',
  'Popo',
  'Sam',
  'Boo',
  'Ham',
  'Remmy',
  'Pip',
  'Baby',
  'Devil',
  'Jambo',
  'Jimbo',
  'Zeus',
  'Marsa',
  'Jupiter',
  'Venus',
  'Pluto',
  'Galak',
  'Athena',
  'Moon',
  'Alaska',
  '',
];
