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
    dialogConfig.width = '400px';
    dialogConfig.data = {
      title: 'Confrim deleting',
      message: "Are you sure you want to delete",
      planet: planet
    }

    // after confirming modal delete and get to overview
    let confirmModal = this.dialog.open(ConfirmModalComponent, dialogConfig);

    confirmModal.afterClosed().subscribe(confirmModalResult => {
      if (confirmModalResult == 'confirm') {
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
    dialogConfig.width = '550px';

    let modal = this.dialog.open(ModalComponent, dialogConfig);
    modal.afterClosed().subscribe(planet => {
      if (!!planet) {
        this.planet = planet;
      }
      // this.router.navigate(['planets-overview'])
    });

  }


}
