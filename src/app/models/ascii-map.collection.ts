import { InvalidCursorError, InvalidMapError } from '../errors/errors';
import {
  changeDirection,
  copyCursor,
  cursorExists,
  fetchNext,
  getCharPosition,
  isCrossRoad,
  isValidChar,
  mapToMatrix,
  validateMap,
} from '../helpers/map.helper';
import { Direction } from '../types/directions';
import { Matrix } from '../types/matrix';
import { Cursor } from './cursor';
import { CharPosition } from './position';

export const START_CHAR = '@';
export const END_CHAR = 'x';
export const CROSSROAD_CHAR = '+';

export class AsciiMapCollection {
  matrix: Matrix = [];
  startPosition: CharPosition | null = null;
  direction: Direction = 'right';

  fromString(map: string) {
    const error = validateMap(map);

    if (error) {
      throw new InvalidMapError(error.message);
    }

    this.matrix = mapToMatrix(map);
    this.startPosition = getCharPosition(this.matrix, '@');
  }

  getPath(): string {
    if (!this.startPosition) {
      throw new Error('There is no start character');
    }

    const startCursor = new Cursor();
    startCursor.position = { ...this.startPosition };
    startCursor.char = '@';

    const pathMap = this.getNext(this.matrix, startCursor);
    return pathMap.map((cursor) => cursor.char).join('');
  }

  getLetters(path: string): string {
    const filtered = path.split('').filter((char) => isValidChar(char));
    return filtered.join('');
  }

  private getNext(matrix: Matrix, cursor: Cursor) {
    let path: Array<Cursor> = [cursor];

    let nextCursor: Cursor | false = fetchNext(matrix, cursor);

    if (!nextCursor) {
      nextCursor = changeDirection(matrix, cursor);
      cursor.direction = nextCursor.direction;
    }

    do {
      if (isCrossRoad(matrix, cursor)) {
        nextCursor = changeDirection(matrix, cursor);
      } else {
        nextCursor = fetchNext(matrix, cursor);
      }

      if (!nextCursor) {
        throw new InvalidCursorError(
          `Cursor invalid position:  ${JSON.stringify(nextCursor)}`
        );
      }

      if (!cursorExists(path, nextCursor)) {
        path.push(copyCursor(nextCursor));
      }

      cursor = copyCursor(nextCursor);
    } while (cursor.char !== END_CHAR);

    return path;
  }
}
