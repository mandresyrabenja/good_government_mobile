import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeSignalementPageRoutingModule } from './liste-signalement-routing.module';

import { ListeSignalementPage } from './liste-signalement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeSignalementPageRoutingModule
  ],
  declarations: [ListeSignalementPage]
})
export class ListeSignalementPageModule {}
