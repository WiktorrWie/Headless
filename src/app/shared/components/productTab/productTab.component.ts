import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './productTab.component.html',
  styleUrls: ['./productTab.component.scss']
})
export class ProductTabComponent implements OnInit {

  constructor(private router: Router, public navServices: NavService, private http: HttpClient) {

  }
  
  ngOnInit(): void {
  }

}
