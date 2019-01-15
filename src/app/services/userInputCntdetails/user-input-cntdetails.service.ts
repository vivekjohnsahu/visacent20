import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserInputCntdetailsService {

  constructor(private http:Http) { }
  private userInputtUrl = environment.api_url+"/update_embassy_new";

  userInputData(userFileData) {
		return this.http.post(`${this.userInputtUrl}`,userFileData).map((res:Response) => res.json());
    }
}
