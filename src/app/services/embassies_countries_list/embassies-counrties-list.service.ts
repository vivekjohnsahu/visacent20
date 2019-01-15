import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmbassiesCounrtiesListService {

  constructor(private http:Http) { }

  private embassiesListUrl = environment.api_url+"/embassy_countries_list";

	countryList() {
			return this.http.get(`${this.embassiesListUrl}`).map((res:Response) => res.json());
	}

	private filterListUrl = environment.api_url+"/embassy_countries_alpha";

	alphaList(){
		return this.http.get(`${this.filterListUrl}`).map((res:Response) => res.json());
	}

}
