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
  currentView: string = 'grid';

  planetsList: Planet[];
  dataSource: MatTableDataSource<Planet>;
  constList = [];

  constructor(
    private planetService: PlanetService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPlanets();
    this.setDisplayView();
  }

  getPlanets = () => {
    this.planetService.getPlanets().subscribe(planets => {
      this.planetsList = planets;
      this.constList = this.planetsList;
      this.dataSource = new MatTableDataSource(this.planetsList);
      this.dataSource.filterPredicate = (data, filter: string): boolean => {
        return data.planetName.toLowerCase().includes(filter);
      };
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
    dialogConfig.width = '550px';

    // open modal and fetch data after modal is closed
    let modalDialog = this.dialog.open(ModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(modalResult => {
      if (!!modalResult) {
        this.planetsList.push(modalResult);
        this.dataSource = new MatTableDataSource(this.planetsList);
      }
    });
  }

  private setDisplayView() {
    let localStorageValue = localStorage.getItem('currentView');
    this.currentView = !!localStorageValue ? localStorageValue : 'grid';
  }

}
