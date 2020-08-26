import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login.viewmodel'
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as UserActions from '../../actions/user.actions';
import * as PopsActions from '../../actions/pops.actions';
import { Router } from '@angular/router';
import { NgError } from 'src/app/models/error.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  model = new LoginModel('user2@web.com', '123456');
  loggingIn: boolean = false;
  error: string = '';

  constructor(
    private userService: UserService,
    private store: Store<AppState>,
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    // !!!!!REMOVE IN PRODUCTION!!!!!
    //this.onSubmit();
  }

  onSubmit(){
    this.loggingIn = true;
    this.error = '';

    this.userService.login(this.model).pipe(first()).subscribe(response => {
      this.loggingIn = false;

      const token = response.token;

      this.cookieService.set(environment.authCookie, token);
      this.store.dispatch(new UserActions.SetUser(
        this.model.email,
        response.token,
        response.userId,
        response.nickname,
        response.avatar,
        response.slug,
        response.mentions));

      this.router.navigate(['/']);
    }, (err: NgError) => {
      if(err.error.status == 0){
        // Server Unreachable
        this.error = 'Server is unreachable at this moment'
      } else {
        this.error = err.message;
      }
      this.loggingIn = false;
    });
  }

}
