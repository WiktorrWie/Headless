import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private response: any;
  public userLogged: any;
  userName: any = "";
  password: any = "";

  constructor(private http: HttpClient, private router: Router) { 
    
  }

  ngOnInit(): void {
    if (localStorage.getItem('userToken')) {
      this.userLogged = "User already logged in";
    }
  }
  
  onSubmit() {
    this.http.get('http://lookc.staging.dynamicweb-cms.com/dwapi/users/authenticate?userName='+this.userName+'&password='+this.password+'&expirationInSeconds=1800').subscribe(res => {
      this.response = res;
      console.log(this.response.Token);
      localStorage.setItem('userToken', this.response.Token);
      if (localStorage.getItem('userToken')) {
        console.log('User logged in');
        this.userLogged = "User logged in";
        setTimeout(() => {
          this.router.navigate(['/']);
      }, 1000);  //1s
      }
    }, (err : HttpErrorResponse)=>{
      console.log(err.statusText);
      this.userLogged = err.statusText;
    })
  }

}
