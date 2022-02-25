import { CreateReport } from './create-report';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateReportRoutingModule } from './create-report-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateReportRoutingModule
  ],
  declarations: [
    CreateReport,
  ]
})
export class CreateReportModule { }
