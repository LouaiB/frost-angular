import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/app/app.state';
import { Store, resultMemoize } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { NgError } from 'src/app/models/error.model';
import * as PopsActions from '../../actions/pops.actions';
import * as UserActions from '../../actions/user.actions';
import { Observable } from 'rxjs';
import { Dialog } from 'src/app/helpers/dialog';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.sass']
})
export class AccountSummaryComponent implements OnInit {

  @Input() account: any;
  apiUrl: string = environment.apiUrl;
  user: Observable<any>;

  constructor(private store: Store<AppState>, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.store.select('user');
  }

  sendFriendRequest(){
    this.userService.sendFriendRequest(this.account.user._id).subscribe(response => {
      this.account.userFriendship = response.newFriendship;

      this.store.dispatch(new PopsActions.AddPop({
        title: 'Sent Friend Request',
        message: response.message,
        type: 'success'
      }));
    }, (err: NgError) => {
      this.store.dispatch(new PopsActions.AddPop({
        title: 'Error',
        message: err.message,
        type: 'error'
      }));
    });
  }

  unfriend(){
    Dialog.confirm({
      title: 'Unfriend',
      message: 'Are you sure you want to unfriend this user?'
    }, result => {
      if(result) {
        this.userService.unfriend(this.account.userFriendship._id).pipe(first()).subscribe(response => {
          this.account.userFriendship = undefined;
    
          this.store.dispatch(new PopsActions.AddPop({
            title: 'Unfriended',
            message: response.message,
            type: 'success'
          }));
        }, (err: NgError) => {
          this.store.dispatch(new PopsActions.AddPop({
            title: 'Error',
            message: err.message,
            type: 'error'
          }));
        });
      }
    });
  }

  changeNickname(){
    Dialog.input({
      'title': 'Change Nickname',
      'message': 'Type in your new nickname.'
    }, result => {
      if(result){
        let sub = this.userService.changeNickname(result).pipe(first()).subscribe(response => {
          sub.unsubscribe();
          this.store.dispatch(new UserActions.SetNickname(result));
    
          this.store.dispatch(new PopsActions.AddPop({
            title: 'Nickname Changed',
            message: response.message,
            type: 'success'
          }));
        }, (err: NgError) => {
          this.store.dispatch(new PopsActions.AddPop({
            title: 'Error',
            message: err.message,
            type: 'error'
          }));
        });
      }
    });
  }

}
