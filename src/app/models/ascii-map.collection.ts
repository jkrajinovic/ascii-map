import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { InvalidCursorError } from '../errors/errors';
import {
  changeDirection,
  copyCursor,
  fetchNext,
  getCharPosition,
  isValidChar,
  isWithinMatrix,
  stringToMatrix,
} from '../helpers/string.helper';
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

  fromString(value: string) {
    this.matrix = stringToMatrix(value);
    this.startPosition = getCharPosition(this.matrix, '@');
  }

  getPath(): string {
    if (!this.startPosition) {
      throw new Error('There is no start character');
    }

    const startCursor = new Cursor();
    startCursor.position = { ...this.startPosition };
    startCursor.char = '@';

    return this.getNext(this.matrix, startCursor);
  }

  getLetters(path: string): string {
    const filtered = path.split('').filter((char) => isValidChar(char));
    return filtered.join('');
  }

  private getNext(matrix: Matrix, cursor: Cursor) {
    let path = cursor.char;

    let nextCursor: Cursor | false = fetchNext(matrix, cursor);

    if (!nextCursor) {
      nextCursor = changeDirection(matrix, cursor);
      cursor.direction = nextCursor.direction;
    }

    do {
      if (cursor.char === CROSSROAD_CHAR) {
        nextCursor = changeDirection(matrix, cursor);
      } else {
        nextCursor = fetchNext(matrix, cursor);
      }

      if (!nextCursor) {
        throw new InvalidCursorError(
          `Cursor invalid position:  ${JSON.stringify(nextCursor)}`
        );
      }

      path += nextCursor.char;
      cursor = copyCursor(nextCursor);
    } while (cursor.char !== END_CHAR);

    return path;
  }
}
