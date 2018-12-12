import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

	constructor(
		private meta: Meta,
		private title:Title
	) { }

	ngOnInit() {
		$('#profile_trans').hide();
		this.title.setTitle('Visacent Privacy Policy');
		this.meta.updateTag({ name:'title',content:'Visacent Privacy Policy'});	
		this.meta.updateTag({ name:'description',content:'Read our privacy policy before apply visa online. Apply tourist, business and medical visa of any country through this visa platform.'});
		this.meta.updateTag({ name:'keywords',content: 'privacy policy, tourist visa, business visa, apply visa online, myvisa, online visa, online visa application, get visa online, visa legal service'});

	}

}
