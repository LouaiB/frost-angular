import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as UserActions from 'src/app/actions/user.actions';
import * as PopActions from 'src/app/actions/pops.actions';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.cookieService.delete(environment.authCookie);
    this.store.dispatch(new UserActions.LogOut());
    this.store.dispatch(new PopActions.AddPop({
      title: "Logged Out",
      message: "Successfully logged out.",
      type: "success"
    }));
    this.router.navigate(['/login']);
  }

}
