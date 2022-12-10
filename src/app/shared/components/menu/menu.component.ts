import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menuItems: Menu[];
	public categoriesArr = [];
	url = 'http://lookc.staging.dynamicweb-cms.com/dwapi/content/pages?PageId=1698';

  constructor(private router: Router, public navServices: NavService, private http: HttpClient) {
    this.http.get(this.url).subscribe(data => {
      
      for (let key in data) {
        if (data.hasOwnProperty(key))
        this.categoriesArr.push(data[key]);
      }
    })
  }
  

  ngOnInit(): void {
  }

  mainMenuToggle(): void {
    this.navServices.mainMenuToggle = !this.navServices.mainMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

}
