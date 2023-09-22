import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PortalUser } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { PolicyService } from 'src/app/service/policy.service';
@Injectable()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login={
  id:'',
  UserName:'',
  Password:'',
};

  constructor(private toastr: ToastrService,private router: Router,private route:ActivatedRoute,private policyService: PolicyService,private authService:AuthService){

  }
  ngOnInit(): void {
    this.toastr.toastrConfig.positionClass = 'toast-top-center';
  }

  loginValidation(){
  this.policyService.Login(this.login)
  .subscribe({
    next:(response)=>{
      if(response==true)
      {
       localStorage.setItem('token',Math.random().toString()); 
      this.toastr.success('login succesfull','',{timeOut:2000,}); 
      this.router.navigate(['Policydetails']);
      }
      else
      {
      this.toastr.error('Invalid Credentials','',{timeOut: 2000,}); 
      }
    }
  });
  }
}

