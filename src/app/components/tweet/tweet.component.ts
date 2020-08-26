import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PostsService } from 'src/app/services/posts.service';
import { environment } from 'src/environments/environment';
import { NgError } from 'src/app/models/error.model';
import * as PopsActions from '../../actions/pops.actions';
import { Dialog } from 'src/app/helpers/dialog';
import { first } from 'rxjs/operators';
import { Lightbox } from 'src/app/helpers/lightbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.sass']
})
export class TweetComponent implements OnInit {

  @Input() tweet: any;
  @Input() actionable: boolean;
  @Output() deleteTweet = new EventEmitter();
  userId: string = null;
  user$: Subscription
  apiUrl: string = environment.apiUrl;
  openComments: boolean = false;
  userCommented: boolean = false;
  isLightbox: boolean = false;
  inEditMode: boolean = false;
  editedTweet: string = '';
  formattedTweet: string = '';
  keepMedia: boolean = true;
  fileToUpload: any = null;
  mentions: string[] = [];

  constructor(private postsService: PostsService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.user$ = this.store.select('user').subscribe(user => {
      this.userId = user.userId;
      this.userCommented = this.tweet.post.comments.filter(c => c.userId == this.userId).length > 0;
    });

    this.editedTweet = this.tweet.post.content;
    this.format();
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  format(){
    // Format for mentions and tags
    const hashtagRegex: RegExp = /#[a-zA-Z0-9]+/g;
    const mentionRegex: RegExp = /@[a-zA-Z0-9]+/g;
    let formattedTweet: string = this.tweet.post.content;

    let hashtags = formattedTweet.match(hashtagRegex) || [];
    hashtags = hashtags.map(el => el.slice(1).toLowerCase());
    hashtags.forEach(tag => {
      formattedTweet = formattedTweet.replace(`#${tag}`, `<span class="tag">#${tag}</span>`);
    });

    let mentions = formattedTweet.match(mentionRegex) || [];
    mentions = mentions.map(el => el.slice(1));
    this.mentions = mentions;
    mentions.forEach(mention => {
      formattedTweet = formattedTweet.replace(`@${mention}`, `<span class="mention" routerLink="/">@${mention}</span>`);
    });

    this.formattedTweet = formattedTweet;
  }

  commentAdded(comment){
    this.userCommented = true;
    this.tweet.post.comments.push(comment);
  }

  commentRemoved(commentId){
    this.tweet.post.comments = this.tweet.post.comments.filter(c => c._id != commentId);
    this.userCommented = this.tweet.post.comments.filter(c => c.userId == this.userId).length > 0;
  }

  onLikeClicked(){
    if(!this.tweet.post.likes.includes(this.userId)){
      this.postsService.likeTweet(this.tweet.post._id).pipe(first()).subscribe(response => {
          this.tweet.post.likes.push(this.userId);
        });
    } else {
      this.postsService.unlikeTweet(this.tweet.post._id).pipe(first()).subscribe(response => {
        this.tweet.post.likes = this.tweet.post.likes.filter(l => l != this.userId);
      });
    }
  }

  onShareClicked(){
    if(!this.tweet.post.shares.includes(this.userId)){
      this.postsService.shareTweet(this.tweet.post._id).pipe(first()).subscribe(response => {
          this.tweet.post.shares.push(this.userId);
        });
    } else {
      this.postsService.unshareTweet(this.tweet.post._id).pipe(first()).subscribe(response => {
        this.tweet.post.shares = this.tweet.post.shares.filter(s => s != this.userId);
      });
    }
  }

  toggleComments(){
    this.openComments = !this.openComments;
  }

  editMode(){
    this.inEditMode = true;
    this.editedTweet = this.tweet.post.content;
    this.keepMedia = true;
    this.fileToUpload = null;
  }

  editTweet(){
    // Check if no changes were made
    if(this.editedTweet == this.tweet.post.content 
      && this.fileToUpload == null 
      && this.keepMedia) {
        this.cancleEdit();
        return;
      }

    this.postsService.editTweet(this.tweet.post._id, this.editedTweet, !this.keepMedia, this.fileToUpload).pipe(first()).subscribe(result => {
      this.tweet.post = result.post;
      this.inEditMode = false;
      this.format();

      this.store.dispatch(new PopsActions.AddPop({
        title: 'Tweet Edited',
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

  deleteTweetHandler(){
    Dialog.confirm({
      title: 'Delete Tweet',
      message: 'Are you sure you want to delete this tweet?'
    },
    result => {
      if(result) this.deleteTweet.emit(this.tweet.post._id);
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  lightbox(url){
    Lightbox.show(url);
  }
}
