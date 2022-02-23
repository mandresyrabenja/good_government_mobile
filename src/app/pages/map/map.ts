import { StorageService } from './../../providers/storage-service';
import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { ModalController, Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';

import { darkStyle } from './map-dark-style';
import { stringify } from 'querystring';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public confData: ConferenceData,
    public platform: Platform,
    public storageService : StorageService,
    public modalCtrl: ModalController) {}

  async ngAfterViewInit() {
    const appEl = this.doc.querySelector('ion-app');
    let isDark = false;
    let style = [];
    if (appEl.classList.contains('dark-theme')) {
      style = darkStyle;
    }

    const googleMaps = await getGoogleMaps(
      'AIzaSyAbIrfaMRD-VqRLLP-pgE4dXQBuTh75k0E'
    );

    let map;

    this.confData.getMap().subscribe(
      (mapData: any) => {
        const mapEle = this.mapElement.nativeElement;

        map = new googleMaps.Map(mapEle, {
          center: { lat: -18.91544018548976, lng: 47.52206152373752 },
          zoom: 8,
          styles: style
        });

        map.setMapTypeId('hybrid');

        googleMaps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

        map.addListener("click", (mapsMouseEvent) => {

          var latLng : number[] = [];
          latLng[0] = mapsMouseEvent.latLng.toJSON().lat;
          latLng[1] = mapsMouseEvent.latLng.toJSON().lng;

          this.dismiss(latLng);
        });

        const observer = new MutationObserver(
          (mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.attributeName === 'class') {
                const el = mutation.target as HTMLElement;
                isDark = el.classList.contains('dark-theme');
                if (map && isDark) {
                  map.setOptions({styles: darkStyle});
                } else if (map) {
                  map.setOptions({styles: []});
                }
              }
            });
          }
        );
        observer.observe(appEl, {
          attributes: true
        });
      }
    );
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}
