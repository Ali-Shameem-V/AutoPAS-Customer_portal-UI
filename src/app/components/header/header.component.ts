import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

constructor(private router:Router,private toastr:ToastrService){}

  isHome(): boolean{

    return this.router.url === '/';
  }
  isLogin(): boolean {

    return this.router.url === '/login';

  }
  
  isPolicyPage(): boolean {

    return this.router.url === '/Policydetails';

  }
  logout() {
   
    this.toastr.warning('Are you sure you want to log out?', 'Confirmation', {
      closeButton: true,
      progressBar: true,
      timeOut: 5000
    }).onTap.subscribe(() => {
      // Your logout logic here
      localStorage.removeItem('token');
      console.log('token');
      this.router.navigate(['login']);
    });
  } 
}
