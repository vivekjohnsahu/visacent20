import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

	constructor(
		private meta: Meta,
		private title:Title
	) { }

	ngOnInit() {
		$('#profile_trans').hide();
		this.title.setTitle('FAQ for Visa Related | Frequently Ask Questions about Visa');
		this.meta.updateTag({ name:'title',content:'FAQ for Visa Related | Frequently Ask Questions about Visa'});	
		this.meta.updateTag({ name:'description',content:'Learn more about visa services through our FAQ page, Here you can find about visa related queries. Apply visa online from myvisa and get 24/7 customer support and chat services.'});
		this.meta.updateTag({ name:'keywords',content: 'faq for visa relates, frequently ask questions, visa processing, visa faq, visa frequently asked questions, visa service information '});
	}

}
