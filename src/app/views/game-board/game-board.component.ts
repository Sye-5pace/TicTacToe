import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import anime from 'animejs/lib/anime.es.js'
import { SoloGamemodeService } from '../../services/solo-gamemode.service';
import { GameTurnsService } from '../../services/game-turns.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})

export class GameBoardComponent {
  cpuChoice: string | null = null ;
  playerChoice: string | null = null ;
  turn$ = this.soloModeService.turn$
  markX$ = this.soloModeService.markX$
  markO$ = this.soloModeService.markO$


  constructor(private gameTurns: GameTurnsService, private soloModeService: SoloGamemodeService ){}

  animations = [
    { target: 'header', delay: 500 },
    { target: '.anime-logo-2', delay: 600 },
    { target: '.anime-logo-1', delay: 700 }
  ];

  ngOnInit(){
    this.gameTurns.currentPlayerChoice$.subscribe(choice => {
      this.playerChoice = choice;
    })
    this.gameTurns.cpuChoice$.subscribe(choice => {
      this.cpuChoice = choice;
    })
  }

  ngAfterViewInit() {
    const timeline = anime.timeline({
      duration: 800,
    })

    this.animations.forEach(({ target, delay }) => {
      timeline.add({
        duration: 600,
        targets: target,
        translateX: [-400, 0],
        offset: delay,
        opacity: [0, 1],
      })
    });
    timeline.add({
      targets: '.mark-container .mark-tile',
      translateX: [400, 0],
      opacity: [0, 1],
      easing: 'easeOutBounce',
      delay: anime.stagger(100),
      offset: '+=50'
    });
    timeline.add({
      targets: '.score-bar',
      translateY: [150, 0],
      easing: 'easeOutQuad',
      opacity: [0, 1],
      offset: '+=200'
    })
  }


  // a function that checks the turn value or who's next then
  // display the mark per the turn where clicked that's a user/player
  // but if the turn is the for the CPU then call a cpu make choice function
  // to pass it's mark into any of the nine boxes

  makeChoice(): void {
    this.soloModeService.makeChoice()
  }
}
