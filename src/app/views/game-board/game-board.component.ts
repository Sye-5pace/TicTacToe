import { Component } from '@angular/core';
import anime from 'animejs/lib/anime.es.js'

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})

export class GameBoardComponent {
  animations = [
    { target: 'header', delay: 500 },
    { target: '.anime-logo-2', delay: 700 },
    { target: '.anime-logo-1', delay: 750 },
  ];

  ngAfterViewInit() {
    const timeline = anime.timeline({
      duration: 1000,
    })

    this.animations.forEach(({ target, delay }) => {
      timeline.add({
        duration: 900,
        targets: target,
        translateX: [-350, 0],
        offset: delay,
        opacity: [0, 1],
      })
    });
    timeline.add({
      targets: '.mark-container .mark-tile',
      translateX: [350, 0],
      opacity: [0, 1],
      easing: 'easeOutBounce',
      delay: anime.stagger(200),
      offset: '+=100'
    });
    timeline.add({
      targets: '.score-bar',
      translateY: [150, 0],
      easing: 'easeOutQuad',
      opacity: [0, 1],
      offset: '+=200'
    })
  }
}
