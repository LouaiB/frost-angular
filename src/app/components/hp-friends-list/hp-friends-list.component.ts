import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';
import { NgError } from 'src/app/models/error.model';
import * as PopsActions from '../../actions/pops.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-hp-friends-list',
  templateUrl: './hp-friends-list.component.html',
  styleUrls: ['./hp-friends-list.component.sass']
})
export class HpFriendsListComponent implements OnInit {

  friends: [] = null;
  apiUrl: string = environment.apiUrl;
  isLoading: boolean = true;
  serverUnreachable: boolean = false;

  constructor(private userService: UserService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.userService.getFriends().pipe(first()).subscribe(friends => {
        this.friends = friends;
        this.isLoading = false;
      }, (err: NgError) => {
        if (err.error.status == 0){
          // Server Unreachable
          this.serverUnreachable = true;
          this.store.dispatch(new PopsActions.AddPop({
            title: 'Error',
            message: 'Server is unreachable at this moment',
            type: 'eternal-error'
          }));
        } else {
          this.store.dispatch(new PopsActions.AddPop({
            title: 'Error',
            message: err.message,
            type: 'error'
          }));
        }
      });

    }, environment.fakeNetworkDelayShort);
  }

}
