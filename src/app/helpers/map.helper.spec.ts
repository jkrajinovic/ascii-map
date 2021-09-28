import { firstMap } from 'src/tests/data/maps';
import { DirectionEnum } from '../enums/direction.enum';
import { Cursor } from '../models/cursor';
import { CharPosition } from '../models/position';
import { Matrix } from '../types/matrix';
import { fetchNext, getCharPosition, mapToMatrix } from './map.helper';

let firstMapMatrix: Matrix;

describe('Map helpers functions', () => {
  beforeEach(() => {
    firstMapMatrix = mapToMatrix(firstMap);
  });

  describe('getCharPosition()', () => {
    it('Should return correct position for @ character', () => {
      const expectedResult = Object.assign(new CharPosition(), { x: 0, y: 1 });

      const charCursor: Cursor = getCharPosition(firstMapMatrix, '@') as Cursor;

      expect(charCursor.position).toEqual(expectedResult);
    });

    it('Return type should be instance of Cursor', () => {
      const charCursor: Cursor = getCharPosition(firstMapMatrix, '@') as Cursor;

      expect(charCursor instanceof Cursor).toBe(true);
    });

    it('Should return NULL if character does not exist', () => {
      const charCursor: Cursor | null = getCharPosition(firstMapMatrix, 'n');

      expect(charCursor).toEqual(null);
    });

    it('Should return NULL if character is empty string', () => {
      const charCursor: Cursor | null = getCharPosition(firstMapMatrix, '');

      expect(charCursor).toEqual(null);
    });
  });

  describe('fetchNext()', () => {
    it('Should return false if next cursor is NOT within matrix', () => {
      const cursor = new Cursor();
      cursor.position.x = 30;
      cursor.position.y = 30;

      const nextCursor = fetchNext(firstMapMatrix, cursor);

      expect(nextCursor).toBe(false);
    });

    it('Should return false if next character is space', () => {
      const cursor = new Cursor();
      cursor.position.x = 4;
      cursor.position.y = 5;
      cursor.direction = DirectionEnum.left;

      const nextCursor = fetchNext(firstMapMatrix, cursor);

      expect(nextCursor).toBe(false);
    });

    it('Should return next valid cursor with caracter "-"', () => {
      const cursor = new Cursor();
      cursor.position.x = 0;
      cursor.position.y = 1;
      cursor.direction = DirectionEnum.right;

      const nextCursor = fetchNext(firstMapMatrix, cursor) as Cursor;

      expect(nextCursor.char).toBe('-');
    });
  });
});
