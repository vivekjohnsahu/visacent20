import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {

  constructor(private http:Http) { }

    private ApplicationDetailsUrl = environment.api_url+"/get_order_summary/";

    ApplicationDetails(currentId:any) {
		return this.http.get(`${this.ApplicationDetailsUrl}`+currentId).map((res:Response) => res.json());
    }

    private paticularDetailsUrl = environment.api_url+"/get_form_fields/";

    paticularId(applicantAllId:any){
      return this.http.get(`${this.paticularDetailsUrl}`+applicantAllId).map((res:Response) => res.json());
    }

    private userApplicantUrl = environment.api_url+"/update_user_visa";
    
    userData(applicant:any) {
      return this.http.post(`${this.userApplicantUrl}`,applicant).map((res:Response) => res.json());
    }

      private documentArrUrl = environment.api_url+"/upload_document";
    
    document(documentArr:any) {
      return this.http.post(`${this.documentArrUrl}`,documentArr).map((res:Response) => res.json());
    }

    private documentFinUrl = environment.api_url+"/update_document"
    
    submitDocFin(key){
      return this.http.post(`${this.documentFinUrl}`,key).map((res:Response) => res.json());
    }
}
