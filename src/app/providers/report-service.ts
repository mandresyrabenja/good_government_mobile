import { CreateAccount } from './../interfaces/create-account';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'https://good-government.herokuapp.com/api/v1/reports';

  constructor(private http: HttpClient) {}

  createReport(report: FormData) : Observable<any>  {
    return this.http.post(this.baseUrl, report);
  }

  getReports() : Observable<any>  {
    return this.http.get(this.baseUrl + '?page=0');
  }

  getReport(id) : Observable<any>  {
    return this.http.get(this.baseUrl + '/' + id);
  }
}
