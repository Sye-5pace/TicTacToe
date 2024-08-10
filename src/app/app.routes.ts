import { Routes } from '@angular/router';
import { GameMenuComponent } from './views/game-menu/game-menu.component';

export const routes: Routes = [
  { path:"game-board",
    loadComponent: ()=>
    import('./views/game-board/game-board.component')
    .then((m) => m.GameBoardComponent)
  },
  { path:"**", component: GameMenuComponent},

];
