import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import anime from 'animejs/lib/anime.es.js';
import { GameTurnsService } from '../../services/game-turns.service';

@Component({
  selector: 'app-game-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-menu.component.html',
  styleUrl: './game-menu.component.css'
})

export class GameMenuComponent {
  markXSelected: boolean = false;
  markOSelected: boolean = true;


  constructor(private gameTurns: GameTurnsService){}


  selectMark(mark: string){
    if(mark === 'x'){
      this.markXSelected = !this.markXSelected;
      this.markOSelected = false;
      this.gameTurns.setPlayerChoice(mark);
    }else if(mark === 'o'){
      this.markOSelected =!this.markOSelected;
      this.markXSelected = false;
      this.gameTurns.setPlayerChoice(mark);
    }
  }

  ngAfterViewInit(): void {
    anime({
      targets: '.anime-logo-1',
      translateY: [ -250, 0 ],
      duration: 2000,
      delay: 2000,
      opacity: [0, 1],
    })
    anime({
      targets: '.anime-logo-2',
      translateY: [ -300, 0 ],
      duration: 2000,
      delay: 2300,
      opacity: [0, 1]
    })
    anime({
      targets: '.anime-upshift',
      translateY: [ 300, 0 ],
      duration: 2000,
      opacity: [0, 1]
    })
    anime({
      targets: '.anime-leftshift',
      translateX: [ -250, 0 ],
      duration: 2500,
      delay: 1000,
      opacity: [0, 1],
    })
    anime({
      targets: '.anime-rightshift',
      translateX: [ 250, 0 ],
      duration: 2500,
      delay: 1000,
      opacity: [0, 1],
    })
  }
}
