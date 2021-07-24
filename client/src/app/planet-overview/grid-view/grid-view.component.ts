import { Component, Input, OnInit } from '@angular/core';
import { Planet } from './../../shared/models';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
  @Input() planet: Planet;

  constructor() { }

  ngOnInit(): void {
  }

}
