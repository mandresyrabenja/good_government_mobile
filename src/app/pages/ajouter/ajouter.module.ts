import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AjouterPageRoutingModule } from './ajouter-routing.module';
import { AjouterPage } from './ajouter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterPageRoutingModule,
    HttpClientModule
  ],
  declarations: [AjouterPage]
})
export class AjouterPageModule {}