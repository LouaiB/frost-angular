import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { NgError } from 'src/app/models/error.model';
import * as PopsActions from '../../actions/pops.actions';
import { map, first, take } from 'rxjs/operators';
import { Dialog } from 'src/app/helpers/dialog';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})
export class FriendsComponent implements OnInit, OnDestroy {

  apiUrl: string = environment.apiUrl;
  user: any = null;
  user$: Subscription
  friendships: [] = null;
  isLoading: boolean = true;
  serverUnreachable: boolean = false;
  actioning: boolean = false;

  constructor(private store: Store<AppState>, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.user$ = this.store.select('user').subscribe(user => {
      this.user = user;
    });

    this.fetch();
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  fetch(){
    this.isLoading = true;

    setTimeout(() => {
      this.userService.getFriendships().pipe(take(1)).subscribe(friendships => {
        this.friendships = friendships;
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
          this.isLoading = false;
          this.store.dispatch(new PopsActions.AddPop({
            title: 'Error',
            message: err.message,
            type: 'error'
          }));
        }
      });

    }, environment.fakeNetworkDelayShort);
  }

  accept(friendshipId: string){
    this.actioning = true;
    this.userService.acceptFriendRequest(friendshipId).pipe(first()).subscribe(response => {
      this.fetch();

      this.store.dispatch(new PopsActions.AddPop({
        title: 'Friendship Accepted',
        message: response.message,
        type: 'success'
      }));
      this.actioning = false;
    }, (err: NgError) => {
      this.actioning = false;
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
  }

  decline(friendshipId: string){
    this.actioning = true;
    this.userService.declineFriendRequest(friendshipId).pipe(first()).subscribe(response => {
      this.fetch();

      this.store.dispatch(new PopsActions.AddPop({
        title: 'Friendship Declined',
        message: response.message,
        type: 'success'
      }));
      this.actioning = false;
    }, (err: NgError) => {
      this.actioning = false;
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
  }

  undecline(friendshipId: string){
    this.actioning = true;
    this.userService.undeclineFriendRequest(friendshipId).pipe(first()).subscribe(response => {
      this.fetch();

      this.store.dispatch(new PopsActions.AddPop({
        title: 'Friendship Undeclined',
        message: response.message,
        type: 'success'
      }));
      this.actioning = false;
    }, (err: NgError) => {
      this.actioning = false;
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
  }

  cancel(friendshipId: string){
    this.actioning = true;
    this.userService.cancelFriendRequest(friendshipId).pipe(first()).subscribe(response => {
      this.fetch();

      this.store.dispatch(new PopsActions.AddPop({
        title: 'Friendship Request Cancled',
        message: response.message,
        type: 'success'
      }));
      this.actioning = false;
    }, (err: NgError) => {
      this.actioning = false;
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
  }

  unfriend(friendshipId: string){
    Dialog.confirm({
      title: 'Unfriend',
      message: 'Are you sure you want to unfriend this user?'
    },
    result => {
      if(result) {
        this.actioning = true;
        this.userService.unfriend(friendshipId).pipe(first()).subscribe(response => {
          this.fetch();
    
          this.store.dispatch(new PopsActions.AddPop({
            title: 'Friend Unfriended',
            message: response.message,
            type: 'success'
          }));
          this.actioning = false;
        }, (err: NgError) => {
          this.actioning = false;
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
      }
    })
  }

}
