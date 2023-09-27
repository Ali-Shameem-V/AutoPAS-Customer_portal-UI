import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  userName:'',
  password:'',
};
dataToSend:string='';

  constructor(private toastr: ToastrService,private router: Router,private route:ActivatedRoute,private policyService: PolicyService){

  }
  ngOnInit(): void {
    this.sendDataToService()
    this.toastr.toastrConfig.positionClass = 'toast-top-center';
  }
  sendDataToService() {
    const dataToSend = this.login.userName;
    this.policyService.setData(dataToSend);
  }
  
  loginValidation(){
  this.policyService.login(this.login)
  .subscribe({
    next:(response)=>{
      if(response==true)
      {
       localStorage.setItem('token',Math.random().toString()); 
       console.log('token');
      this.toastr.success('login succesfull','',{timeOut:2000,}); 
      this.router.navigate(['Policydetails']);
      }
      else
      {
      this.toastr.error('Invalid Credentials','',{timeOut: 2000,}); 
      }
    },
    error:()=>{
      console.error("Error occured while  Validating Login Credentials");
    } 
  });
  }
}

