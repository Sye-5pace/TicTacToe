import { Component } from '@angular/core';

@Component({
  selector: 'app-game-menu',
  standalone: true,
  imports: [],
  templateUrl: './game-menu.component.html',
  styleUrl: './game-menu.component.css'
})

export class GameMenuComponent {
  markXSelected: boolean = false;
  markOSelected: boolean = true;

  selectMark(mark: string){
    if(mark === 'x'){
      this.markXSelected = !this.markXSelected;
      this.markOSelected = false;
    }else if(mark === 'o'){
      this.markOSelected =!this.markOSelected;
      this.markXSelected = false;
    }
  }
}
