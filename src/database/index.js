import { orderBy } from 'lodash-es';

// Data
import ALIGNMENTS from '../database/alignments.json';
import BACKSTORIES from '../database/backstories.json';
import CLASSES from '../database/classes.json';
import RACES from '../database/races.json';
// Utils
import { TYPES } from '../utils/constants';

const typeaheadCache = {};

const switcher = {
  [TYPES.ALIGNMENT]: ALIGNMENTS,
  [TYPES.BACKSTORY]: BACKSTORIES,
  [TYPES.CLASS]: CLASSES,
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

export function getHashData(type) {
  return switcher[type];
}
