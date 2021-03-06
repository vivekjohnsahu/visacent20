import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CousulateInService {

  constructor(private http:Http) { }

  private cousulateUrl = environment.api_url+"/consulate_of_countries/";

  cousulateList(cousulate:any) {
		return this.http.get(`${this.cousulateUrl}`+cousulate).map((res:Response) => res.json());
	}
}
