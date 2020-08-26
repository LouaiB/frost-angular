import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, filter, take, first } from 'rxjs/operators';
import { LoginModel } from '../models/login.viewmodel';
import { RegisterModel } from '../models/register.viewmodel';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.apiUrl;

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private cookieService: CookieService) { }

  public login(login: LoginModel) : Observable<any>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post(`${this.url}/account/token`, {
      "email": login.email,
      "password": login.password
    }, { headers });
  }

  public refresh(token: string) : Observable<any>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post(`${this.url}/account/refresh`, { token }, { headers });
  }

  public register(register: RegisterModel) : Observable<any>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post(`${this.url}/account/register`, {
      "email": register.email,
      "password": register.password,
      "slug": register.slug,
      "nickname": register.nickname
    }, { headers });
  }

  public changeAvatar(avatar: File) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    //headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    const formData = new FormData();
    formData.append('avatar', avatar, avatar.name);

    return this.http.post(`${this.url}/account/changeAvatar`, formData, { headers });
  }

  public changeNickname(nickname: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/account/changeNickname`, { nickname } , { headers });
  }

  public getFriends() : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.get(`${this.url}/account/friends`, { headers });
  }

  public getFriendships() : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.get(`${this.url}/account/friendships`, { headers });
  }

  public getAccount(userId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.get(`${this.url}/account/account/${userId}`, { headers });
  }

  public setSeen() : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/account/setSeen`, {}, { headers });
  }

  public sendFriendRequest(user2Id: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/account/sendFriendRequest`, { user2Id } , { headers });
  }

  public acceptFriendRequest(requestId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/account/acceptFriendRequest`, { requestId } , { headers });
  }

  public declineFriendRequest(requestId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/account/declineFriendRequest`, { requestId } , { headers });
  }

  public undeclineFriendRequest(requestId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/account/undeclineFriendRequest`, { requestId } , { headers });
  }

  public cancelFriendRequest(requestId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/account/cancelFriendRequest`, { requestId } , { headers });
  }

  public unfriend(friendshipId: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/account/unfriend`, { friendshipId } , { headers });
  }

  public searchUsers(query: string) : Observable<any>{
    const token = this.cookieService.get(environment.authCookie);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', token);

    return this.http.post(`${this.url}/account/searchUsers`, { query } , { headers });
}
}
