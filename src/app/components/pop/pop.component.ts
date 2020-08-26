import { Component, OnInit, Input } from '@angular/core';
import { Alert } from 'src/app/models/alert.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as PopsActions from '../../actions/pops.actions';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.sass']
})
export class PopComponent implements OnInit {

  @Input() alert: Alert;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    if(this.alert.type != 'eternal-error') setTimeout(() => { this.dismiss() }, 10000);
  }

  getClasses(){
    let classes = ['pop'];

    switch(this.alert.type){
      case 'error':
      case 'eternal-error':
        classes.push('pop-error');
        break;
      case 'success':
        classes.push('pop-success');
        break;
      case 'info':
        classes.push('pop-info');
        break;
    }

    return classes.join(' ');
  }

  dismiss(){
    this.store.dispatch(new PopsActions.RemovePop(this.alert));
  }

}
