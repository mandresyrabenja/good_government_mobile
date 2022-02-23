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
  signin: CreateReportInterface = {title : '', description : '', latitude : -18.99583635039157, longitude : 49.0599632263137};
  submitted = false;
  errorMsg = '';
  file : File;
  isModalOpen = true;
  excludeTracks: any = [];
  latLng : number[] = [];

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
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { excludedTracks: this.excludeTracks }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if(data) {
      this.latLng = data;
      console.log("Coordonnés: " + this.latLng);
    }
  }

  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }

  async onCreateReport(form: NgForm) {
    this.submitted = true;
    this.errorMsg = '';

    if(form.valid) {

      let formData = new FormData();
      formData.append('title', this.signin.title);
      formData.append('description', this.signin.description);
      formData.append("image", this.file, this.file.name);

      console.log()
      this.storageService.setObject('new_report', formData);
      this.router.navigateByUrl('/app/tabs/map');

    }

  }

}
