import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import {
  changeDirection,
  fetchNext,
  getCharPosition,
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

    console.log(
      'this.martrix, this.startPosition: ',
      this.matrix,
      this.startPosition
    );

    return this.getNext(this.matrix, this.startPosition, '@', 'right');
  }

  getLetters(path: string): string {
    const filtered = path.split('').filter((char) => {
      const charAscii = char.charCodeAt(0);
      console.log('charAscii: ', charAscii);

      return charAscii >= 65 && charAscii < 91;
    });

    return filtered.join('');
  }

  private getNext(
    matrix: Matrix,
    position: CharPosition,
    char: string,
    direction: Direction
  ) {
    console.log('runing: ');
    let path = '@';

    let cursor = new Cursor();
    cursor.position = { ...position };
    cursor.char = char;
    cursor.direction = direction;

    let nextCursor: Cursor | false = new Cursor();
    let counter = 0;

    do {
      nextCursor = new Cursor();

      // nextCursor = fetchNext(matrix, cursor);

      if (cursor.char === CROSSROAD_CHAR) {
        nextCursor = changeDirection(matrix, cursor);
      } else {
        nextCursor = fetchNext(matrix, cursor);
      }

      if (nextCursor) {
        path += nextCursor.char;
      }
      counter++;
      cursor = Object.assign(new Cursor(), nextCursor);
    } while (cursor.char !== END_CHAR && nextCursor && counter < 50);

    return path;
  }
}
