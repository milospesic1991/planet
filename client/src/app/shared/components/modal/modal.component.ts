import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Planet } from '../../models';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { PlanetService } from './../../../service/planet.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  planetForm: FormGroup;
  planet: Planet;
  imageUrl: string;

  constructor(private fb: FormBuilder, private planetService: PlanetService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public planetData: Planet) {
    this.planet = planetData;
  }

  ngOnInit(): void {
    this.createForm();
    if (!!this.planet) {
      this.planetForm.patchValue(this.planet);
    }
  }

  createDialog = (title: string, message: string) => {
    let planet = new Planet(this.planetForm.value);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      title: 'Confrim ' + title,
      message: "Are you sure you want to " + message,
      planet: planet
    }

    return dialogConfig;
  }


  onConfirm = () => {
    let planet = new Planet(this.planetForm.value);
    let dialogRef2;
    if (!!this.planet) {
      dialogRef2 = this.dialog.open(ConfirmModalComponent, this.createDialog('editing', 'edit'));
    } else {
      dialogRef2 = this.dialog.open(ConfirmModalComponent, this.createDialog('creating', 'create'));
    }
    dialogRef2.afterClosed().subscribe(res => {
      if (res == 'confirm') {
        if (!!this.planet) {
          planet.id = this.planet.id;
          if (!!this.imageUrl) {
            planet.imageUrl = this.imageUrl;
          }
          this.planetService.updatePlanet(planet).subscribe(res => {
            this.dialogRef.close(res);
          })
        } else {
          planet.imageUrl = this.imageUrl;
          this.planetService.createPlanet(planet).subscribe(res => {
            this.dialogRef.close(res);
          });
        }
      }

    })


  }

  onBrowse = (event) => {
    const file = (event.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    this.imageUrl = file.name;

    reader.onload = () => {
      this.imageUrl = reader.result as string;
    }
    reader.readAsDataURL(file);

  }

  createForm = () => {
    this.planetForm = this.fb.group({
      planetName: '',
      description: '',
      planetColor: '',
      planetRadiusKM: '',
      distInMillionsKM: this.fb.group({
        fromSun: '',
        fromEarth: '',
      }),
      imageUrl: '',
    })
  }

}
