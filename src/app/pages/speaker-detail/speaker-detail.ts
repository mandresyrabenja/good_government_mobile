import { ReportService } from './../../providers/report-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html',
  styleUrls: ['./speaker-detail.scss'],
})
export class SpeakerDetailPage{
  report: any;
  isImageLoading = false;
  imageToShow: any;

  constructor(
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public reportService : ReportService
  ) {}

  /**
   * Créer une image à partir d'un fichier obtenu à partir d'une requête HTTP
   * @param image Reponse HTTP
   */
   createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
        "load",
        () => { this.imageToShow = reader.result; },
        false
    );

    if (image) { reader.readAsDataURL(image); }
  }

  /**
   * Avoir le photo d'un signalement
   * @param idReport ID su signalement
   */
  getImageFromService(idReport) {
    this.isImageLoading = true;
    this.reportService.getImage(idReport).subscribe(
      data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      error => {
        this.isImageLoading = false;
        console.log(error);
      }
    );
  }

  ionViewWillEnter() {
    const reportId = this.route.snapshot.paramMap.get('speakerId');
    this.reportService.getReport(reportId).subscribe(
      (resp : any) => {
        this.report = resp;
        this.getImageFromService(reportId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(
      url,
      '_blank'
    );
  }

  async openSpeakerShare(speaker: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(
              'Copy link clicked on https://twitter.com/' + speaker.twitter
            );
            if (
              (window as any).cordova &&
              (window as any).cordova.plugins.clipboard
            ) {
              (window as any).cordova.plugins.clipboard.copy(
                'https://twitter.com/' + speaker.twitter
              );
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openContact(speaker: any) {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
}
