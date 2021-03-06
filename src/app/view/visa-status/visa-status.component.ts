import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { VisaStatusService } from '../../services/visa-stutas/visa-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-visa-status',
  templateUrl: './visa-status.component.html',
  styleUrls: ['./visa-status.component.css'],
  providers: [VisaStatusService]
})
export class VisaStatusComponent implements OnInit {

	applicationId:any;
	passportNo:any;
	key:{};
	StutasError:boolean;
	StutasErrorMsg:any;
	formPage:boolean;
	applicationData:any;
	order_detail_data:any;
	process:boolean;
	cntryList:any;
	is_login_user
	appli_visa:any;
	imageData: any;
	imageDownload:boolean;

	constructor(
		private visaStatusService:VisaStatusService,
		private routers : Router,
		private router : ActivatedRoute,
		private meta: Meta,
		private title:Title

	) { 
		this.title.setTitle('Check Visa Status | Your Visa Application Status | Visa Application enquiry');
		this.meta.updateTag({ name:'title',content:'Check Visa Status | Your Visa Application Status | Visa Application enquiry.'});
		this.meta.updateTag({ name:'description',content:'Check your visa application status. You can track your visa status and process simply login with your application id. e-visa status can be used to know about visa status.'});
		this.meta.updateTag({ name:'keywords',content:'Check Visa Status, Your Visa Application Status, Visa Application enquiry'});
	}

	ngOnInit() {
		$('#profile_trans').hide();
		this.cntryList = JSON.parse(localStorage.getItem('countrylist'));
	}

	statusUser(){
		let flag=0;
		let fild='';
		if(this.applicationId=='' || this.applicationId==null || this.applicationId==undefined){
			$('.appliCls').addClass('borderColor');
			flag=1;
			if(fild=='')
			{
				fild='lbl_appliId';
			}
		}if(this.passportNo=='' || this.passportNo==null || this.passportNo==undefined ){
			$('.passCls').addClass('borderColor');
			flag=1;
			if(fild=='')
			{
				fild='lbl_passNo';
			}
		}if(flag==1){
			$('html, body').animate({
				scrollTop: $("#"+fild).offset().top
			}, 800);
			return;
		}
		this.process = true;
		var key = this.applicationId+'###'+this.passportNo;
		var user = JSON.parse(localStorage.getItem('user'));
		this.is_login_user
		if(user!==null){
			this.is_login_user = 1
		}else{
			this.is_login_user = 0
		} 
		this.key={
			key:btoa(key),
			is_login:this.is_login_user
		}
		this.visaStatusService.visaStatus(this.key).subscribe(
			data =>{
				if(data.status=='SUCCESS'){
					if(this.is_login_user == 0){
						localStorage.setItem('user',JSON.stringify(data.user_data));
					}
					document.body.scrollTop = document.documentElement.scrollTop = 0;
					this.formPage = true;
					this.process = false;
					this.applicationData = data.applicant_data;
					this.appli_visa = data.appli_visa;
					this.applicationData =new Array(this.applicationData)
					this.applicationData = this.applicationData[0]
					this.order_detail_data = data.order_detail;
					this.order_detail_data = new Array(this.order_detail_data)
					var d = new Date(this.order_detail_data[0].arrival_date);
				}else if(data.status=='PAYMENT'){
					this.routers.navigate(["payment",btoa(this.applicationId)]);
				}else if(data.status=='UNCOMPLETE'){
					this.routers.navigate(["order-summary",btoa(this.applicationId)]);
				}else if(data.status=='ERROR'){
					this.process = false;
					this.StutasError = true;
					this.StutasErrorMsg = data.msg;
					setTimeout(() => {
						$('html, body').animate({scrollTop: $("#myalert").offset().top}, 800);						
					}, 500);
                    $(document).ready(function(){
						setTimeout(function(){
                            $('#myalert').fadeOut('fast');}, 3000);
                            $('#myalert').fadeIn();
					    })
				}
			})		
	}

	removclsAppli(){
		$('.appliCls').removeClass('borderColor');
		this.StutasError = false;
	}
	removclsPass(){
		$('.passCls').removeClass('borderColor');
		this.StutasError = false;
	}

	imageView(){	
		this.imageDownload = true;
		setTimeout(() => {
			$(".modal_body").html("<img src='"+this.appli_visa.visas+"' class='img-responsive' style='width:auto;margin:20px auto;'>");
			$('#popupImage').trigger('click');
		}, 500);
	}

	pdfView(){
		this.imageDownload = false;
		setTimeout(() => {
			$(".modal_body").html('<object style="width:100%;height:90%;" data="'+this.appli_visa.visas+'" type="application/pdf"><embed src="'+this.appli_visa.visas+'" type="application/pdf"/></object>');
			$('#popupImage').trigger('click');	
		}, 500);
	}
	
}
