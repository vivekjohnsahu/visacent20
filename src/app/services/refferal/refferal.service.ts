import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RefferalService {

  constructor(private http:Http) { }

  private  refferalUrl = environment.api_url+"/get_refferal";
	  
  refferalEmail(email:any){
      return this.http.post(`${this.refferalUrl}`,email).map((res:Response) => res.json());
  }

  private  refferalAmountUrl = environment.api_url+"/bonus_amount"; 

  bonusAmount(){
    return this.http.get(`${this.refferalAmountUrl}`).map((res:Response) => res.json());
  }
 
}
