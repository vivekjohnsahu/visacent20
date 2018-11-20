import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-succes',
  templateUrl: './payment-succes.component.html',
  styleUrls: ['./payment-succes.component.css']
})
export class PaymentSuccesComponent implements OnInit {

	paymentId:any;

  	constructor(private router: ActivatedRoute) { }

	ngOnInit() {
		this.router.params.subscribe(val => {
			this.paymentId = this.router.snapshot.params["id"];
			this.paymentId = atob(this.paymentId)
		})
	}

}
