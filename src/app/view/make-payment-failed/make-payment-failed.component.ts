import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-make-payment-failed',
  templateUrl: './make-payment-failed.component.html',
  styleUrls: ['./make-payment-failed.component.css']
})
export class MakePaymentFailedComponent implements OnInit {

  paymentId:any;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(val => {
        this.paymentId = this.router.snapshot.params["id"];
        this.paymentId = atob(this.paymentId)
		})
  }

}
