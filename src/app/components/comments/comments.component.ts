import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { NgError } from 'src/app/models/error.model';
import * as PopsActions from '../../actions/pops.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { first, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {

  @Input() tweetId: string;
  @Output() commentAdded = new EventEmitter();
  @Output() commentRemoved = new EventEmitter();
  allComments: any = [];
  visibleComments: any = [];
  newComment: string;
  startingIndex: number = 0;
  amount: number = 2;
  busyComments: string[] = [];
  isLoading: boolean = false;
  serverUnreachable: boolean = false;

  constructor(private postsService: PostsService, private store: Store<AppState>,) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.postsService.getComments(this.tweetId).pipe(take(1)).subscribe(comments => {
        this.allComments = comments;
        this.visibleComments = comments.slice(this.startingIndex, this.startingIndex + this.amount);
        this.startingIndex += this.amount;
        this.isLoading = false;
      }, (err: NgError) => {
        this.isLoading = false;
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
    }, environment.fakeNetworkDelayMedium);
  }

  addComment(){
    this.postsService.addComment(this.tweetId, this.newComment).pipe(first()).subscribe(result => {
      const newComment = result.comment;
      newComment.poster = result.poster;
      this.visibleComments = [newComment, ... this.visibleComments];
      this.allComments = [newComment, ... this.allComments];
      this.startingIndex++;
      this.newComment = '';
      this.commentAdded.emit(newComment);
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

  deleteComment(commentId: string){
    this.busyComments.push(commentId);

    setTimeout(() => {
      this.postsService.removeComment(this.tweetId, commentId).pipe(first()).subscribe(result => {
        this.allComments = this.allComments.filter(c => c._id != commentId);
        this.visibleComments = this.visibleComments.filter(c => c._id != commentId);
        this.commentRemoved.emit(commentId);
        this.busyComments = this.busyComments.filter(el => el != commentId);
  
        this.store.dispatch(new PopsActions.AddPop({
          title: 'Comment Deleted',
          message: result.message,
          type: 'success'
        }));
      }, (err: NgError) => {
        this.busyComments = this.busyComments.filter(el => el != commentId);
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

    }, environment.fakeNetworkDelayMedium);

  }

  loadMoreComments(){
    this.visibleComments = [... this.visibleComments, ...this.allComments.slice(this.startingIndex, this.startingIndex + this.amount)];
    this.startingIndex += this.amount;
  }

}
