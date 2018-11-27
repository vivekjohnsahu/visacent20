import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentGateService } from '../../services/payment_gate/payment-gate.service'
declare let paypal: any;
import * as $ from 'jquery';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [ PaymentGateService]
})
export class PaymentComponent implements OnInit ,AfterViewChecked {

  payment:any;
  realpayment:any;
  realpaymentdv:any;
  txn_id:any;
  order_id:any;
  to_country_name_heading:any;
  order_id_decod:any;
  arrival_date:any;
  email:any;
  processing_type:any;
  total_visa:any;
  order_id_decod_final:any;
  order_price:any;
  order_price_decod_final:any;
  pageHide:boolean;
  paypal_btn_hide:boolean;
  order_id_next:any;
  processmy:boolean;
  payment_status:any;
  pagePaymentDone:boolean;
  user_name:any;
  user_phone:any;
  user:any;
  action:any;
  hash:any;
  key:any;
  furl:any;
  orderID:any;
  amount:any;
  fname:any;
  productinfo:any;
  emailq:any;
  surl:any;
  refferalCurrentUrl:any;

	constructor(
		private router : ActivatedRoute,
		private paymentGateService:PaymentGateService,
		public ngProgress: NgProgress,
		private routers : Router,
	) 
	{
		var to_country_name = JSON.parse(localStorage.getItem('to_country_name'));
		this.user = JSON.parse(localStorage.getItem('user'));
		if(this.user==null){
			this.routers.navigate(['home'])
		}
		this.user_name = this.user.name;
		this.user_phone = this.user.number
		this.to_country_name_heading = to_country_name;
   	}

	ngOnInit() {
		$('.modal-backdrop').hide()
		$('.modal-open').hide()
        $(document).ready(function(){
            $('input[type="radio"]').click(function(){
                var pay_val = $(this).val();
                if(pay_val == "paypal")
                {
                    $(".payment_method_ul li>div").hide();
                    $("#paypal>div").show();
                }
                else if(pay_val == "payumoney")
                {
                    $(".payment_method_ul li>div").hide();
                    $("#payumoney>div").show();
                }
            });
        });
    
		$('#profile_trans').hide();
		this.ngProgress.start();
		this.router.params.subscribe(val => {
		let orderId = this.router.snapshot.params["id"];
		this.order_id_next = orderId;
		this.paymentGateService.paymentEv(orderId).subscribe(
			data => {
				this.payment_status = data.order.payment_status
				if(this.payment_status=='done'){
					if(data!=null){
					this.ngProgress.done();
					this.pageHide = false;
					this.pagePaymentDone=true
						$('#modal_btn_paypal').trigger('click');
						setTimeout(() => {
							$('#modal_btn_paypal').trigger('click');
							this.routers.navigate(['order-summary',this.order_id_next]);
						}, 2000);
					}
				}else if(data.payment_status ='pending'){
					if(data!=null){
						this.ngProgress.done();
						this.pageHide = true;
						this.pagePaymentDone=false
						this.payment=atob(data.visa);
						this.realpayment = this.payment.split("(0)");
						this.realpaymentdv = parseFloat(this.realpayment[1])/100
						this.order_id = this.realpayment[2];
						this.order_id_decod = atob(data.visa);
						this.order_price = atob(data.visa);
						this.order_id_decod = this.order_id_decod.split("(0)");
						this.order_id_decod_final = this.order_id_decod[2];
						this.order_price = this.order_price.split("(0)");
						this.order_price_decod_final = parseFloat(this.order_price[1])/100
						this.arrival_date = data.order.arrival_date
						this.email = data.order.email
						this.processing_type = data.order.processing_type
						this.total_visa = data.order.total_visa
						// this.order_id_next = data.visa
					}else{
					
					}		
				}
			});
		});
	
		if($('#agree').prop('checked')==false){
			$('#paypal-checkout-btn').css('pointer-events','none');
			$('#paypal_drop').addClass('paypal-no-drop')
		}
		$('#agree').on('change',function(){
			if($('#agree').prop('checked')==false){
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

		var currentUrl = JSON.parse(localStorage.getItem('refferalCurrentUrl'));
		if(currentUrl!=undefined || currentUrl!=null || currentUrl!=''){
			this.refferalCurrentUrl = currentUrl;
		}else{
			this.refferalCurrentUrl = '';
		}
	}

    addScript: boolean = false;
    paypalLoad: boolean = true;

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
						{ amount: { total: this.realpaymentdv, currency: 'USD' },
							item_list: {
								items: [
									{
										name: "payment for evisa",
										quantity: "1",
										price:this.realpaymentdv,
										tax: "0",
										currency: "USD",
										sku: this.order_id,
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
					/*$('#pay_fully_msg').text("Thank you for using visacent");*/
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
			size:   'medium', // tiny, small, medium
			// color:  'orange', // orange, blue, silver
			// shape:  'pill'    // pill, rect
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
		this.paymentGateService.paymentComplete(key).subscribe(
			data => {
				if(data.status ='SUCCESS'){
					localStorage.removeItem('refferalCurrentUrl');
					this.routers.navigate(['payment-success',this.order_id_next]);
					// window.location.href='order-summary/'+this.order_id_next;
				}else if(data.status ='ERROR') {
					// do nothing;
				}else{
					// do nothing;
				}
		});
	}
	
	payUmoneyUser(){
		var productinfo = 'Online Evisa'
		var key=this.order_id_decod_final+'##'+this.order_price_decod_final+'##'+this.user_name+'##'+this.email+'##'+this.user_phone+'##'+productinfo;	
		var uMoneykey = btoa(btoa(key))
		this.paymentGateService.paymentPayUmoney(uMoneykey).subscribe(
			data => {
				if(data.status='SUCCESS'){
					this.action = data.action;
					this.hash = data.hash;
					this.key = data.key;
					this.orderID = data.txnid;
					this.amount = data.amount;
					this.fname = data.firstname;
					this.emailq = data.email;
					this.productinfo = data.productinfo;
					this.surl = 'https://visacent.com/payusuccess';
					this.furl = 'http://visacent.com/payment-failed/'+btoa(this.orderID);
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

}

