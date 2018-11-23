import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderPageComponent } from '../header-page/header-page.component';
import { MyprofileService } from '../../services/my_profile/myprofile.service';
import { NgProgress } from 'ngx-progressbar';
import '../../../assets/js/intlTelInput.min.js';
import { FlagValueService } from '../../services/flagValue/flag-value.service'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: [ HeaderPageComponent,FlagValueService ]
})
export class MyProfileComponent implements OnInit {

	my_account:boolean;
	my_profile:boolean;
	change_password:boolean;
	email:any;
	name:any;
	number:any
	// regExEmail="^([a-zA-Z0-9_.]+@[a-zA-Z0-9]+[.][.a-zA-Z]+)$";
	numberRegEx = "^(0|[1-9][0-9]*)$"
	oldPassword:any;
	newPassword:any;
	matchPassword:any;
	profileData:{};
	changePassData:{};
	orders_user:any;
	// visaProcType:boolean;
	applicants:any;
	cntryList:any;
	pageHide:boolean;
	orders_Id:any;
	payment_status:any;
	userId:any;
	user:any;
	order1:any;
	access_token:any;
	token:any;
	updated_suc:boolean;
	updated_suc_msg:string;
	updated_error_msg:string;
	updated_error:boolean;
	change_suc:boolean;
	change_suc_msg:string;
	change_error:boolean;
	change_error_msg:string;
	particularOrderId:any;
	is_complete:any;
	NormalVl:any;
	RushVl:any;
	SuperVl:any;
	flagDrop:any;
	Nnumber:any;
	codeCnt:any;
	processmy:boolean;
	radioValue=1;
	is_subscribe:any;
	user_dashboard:boolean;
	info_incomplete:any;
	processing:any;
	visa_complete:any;
	total_orders:any;
	admin_activity:any;
	successMsgDltUsr:any;
	UserOrders_user:any;
	AllApplication:boolean;
	UnderProcessApplication:boolean;
	whatsapp:any;
	skype:any;
	wechat:any;

	constructor(
		private router : ActivatedRoute,
		private routers : Router,
		private headerPageComponent:HeaderPageComponent,
		private myprofileService:MyprofileService,
		public ngProgress: NgProgress,
		private flagValueService:FlagValueService,
		private _deleteOrder:MyprofileService
	) { 
		var user = JSON.parse(localStorage.getItem('user'));
		if(!(user) || user==null || !(user.access_token) || user.access_token == '' || !(user.user_id) || user.user_id == ''){
			localStorage.removeItem('user');
			localStorage.removeItem('access_token');
			localStorage.removeItem('userData');
			this.routers.navigate(['login'])
		}
	}

	ngOnInit() {
		$('#profile_trans').hide();
		this.ngProgress.start();
		this.user = JSON.parse(localStorage.getItem('user'));
		this.cntryList = JSON.parse(localStorage.getItem('countrylist'));
		this.userId = this.user.user_id;
		this.token =  btoa(this.user.access_token+'###'+this.userId);	
		this.myprofileService.dasboardUser(this.token).subscribe(
			data =>{
				if(data.status=='SUCCESS'){
					this.ngProgress.done();
					this.pageHide = true;
					this.info_incomplete=data.info_incomplete;
					this.processing=data.processing;
					this.visa_complete=data.visa_complete;
					this.total_orders=data.total_orders;
					this.admin_activity=data.admin_activity;
				}
				var cmt=this;
				setTimeout(function(){
					cmt.userDas()
				},1000)
				this.applicant()
			})
			this.flagDrop = this.flagValueService.flagMethod()	
			var cmt=this;
			setTimeout(function(){
				cmt.dropDownToggle()
			},5000);			
			
	}

