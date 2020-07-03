import * as utils from './index';
import * as mocks from './mock-data';

// console.log(utils);

const deepCopy = (any) => JSON.parse(JSON.stringify(any));

describe('Utils', function () {
  describe('determineCharacterCompletion', function () {
    let tempTome = {};

    beforeEach(function () {
      tempTome = {
        characterName: 'test',
        player: 'test',
        race: 'test',
        class: 'test',
        backstory: 'test',
        alignment: 'test',
        attributes: {
          str: 3,
          dex: 3,
        },
        monster: 'test',
        monsterLocation: 'test',
        monsterObstacle: 'test',
        monsterAttack: 'test',
        familiar: 'test',
        familiarPower: 3,
      };
    });

    it('returns true when all required fields are present', function () {
      expect(utils.determineCharacterCompletion(tempTome)).toBeTruthy();
    });

    it('returns false without charaterName', function () {
      delete tempTome.characterName;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();
    });

    it('returns false without player name', function () {
      delete tempTome.player;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();
    });

    it('returns false without race', function () {
      delete tempTome.race;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();
    });

    it('returns false without class', function () {
      delete tempTome.class;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();
    });

    it('returns false without backstory', function () {
      delete tempTome.backstory;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();
    });

    it('returns false without alignment', function () {
      delete tempTome.alignment;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();
    });

    it('returns false when any attribute is lower than 3', function () {
      tempTome.attributes.str = 0;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();

      tempTome.attributes.str = 3;
      expect(utils.determineCharacterCompletion(tempTome)).toBeTruthy();

      tempTome.attributes.dex = 0;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();
    });

    it('returns true when no monster is present', function () {
      delete tempTome.monster;
      expect(utils.determineCharacterCompletion(tempTome)).toBeTruthy();
    });

    it('returns false when a monster but no adventures', function () {
      delete tempTome.monsterAttack;
      delete tempTome.monsterLocation;
      delete tempTome.monsterObstacle;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();
    });

    it('returns false when a monster but no monsterLocation', function () {
      delete tempTome.monsterLocation;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();
    });

    it('returns false when a monster but no monsterObstacle', function () {
      delete tempTome.monsterObstacle;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();
    });

    it('returns false when a monster but no monsterAttack', function () {
      delete tempTome.monsterAttack;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();
    });

    it('returns true when no familiar is present', function () {
      delete tempTome.familiar;
      expect(utils.determineCharacterCompletion(tempTome)).toBeTruthy();
    });

    it('returns false when a familiar is present with power lower than 3', function () {
      tempTome.familiarPower = 0;
      expect(utils.determineCharacterCompletion(tempTome)).toBeFalsy();
    });
  });

  describe('deserializeCharacter', function () {
    it('it deserializes a character with default data correctly', function () {
      expect(utils.deserializeCharacter(mocks.mockDefaultGlobalStateTome)).toStrictEqual({
        id: null,
        name: '',
        race: null,
        class: null,
        gender: null,
        backstory: null,
        'attribute-scores': { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
        alignment: { id: null, position: 4 },
        items: { armor: [], weapons: [], scrolls: [] },
        skills: [],
        traits: [],
        battle: {
          monster: null,
          alternativeLenticularVersion: null,
          location: null,
          obstacle: null,
          attack: null,
          minions: [],
          score: 0,
        },
        fiends: [],
        counts: { experience: 0, gold: 0, score: 0 },
        player: '',
        'created-at': '2020-01-01',
      });
    });

    it('it deserializes a character with complete data correctly', function () {
      expect(utils.deserializeCharacter(mocks.mockCompleteGlobalStateTome)).toStrictEqual({
        id: 'abc123',
        name: 'Test',
        race: 'abc123',
        class: 'abc123',
        gender: 'male',
        backstory: 'abc123',
        'attribute-scores': { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
        alignment: { id: 'abc123', position: 4 },
        items: { armor: ['1', '2', '3'], weapons: ['1', '2', '3'], scrolls: ['1', '3'] },
        skills: ['1'],
        traits: [],
        battle: {
          monster: 'abc123',
          alternativeLenticularVersion: true,
          location: 'abc123',
          obstacle: 'abc123',
          attack: 'abc123',
          minions: ['1', '2', '3', '4'],
          score: 1,
        },
        familiar: {
          id: 'abc123',
          name: 'Unnamed',
          power: 2,
        },
        fiends: ['1', '2'],
        counts: { experience: 1, gold: 1, score: 1 },
        player: 'Tester',
        'created-at': '2020-01-01',
      });
    });

    it('it deserializes a character without a familiar correctly', function () {
      const tomeWithoutFamilar = deepCopy(mocks.mockCompleteGlobalStateTome);
      delete tomeWithoutFamilar.familiar;

      expect(utils.deserializeCharacter(tomeWithoutFamilar)).toStrictEqual({
        id: 'abc123',
        name: 'Test',
        race: 'abc123',
        class: 'abc123',
        gender: 'male',
        backstory: 'abc123',
        'attribute-scores': { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
        alignment: { id: 'abc123', position: 4 },
        items: { armor: ['1', '2', '3'], weapons: ['1', '2', '3'], scrolls: ['1', '3'] },
        skills: ['1'],
        traits: [],
        battle: {
          monster: 'abc123',
          alternativeLenticularVersion: true,
          location: 'abc123',
          obstacle: 'abc123',
          attack: 'abc123',
          minions: ['1', '2', '3', '4'],
          score: 1,
        },
        fiends: ['1', '2'],
        counts: { experience: 1, gold: 1, score: 1 },
        player: 'Tester',
        'created-at': '2020-01-01',
      });
    });
  });

  describe('getCharacterJsonApi', function () {
    it('it parses a character to JsonApi format with default data correctly', function () {
      expect(utils.getCharacterJsonApi(mocks.mockDefaultGlobalStateTome)).toStrictEqual({
        id: null,
        type: 'roll-player-character',
        attributes: {
          name: '',
          race: '',
          class: '',
          gender: 'Unkown',
          backstory: '',
          'attribute-rp-scores': {
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0,
          },
          'attribute-rpa-scores': {
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0,
          },
          alignment: {
            name: '',
            title: 'Neutraul-Neutral',
            score: undefined,
          },
          items: {
            armor: [],
            weapons: [],
            scrolls: [],
          },
          skills: [],
          traits: [],
          battle: {
            monster: '',
            location: '',
            obstacle: '',
            attack: '',
            minions: [],
            score: 0,
          },
          familiar: {
            species: '',
            name: null,
            power: 0,
          },
          fiends: {
            active: [],
            banished: [],
          },
          counts: {
            experience: 0,
            gold: 0,
            score: 0,
            health: 14,
          },
        },
        meta: {
          'created-by': '',
          'created-at': '2020-01-01',
        },
      });
    });

    it('it parses a character to JsonApi format with complete data correctly', function () {
      expect(utils.getCharacterJsonApi(mocks.mockCompleteGlobalStateTomeWithIds)).toStrictEqual({
        id: null,
        type: 'roll-player-character',
        attributes: {
          name: 'Test',
          race: 'Dragonkin',
          class: 'Assassin',
          gender: 'Male',
          backstory: 'Apprentice',
          'attribute-rp-scores': {
            str: 12,
            dex: 10,
            con: 14,
            int: 16,
            wis: 18,
            cha: 20,
          },
          'attribute-rpa-scores': {
            str: 0,
            dex: 0,
            con: 1,
            int: 2,
            wis: 3,
            cha: 3,
          },
          alignment: {
            name: 'Abstainer',
            title: 'Lawful-Evil',
            score: -2,
          },
          items: {
            armor: ['Chain Fauld', 'Mystic Robes'],
            weapons: ['Longsword', 'Scabbard'],
            scrolls: ['Transmute'],
          },
          skills: ['Examine'],
          traits: ['Foolish', 'Weak'],
          battle: {
            monster: 'Chimera (Lenticular version)',
            location: 'Shadowy Cave',
            obstacle: 'Energy Barrier',
            attack: 'Cone of Cold',
            minions: ['Bat Swarm', 'Cockatrice', 'Goblin', 'Kobold'],
            score: 10,
          },
          familiar: {
            species: 'Blood Badger',
            name: 'Test',
            power: 3,
          },
          fiends: {
            active: ['Fiend of Arbitration', 'Fiend of Avarice'],
            banished: [],
          },
          counts: {
            experience: 3,
            gold: 4,
            score: 10,
            health: 12,
          },
        },
        meta: {
          'created-by': 'Tester',
          'created-at': '2020-01-01',
        },
      });
    });
  });
});
