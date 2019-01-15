import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CountriesListService } from '../../services/countries_list_home/countries-list.service';
import { ContactUsService } from '../../services/contact_us/contact-us.service';
import { FlagValueService } from '../../services/flagValue/flag-value.service';
import { Meta, Title} from '@angular/platform-browser';
import { CaptchaService } from '../../services/captcha/captcha.service'

export interface contactUs{
    name: any;
	email:any;
	mag:any;
	phone: any;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [ CountriesListService, ContactUsService, FlagValueService, CaptchaService ]
})
export class ContactUsComponent implements OnInit {

	contactU:contactUs
	name:string;
	email:any;
	phnNumber:any;
	msg:any;
	regExEmail="^([a-zA-Z0-9_.]+@[a-zA-Z0-9]+[.][.a-zA-Z]+)$";
	nationality_list:any;
	grecaptcha:any;
	captchaError:boolean;
	captchaError_msg:string;
	contactFormData:{};
	req:any;
	nationalityNew:any;
	type:any;
	chek_msg:boolean;
	chek_msg_error:boolean;
	flagDrop:any;
	codeCnt:any;
	contactNm:any;
	processmy:boolean;
	ipAddress:any;
	code:any;
	image_src:any;
	captchaValue:any;

  	constructor(
		  private countriesListService:CountriesListService,
		  private contactUsService:ContactUsService,
		  private flagValueService:FlagValueService,
		  private meta: Meta,
		  private title:Title,
		  private captchaService:CaptchaService
	  ) {
		  var cmt = this;
		$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(response) {
			cmt.ipAddress=response;
			cmt.ipAddress=response.geobytescountry;
			if(cmt.ipAddress=='China'){
				cmt.captchaInChina()
			}
		});	
	  }

	ngOnInit() {
		this.title.setTitle('Contact Us | For Visa Related Services Contact Us');
		this.meta.updateTag({ name:'title',content:'Contact Us | For Visa Related Services Contact Us'});	
		this.meta.updateTag({ name:'description',content:'Contact us for any visa related services, Our customer team assist you for any visa reated queries. Travel and explore many countries through applying visa online form myvisa.'});
		this.meta.updateTag({ name:'keywords',content: 'contact us, visa related services, visa application services, online visa, '});
		document.body.scrollTop = document.documentElement.scrollTop = 0;	
		this.flagDrop = this.flagValueService.flagMethod()	
		$('#profile_trans').hide();
		$(document).ready(function(){
			$(".contact_side>ul>li").click(function(){
				var content = $(this).text();
				$(".contact_side>ul>li").removeClass("active_content");
				$(this).addClass("active_content");
				$("#contact_head_dy").text(content);
			});
		});

		var cntcode = JSON.parse(localStorage.getItem('user'));
		if(cntcode!==null){
			this.codeCnt = cntcode.number.split(" ")
			this.codeCnt = this.codeCnt[0]
		}
		var cntList = JSON.parse(localStorage.getItem('countrylist'));
		if(cntList!="" && cntList!=undefined){
			this.nationality_list = cntList;
		}else{
			this.countriesListService.countriesList().subscribe(
				data => {
					this.nationality_list = data;
				})
		}
		this.contactU ={
			name:'',
			email:'',
			mag:'',
			phone:'',	
		}
		this.type = $('#RequestValue').html();
	}

	captchaInChina(){
		this.captchaService.captcha().subscribe(
			data =>{
				this.code = data.code;
				this.code = atob(atob(atob(this.code)))
				this.image_src = data.image_src;
			}
		)
	}

	refreshCaptcha(){
		this.captchaInChina()
	}

	borderCorHide(){
		$(".newcaptcha").css('border-color','#5d5b5b');
	}

	isNumberKey(evt){
		var charCode = (evt.which) ? evt.which : evt.keyCode
		if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;
		return true;
	}

	resolved(captchaResponse: string) {
		this.grecaptcha = captchaResponse;
		this.captchaError = false;
	}
	
	nationality(nationalitycity){
		this.nationalityNew = nationalitycity.value;
		$(".countryOne").removeClass("borderColor");
   	}	

	type1(){
		this.type = $('#RequestValue').html();
	}
	type2(){
		this.type = $('#ReportValue').html();
	}
	type3(){
		this.type = $('#FindValue').html();
	}
	
	contactData(){
		let flag=0;
		let fild='';
		if(this.contactU.name == "" || this.contactU.name == undefined){
			$(".nameOne").addClass("borderColor");
			flag=1;
			{
				fild='lbl_name';
			}
		}if(this.contactU.email == "" || this.contactU.email == undefined){
			$(".emailOne").addClass("borderColor");
			flag=1;
			if(fild=='')
			{
				fild='lbl_email';
			}
		}if(!this.contactU.email.match(this.regExEmail)){
			$(".emailOne").addClass("borderColor");
			flag=1;
			if(fild=='')
			{
				fild='lbl_email'
			}		
		}if(this.nationalityNew=='' || this.nationalityNew==undefined || this.nationalityNew==null){
			$(".countryOne").addClass("borderColor");
			flag=1;
			if(fild=='')
			{
				fild='lbl_nationality'
			}	
		}if(this.contactU.mag == "" || this.contactU.mag == undefined){
			$(".magOne").css('border-color','red');
			flag=1;
			if(fild=='')
			{
				fild='lbl_mag';
			}
		}if(this.ipAddress!='China'){
			if(this.grecaptcha === undefined){
				this.captchaError = true;
				this.captchaError_msg = "Please enter captcha"
				flag=1;
			}
		}
		if(this.ipAddress=='China'){
			if(this.captchaValue==undefined){
				$(".newcaptcha").css('border-color','red');
			}else if(!(this.captchaValue.match(this.code))){
				$(".newcaptcha").css('border-color','red');
				flag=1;
			}
		}if(flag==1){
			$('html, body').animate({
				scrollTop: $("#"+fild).offset().top
			}, 800);
			return;
		}
		this.processmy=true;
		var flgval=$('#flagVle').val()
		this.contactNm = flgval+' '+this.contactU.phone
		let obj={
			name:this.contactU.name,
			email:this.contactU.email,
			phone:this.contactNm,
			mag:this.contactU.mag
		}
		
		this.nationalityNew = $('#id_City').val();
		this.contactFormData={
			nationality:this.nationalityNew,
			contactU:obj,
			type:this.type
		}

		this.contactUsService.contact(this.contactFormData).subscribe(
			data => {
				if(data.status == 'SUCCESS'){
					this.chek_msg = true
					this.processmy=false;
					$(document).ready(function(){
						$('#myalert').show()
					})
					$("html, body").animate({ scrollTop: 0}, 'slow');
					this.contactU.name='';
					this.contactU.email='';
					this.contactU.phone='';
					this.contactU.mag='';
					$('#id_City').val("0");
					this.nationalityNew=''
				}else if(data.status == 'ERROR'){
					this.chek_msg_error = true;
					this.processmy=false;
					$(document).ready(function(){
						$('#mydiv_error').show()
					})
					$("html, body").animate({ scrollTop: 0}, 'slow');
				}
			})
	}

	cleanName(){
		$(".nameOne").removeClass("borderColor");
	}
	cleanGmail(){
		$(".emailOne").removeClass("borderColor");
	}
	cleanMsg(){
		$(".magOne").css('border-color','#b5b5b5');
	}
	
}