	applicant(){
		this.myprofileService.myOrder(this.token).subscribe(
			data =>{
				if(data!=null){
					this.ngProgress.done();	
					this.pageHide = true;
					if(data.status == 'SUCCESS'){
						this.orders_user = data.orders;
						var i=0
						this.UserOrders_user=new Array
						for(i=0;this.orders_user.length>i;i++){
							this.UserOrders_user.push(this.orders_user[i])		
						}
						this.orders_Id = data.orders[0].order_id;
						this.is_complete = this.orders_user[0].is_complete
						this.applicants = data.orders[0].applicants;
						this.email = this.user.email;
						this.name = data.user.name;
						this.number = data.user.phone;
						this.is_subscribe = data.user.is_subscribe;
						if(data.user.whatsapp!== undefined && data.user.whatsapp!== null && data.user.whatsapp!==''){
							this.whatsapp=data.user.whatsapp;
						}
						if(data.user.skype!== undefined && data.user.skype!== null && data.user.skype!==''){
							this.skype=data.user.skype;
						}
						if(data.user.wechat!== undefined && data.user.wechat!== null && data.user.wechat!==''){
							this.wechat=data.user.wechat;
						}
						this.codeCnt = this.number.split(" ")
						this.codeCnt = this.codeCnt[0]
						this.number = this.number.split(" ")
						this.number = this.number[1]
					}else if(data.status == 'ERROR'){
						this.headerPageComponent.logOut()
					}else{
						/*'do nothing'*/}
				}else{
					/*'do nothing'*/
				}	
			})
	}

userDas(){
	this.router.params.subscribe(val => {
		let currentId = this.router.snapshot.params["value"];
		if(currentId=='dashboard'){
			this.my_profile = false;
			this.my_account = false;
			this.change_password = false;
			this.user_dashboard=false;
			$('.applications').removeClass('profile_active')
			$('.dashboard').addClass('profile_active');
		}else if(currentId=='applications'){
			this.AllApplication=true;
			this.UnderProcessApplication=false;
			setTimeout(() => {
				this.ComProcessAppli()
			}, 1500);
			this.my_account = true;
			this.my_profile = false;
			this.user_dashboard=true;
			this.change_password = false;
			$('.dashboard').removeClass('profile_active');
			$('.applications').addClass('profile_active')
		}else if(currentId=='applications-under-process'){
			this.UnderProcessApplication=true;
			this.AllApplication=false;
			setTimeout(() => {
				this.underProcessAppli()
			}, 1500);
			this.my_account = true;
			this.my_profile = false;
			this.user_dashboard=true;
			this.change_password = false;
			$('.dashboard').removeClass('profile_active');
			$('.applications').addClass('profile_active')
		}else if(currentId=='update-profile'){
			this.my_account = false;
			this.my_profile = true;
			this.user_dashboard=true;
			this.change_password = false;
			$('.applications').removeClass('profile_active')
			$('.dashboard').removeClass('profile_active');
			$('.update-profile').addClass('profile_active')
		}else if(currentId=='change-password'){
			this.my_profile = false;
			this.my_account = false;
			this.user_dashboard=true;
			this.change_password = true;
			$('.update-profile').removeClass('profile_active')
			$('.dashboard').removeClass('profile_active');
			$('.change-password').addClass('profile_active')
		}
	})
}

	dropDownToggle(){
		$('#profile_option').click(function(){
			$(".profile_opt_ul div").slideToggle();
		});
		$(".profile_opt_ul li a").click(function(){  
			$(".profile_opt_ul li a").removeClass("profile_active");
			$(this).addClass("profile_active");
		});   
		var $accord = $('.open');
		$(".new").click(function () {

		var $ans = $(this).next(".open").slideToggle();
		});

		$(".new").click(function(){
			$(this).find("span").toggleClass("rotate");				
		});  
	}

	changeUrl(vla){
		this.routers.navigate(["my-profile"+'/'+vla]);
		$(document).ready(function(){
			$('input').on('click',function(){
				$(this).removeClass('borderColor')
			});
		});
	}

	// dashboard(vla){
	// 	this.routers.navigate(["my-profile"+'/'+vla]);
	// }

	// orders(vla){
	// 	this.routers.navigate(["my-profile"+'/'+vla]);
	// }

	// changeProfile(vla){
	// 	this.routers.navigate(["my-profile"+'/'+vla]);
	// 	$(document).ready(function(){
	// 		$('input').on('click',function(){
	// 			$(this).removeClass('borderColor')
	// 		});
	// 	});
	
	// }

