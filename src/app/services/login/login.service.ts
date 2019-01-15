import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {environment} from "../../../environments/environment";
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:Http) { }
  
  private loginUrl = environment.api_url+"/login";

    loginDetails(loginData:any) {
      return this.http.post(`${this.loginUrl}`,loginData).map((res:Response) => res.json());
    }
    
    private forgotUrl = environment.api_url+"/password_recovery";

    forgotDetails(EmailForgot:any) {
      return this.http.post(`${this.forgotUrl}`,EmailForgot).map((res:Response) => res.json());
    }

    private loginOtpUrl = environment.api_url+"/validate_otp";

    loginOtp(otpData){
      return this.http.post(`${this.loginOtpUrl}`,otpData).map((res:Response) => res.json());
    }  

  }
