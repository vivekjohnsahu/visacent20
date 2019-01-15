import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {

  constructor(private http:Http) {}
    private registertUrl = environment.api_url+"/register_user_visa";

  registerdata(formAllData) {
		return this.http.post(`${this.registertUrl}`,formAllData).map((res:Response) => res.json());
    }

    private EmailVerifiedUrl = environment.api_url+"/check_email";

  userEmailVerified(EmailVerified){
    return this.http.post(`${this.EmailVerifiedUrl}`,EmailVerified).map((res:Response) => res.json());
  }
}
