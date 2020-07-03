import { createGlobalState } from 'react-hooks-global-state';

import { SCREENS, REFRESH_TIMER } from './utils/constants';
import { getTodaysDate } from './utils';

export const initialState = {
  // App Global
  activeDialog: null,
  screen: SCREENS.FORM,

  // App
  characterObject: null,
  deserializedCharacter: null,
  isCharacterGenerated: false,
  isCharacterComplete: false,
  isSavingEnabled: false,

  // Character Fields
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
  date: getTodaysDate(),
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

const { useGlobalState, setGlobalState: setGlobalStateCGS, setState, getState } = createGlobalState(
  initialState
);

export function resetGlobalState() {
  setGlobalState('screen', SCREENS.REFRESH);
  setTimeout(() => {
    setState({ ...initialState });
  }, REFRESH_TIMER);
}

export const getCompleteGlobalState = getState;

export const setGlobalState = setGlobalStateCGS;

export const setCompleteGlobalState = setState;

export default useGlobalState;
