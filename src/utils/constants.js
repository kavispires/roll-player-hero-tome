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
  CHARACTER_NAME: Symbol('CHARACTER_NAME'),
  CLASS: Symbol('CLASS'),
  DATE: Symbol('DATE'),
  FAMILIAR: Symbol('FAMILIAR'),
  FAMILIAR_POWER: Symbol('FAMILIAR_POWER'),
  FIENDS: Symbol('FIENDS'),
  GENDER: Symbol('GENDER'),
  GOLD: Symbol('GOLD'),
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
  PLAYER: Symbol('PLAYER'),
  RACE: Symbol('RACE'),
  SCORE: Symbol('SCORE'),
  XP: Symbol('XP'),
};

export const GLOBAL_STATE_ALIAS = {
  [TYPES.RACE]: 'race',
  [TYPES.CLASS]: 'class',
  [TYPES.CHARACTER_NAME]: 'characterName',
  [TYPES.DATE]: 'date',
  [TYPES.FAMILIAR]: 'familiar',
  [TYPES.FAMILIAR_POWER]: 'familiarPower',
  [TYPES.FIENDS]: 'fiends',
  [TYPES.GENDER]: 'gender',
  [TYPES.GOLD]: 'gold',
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
  [TYPES.PLAYER]: 'player',
  [TYPES.SCORE]: 'score',
  [TYPES.XP]: 'xp',
};

export const FORM_LABELS = {
  [TYPES.RACE]: 'Race',
  [TYPES.CLASS]: 'Class',
  [TYPES.CHARACTER_NAME]: 'Character Name',
  [TYPES.DATE]: 'Date',
  [TYPES.FAMILIAR]: 'Familiar',
  [TYPES.FAMILIAR_POWER]: 'Power',
  [TYPES.FIENDS]: 'Fiends',
  [TYPES.GENDER]: 'Gender',
  [TYPES.GOLD]: 'Gold',
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
  [TYPES.PLAYER]: 'Player',
  [TYPES.SCORE]: 'Score',
  [TYPES.XP]: 'XP',
};
