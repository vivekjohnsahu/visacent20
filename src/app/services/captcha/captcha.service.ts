import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  constructor(private http:Http) { }

  private captchaUrl = environment.api_url+"/get_captcha";

  captcha(){
        return this.http.get(`${this.captchaUrl}`).map((res:Response) => res.json());
    }
}


