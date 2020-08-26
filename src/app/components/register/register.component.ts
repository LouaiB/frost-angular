import { Component, OnInit } from '@angular/core';
import { RegisterModel } from 'src/app/models/register.viewmodel';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgError } from 'src/app/models/error.model';
import * as PopsActions from '../../actions/pops.actions';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  model = new RegisterModel('', '', '', '');
  registering: boolean = false;
  error: string = '';

  constructor(
    private userService: UserService,
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.registering = true;
    this.error = '';

    this.userService.register(this.model).pipe(first()).subscribe(response => {
      this.store.dispatch(new PopsActions.AddPop({
        title: 'Account Created',
        message: `${response.message} You can login now.`,
        type: 'success'
      }));
      this.router.navigate(['/login']);
    }, (err: NgError) => {
      if(err.error.status == 0){
        // Server Unreachable
        this.error = 'Server is unreachable at this moment'
      } else {
        this.error = err.message;
      }
      this.registering = false;
    });
  }

}
