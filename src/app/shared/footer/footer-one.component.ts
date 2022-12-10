import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {

  @Input() class: string = 'custom-dark' // Default class 
  @Input() themeLogo: string = 'assets/images/logo/logo.png'; // Default Logo
  @Input() footerLogo: string = 'assets/images/logo/logo-white.png'; // Footer Logo
  @Input() newsletter: boolean = true; // Default True

  public today: number = Date.now();
  public backend = 'http://lookc.staging.dynamicweb-cms.com';
  public response: any;
  public sectionOneTitle: any;
  public sectionOne: any;
  footerAdress: any;

  constructor(private http: HttpClient) { 
      // Footer section one
      this.http.get(this.backend + '/dwapi/content/paragraphs/3350').subscribe(res => {
      this.response = res;
      console.log(this.response);
      this.sectionOneTitle = this.response.Item.Fields[0].Value;
      })
      // Footer store details
      this.http.get(this.backend + '/dwapi/content/paragraphs/4097').subscribe(res => {
        this.response = res;
        var footerAdress = this.response.Item.Fields[3].Value;
        document.getElementById('footerAdress').innerHTML = footerAdress;
      })
  }
  ngOnInit(): void {
  }

}
