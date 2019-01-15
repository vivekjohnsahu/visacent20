import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VisaStatusService {

  constructor(private http:Http) { }

  private visastatusUrl = environment.api_url+"/visa_status";

  visaStatus(visastatus:any) {
		return this.http.post(`${this.visastatusUrl}`,visastatus).map((res:Response) => res.json());
    }
}









	  

