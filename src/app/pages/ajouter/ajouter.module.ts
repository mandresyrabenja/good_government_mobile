import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AjouterPage } from './ajouter.page';
import { AjouterPageRoutingModule } from './ajouter-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [AjouterPage]
})
export class AjouterPageModule {}
