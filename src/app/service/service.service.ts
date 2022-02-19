/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  API = 'http://good-government.herokuapp.com/api/v1/reports';

  constructor(private http: HttpClient) { }

  getReport(){}

  getReportById(){}

  createReport(titre: string, description: string, image: string, long: string, lat: string){
    return this.http.post(this.API, {titre,description,image});
  }
}
