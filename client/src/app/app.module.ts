import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlanetOverviewComponent } from './planet-overview/planet-overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ConfirmModalComponent } from './shared/components/confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';
import { ToastrModule } from 'ngx-toastr';
import { TableViewComponent } from './planet-overview/table-view/table-view.component';
import { GridViewComponent } from './planet-overview/grid-view/grid-view.component';

@NgModule({
  declarations: [AppComponent, PlanetOverviewComponent, ModalComponent, ConfirmModalComponent, PlanetDetailsComponent, TableViewComponent, GridViewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
