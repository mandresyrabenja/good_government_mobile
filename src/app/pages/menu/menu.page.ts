import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title:'Ajouter',
      url:'/menu/ajouter'
    },
    {
      title:'Liste De Signalement',
      url:'/menu/liste-signalement'
    },
    {
      title:'Notification',
      url:'/menu/notification'
    },
  ];

  selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent)=>{
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

}
