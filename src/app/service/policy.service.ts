import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortalUser } from '../model/user.model';
import { Observable } from 'rxjs';
import { Policy } from '../model/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  constructor(private http:HttpClient) { }
  Login(response:PortalUser): Observable<boolean>{
    
    return this.http.post<boolean> ("https://localhost:7132/api/Policy",response)
  }
  policyValidation(response:Policy):Observable<boolean>{
    return this.http.post<boolean>("https://localhost:7132/api/Policy/validate",response)
  }
  addUserPolicyDetails(usr:String,policy:Number):Observable<any>{
    const data={
      userName:usr,
      PolicyNumber:policy
    }
    return this.http.post<any>("https://localhost:7132/api/Policy/Add",data);
  }
  getPolicyNumber():Observable<any>{
    return this.http.get<any>("https://localhost:7132/api/Policy");

  }
  getPolicyDetails(policyNumber:number):Observable<any>{
    return this.http.get<any>("https://localhost:7132/api/Policy/policynumber?policynumber="+policyNumber);
  }
  removePolicyDetails(policynumber:number):Observable<any>{
    return this.http.delete<any>("https://localhost:7132/api/Policy/policy?policynumber="+policynumber);
  }
  

}
