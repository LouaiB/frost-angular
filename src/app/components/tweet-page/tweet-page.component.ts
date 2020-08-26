import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, Router, NavigationEnd, ParamMap } from '@angular/router';
import { filter, first } from 'rxjs/operators';
import { NgError } from 'src/app/models/error.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as PopsActions from '../../actions/pops.actions';

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.sass']
})
export class TweetPageComponent implements OnInit {

  tweetId: string;
  tweet: any = null;
  isLoading: boolean = true;
  tweetNotFound: boolean = false;
  serverUnreachable: boolean = false;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.tweetId = params.get('id');
      this.loadTweet();
    });
  }

  loadTweet(){
    this.isLoading = true;

    setTimeout(() => {
      this.postsService.getTweet(this.tweetId).pipe(first()).subscribe(result => {
        const tweet = {
          post: result.tweet,
          poster: result.poster
        }

        this.tweet = tweet;
        this.isLoading = false;
      }, (err: NgError) => {
        this.isLoading = false;
        if (err.error.status == 404) this.tweetNotFound = true;
        else if(err.error.status == 0){
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
      this.store.dispatch(new PopsActions.AddPop({
        title: 'Tweet Deleted',
        message: result.message,
        type: 'success'
      }));
      this.tweet = null; // I needed this or else a request to get comments would be fired for some reason, and return "tweet not found"
      this.router.navigate(['/']);
    }, (err: NgError) => {
      this.store.dispatch(new PopsActions.AddPop({
        title: 'Error',
        message: err.message,
        type: 'error'
      }));
    });
  }

  GetTweetResponseEnum = {
    UserNotFound: 1,
    PostNotFound: 2,
    Success: 3,
    Error: 4
  }

}
