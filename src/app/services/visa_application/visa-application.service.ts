import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VisaApplicationService {

 	constructor(private http:Http) { }

	private visatUrl = environment.api_url+"/get_availabel_visa/";
	  
	visaTableList(visaAllValue:any) {
		return this.http.get(`${this.visatUrl}`+visaAllValue).map((res:Response) => res.json());
	}
		
	private visaSelectCntUrl = environment.api_url+"/get_country_data/";

	visaSelectCnt(country_ctn:any){
			return this.http.get(`${this.visaSelectCntUrl}`+country_ctn).map((res:Response) => res.json());
	}

	private eVisaSelectCntUrl = environment.api_url+"/get_country_data/";

	eVisaSelectCnt(visaReq:any){
		return this.http.get(`${this.eVisaSelectCntUrl}`+visaReq).map((res:Response) => res.json());
	}

	private visaEligibleUrl = environment.api_url+"/visa_eligible_countries/";

	visa_eligible_country(country_eligible:any){
		return this.http.get(`${this.visaEligibleUrl}`+country_eligible).map((res:Response) => res.json());
	}

}
