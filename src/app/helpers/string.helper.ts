import { InvalidCrossRoad } from '../errors/errors';
import { CROSSROAD_CHAR } from '../models/ascii-map.collection';
import { Cursor } from '../models/cursor';
import { CharPosition } from '../models/position';
import { Direction } from '../types/directions';
import { Matrix } from '../types/matrix';

export function stringToMatrix(value: string): Matrix {
  const rows = value.split('\n');
  return rows.map((row) => row.split(''));
}

export function getCharPosition(
  matrix: Matrix,
  searchedChar: string
): CharPosition | null {
  let start: CharPosition | null = null;

  matrix.forEach((row, y) => {
    const x = row.findIndex((char) => char === searchedChar);

    if (x > -1) {
      start = { x, y };
    }
  });

  return start;
}

export function fetchNext(matrix: Matrix, cursor: Cursor): Cursor | false {
  const nextCursor = copyCursor(cursor);
  if (cursor.direction === 'right') {
    nextCursor.position.x = nextCursor.position.x + 1;
  }

  if (cursor.direction === 'left') {
    nextCursor.position.x = nextCursor.position.x - 1;
  }

  if (cursor.direction === 'up') {
    nextCursor.position.y = nextCursor.position.y - 1;
  }

  if (cursor.direction === 'down') {
    nextCursor.position.y = nextCursor.position.y + 1;
  }

  if (!isWithinMatrix(nextCursor, matrix)) {
    return false;
  }

  nextCursor.char = matrix[nextCursor.position.y][nextCursor.position.x];

  if (nextCursor.char === ' ') {
    return false;
  }

  return nextCursor;
}

export function changeDirection(matrix: Matrix, cursor: Cursor): Cursor {
  let firstDirection: Direction = 'up';
  let secondDirection: Direction = 'left';

  if (cursor.direction === 'right' || cursor.direction === 'left') {
    firstDirection = 'up';
    secondDirection = 'down';
  }

  if (cursor.direction === 'down' || cursor.direction === 'up') {
    firstDirection = 'left';
    secondDirection = 'right';
  }

  cursor.direction = firstDirection;
  const firstTurn = fetchNext(matrix, cursor);

  if (firstTurn) {
    return firstTurn;
  }

  cursor.direction = secondDirection;
  const secondTurn = fetchNext(matrix, cursor);
  if (secondTurn) {
    return secondTurn;
  }

  throw new InvalidCrossRoad('Crossroad has no valid turn!!');
}

export function isCrossRoad(char: string) {
  return char === CROSSROAD_CHAR || isValidChar(char);
}

export function isValidChar(char: string) {
  const charAscii = char.charCodeAt(0);
  return charAscii >= 65 && charAscii < 91;
}

export function isWithinMatrix(cursor: Cursor, matrix: Matrix) {
  return (
    matrix[cursor.position.y] && matrix[cursor.position.y][cursor.position.x]
  );
}

/**
 * Ensures immutable cursor copy
 * @param cursors
 * @returns
 */
export function copyCursor(cursor: Cursor): Cursor {
  const newCursor = new Cursor();
  newCursor.char = cursor.char;
  newCursor.direction = cursor.direction;
  newCursor.position = { ...cursor.position };
  return newCursor;
}