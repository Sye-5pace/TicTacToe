import { Routes } from '@angular/router';
import { GameMenuComponent } from './views/game-menu/game-menu.component';
import { gameboardGuard } from './guard/gameboard.guard';

export const routes: Routes = [
  { path:"game-board",
    loadComponent: ()=>
    import('./views/game-board/game-board.component')
    .then((m) => m.GameBoardComponent),
    canActivate:[gameboardGuard]
  },
  { path:"**", component: GameMenuComponent},

];
