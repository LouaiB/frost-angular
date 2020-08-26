import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { environment } from 'src/environments/environment';
import { NgError } from 'src/app/models/error.model';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import * as PopsActions from '../../actions/pops.actions';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-account-tweets',
  templateUrl: './account-tweets.component.html',
  styleUrls: ['./account-tweets.component.sass']
})
export class AccountTweetsComponent implements OnInit {

  @Input() account: any;
  apiUrl: string = environment.apiUrl;
  tweets: any = [];
  startIndex: number = 0;
  amount: number = 2;
  tweetsOver: boolean = false;
  isLoading: boolean = true;
  isFetchingMorePosts: boolean = false;
  noTweets: boolean = false;
  serverUnreachable: boolean = false;

  constructor(private postsService: PostsService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.postsService.getAccountTweets(this.account.user._id, this.startIndex, this.amount).pipe(first()).subscribe(tweets => {
        if(tweets.length > 0){
          this.tweets = tweets;
          this.startIndex += this.amount;
        } else {
          this.noTweets = true;
        }
  
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

    }, environment.fakeNetworkDelayShort)
  }

  loadMorePosts(){
    this.isFetchingMorePosts = true;

    setTimeout(() => {
      this.postsService.getAccountTweets(this.account.user._id, this.startIndex, this.amount).pipe(first()).subscribe(tweets => {
        if(tweets.length > 0){
          this.tweets = [... this.tweets, ... tweets];
          this.startIndex += this.amount;
        } else {
          this.tweetsOver = true;
        }
  
        this.isFetchingMorePosts = false;
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

  deleteTweet(tweetId){
    this.postsService.removeTweet(tweetId).pipe(first()).subscribe(result => {
      this.tweets = this.tweets.filter(t => t.post._id != tweetId);

      this.store.dispatch(new PopsActions.AddPop({
        title: 'Tweet Deleted',
        message: result.message,
        type: 'success'
      }));
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
  }

}
