import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router, GuardResult, MaybeAsync } from '@angular/router';
import { Observable } from 'rxjs';
import { GameTurnsService } from '../services/game-turns.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class gameboardGuard implements CanActivate{
  constructor(private gameTurnsService: GameTurnsService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   Observable<boolean> | Promise<boolean> | boolean {
    if(!this.gameTurnsService.playerChoiceSource.getValue() || !this.gameTurnsService.cpuChoiceSource.getValue() ){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
