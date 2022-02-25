import { MapPage } from './../map/map';
import { ReportService } from './../../providers/report-service';
import { CreateReportInterface } from './../../interfaces/create-report-interface';
import { StorageService } from './../../providers/storage-service';
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';

@Component({
  selector: 'create-report',
  templateUrl: 'create-report.html',
  styleUrls: ['./create-report.scss'],
})
export class CreateReport {
  signin: CreateReportInterface = {title : '', description : '', latitude : 0, longitude : 0};
  submitted = false;
  errorMsg = '';
  file : File;
  isModalOpen = true;
  noReportLocation: boolean = false;
  noReportPhoto: boolean = false;

  constructor(
    public router: Router,
    public storageService: StorageService,
    public reportService : ReportService,
    public modalCtrl: ModalController,
    public routerOutlet: IonRouterOutlet
  ) {}

  async displayMap() {
    const modal = await this.modalCtrl.create({
      component: MapPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if(data) {
      this.signin.latitude = data[0];
      this.signin.longitude = data[1];
      this.noReportLocation = false;
    }
  }

  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
    this.noReportPhoto = false;
  }

  async onCreateReport(form: NgForm) {
    this.submitted = true;
    this.errorMsg = '';

    if(form.valid && (this.signin.latitude != 0) && (this.signin.longitude != 0) && (this.file != undefined) ) {

      let formData = new FormData();
      formData.append('title', this.signin.title);
      formData.append('description', this.signin.description);
      formData.append('latitude', this.signin.latitude.toString());
      formData.append('longitude', this.signin.longitude.toString());
      formData.append("image", this.file);

      this.reportService.createReport(formData).subscribe(
        (response) => {
          this.router.navigateByUrl('/app/tabs/schedule');
        },
        (error) => {
          console.log("Erreur http durant du création de signalement: " + error);
        }
      );

    } else if( (this.signin.latitude == 0) || (this.signin.longitude == 0) ) {
      this.noReportLocation = true;

    } else if(this.file == undefined) {
      this.noReportPhoto = true;

    } else {
      this.errorMsg = 'Veuillez remplir tous les champs du formulaire';
    }

  }

}
