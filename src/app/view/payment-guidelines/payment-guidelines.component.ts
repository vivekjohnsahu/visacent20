import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Meta, Title} from '@angular/platform-browser';




@Component({
  selector: 'app-payment-guidelines',
  templateUrl: './payment-guidelines.component.html',
  styleUrls: ['./payment-guidelines.component.css']
})
export class PaymentGuidelinesComponent implements OnInit {

  constructor(
              private meta: Meta,
              private title:Title
    ) { }

  ngOnInit() {
    $('#profile_trans').hide();

    this.title.setTitle('Payment Guidelines for Online Visa Application | Apply for a Visa | Visacent');
		this.meta.updateTag({ name:'title',content:'Payment Guidelines for Online Visa Application | Apply for a Visa | Visacent'});
		this.meta.updateTag({ name:'description',content:'Payment Guidelines for Online Visa Application | Apply for a Visa | Visacent'});
		this.meta.updateTag({ name:'keywords',content:'Payment Guidelines for Online Visa Application | Apply for a Visa | Visacent'});

  }

}
