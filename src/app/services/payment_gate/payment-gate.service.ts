import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentGateService {

  constructor(private http:Http) { }

  private paymentUrl = environment.api_url+"/visa_application/";
	  
  paymentEv(order_id:any) {
      return this.http.get(`${this.paymentUrl}`+order_id).map((res:Response) => res.json());
  }

  private paymentCompleteUrl = environment.api_url+"/payment";

  paymentComplete(key:any){
      return this.http.post(`${this.paymentCompleteUrl}`,key).map((res:Response) => res.json());
  }

  private paymentPayUmoneyUrl = environment.api_url+"/payupayment/";

  paymentPayUmoney(uMoneykey:any){
      return this.http.get(`${this.paymentPayUmoneyUrl}`+uMoneykey).map((res:Response) => res.json());
  }

  private makePaymentCompleteUrl = environment.api_url+"/paypal-payment/";

  makePaymentComplete(key:any){
      return this.http.get(`${this.makePaymentCompleteUrl}`+key).map((res:Response) => res.json());
  }

  private makePayUmoneyUrl = environment.api_url+"/makepayment-payupayment/";

  makePayUmoney(uMoneykey:any){
      return this.http.get(`${this.makePayUmoneyUrl}`+uMoneykey).map((res:Response) => res.json());
  }

  private userinfoUrl = environment.api_url+"/check_bonus/";

  userinfo(userinformaction:any){
    return this.http.get(`${this.userinfoUrl}`+userinformaction).map((res:Response) => res.json());
  }

}
