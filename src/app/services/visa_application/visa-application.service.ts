import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class VisaApplicationService {

 	constructor(private http:Http) { }

	private visatUrl = "https://visacent.com/la/api/get_availabel_visa/";
	  
	visaTableList(visaAllValue:any) {
		return this.http.get(`${this.visatUrl}`+visaAllValue).map((res:Response) => res.json());
	}
		
	private visaSelectCntUrl = "https://visacent.com/la/api/get_country_data/";

	visaSelectCnt(country_ctn:any){
			return this.http.get(`${this.visaSelectCntUrl}`+country_ctn).map((res:Response) => res.json());
	}

	private eVisaSelectCntUrl = "https://visacent.com/la/api/get_country_data/";

	eVisaSelectCnt(visaReq:any){
		return this.http.get(`${this.eVisaSelectCntUrl}`+visaReq).map((res:Response) => res.json());
	}

	private visaEligibleUrl = "https://visacent.com/la/api/visa_eligible_countries/";

	visa_eligible_country(country_eligible:any){
		return this.http.get(`${this.visaEligibleUrl}`+country_eligible).map((res:Response) => res.json());
	}

}
