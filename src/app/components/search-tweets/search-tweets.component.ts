import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { environment } from 'src/environments/environment';
import { NgError } from 'src/app/models/error.model';
import * as PopsActions from '../../actions/pops.actions';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-search-tweets',
  templateUrl: './search-tweets.component.html',
  styleUrls: ['./search-tweets.component.sass']
})
export class SearchTweetsComponent implements OnInit {

  results: any[] = null;
  visibleResults: any[] = null;
  startIndex: number = 0;
  amount: number = 2;
  resultsOver: boolean = false;
  isLoading: boolean = false;
  isShowingMorePosts: boolean = false;
  nothingFound: boolean = false;
  serverUnreachable: boolean = false;
  query: string = '';

  constructor(
    private postsService: PostsService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    
  }

  search(){
    if(this.query.length < 3) return;

    this.isLoading = true;
    this.resultsOver = false;
    this.nothingFound = false;

    setTimeout(() => {
      this.postsService.searchTweets(this.query).pipe(first()).subscribe(results => {
        if(results.length > 0){
          this.results = results;
          this.visibleResults = this.results.slice(this.startIndex, this.startIndex + this.amount);
          this.startIndex += this.amount;
        } else {
          this.nothingFound = true;
        }
  
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

  showMoreResults(){
    this.isShowingMorePosts = true;

    if(this.visibleResults.length == this.results.length) {
      this.resultsOver = true;
    } else {
      this.visibleResults = [...this.visibleResults, this.results.slice(this.startIndex, this.startIndex + this.amount)];
      this.startIndex += this.amount;
    }

    this.isShowingMorePosts = false;
  }

}
