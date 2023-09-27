import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortalUser } from '../model/user.model';
import { Observable } from 'rxjs';
import { Policy } from '../model/policy.model';
import { environment } from 'src/app/environments/environment';
import { PolicyData } from '../model/policyDetails.model';
interface ValidationResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  baseApiUrl: string= environment.baseApiUrl;
  storedUserName:string='';

  constructor(private http:HttpClient) { }
  setData(data: string) {
    this.storedUserName=data;
    console.log('Data received in the service:', data);
  }
  getData(){
    console.log(this.storedUserName);
    return this.storedUserName;
  }
  login(response:PortalUser): Observable<boolean>{
    return this.http.post<boolean> (this.baseApiUrl+"api/Policy",response)
  }
  policyValidation(response:Policy):Observable<ValidationResponse>{
    return this.http.post<ValidationResponse>(this.baseApiUrl+"api/Policy/validate",response)
  }
  addUserPolicyDetails(usr:String,policy:Number):Observable<boolean>{
    const data={
      userName:usr,
      PolicyNumber:policy
    }
    return this.http.post<boolean>(this.baseApiUrl+"api/Policy/Add",data);
  }
  getPolicyNumber(recievedData:string):Observable<number[]>{
    return this.http.get<number[]>(this.baseApiUrl+"api/Policy/"+recievedData);
  }
  getPolicyDetails(policyNumber:number):Observable<PolicyData>{
    return this.http.get<PolicyData>(this.baseApiUrl+"api/Policy/policyDetails/"+policyNumber);
  }
  removePolicyDetails(policynumber:number):Observable<boolean>{
    return this.http.delete<boolean>(this.baseApiUrl+"api/Policy/policy/"+policynumber);
  }

}
