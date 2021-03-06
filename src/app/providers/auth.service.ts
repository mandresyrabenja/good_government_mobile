import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
  })
export class AuthService {
  private baseUrl = "https://good-government.herokuapp.com";

  public isAuth = false;

  constructor(private http: HttpClient) {
  }
  login(username:string, password:string ) {
      return this.http.post(this.baseUrl + '/login', {"username": username,"password": password}, { observe: 'response' });
  }

  logout() {
      localStorage.removeItem("token");
      this.isAuth = false;
  }
}
