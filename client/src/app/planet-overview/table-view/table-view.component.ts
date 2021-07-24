import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Planet } from '../../shared/models';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<Planet>;
  displayedColumns: string[] = ['image', 'planetName', 'planetColor', 'planetRadiusKM', 'fromSun', 'fromEarth'];

  constructor() { }

  ngOnInit(): void {
  }

}
