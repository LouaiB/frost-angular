import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store'
import { AppState } from '../app.state';
import { map, tap, filter, take, first } from 'rxjs/operators';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private store: Store<AppState>,  private router: Router, private cookieService: CookieService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const authorized = this.cookieService.check(environment.authCookie);

      if(authorized){
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
