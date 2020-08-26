import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostsService } from 'src/app/services/posts.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as PopsActions from '../../actions/pops.actions';
import { Observable } from 'rxjs';
import { NgError } from 'src/app/models/error.model';
import { Dialog } from 'src/app/helpers/dialog';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent implements OnInit {

  @Input() comment: any;
  @Input() tweetId: string;
  @Output() deleteComment = new EventEmitter();
  apiUrl: string = environment.apiUrl;
  user: Observable<any>;
  inEditMode: boolean = false;
  editedComment: string;

  constructor(private store: Store<AppState>, private postsService: PostsService) { }

  ngOnInit(): void {
    this.user = this.store.select('user');
  }

  deleteCommentHandler(){
    Dialog.confirm({
      title: 'Delete Comment',
      message: 'Are you sure you want to delete this comment?'
    },
    result => {
      if(result) this.deleteComment.emit(this.comment._id);
    })
  }

  editMode(){
    this.inEditMode = true;
    this.editedComment = this.comment.comment;
  }

  editComment(){
    this.postsService.editComment(this.tweetId, this.comment._id, this.editedComment).pipe(first()).subscribe(result => {
      this.comment.comment = this.editedComment;
      this.inEditMode = false;

      this.store.dispatch(new PopsActions.AddPop({
        title: 'Comment Edited',
        message: result.message,
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

  cancleEdit(){
    this.inEditMode = false;
  }

}
