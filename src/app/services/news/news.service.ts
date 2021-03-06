import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:Http) { }

    private NewsUrl = environment.api_url+"/news_list";

    NewsData() {
		  return this.http.get(`${this.NewsUrl}`).map((res:Response) => res.json());
    }

    private NewsDetailsUrl = environment.api_url+"/news/";

    NewsCurrentValue(currentValue){
      return this.http.get(`${this.NewsDetailsUrl}`+currentValue).map((res:Response) => res.json());
    }

    private leaveRpysUrl = environment.api_url+"/news_comment";

    leaveData(leaveRpy){
      return this.http.post(`${this.leaveRpysUrl}`,leaveRpy).map((res:Response) => res.json());
    }
}
