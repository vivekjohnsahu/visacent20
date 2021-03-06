import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NationalityPriceService {

  constructor(private http:Http) { }

  private priceUrl = environment.api_url+"/get_availabel_visa_by_country/";
	  
  price_get(nationalityNamePrice:any) {
		return this.http.get(`${this.priceUrl}`+nationalityNamePrice).map((res:Response) => res.json());
    }

}
