import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Lightbox } from 'src/app/helpers/lightbox';

@Component({
  selector: 'app-grid-gallery',
  templateUrl: './grid-gallery.component.html',
  styleUrls: ['./grid-gallery.component.sass']
})
export class GridGalleryComponent implements OnInit {

  @Input() account: any;
  apiUrl: string = environment.apiUrl;

  constructor() { }

  ngOnInit(): void {
  }

  lightbox(url){
    Lightbox.show(url);
  }

}
