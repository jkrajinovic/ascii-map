import { Component } from '@angular/core';
import { AsciiMapCollection } from './models/ascii-map.collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  path: string = '';
  letters: string = '';

  run(event: any) {
    const asciiCollection = new AsciiMapCollection();
    asciiCollection.fromString(event.target.value);

    this.path = asciiCollection.getPath();
    this.letters = asciiCollection.getLetters(this.path);
  }
}
