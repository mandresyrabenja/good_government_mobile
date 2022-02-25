import { CreateAccount } from './../interfaces/create-account';
import { HttpRes } from './../interfaces/http-res';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {

  private baseUrl = 'https://good-government.herokuapp.com/api/v1/citizens';

  constructor(private http: HttpClient) {}

  createCitizen(citizen: CreateAccount) : Observable<any>  {
    return this.http.post(this.baseUrl, citizen);
  }

}
