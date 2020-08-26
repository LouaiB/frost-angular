import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { NgError } from 'src/app/models/error.model';
import { AppState } from 'src/app/app.state';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PopsActions from '../../actions/pops.actions';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-send-tweet',
  templateUrl: './send-tweet.component.html',
  styleUrls: ['./send-tweet.component.sass']
})
export class SendTweetComponent implements OnInit {

  @ViewChild('tweetInput') tweetInput : ElementRef;
  fileToUpload: any = null;
  tweet: string = "";
  serverUnreachable: boolean = false;
  sending: boolean = false;
  hasFocus: boolean = false;
  hoveringSuggestion: boolean = false;
  friends: any[] = [];
  suggestions: any[] = [];
  apiUrl: string = environment.apiUrl;
  curWord: string = '';

  constructor(
    private postsService: PostsService,
    private userService: UserService,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.userService.getFriends().pipe(first()).subscribe(friends => {
      this.friends = friends;
    }, (err: NgError) => {
      
    });
  }

  onInput(){
    this.suggestions = [];
    const input = this.tweetInput.nativeElement;
    const pos = input.selectionStart;
    const mentionRegex: RegExp = /@[a-zA-Z0-9]+/g;

    this.curWord = this.getWordFromString(this.tweet, pos);
    if(this.curWord && this.curWord.match(mentionRegex)){
      const slug = this.curWord.slice(1);
      if(slug) this.suggestions = this.friends.filter(f => 
        (f.friend.nickname && f.friend.nickname.toLowerCase().includes(slug.toLowerCase()))
        || (f.friend.email && f.friend.email.toLowerCase().includes(slug.toLowerCase()))
        || (f.friend.slug && f.friend.slug.toLowerCase().includes(slug.toLowerCase())));
    }
  }

  selectMention(slug: string){
    this.tweet = this.tweet.replace(new RegExp(`${this.curWord}(?![a-zA-Z0-9])`), `@${slug} `);
    this.suggestions = [];
    this.tweetInput.nativeElement.focus();
  }

  getWordFromString(str: string, pos: number){
    let left = str.substr(0, pos);
    let right = str.substr(pos);

    left = left.replace(/^(\s*[\w\W.]+\s+)*/gi, '');
    right = right.replace(/(\s+[\w\W.]+\s*)*$/gi, '');

    return left + right;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  sendTweet(){
    this.sending = true;
    this.postsService.tweet(this.tweet, this.fileToUpload).pipe(first()).subscribe(response => {
      this.tweet = '';
      this.fileToUpload = null;

      // Display success popup
      this.store.dispatch(new PopsActions.AddPop({
        title: 'Tweet Sent',
        message: response.message,
        type: 'success'
      }));
      this.sending = false;
    }, (err: NgError) => {
      this.sending = false;
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
  }

}
