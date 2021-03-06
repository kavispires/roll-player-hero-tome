export const mockDefaultGlobalStateTome = {
  characterObject: null,
  deserializedCharacter: null,
  isCharacterGenerated: false,
  isCharacterComplete: false,
  isSavingEnabled: true,
  characterId: null,
  characterName: '',
  player: '',
  race: null,
  class: null,
  gender: null,
  backstory: null,
  attributes: {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  },
  alignment: null,
  alignmentPos: 4,
  weapons: [],
  armor: [],
  skills: [],
  traits: [],
  scrolls: [],
  minions: [],
  xp: 0,
  gold: 0,
  score: 0,
  date: '2020-01-01',
  familiar: null,
  familiarName: null,
  familiarPower: 0,
  fiends: [],
  fiendsBanished: [],
  monster: null,
  monsterLocation: null,
  monsterObstacle: null,
  monsterAttack: null,
  monsterScore: 0,
  isLenticularVersion: false,
};

export const mockCompleteGlobalStateTome = {
  characterObject: null,
  deserializedCharacter: null,
  isCharacterGenerated: false,
  isCharacterComplete: false,
  isSavingEnabled: true,
  characterId: 'abc123',
  characterName: 'Test',
  player: 'Tester',
  race: 'abc123',
  class: 'abc123',
  gender: 'male',
  backstory: 'abc123',
  attributes: {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  },
  alignment: 'abc123',
  alignmentPos: 4,
  weapons: ['1', '3', '2'],
  armor: ['2', '3', '1'],
  skills: ['1'],
  traits: [],
  scrolls: ['3', '1'],
  minions: ['3', '1', '4', '2'],
  xp: '1',
  gold: '1',
  score: '1',
  date: '2020-01-01',
  familiar: 'abc123',
  familiarName: null,
  familiarPower: '2',
  fiends: ['2', '1'],
  fiendsBanished: ['2', '3', '1'],
  monster: 'abc123',
  monsterLocation: 'abc123',
  monsterObstacle: 'abc123',
  monsterAttack: 'abc123',
  monsterScore: '1',
  isLenticularVersion: true,
};

export const mockCompleteGlobalStateTomeWithIds = {
  characterObject: null,
  deserializedCharacter: null,
  isCharacterGenerated: false,
  isCharacterComplete: false,
  isSavingEnabled: true,
  characterId: 'abc123',
  characterName: 'Test',
  player: 'Tester',
  race: 'rc-bs-1',
  class: 'cl-mm-a-1',
  gender: 'male',
  backstory: 'bs-mm-1',
  attributes: {
    str: 10,
    dex: 12,
    con: 14,
    int: 16,
    wis: 18,
    cha: 20,
  },
  alignment: 'al-ff-1',
  alignmentPos: 6,
  weapons: ['mk-bs-1', 'mk-ff-17', '2'],
  armor: ['mk-ff-1', 'mk-bs-43', '1'],
  skills: ['mk-ff-26'],
  traits: ['mk-bs-13', 'mk-bs-15'],
  scrolls: ['mk-pm-2', 'mk-ff-23"'],
  minions: ['mi-mm-1', 'mi-mm-2', 'mi-ff-1', 'mi-ff-2'],
  xp: '3',
  gold: '4',
  score: '10',
  date: '2020-01-01',
  familiar: 'fm-ff-1',
  familiarName: 'Test',
  familiarPower: '3',
  fiends: ['fi-ff-1', 'fi-ff-2'],
  fiendsBanished: ['fi-ff-3', 'fi-ff-4', 'fi-ff-5'],
  monster: 'mo-mm-1',
  monsterLocation: 'ad-mm-48',
  monsterObstacle: 'ad-mm-51',
  monsterAttack: 'ad-mm-53',
  monsterScore: '10',
  isLenticularVersion: true,
};
