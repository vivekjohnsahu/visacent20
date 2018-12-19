import { Component, OnInit } from '@angular/core';
declare let paypal: any;
import * as $ from 'jquery';
import { FlagValueService } from '../../services/flagValue/flag-value.service'
import { PaymentGateService } from '../../services/payment_gate/payment-gate.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css'],
  providers: [ PaymentGateService]
})
export class MakePaymentComponent implements OnInit {

	amount:any;
	email:any;
	name:any;
	phone:any;
	flagDrop:any;
	addScript: boolean = false;
	paypalLoad: boolean = true;
	action:any;
	hash:any;
	key:any;
	furl:any;
	orderID:any;
	fname:any;
	productinfo:any;
	emailq:any;
	surl:any;
	order_id_random:any;
	amountPayU:any;
	order_id:any;
	paymentButtonShow:boolean;
	regExEmail="^([a-zA-Z0-9_.]+@[a-zA-Z0-9]+[.][.a-zA-Z]+)$";
	user_phone:any;
	order_id_random_paypal:any;

  	constructor(
		private flagValueService:FlagValueService,
		private paymentGateService:PaymentGateService,
		private router : ActivatedRoute,
		private routers : Router,
	  ) { 
		this.flagDrop = this.flagValueService.flagMethod()	
	  }

