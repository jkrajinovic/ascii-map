import { DirectionEnum } from '../enums/direction.enum';
import { Direction } from '../types/directions';
import { CharPosition } from './position';

export class Cursor {
  direction: Direction = DirectionEnum.right;
  position: CharPosition = new CharPosition();
  char: string = '';

  getPosition(): CharPosition {
    return this.position;
  }
}
