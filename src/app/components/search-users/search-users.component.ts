import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable, throwError } from 'rxjs';
import { NgError } from 'src/app/models/error.model';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import * as PopsActions from '../../actions/pops.actions';
import { environment } from 'src/environments/environment';
import { first, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.sass']
})
export class SearchUsersComponent implements OnInit {

  query: string;
  users: [] = null;
  apiUrl: string = environment.apiUrl;
  isLoading: boolean = false;
  serverUnreachable: boolean = false;
  searchDelayTimeout: any = null;

  constructor(private userService: UserService, private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  searchDelayed(){
    if(this.searchDelayTimeout) clearTimeout(this.searchDelayTimeout);
    this.searchDelayTimeout = setTimeout(() => this.search(), 500);
  }

  search(){
    if(this.query == '') return;
    this.isLoading = true;
    this.users = null;

    setTimeout(() => {
      this.userService.searchUsers(this.query).pipe(first()).subscribe(users => {
        this.users = users;
        this.isLoading = false;
      }, (err: NgError) => {
        this.isLoading = false;
        if(err.error.status == 0){
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
