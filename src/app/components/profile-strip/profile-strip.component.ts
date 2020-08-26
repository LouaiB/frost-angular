import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-strip',
  templateUrl: './profile-strip.component.html',
  styleUrls: ['./profile-strip.component.sass']
})
export class ProfileStripComponent implements OnInit {

  user: Observable<any>;
  apiUrl: string = environment.apiUrl;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.user = this.store.select('user');
  }

}
