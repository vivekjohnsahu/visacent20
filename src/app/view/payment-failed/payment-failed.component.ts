import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.css']
})
export class PaymentFailedComponent implements OnInit {

  paymentId:any;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;	
    this.router.params.subscribe(val => {
        this.paymentId = this.router.snapshot.params["id"];
        this.paymentId = atob(this.paymentId)
		})
  }

}
