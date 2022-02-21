import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateReport } from './create-report';

const routes: Routes = [
  {
    path: '',
    component: CreateReport
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateReportRoutingModule { }
