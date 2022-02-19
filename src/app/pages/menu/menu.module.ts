import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
import { MenuPageRoutingModule } from './menu-routing.module';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'ajouter',
        loadChildren: () => import('../ajouter/ajouter.module').then( m => m.AjouterPageModule)
      },
      {
        path: 'liste-signalement',
        loadChildren: () => import('../liste-signalement/liste-signalement.module').then( m => m.ListeSignalementPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then( m => m.NotificationPageModule)
      },
      {
        path: '',
        redirectTo:'/menu/ajouter'
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
