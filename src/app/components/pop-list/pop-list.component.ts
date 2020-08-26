import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from 'src/app/models/alert.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-pop-list',
  templateUrl: './pop-list.component.html',
  styleUrls: ['./pop-list.component.sass']
})
export class PopListComponent implements OnInit {

  alerts: Alert[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('pops').subscribe(pops => {
      let alerts = [];
      pops.forEach((pop: Alert) => {
        if(!alerts
          .some((a: Alert) => 
            a.message == pop.message 
            && a.title == pop.title 
            && a.type == pop.type)){
              alerts.push(pop);
        }
      });
      this.alerts = alerts;
    });
  }

}
