import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, filter, take, first } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url: string = environment.apiUrl;

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private cookieService: CookieService) { }

  public getFeed(startIndex: number, amount: number) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/post/feed`, { startIndex, amount }, { headers });
  }

  public searchTweets(query: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/post/searchTweets`, { query }, { headers });
  }

  public getAccountTweets(accountId: string, startIndex: number, amount: number) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/post/accountTweets`, { accountId, startIndex, amount }, { headers });
  }

  public getTweet(tweetId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.get(`${this.url}/post/getTweet/${tweetId}`, { headers });
  }

  public getComments(tweetId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/post/comments`, {
      "postId": tweetId
    }, { headers });
  }

  public addComment(tweetId: string, comment: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/post/addComment`, {
      "postId": tweetId,
      "comment": comment
    }, { headers });
  }

  public removeComment(tweetId: string, commentId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/post/removeComment`, {
      "postId": tweetId,
      commentId
    }, { headers });
  }

  public editComment(tweetId: string, commentId: string, newComment: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/post/editComment`, {
      "postId": tweetId,
      commentId,
      newComment
    }, { headers });
  }

  public likeTweet(tweetId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/post/addLike`, {
      "postId": tweetId
    }, { headers });
  }

  public unlikeTweet(tweetId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/post/removeLike`, {
      "postId": tweetId
    }, { headers });
  }

  public shareTweet(tweetId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/post/addShare`, {
      "postId": tweetId
    }, { headers });
  }

  public unshareTweet(tweetId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/post/removeShare`, {
      "postId": tweetId
    }, { headers });
  }


  public tweet(tweet: string, file: File) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    //headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    const formData = new FormData();
    formData.append('tweet', tweet);
    if(file) formData.append('attachment', file, file.name);

    return this.http.post(`${this.url}/post/tweet`, formData, { headers });
  }

  public removeTweet(tweetId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);
    
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/post/removeTweet`, {
      "postId": tweetId
    }, { headers });
  }

  public editTweet(tweetId: string, newContent: string, removeMedia: boolean, file: File) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    //headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    const formData = new FormData();
    formData.append('postId', tweetId);
    formData.append('newContent', newContent);
    formData.append('removeMedia', removeMedia ? 'remove' : '');
    if(file) formData.append('newAttachment', file, file.name);

    return this.http.post(`${this.url}/post/editTweet`, formData, { headers });
  }
}