	ngOnInit() {
		if($('#Umoneyagree').prop('checked')==false){
			$('#paypal-checkout-btn').css('pointer-events','none');
			$('#paypal_drop').addClass('paypal-no-drop')
		}
		$('#Umoneyagree').on('change',function(){
			if($('#Umoneyagree').prop('checked')==false){
				$('#paypal-checkout-btn').css('pointer-events','none');
				$('#paypal_drop').addClass('paypal-no-drop')
			}else{
				$('#paypal_drop').removeClass('paypal-no-drop')
				$('#paypal-checkout-btn').css('pointer-events','auto');
			}	
		})
		if($('#Umoneyagree').prop('checked')==false){
			$('#Umoney_fully_msg').css('pointer-events','none');
			$('#Umoney_paypal_drop').addClass('paypal-no-drop')
			$('#Umoney_paypal_drop').attr("disabled", true);
		}
		$('#Umoneyagree').on('change',function(){
			if($('#Umoneyagree').prop('checked')==false){
				$('#Umoney_fully_msg').css('pointer-events','none');
				$('#Umoney_paypal_drop').addClass('paypal-no-drop')
				$('#Umoney_paypal_drop').attr("disabled", true);
			}else{
				$('#Umoney_paypal_drop').removeClass('paypal-no-drop')
				$('#Umoney_fully_msg').css('pointer-events','auto');
				$('#Umoney_paypal_drop').attr("disabled", false);
			}	
		})

		function guidId() {
			function s5() {
			  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
			return s5() + s5();
		}
		this.order_id_random_paypal = guidId().toUpperCase()

	}

	paypalPayment(){
		let flag=0;
		let fild='';
		if(this.amount == '' || this.amount == undefined){
			$('.amount_req').addClass('borderColor');
			flag=1;
			{
				fild='lbl_amount_req';
			}
		}if(this.email=='' || this.email == undefined){
			$('.email_req').addClass('borderColor')
			flag=1;
			{
				fild='lbl_amount_req';
			}
		}else if(!this.email.match(this.regExEmail)){
			$('.email_req').addClass('borderColor')
			flag=1;
			{
				fild='lbl_amount_req';
			}
		}if(flag==1){
			$('html, body').animate({
				scrollTop: $("#"+fild).offset().top
			}, 800);
			return;
		}	
		this.paymentButtonShow=true;
		// localStorage.setItem('paymentUserName',JSON.stringify(this.name))
		setTimeout(() => {
			$('html, body').animate({
				scrollTop: $("#mackPaymentScrool").offset().top
			}, 800);
			return;
		}, 300);
			
	}

    paypalConfig = {
		env: 'sandbox',
		client: {
			sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
			production: '<your-production-key here>'
		},
		commit: true,
		payment: (data, actions) => {
			return actions.payment.create({
				payment: {
					transactions: [
						{ amount: { total: this.amount, currency: 'USD' },
							item_list: {
								items: [
									{
										name: "payment for evisa",
										quantity: "1",
										price:this.amount,
										tax: "0",
										currency: "USD",
										sku: this.order_id_random_paypal,
									}
								]
							}
						}
					]
				}
			});
		},
		onAuthorize: (data, actions) => {
			var cmt=this;
			return actions.payment.execute().then(function(data){
				if(data.transactions[0].related_resources[0].sale.state=="completed"){
                    $('#pay_fully_msg').html('Thank you for using visacent <i class="fas fa-check-circle"></i>');
					var txn_id=data.transactions[0].related_resources[0].sale.id;
					var amount=data.transactions[0].related_resources[0].sale.amount.total;
					var order_id = data.transactions[0].item_list.items[0].sku;
					var payment_status=data.transactions[0].related_resources[0].sale.state;
					var key=order_id+'##'+amount+'##'+txn_id+'##'+payment_status;
					$('#keys').val(btoa(key));
					cmt.paymentFill();
				}else{
					$('#pay_fully_msg').text("Internal error");
				}
			});	
		},
		style: {
			size:'medium',
		}
    };
   
    ngAfterViewChecked(): void {
		if (!this.addScript) {
			this.addPaypalScript().then(() => {
			paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
			this.paypalLoad = false;
			})
		}
    }
    
    addPaypalScript() {
		this.addScript = true;
		return new Promise((resolve, reject) => {
			let scripttagElement = document.createElement('script');    
			scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
			scripttagElement.onload = resolve;
			document.body.appendChild(scripttagElement);
		})
	}
	
	paymentFill(){
		let key;
		key=$('#keys').val();
		this.paymentGateService.makePaymentComplete(key).subscribe(
			data => {
				if(data.status ='SUCCESS'){
					this.routers.navigate(['payment-success/'+btoa(this.order_id_random_paypal)]);
				}else if(data.status ='ERROR') {
					this.routers.navigate(['make-payment-failed/'+btoa(this.order_id_random_paypal)]);
				}else{
					// do nothing
				}
		});
	}

	payUmoneyUser(){
		function guid() {
			function s4() {
			  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
			return s4() + s4();
		}
		this.order_id_random = guid().toUpperCase()
		var productinfo = 'Make Payment'
		var key=this.order_id_random+'##'+this.amount+'##'+this.name+'##'+this.email+'##'+this.phone+'##'+productinfo;	
		var uMoneykey = btoa(btoa(key))
		var make='make'
		this.paymentGateService.makePayUmoney(uMoneykey).subscribe(
			data => {
				if(data.status='SUCCESS'){
					this.action = data.action;
					this.hash = data.hash; 
					this.key = data.key;
					this.orderID = data.txnid;
					this.amountPayU = data.amount;
					this.fname = data.firstname;
					this.emailq = data.email;
					this.productinfo = data.productinfo;
					this.surl = 'https://visacent.com/payu-success';
					this.furl = 'http://visacent.com/make-payment-failed/'+btoa(this.orderID);
					setTimeout(() => {
						$("#customButtonMoney").submit();	
					},200);	
				}else if(data.status='ERROR'){
					// do nothing
				}else{
					// do nothing
				}
			})
	}

	amountClear(){
		$('.amount_req').removeClass('borderColor');
		if(this.amount==null || this.amount==undefined || this.amount==''){
			$('.amount_req').addClass('borderColor');
			this.paymentButtonShow=false;
		}
	}

	emailClear(){
		$('.email_req').removeClass('borderColor');
		if(this.email==''){
			$('.email_req').addClass('borderColor');
			this.paymentButtonShow=false;
		}if(!this.email.match(this.regExEmail)){
			$('.email_req').addClass('borderColor');
			this.paymentButtonShow=false;
		}
	}

	isNumberKey(el,evt){
		var charCode = (evt.which) ? evt.which : evt.keyCode
		if (charCode != 45 && charCode != 8 && (charCode != 46) && (charCode < 48 || charCode > 57))
			return false;
		if (charCode == 46) {
			if ((el.amount) && (el.amount.indexOf('.') >= 0))
				return false;
			else
				return true;
		}
		return true;
		
	}

	NumberKey(evt){
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;
		return true;
	}

}
