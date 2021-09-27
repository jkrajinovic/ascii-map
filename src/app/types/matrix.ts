import { OutOfBoundsError } from '../errors/errors';
import { CROSSROAD_CHAR } from '../models/ascii-map.collection';
import { CharPosition } from '../models/position';
import { Direction } from './directions';

export type Matrix = Array<Array<string>>;

export function getNext() {
  let path = '';
  let currentChar = '';

  // do {
  //   try {
  //     currentChar = fetchNext(matrix, currentPosition);
  //     path += currentChar;
  //   } catch (e) {

  //   }
  // } while (currentChar !== 'x');
}


