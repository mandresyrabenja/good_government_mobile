import { StorageService } from './storage-service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";

/**
 * Intercepteur de requete HTTP pour ajouter le token actuel
 */
@Injectable({
  providedIn : 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService : StorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
      return from(
        this.storageService.get('token').then(
          (token) => {
            // Ajout du token dans l'entête
            const cloned = req.clone({
              headers: req.headers.set("Authorization", token)
            });
            return next.handle(cloned).toPromise();
          },
          (error) => {
            return  next.handle(req).toPromise();
          }
        )
      );
    }
}
