import * as utils from './index';

// console.log(utils);

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
});
