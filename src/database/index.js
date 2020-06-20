import { orderBy } from 'lodash-es';

// Data
import ALIGNMENTS from '../database/alignments.json';
import BACKSTORIES from '../database/backstories.json';
import CLASSES from '../database/classes.json';
import RACES from '../database/races.json';
import MARKET from '../database/market.json';
import MINIONS from '../database/minions.json';
import MONSTER from '../database/monsters.json';
import ADVENTURE from '../database/adventure.json';
import FAMILIARS from '../database/familiars.json';
import FIENDS from '../database/fiends.json';
// Utils
import { TYPES } from '../utils/constants';

const typeaheadCache = {};
const marketCahce = {};
const adventureCache = {};

const switcher = {
  [TYPES.ALIGNMENT]: ALIGNMENTS,
  [TYPES.BACKSTORY]: BACKSTORIES,
  [TYPES.CLASS]: CLASSES,
  [TYPES.FAMILIAR]: FAMILIARS,
  [TYPES.FIENDS]: FIENDS,
  [TYPES.MARKET_ARMOR]: filterDataByKind('Armor', MARKET, marketCahce),
  [TYPES.MARKET_SCROLL]: filterDataByKind('Scroll', MARKET, marketCahce),
  [TYPES.MARKET_SKILL]: filterDataByKind('Skill', MARKET, marketCahce),
  [TYPES.MARKET_TRAIT]: filterDataByKind('Trait', MARKET, marketCahce),
  [TYPES.MARKET_WEAPON]: filterDataByKind('Weapon', MARKET, marketCahce),
  [TYPES.MINION]: MINIONS,
  [TYPES.MONSTER]: MONSTER,
  [TYPES.MONSTER_LOCATION]: filterDataByKind('location', ADVENTURE, adventureCache),
  [TYPES.MONSTER_OBSTACLE]: filterDataByKind('obstacle', ADVENTURE, adventureCache),
  [TYPES.MONSTER_ATTACK]: filterDataByKind('attack', ADVENTURE, adventureCache),
  [TYPES.RACE]: RACES,
};

export function getTypeahead(type) {
  if (typeaheadCache[type] === undefined) {
    const data = switcher[type];

    const typeheadData = Object.values(data).map((entry) => ({
      value: entry.id,
      text: entry.name,
    }));

    const sortedTypeaheadData = orderBy(typeheadData, 'text');

    typeaheadCache[type] = sortedTypeaheadData;
  }

  return typeaheadCache[type];
}

export function getAdventureTypeahead(data, monsterName) {
  return Object.values(data).reduce((acc, entry) => {
    if (entry.monster === monsterName) {
      acc.push({
        value: entry.id,
        text: entry.name,
      });
    }
    return acc;
  }, []);
}

export function getHashData(type) {
  return switcher[type];
}

function filterDataByKind(kind, data, cache) {
  if (cache[kind] === undefined) {
    Object.values(data).forEach((card) => {
      if (cache[card.kind] === undefined) {
        cache[card.kind] = {};
      }

      cache[card.kind][card.id] = card;
    });
  }

  return cache[kind];
}
