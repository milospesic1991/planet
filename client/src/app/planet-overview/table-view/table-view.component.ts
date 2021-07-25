import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Planet } from '../../shared/models';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<Planet>;
  @Output() emitSort = new EventEmitter<MatSort>();
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['image', 'planetName', 'planetColor', 'planetRadiusKM', 'fromSun', 'fromEarth'];

  constructor() { }

  ngOnInit(): void {
  }

  tableSort = () => {
    this.emitSort.emit(this.sort);
  }
}
