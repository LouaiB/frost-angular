import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { environment } from 'src/environments/environment';
import * as PopsActions from '../../actions/pops.actions';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { NgError } from 'src/app/models/error.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {

  feed: any = null;
  startIndex: number = 0;
  amount: number = 2;
  feedOver: boolean = false;
  isLoading: boolean = true;
  serverUnreachable: boolean = false;
  isFetchingMorePosts: boolean = false;

  constructor(private postsService: PostsService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.postsService.getFeed(this.startIndex, this.amount).pipe(first()).subscribe(feed => {
        if(feed.length > 0){
          this.feed = feed;
          this.startIndex += this.amount;
        } else {
          this.feedOver = true;
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
      this.postsService.getFeed(this.startIndex, this.amount).pipe(first()).subscribe(feed => {
        if(feed.length > 0){
          this.feed = [... this.feed, ... feed];
          this.startIndex += this.amount;
        } else {
          this.feedOver = true;
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
      this.feed = this.feed.filter(t => t.post._id != tweetId);

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
