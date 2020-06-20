export const SCREENS = {
  FORM: Symbol('FORM'),
  PRINT: Symbol('PRINT'),
  SAVE: Symbol('SAVE'),
};

export const GENDERS = {
  FEMALE: 'FEMALE',
  MALE: 'MALE',
  UNKNOWN: 'UNKNOWN',
};

export const ATTRIBUTES = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma',
};

export const TYPES = {
  ALIGNMENT: Symbol('ALIGNMENT'),
  BACKSTORY: Symbol('BACKSTORY'),
  CLASS: Symbol('CLASS'),
  FAMILIAR: Symbol('FAMILIAR'),
  FAMILIAR_POWER: Symbol('FAMILIAR_POWER'),
  FIENDS: Symbol('FIENDS'),
  MARKET_ARMOR: Symbol('MARKET_ARMOR'),
  MARKET_WEAPON: Symbol('MARKET_WEAPON'),
  MARKET_SKILL: Symbol('MARKET_SKILL'),
  MARKET_SCROLL: Symbol('MARKET_SCROLL'),
  MARKET_TRAIT: Symbol('MARKET_TRAIT'),
  MINION: Symbol('MINION'),
  MONSTER: Symbol('MONSTER'),
  MONSTER_ATTACK: Symbol('MONSTER_ATTACK'),
  MONSTER_LOCATION: Symbol('MONSTER_LOCATION'),
  MONSTER_OBSTACLE: Symbol('MONSTER_OBSTACLE'),
  RACE: Symbol('RACE'),
  CHARACTER_NAME: Symbol('CHARACTER_NAME'),
  PLAYER: Symbol('PLAYER'),
  GENDER: Symbol('GENDER'),
};

export const GLOBAL_STATE_ALIAS = {
  [TYPES.RACE]: 'race',
  [TYPES.CLASS]: 'class',
  [TYPES.CHARACTER_NAME]: 'characterName',
  [TYPES.PLAYER]: 'player',
  [TYPES.GENDER]: 'gender',
  [TYPES.BACKSTORY]: 'backstory',
  [TYPES.MARKET_ARMOR]: 'armor',
  [TYPES.MARKET_WEAPON]: 'weapons',
  [TYPES.MARKET_SKILL]: 'skills',
  [TYPES.MARKET_SCROLL]: 'scrolls',
  [TYPES.MARKET_TRAIT]: 'traits',
  [TYPES.MINION]: 'trophies',
  [TYPES.MONSTER]: 'monster',
  [TYPES.MONSTER_LOCATION]: 'monsterLocation',
  [TYPES.MONSTER_OBSTACLE]: 'monsterObstacle',
  [TYPES.MONSTER_ATTACK]: 'monsterAttack',
  [TYPES.FAMILIAR]: 'familiar',
  [TYPES.FAMILIAR_POWER]: 'familiarPower',
  [TYPES.FIENDS]: 'fiends',
};

export const FORM_LABELS = {
  [TYPES.RACE]: 'Race',
  [TYPES.CLASS]: 'Class',
  [TYPES.CHARACTER_NAME]: 'Character Name',
  [TYPES.PLAYER]: 'Player',
  [TYPES.GENDER]: 'Gender',
  [TYPES.BACKSTORY]: 'Backstory',
  [TYPES.MARKET_ARMOR]: 'Armor',
  [TYPES.MARKET_WEAPON]: 'Weapons',
  [TYPES.MARKET_SKILL]: 'Skills',
  [TYPES.MARKET_SCROLL]: 'Scrolls',
  [TYPES.MARKET_TRAIT]: 'Traits',
  [TYPES.MINION]: 'Trophies (Minions)',
  [TYPES.MONSTER]: 'Monster',
  [TYPES.MONSTER_LOCATION]: 'Location',
  [TYPES.MONSTER_OBSTACLE]: 'Obstacle',
  [TYPES.MONSTER_ATTACK]: 'Attack',
  [TYPES.FAMILIAR]: 'Familiar',
  [TYPES.FAMILIAR_POWER]: 'Power',
  [TYPES.FIENDS]: 'Fiends',
};
