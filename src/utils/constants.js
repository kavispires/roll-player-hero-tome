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

export const TYPES = {
  ALIGNMENT: Symbol('ALIGNMENT'),
  BACKSTORY: Symbol('BACKSTORY'),
  CLASS: Symbol('CLASS'),
  FAMILIAR: Symbol('FAMILIAR'),
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
};

export const FORM_LABELS = {
  [TYPES.RACE]: 'Race',
  [TYPES.CLASS]: 'Class',
  [TYPES.CHARACTER_NAME]: 'Character Name',
  [TYPES.PLAYER]: 'Player',
  [TYPES.GENDER]: 'Gender',
  [TYPES.BACKSTORY]: 'Backstory',
};
