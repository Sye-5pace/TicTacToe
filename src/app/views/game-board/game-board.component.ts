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
  tiles: string[]  = Array(9).fill(null)
  cpuChoice: any  = '' ;
  playerChoice: any = '' ;
  turn$ = this.soloModeService.turn$

  private static TILES_KEY = 'gameTiles';


  constructor(private gameTurns: GameTurnsService, private soloModeService: SoloGamemodeService ){}

  animations = [
    { target: 'header', delay: 500 },
    { target: '.anime-logo-2', delay: 600 },
    { target: '.anime-logo-1', delay: 700 }
  ];

  ngOnInit(){
    this.loadTilesFromLocalStorage();

    this.gameTurns.currentPlayerChoice$.subscribe(choice => {
      this.playerChoice = choice;
    })

    this.gameTurns.cpuChoice$.subscribe(choice => {
      this.cpuChoice = choice;
    })

    if(this.soloModeService.isCPUTurn()){
      setTimeout(() => {
        this.cpuMakeMove();
      },5000)
    }
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

  makeChoice(index: number): void {
    const currentTurn = this.soloModeService.gameTurn.getValue();
    if(this.tiles[index] !== null) return;

    if(currentTurn === this.playerChoice || currentTurn === this.cpuChoice){
      this.tiles[index] = currentTurn;
      this.saveTilesToLocalStorage();
      this.soloModeService.makeChoice();
    }

    if(this.soloModeService.isCPUTurn()){
      setTimeout(() => {
        this.cpuMakeMove();
      },2000)
    }
  }

  cpuMakeMove():void{
    const emptyTiles = this.tiles
    .map((tile, index) => (tile === null ? index : null))
    .filter((index) => index !==null)

    if(emptyTiles.length > 0){
      const randomIndex: any = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
      this.tiles[randomIndex] = this.cpuChoice;
      this.saveTilesToLocalStorage();
      this.soloModeService.makeChoice(true);
    }
  }

  private loadTilesFromLocalStorage(): void{
    const savedTiles = localStorage.getItem(GameBoardComponent.TILES_KEY);
    if(savedTiles){
      this.tiles = JSON.parse(savedTiles);
    }
  }

  private saveTilesToLocalStorage(): void{
    localStorage.setItem(GameBoardComponent.TILES_KEY, JSON.stringify(this.tiles));
  }


  // restart(){
  //   this.tiles.fill('')
  //   this.saveTilesToLocalStorage();
  //   this.gameTurns.resetChoices()
  //   this.soloModeService.resetGame()
  // }
}
