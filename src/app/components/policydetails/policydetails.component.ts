import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Policy } from 'src/app/model/policy.model';
import { PolicyData } from 'src/app/model/policyDetails.model';
import { PortalUser } from 'src/app/model/user.model';
import { PolicyService } from 'src/app/service/policy.service';

@Component({
  selector: 'app-policydetails',
  templateUrl: './policydetails.component.html',
  styleUrls: ['./policydetails.component.css']
})
export class PolicydetailsComponent implements OnInit {
  policies: Policy={
    policyNumber:null,
    chasisNumber:''
  };
  policynum:[]=[];
  selectedPolicyNumber:any;
  policyData:any={
    PolicyNumber: 0,
    PolicyEffectiveDt:'',
    PolicyExpirationDt:'',
    Term:0,
    Status:'',
    TotalPremium:0.0
  };

  constructor(private toastr:ToastrService,private router: Router,private route:ActivatedRoute,private policyService: PolicyService){}
  ngOnInit(): void {
    this.toastr.toastrConfig.positionClass = 'toast-top-center';
    this.policyService.getPolicyNumber().subscribe(
      (response)=>{
        this.selectedPolicyNumber = null;

        this.policynum=response;
    });
  }

    policyNumberValidation(){
      this.policyService.policyValidation(this.policies)
      .subscribe({
        next:(response)=>{
          if(response==true)
          {
            this.policyService.addUserPolicyDetails('pusr1',this.policies.policyNumber)
            .subscribe({
              next:(response)=>{
                if(response==true)
                this.toastr.success('Successfully Added','',{timeOut:2000,}); 
                this.policyService.getPolicyNumber().subscribe(
                  (response)=>{
                    this.selectedPolicyNumber = null;

                    this.policynum=response;
                });
              }
            });
          }
          else
          {
            this.toastr.error('InValid Policy & Chassis Number','',{timeOut:2000,}); 
          }    
        }    
      });
    
    }
    PolicyDetails(){
      this.policyService.getPolicyDetails(this.selectedPolicyNumber)
      .subscribe(
        (response)=>{

          this.policyData=response;
        }
      );
    }
    removePolicy(){
      this.policyService.removePolicyDetails(this.selectedPolicyNumber)
      .subscribe({
        next:(response)=>{
          if(response==true)
          {
            this.toastr.success('Policy Details Removed Successfully','',{timeOut:2000,});
            this.selectedPolicyNumber = null;
            this.policyService.getPolicyNumber().subscribe(
              (response)=>{

                this.selectedPolicyNumber = null;

                this.policynum=response;

            });

          }
        }
      })

    }
    
    logout()
    {
      this.toastr.warning('Are you sure you want to log out?', 'Confirmation', {
        closeButton: true,
        progressBar: true,
        timeOut: 5000 
      }).onTap.subscribe(() => {
        
      {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      }
      });
    }      
    
}
