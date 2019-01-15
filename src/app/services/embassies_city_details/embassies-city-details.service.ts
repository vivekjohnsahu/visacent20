import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmbassiesCityDetailsService {

    constructor(private http:Http) { }

    private cityDetailtUrl = environment.api_url+"/countries_embassy_detail/";

    countryCtn(country_ctn:any){
        return this.http.get(`${this.cityDetailtUrl}`+country_ctn).map((res:Response) => res.json());
    }

    private requirementCountryUrl = environment.api_url+"/countries_embassy_all/";

    requirementCountryCtn(requirement:any){
        return this.http.get(`${this.requirementCountryUrl}`+requirement).map((res:Response) => res.json());
    }
}
