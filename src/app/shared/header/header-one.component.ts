import { Component, OnInit, Input, HostListener, ViewChild, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  
  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/logo/logo.png'; // Default Logo
  @Input() footerLogo: string = 'assets/images/logo/logo-white.png'; // Footer Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  
  public stick: boolean = false;
  public topmargin: boolean = false;
  public userLogged: any;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    if (localStorage.getItem('userToken')) {
      console.log('User logged in');
      this.userLogged = true;
    }
    else {
      document.getElementById('logoutButton').style.display = "none";
      document.getElementById('mobile-wishlist').style.display = "none";
    }
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 50 && window.innerWidth > 0) { 
  	  this.stick = true;
      this.topmargin = true;
  	} else {
  	  this.stick = false;
      this.topmargin = false;
  	}
  }

}
