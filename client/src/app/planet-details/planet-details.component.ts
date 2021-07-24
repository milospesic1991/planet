import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetService } from '../service/planet.service';
import { Planet } from './../shared/models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { ConfirmModalComponent } from '../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit {
  planetId: string;
  planet: Planet;

  constructor(private route: ActivatedRoute,
    private planetService: PlanetService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    debugger
    this.planetId = this.route.snapshot.params.id;

    this.route.params.subscribe(params => {
      if (!!params) {
        this.planetId = params['id'];
        this.getPlanetDetails(this.planetId);
      }
    })
  }

  getPlanetDetails = (id: string) => {
    this.planetService.getPlanet(id).subscribe(planet => {
      if (!!planet) {
        this.planet = planet;
      }
    })
  }

  deletePlanet = (planet: Planet) => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      title: 'Confrim deleting',
      message: "Are you sure you want to delete",
      planet: planet
    }

    let dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res == 'confirm') {
        this.planetService.deletePlanet(planet.id).subscribe(res => {
          this.router.navigate(['planets-overview']);
        })
      }
    })
  }

  editPlanet = (planet: Planet) => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = planet;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '550px';

    let dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => this.router.navigate(['planets-overview']));
  }


}