	// changePassword(vla){
	// 	this.routers.navigate(["my-profile"+'/'+vla]);
	// 	$(document).ready(function(){
	// 		$('input').on('click',function(){
	// 			$(this).removeClass('borderColor')
	// 		});
	// 	});
	// }

	myProfileSub(){
		$('#flagDropVlu').change(function(){
			$(".flagEr").removeClass("borderColor");
		})
		let flagE=0;
		if(this.email == "" || this.email == undefined){
			$(".emailOne").addClass("borderColor");
			flagE=1;
		}if(this.name == "" || this.name == undefined){
			$(".nameOne").addClass("borderColor");
			flagE=1;
		}if(this.number == "" || this.number == undefined){
			$(".numberVal").addClass("borderColor");
			flagE=1;
		}if(this.number.length < 6){
			$(".numberVal").addClass("borderColor");
			flagE=1;
		}if($('#flagDropVlu').val() == "" || $('#flagDropVlu').val() == undefined){
			$(".flagEr").addClass("borderColor");
			flagE=1;
		}if(flagE==1){
			return;
		}
		this.processmy=true;
		var flgval=$('#flagDropVlu').val();
		this.Nnumber=flgval+' '+this.number;

		this.profileData={
			access_token:this.token,
			name:this.name,
			number:this.Nnumber,
			is_subscribe:this.radioValue,
			whatsapp:this.whatsapp,
			skype:this.skype,
			wechat:this.wechat
		}	
		var cmt = this;
		this.myprofileService.myProfileUpdate(this.profileData).subscribe(
			data => {
				if(data.status == 'SUCCESS'){
					this.processmy=false;
					this.updated_suc = true;
					this.updated_suc_msg = data.msg;
					this.name = data.user.name;
					var ar=data.user.phone.split(' ');
					setTimeout(function(){ cmt.updated_suc = false;}, 3000);
					var user = JSON.parse(localStorage.getItem('user'));
					var formData={
						access_token:user.access_token,
						email:user.email,
						name:data.user.name,
						number:this.Nnumber,
						status:user.status,
						user_id:user.user_id
					}
					localStorage.setItem('user', JSON.stringify(formData));
				}
				else if(data.status == 'ERROR'){
					this.processmy=false;
					this.updated_error = true;
					this.updated_error_msg = 'Not update your profile please try again later';
					setTimeout(function(){ cmt.updated_error = false;}, 3000);
				}
				else{/*'do nothing'*/}
			})
	}

	errorHideRed(){
		$(".nameOne").removeClass("borderColor");
	}

	errorHideRedNumber(){
		$(".numberVal").removeClass("borderColor");
	}

	changePassSub(){
		let flg=0;
		if(this.oldPassword == "" || this.oldPassword == undefined){
			$(".oldPass").addClass("borderColor");
			flg=1;
		}if(this.newPassword == "" || this.newPassword == undefined){
			$(".newPass").addClass("borderColor");
			flg=1;
		}if((this.matchPassword== "" || this.matchPassword == undefined) || !(this.matchPassword.match(this.newPassword))){
			$(".matchPass").addClass("borderColor");
			flg=1;
		}if(flg==1){
			return;
		}

		this.changePassData={
			access_token:this.token,
			old_password:this.oldPassword,
			new_password:this.newPassword
		}
		var cmt=this
		this.myprofileService.changePassUpdate(this.changePassData).subscribe(
			data => {
				if(data.status == 'SUCCESS'){
					this.change_suc = true;
					this.change_suc_msg = data.msg;
					setTimeout(function(){ cmt.change_suc = false;}, 3000);
					this.oldPassword =''
					this.newPassword =''
					this.matchPassword =''
				}
				else if(data.status == 'ERROR'){
					this.change_error = true;
					this.change_error_msg = data.msg;
					setTimeout(function(){ cmt.change_error = false;}, 3000);
				}
				else{/*'do nothing'*/}
			})
	}
	
	logOut(){
		this.processmy=true;
		this.headerPageComponent.logOut()
	}

	appliOrderDetails(i){
		this.order1=this.orders_user[i];
		this.particularOrderId = this.order1.order_id;
		this.my_account = true;
	}

