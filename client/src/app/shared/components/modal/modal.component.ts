import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  imageUploaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private planetService: PlanetService,
    private dialog: MatDialog,
    private modalDialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public planetData: Planet) {
    this.planet = planetData;
  }

  ngOnInit(): void {
    this.createForm();
    if (!!this.planet) {
      this.planetForm.patchValue(this.planet);
      this.imageUploaded = true;
    }
  }

  onConfirm = () => {
    let planet = new Planet(this.planetForm.value);
    let confirmModal;
    if (!!this.planet) {
      confirmModal = this.dialog.open(ConfirmModalComponent, this.createDialog('editing', 'edit'));
    } else {
      confirmModal = this.dialog.open(ConfirmModalComponent, this.createDialog('creating', 'create'));
    }
    confirmModal.afterClosed().subscribe((confirmModalResult: string) => {
      if (confirmModalResult == 'confirm') {
        if (!!this.planet) {
          planet.id = this.planet.id;
          if (!!this.imageUrl) {
            planet.imageUrl = this.imageUrl;
          }
          this.planetService.updatePlanet(planet).subscribe(planet => {
            this.modalDialogRef.close(planet);
          })
        } else {
          planet.imageUrl = this.imageUrl;
          this.planetService.createPlanet(planet).subscribe(planet => {
            this.modalDialogRef.close(planet);
          });
        }
      }
    })
  }

  onBrowse = (event) => {
    this.imageUploaded = true;
    const file = (event.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    this.imageUrl = file.name;

    reader.onload = () => {
      this.imageUrl = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  private createDialog = (title: string, message: string): MatDialogConfig => {
    let planet = new Planet(this.planetForm.value);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      title: 'Confirm ' + title,
      message: "Are you sure you want to " + message,
      planet: planet
    }

    return dialogConfig;
  }

  private createForm = () => {
    this.planetForm = this.fb.group({
      planetName: ['', Validators.required],
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
