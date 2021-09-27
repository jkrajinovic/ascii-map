import { InvalidCrossRoad } from '../errors/errors';
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
  const nextCursor = Object.assign(new Cursor(), { ...cursor });
  nextCursor.position = { ...cursor.position };
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

export function isWithinMatrix(cursor: Cursor, matrix: Matrix) {
  return (
    matrix[cursor.position.y] && matrix[cursor.position.y][cursor.position.x]
  );
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
  console.log('secondTurn change-am: ', secondTurn);
  if (secondTurn) {
    return secondTurn;
  }

  throw new InvalidCrossRoad('Crossroad has no valid turn!!');
}

// export function findStart(matrix: Matrix): CharPosition | undefined {
//   let pos = new CharPosition();
//   traverse(matrix, (char: string, position: CharPosition) => {
//     if (char === '@') {
//       pos = position;
//     }
//   });
//   return pos;
// }

// export function traverse(
//   matrix: Matrix,
//   callback: (char: string, position: CharPosition) => void
// ): void {
//   matrix.forEach((row, y) => {
//     row.forEach((char, x) => {
//       callback(char, { x, y });
//     });
//   });
// }
