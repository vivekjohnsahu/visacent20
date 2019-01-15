import { Injectable } from '@angular/core';
import {Http, Response,} from "@angular/http";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UpdateAddressService {
	constructor(private http:Http) { }

	private updateDatatUrl = environment.api_url+"/update_embassy_edits";
	
	updateData(update_user_details) {
		return this.http.post(`${this.updateDatatUrl}`,update_user_details).map((res:Response) => res.json());
	}

	private leaveReplyUrl = environment.api_url+"/save_emb_comment";

	save_emb_comment(userLeaveReply){
		return this.http.post(`${this.leaveReplyUrl}`,userLeaveReply).map((res:Response) => res.json());
	}
	
}

