import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MyprofileService {

  constructor(private http:Http) { }

  private dasboardUrl = environment.api_url+"/dashboard/";
  dasboardUser(token) {
      return this.http.get(`${this.dasboardUrl}`+token).map((res:Response) => res.json());
  }

  private myOrderUrl = environment.api_url+"/account/";

  myOrder(token) {
		return this.http.get(`${this.myOrderUrl}`+token).map((res:Response) => res.json());
  }

  private myprofileUrl = environment.api_url+"/update_info";

  myProfileUpdate(profileData:any) {
		  return this.http.post(`${this.myprofileUrl}`,profileData).map((res:Response) => res.json());
  }                 

  private changePassUrl = environment.api_url+"/update_password";
  changePassUpdate(changePassData:any) {
      return this.http.post(`${this.changePassUrl}`,changePassData).map((res:Response) => res.json());
  }

  private userDeleteOrdUrl = environment.api_url+"/delete_application/";
  userDeleteOrd(ind){
    return this.http.get(`${this.userDeleteOrdUrl}`+ind).map((res:Response) => res.json());
  }

  private withdrawUrl = environment.api_url+"/bonus_withdraw";

  withdraw(withdrawUserData:any){
    return this.http.post(`${this.withdrawUrl}`,withdrawUserData).map((res:Response) => res.json());
  }

  private userInfoUrl = environment.api_url+"/withdraw_request_detail/";

  UserData(userInfo:any){
    return this.http.get(`${this.userInfoUrl}`+userInfo).map((res:Response) => res.json());
  }

}


// header set code
// changePassUpdate(changePassData:any) {
//   let access_token =localStorage.getItem('access_token'); 
//   let headers = new Headers();  
//   headers.append('Authorization','Bearer ');
//   headers.append('access_token',access_token);
//   let options = new RequestOptions({headers: headers});
//   return this.http.post(`${this.changePassUrl}`,changePassData,options).map((res:Response) => res.json());
// }
