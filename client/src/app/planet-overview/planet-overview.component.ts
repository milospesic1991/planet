import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanetService } from '../service/planet.service';
import { Planet } from './../shared/models';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../shared/components/modal/modal.component';

@Component({
  selector: 'app-planet-overview',
  templateUrl: './planet-overview.component.html',
  styleUrls: ['./planet-overview.component.scss']
})
export class PlanetOverviewComponent implements OnInit {
  planetsList: Planet[];

  changeViewTab: boolean = false;
  currentView: string = 'grid';

  dataSource: MatTableDataSource<Planet>;

  constList = [];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private planetService: PlanetService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPlanets();
    this.currentView = localStorage.getItem('currentView');
  }

  getPlanets = () => {
    this.planetService.getPlanets().subscribe(data => {
      this.planetsList = data;
      this.constList = this.planetsList;
      this.dataSource = new MatTableDataSource(this.planetsList);
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.planetName.toLowerCase().includes(filter);
      };
      this.dataSource.sort = this.sort;
    })

  }

  applyFilter(event: Event) {
    const filterList = this.constList;
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.planetsList = filterList.filter(planet => planet.planetName.toLowerCase().includes(filterValue));

  }

  toggleView(view: string) {
    if (view == 'grid') {
      this.currentView = 'grid';
      localStorage.setItem('currentView', 'grid');
    } else if (view == 'table') {
      this.currentView = 'table';
      localStorage.setItem('currentView', 'table');
    }
  }


  createPlanet = () => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '550px';

    let dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (!!res) {
        this.planetsList.push(res);
        this.dataSource = new MatTableDataSource(this.planetsList);
        this.dataSource.sort = this.sort;
      }
    });
  }

}
