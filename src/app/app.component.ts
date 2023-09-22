import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'policyDetails.UI';
  constructor(private authService:AuthService,private router:Router){
  }
  ngOnInit(): void {
  }
  login(){
    this.authService.login();

  }
  logout(){
    this.authService.logout();
  }
}

