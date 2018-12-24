import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class RefferalService {

  constructor(private http:Http) { }

  private  refferalUrl = "https://visacent.com/la/api/get_refferal";
	  
  refferalEmail(email:any){
      return this.http.post(`${this.refferalUrl}`,email).map((res:Response) => res.json());
  }

  private  refferalAmountUrl = "https://visacent.com/la/api/bonus_amount"; 

  bonusAmount(){
    return this.http.get(`${this.refferalAmountUrl}`).map((res:Response) => res.json());
  }
 
}
