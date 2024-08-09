import { Routes } from '@angular/router';
import { GameMenuComponent } from './views/game-menu/game-menu.component';

export const routes: Routes = [
  { path:"**", component: GameMenuComponent},
  { path:"game-board", loadComponent: ()=>
    import('./views/game-board/game-board.component')
    .then(m => m.GameBoardComponent)
  }

];
