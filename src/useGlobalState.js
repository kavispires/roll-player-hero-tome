import { createGlobalState } from 'react-hooks-global-state';

import { SCREENS, GENDERS } from './utils/constants';

const initialState = {
  screen: SCREENS.FORM,
  characterName: '',
  player: '',
  race: null,
  class: null,
  gender: GENDERS.UNKOWN,
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
  trophies: [],
  xp: 0,
  gold: 0,
  finalScore: 0,
  date: 0,
  familiar: null,
  fiends: [],
  monster: null,
  monsterLocation: null,
  monsterObstacle: null,
  monsterAttack: null,
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
