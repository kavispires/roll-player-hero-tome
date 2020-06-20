import { orderBy } from 'lodash-es';

// Data
import ALIGNMENTS from '../database/alignments.json';
import BACKSTORIES from '../database/backstories.json';
import CLASSES from '../database/classes.json';
import RACES from '../database/races.json';
import MARKET from '../database/market.json';
import MINIONS from '../database/minions.json';
// Utils
import { TYPES } from '../utils/constants';

const typeaheadCache = {};
const marketCahce = {};

const switcher = {
  [TYPES.ALIGNMENT]: ALIGNMENTS,
  [TYPES.BACKSTORY]: BACKSTORIES,
  [TYPES.CLASS]: CLASSES,
  [TYPES.RACE]: RACES,
  [TYPES.MARKET_ARMOR]: getMarketData('Armor'),
  [TYPES.MARKET_SCROLL]: getMarketData('Scroll'),
  [TYPES.MARKET_SKILL]: getMarketData('Skill'),
  [TYPES.MARKET_TRAIT]: getMarketData('Trait'),
  [TYPES.MARKET_WEAPON]: getMarketData('Weapon'),
  [TYPES.MINION]: MINIONS,
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

export function getHashData(type) {
  return switcher[type];
}

function getMarketData(kind) {
  if (marketCahce[kind] === undefined) {
    Object.values(MARKET).forEach((card) => {
      if (marketCahce[card.kind] === undefined) {
        marketCahce[card.kind] = {};
      }

      marketCahce[card.kind][card.id] = card;
    });
  }

  return marketCahce[kind];
}
