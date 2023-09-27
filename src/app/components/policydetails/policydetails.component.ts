import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Policy } from 'src/app/model/policy.model';
import { PolicyService } from 'src/app/service/policy.service';

@Component({
  selector: 'app-policydetails',
  templateUrl: './policydetails.component.html',
  styleUrls: ['./policydetails.component.css']
})
export class PolicydetailsComponent implements OnInit {
  policies: Policy={
    policyNumber:'',
    chasisNumber:''
  };
  userName:string='';
  policyNum:number[]=[];
  selectedPolicyNumber:any;
  policyData:any={
    PolicyNumber: 0,
    PolicyEffectiveDt:'',
    PolicyExpirationDt:'',
    Term:0,
    Status:'',
    TotalPremium:0.0
  };
recievedData:any;
  constructor(private toastr:ToastrService,private router: Router,private route:ActivatedRoute,private policyService: PolicyService){
    
  }
  ngOnInit(): void {
   
    this.toastr.toastrConfig.positionClass = 'toast-top-center';
    this.recieveDataFromService() 
    this.getPolicyNumber();

  }
  recieveDataFromService() {
    this.recievedData=this.policyService.getData();
    console.log(this.recievedData);
    }
  
  getPolicyNumber(){
    this.policyService.getPolicyNumber(this.recievedData).subscribe({
      next:(response)=>{
        if(response==null)
        {
          this.policyNum=[];
          this.selectedPolicyNumber = null;
        }
        else
        {
          this.policyNum=response;
          console.log(this.policyNum);
          this.selectedPolicyNumber = null;

        }

      },
      error:()=>{
        console.error("Error occured while getting policy numbers");
      }  
   });
  }



    policyNumberValidation(){
      this.policyService.policyValidation(this.policies)
      .subscribe({
        next:(response)=>{
          if(response.message ==='Valid')
          {
            console.log(response);
            this.policyService.addUserPolicyDetails('pusr1',this.policies.policyNumber)
            .subscribe({
              next:(response)=>{
                if(response==true)
                this.toastr.success('Successfully Added','',{timeOut:2000,}); 
                this.getPolicyNumber();

              },
              error:()=>{
                console.error("Error occured while adding policy details");
              }   
            });
          }
          else if(response.message==='Invalid Policy')
          {
            console.log(response);

            this.toastr.error('Invalid Policy Number','',{timeOut:2000,}); 
          }
          else if(response.message==='Invalid Policy & Chassis')
          {
            console.log(response);

            this.toastr.error('Invalid Policy & Chassis Number','',{timeOut:2000,}); 
          }
          else{
            console.log(response);
            this.toastr.error('Invalid Chassis Number','',{timeOut:2000,}); 

          }    
        },
        error:()=>{
          console.error("Error occured while Validating");
        }    
      });
    
    }
    policyDetails() {
        this.policyService.getPolicyDetails(this.selectedPolicyNumber)
        .subscribe({
          next:(response) => {
            this.policyData=response;
            console.log(this.policyData);
          },
          error: () => { 
            console.error('Error occured while fetching Policy Details');
          }
    
         });
      }

    
    removePolicy() {
        this.policyService.removePolicyDetails(this.selectedPolicyNumber)
        .subscribe({
          next: (response) => {
            if (response === true) {
              this.toastr.success('Policy Details Removed Successfully', '', { timeOut: 2000 });
              this.selectedPolicyNumber = null;
              this.getPolicyNumber();
            }
          },
          error: (error) =>
          { 
            console.error('Error occured while removing Policy Details:', error);
          }
        });

      }
}


