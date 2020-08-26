import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import * as UserActions from 'src/app/actions/user.actions';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';
import { NgError } from 'src/app/models/error.model';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'twitter-replica-angular';

  constructor(
    private store: Store<AppState>,
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.store.select('user').pipe(first()).subscribe(user => {
      const tokenCookie = this.cookieService.get(environment.authCookie);
      if(tokenCookie && !user.isLoggedIn) {
        this.userService.refresh(tokenCookie).pipe(first()).subscribe(curUser => {
          this.cookieService.set(environment.authCookie, curUser.token);
          this.store.dispatch(new UserActions.SetUser(
            curUser.user.email,
            curUser.token,
            curUser.user._id,
            curUser.user.nickname,
            curUser.user.avatar,
            curUser.user.slug,
            curUser.user.mentions));
        }, (err: NgError) => {
          console.info(`Invalid Token: ${err.error.error.invalidToken}`);
          if(err.error.error.invalidToken){
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }
}