	payNow(i){
		this.order1=this.orders_user[i];
		this.particularOrderId = this.order1.order_id;
		this.routers.navigate(["payment",btoa(this.particularOrderId)]);
	}

	amountPay(i,j){
		let navbar_pro
		this.order1=this.orders_user[i];
		this.particularOrderId = this.order1.order_id;
		localStorage.setItem('navbar_pro',JSON.stringify(navbar_pro=1));
		let particularOrderId = btoa(this.particularOrderId)+'/'+j; 
		this.routers.navigate(["order-summary/"+particularOrderId]);
	}

	isNumberKey(evt){
		var charCode = (evt.which) ? evt.which : evt.keyCode
		if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;
		return true;
	}

	radioVlue(vls){
		this.radioValue=vls
	}

	// printdock(i,j,t,data){
	// 	if(t=='pdf'){
	// 		var winparams = 'dependent=yes,locationbar=no,scrollbars=yes,menubar=yes,'+'resizable,screenX=50,screenY=50,width=850,height=1050';
	// 		var htmlPop = '<embed width=100% height=100%'+ ' type="application/pdf"'+ ' src="'+ (data)+ '"></embed>'; 
	// 		var newWin=window.open('','Print-Window');
	// 		newWin.document.open();
	// 		newWin.document.write('<html><body>'+htmlPop+'</body></html>');
	// 		newWin.document.close();
	// 		setTimeout(function(){newWin.print();},10);
	// 		console.log(111111)	
	// 	}
	// 	else{	
	// 		var divToPrint=document.getElementById('visa_'+i+'_'+j);	
	// 		var newWin=window.open('','Print-Window');
	// 		newWin.document.open();
	// 		var htmlPop ='<img src="'+data+'">';
	// 		console.log(htmlPop)	
	// 		newWin.document.write('<html><body onload="window.print()">'+htmlPop+'</body></html>');
	// 		newWin.document.close();
	// 		setTimeout(function(){newWin.close();},10);	
	// 		console.log(222222)	
	// 	}
	// }

	// downloadPDF(pri) {
	// 	console.log(pri)
	// 	var pdf = pri
	// 	var dlnk = document.getElementById('dwnldLnk');
	// 	dlnk.href = pdf;
	// 	dlnk.click();
	// }

	delete(i,orderId){
		var cmt = this
		$('#removeAppli').trigger('click');
		$("#delete_cnt_apli").off( "click" );
		$('#delete_cnt_apli').click(function(){
			var access_token = JSON.parse(localStorage.getItem('user'));
			var access_token_get = access_token.access_token;
			var token = btoa(access_token_get +'###'+ cmt.userId +'###'+ orderId+'###');
			cmt.orders_user.splice(i,1)
			// cmt.orders_user = cmt.orders_user;
			cmt.UserOrders_user = cmt.orders_user;
			cmt._deleteOrder.userDeleteOrd(token).subscribe(
				data =>{
					if(data.status=='SUCCESS'){
						cmt.successMsgDltUsr='Order successfully delete'
						$('#modal_btn_delete_user').trigger('click');
						setTimeout(() => {
							$('#modal_btn_dlt').trigger('click');
						}, 2000);
					}else if(data.status == 'ERROR'){
						cmt.successMsgDltUsr='Order not delete'
						$('#modal_btn_delete_user').trigger('click');
						setTimeout(() => {
							$('#modal_btn_dlt').trigger('click');
						}, 2000);
					}else{/*'do nothing'*/}
			});
		})    
	}

	currentPasRed(){
		$(".oldPass").removeClass("borderColor");
	}
	newPasRed(){
		$(".newPass").removeClass("borderColor");
	}
	confirmPasRed(){
		$(".matchPass").removeClass("borderColor");
	}

	ComProcessAppli(){
		var i=0;
		this.UserOrders_user=new Array
		for(i=0;this.orders_user.length>i;i++){
			this.UserOrders_user.push(this.orders_user[i])			
		}
	}

	underProcessAppli(){
		var i=0;
		this.UserOrders_user=new Array
		for(i=0;this.orders_user.length>i;i++){
			if(this.orders_user[i].is_complete==0){
				this.UserOrders_user.push(this.orders_user[i])
			}			
		}
	}
	
}
