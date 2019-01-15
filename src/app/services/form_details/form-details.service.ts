import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormDetailsService {

  constructor(private http:Http) { }

  private formtUrl = environment.api_url+"/get_visa_detail/";
	  
  getformdata(currentValue:any) {
		return this.http.get(`${this.formtUrl}`+currentValue).map((res:Response) => res.json());
    }

}
