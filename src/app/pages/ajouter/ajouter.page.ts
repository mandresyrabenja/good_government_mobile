/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.page.html',
  styleUrls: ['./ajouter.page.scss'],
})
export class AjouterPage implements OnInit {

  selectedFile: File = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('http://good-government.herokuapp.com/api/v1/reports',fd)
      .subscribe(res => {
        console.log(res);
      });
  }
  readAPI(URL: string){
    return this.http.get(URL);
  }
}
