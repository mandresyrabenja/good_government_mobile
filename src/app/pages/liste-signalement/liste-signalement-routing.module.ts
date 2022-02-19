import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeSignalementPage } from './liste-signalement.page';

const routes: Routes = [
  {
    path: '',
    component: ListeSignalementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeSignalementPageRoutingModule {}
