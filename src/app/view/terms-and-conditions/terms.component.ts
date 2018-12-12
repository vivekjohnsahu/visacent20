import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

	constructor(
		private meta: Meta,
		private title:Title

	) { }

	ngOnInit() {
		$('#profile_trans').hide();
		this.title.setTitle('Terms and Conditions | Check Our Visa Terms');
		this.meta.updateTag({ name:'title',content:'Terms and Conditions | Check Our Visa Terms'});	
		this.meta.updateTag({ name:'description',content:'Check out our terms an conditions before apply visa from myvisa. Apply online electronic visa from best agency in the world.'});
		this.meta.updateTag({ name:'keywords',content: 'terms and condition, check our terms and conditons, visa services, online visa services, online visa application, travel visa, tourist visa'});

	}

}
