import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CousulateInService } from '../../services/cousulate-in/cousulate-in.service';
import { NgProgress } from 'ngx-progressbar';
import * as $ from 'jquery';
import { UserInputCntdetailsService } from '../../services/userInputCntdetails/user-input-cntdetails.service'
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-consulate-in',
  templateUrl: './consulate-in.component.html',
  styleUrls: ['./consulate-in.component.css'],
  providers: [ CousulateInService, UserInputCntdetailsService]
})
export class ConsulateInComponent implements OnInit {

	cousulateCountry:any;
	name:any;
	of_name:any;
	in_name:any;
	clickCountry:any;
	address:any;
	phone:any;
	fax:any;
	cousulate:any;
	email:any;
	website:any;
	loaderShow:boolean;
	multidateils:any;
	slugName:any;
	slug_name:any;
	inCountrySlugName:any;
	ofCountrySlugName:any;
	cousulateSlug:any;
	pageHide:boolean;
	multidateilsNew:any;
	phoneMulti:any;
	phoneM:any;
	faxMulti:any;
	emaiMulti:any;
	websiteMulti:any;
	faxMultiM:any;
	emaiM:any;
	websiteM:any;
	pade_error_show:boolean;
	grecaptcha:any;
	captchaError:boolean;
	captchaError_msg:any;
	fname:any;
	updating_msg:boolean;
	Address:any;
	Phone:any;
	Fax:any;
	Email:any;
	Website:any;
	comments:any;
	nweipAddress
	latitude:any;
	longitude:any;
	userFileData={}
	updating:boolean;
	success_msg_error:boolean;
	success_msg:any;
	msg_error:boolean;
	erro_msg:any;
	regExEmail="^([a-zA-Z0-9_.]+@[a-zA-Z0-9]+[.][.a-zA-Z]+)$";
	numberRegEx = "^(0|[0-9][0-9]*)$"
	Landmark:any;
	WorkingTime:any;
	country_name_name:any;
	country_name_f_replace:any;
	country_name_s_replace:any;
	map:any;

	constructor(
		private router : ActivatedRoute,
		private routers : Router,
		private cousulateInService : CousulateInService,
		public ngProgress: NgProgress,
		private userInputCntdetailsService:UserInputCntdetailsService,
		private meta: Meta,
		private title:Title
	) { }

	ngOnInit() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		this.ngProgress.start();
		$('#profile_trans').hide();
		$.getJSON('https://jsonip.com?callback=?', function(response) {
			this.ipAddress=response.ip
			$('#spn_ip').text(this.ipAddress);
		});	
		this.router.params.subscribe(val => {
		this.cousulate = this.router.snapshot.params["value"];
		this.country_name_name = this.cousulate.split('-in-');
		this.country_name_f_replace = this.country_name_name[0].replace('-',' ')
		this.country_name_s_replace = this.country_name_name[1].replace('-',' ')
		this.cousulateInService.cousulateList(this.cousulate).subscribe(
			data => {
				if(data.status == 'SUCCESS'){
					if(data!=null){
						this.ngProgress.done();
						this.pageHide = true;
						this.cousulateCountry = data;
						this.inCountrySlugName = this.cousulateCountry.in_country_slug_name;
						this.ofCountrySlugName = this.cousulateCountry.of_country_slug_name;				
						this.clickCountry = this.cousulateCountry;
						this.of_name = this.clickCountry.of_country;
						this.in_name = this.clickCountry.in_coutnry;
						this.multidateils = this.clickCountry.data;
						this.multidateilsNew = this.clickCountry.data
						let	consulateslength=data.data.length;
						this.map = data.data.map
						this.title.setTitle(''+this.of_name+' Consulates General in '+this.in_name+' and '+this.of_name+' all Consulates in '+this.in_name+'');
						this.meta.updateTag({ name:'title',content:''+this.of_name+' Consulates General in '+this.in_name+' and '+this.of_name+' all Consulates in '+this.in_name+''});
						this.meta.updateTag({ name:'description',content:'Search for '+this.of_name+' Consulates General and '+this.of_name+' Consulates & Other Representations in '+this.in_name+'. Get details like Addresses, telephone numbers, email addresses, websites. '+this.of_name+' have '+consulateslength+' Consulates General in '+this.in_name+' and in addition there are complete Consulates/high commissions and complete other representations.'});
						this.meta.updateTag({ name:'keywords',content:''+this.of_name+' Consulates General in '+this.in_name+', '+this.of_name+' all Consulates in '+this.in_name+', '+this.of_name+' Consulates in '+this.in_name+', '+this.of_name+' Consulates & Other Representations in '+this.in_name+'.'});
						
						for(var i=0;i<this.multidateilsNew.length;i++){

							if(this.multidateilsNew[i].maps=='' || this.multidateilsNew[i].maps==null)
							{
								this.multidateilsNew[i].maps=this.multidateilsNew[i].name;
							}

							if(this.multidateilsNew[i].Telepone!=null && $.trim(this.multidateilsNew[i].Telepone)!='' && $.trim(this.multidateilsNew[i].Telepone)!=' '){ 
								this.phoneMulti = this.multidateilsNew[i].Telepone;
								this.phoneM = this.phoneMulti.split('<br />');
								this.phoneM = this.phoneM.filter(function(v){return v!==''});
								this.multidateilsNew[i].phoneM1 = this.phoneM;
								this.multidateilsNew[i].lnthTelepone=1;
							}else{
								this.multidateilsNew[i].lnthTelepone=0;	
							}

							if(this.multidateilsNew[i].Fax!=null && $.trim(this.multidateilsNew[i].Fax)!='' && $.trim(this.multidateilsNew[i].Fax)!=' '){ 
								this.faxMulti = this.multidateilsNew[i].Fax;
								this.faxMultiM =this.faxMulti.split('<br />');
								this.faxMultiM = this.faxMultiM.filter(function(v){return v!==''});
								this.multidateilsNew[i].faxMultiM1 = this.faxMultiM;
								this.multidateilsNew[i].lnthFax=1;
							}else{
								this.multidateilsNew[i].lnthFax=0;	
							}
				
							if(this.multidateilsNew[i].E_maiil!=null && $.trim(this.multidateilsNew[i].E_maiil)!='' && $.trim(this.multidateilsNew[i].E_maiil)!=' '){ 
								this.emaiMulti = this.multidateilsNew[i].E_maiil;
								this.emaiM =this.emaiMulti.split('<br />');
								this.emaiM = this.emaiM.filter(function(v){return v!==''});
								this.multidateilsNew[i].emaiM1 = this.emaiM;
								this.multidateilsNew[i].lnthE_maiil=1;
							}else{
								this.multidateilsNew[i].lnthE_maiil=0;	
							}
					
							if(this.multidateilsNew[i].website!=null && $.trim(this.multidateilsNew[i].website)!='' && $.trim(this.multidateilsNew[i].website)!=' '){ 
								this.websiteMulti = this.multidateilsNew[i].website;
								this.websiteM =this.websiteMulti.split('<br />');
								this.websiteM = this.websiteM.filter(function(v){return v!==''});
								this.multidateilsNew[i].websiteM1 =this.websiteM;
								this.multidateilsNew[i].lnthWebsite=1;
							}else{
								this.multidateilsNew[i].lnthWebsite=0;	
							}
						}

						var cmt=this;
						setTimeout(() => {
							cmt.setemb_map()
						}, 2000);
						
					}
				}else if(data.status == 'ERROR'){
					this.ngProgress.done();
					this.inCountrySlugName = this.country_name_name[0];
					this.ofCountrySlugName = this.country_name_name[1];
					this.of_name = this.country_name_name[0];
					this.in_name = this.country_name_name[1];
					this.pade_error_show = true;
				}else{
					//do nothing
				}
			})
		})
	}

	resolved(captchaResponse: string) {
		this.grecaptcha = captchaResponse;
		this.captchaError = false;
	}
	update_btn(){
		let flg = 0;
		let fild='';
		if($('#namef').text()==''){
			$('#namef').addClass('borderCls')
			flg=1;
			if(fild=='')
			{
				fild='lbl_namef';
			}
		}if($('#address').text()==''){
			$('#address').addClass('borderCls')
			flg=1;
			if(fild=='')
			{
				fild='lbl_address';
			}
		}if($('#telephone').text()!=''){
			let p = $('#telephone').text()
			if(!(p.match(this.numberRegEx))){
				$('#telephone').addClass('borderCls')
				flg=1;
				if(fild=='')
				{
					fild='lbl_telephone';
				}
			}
		}if($('#email').text()!=''){
			let e = $('#email').text()
			if(!(e.match(this.regExEmail))){
				$('#email').addClass('borderCls')
				flg=1;
				if(fild=='')
				{
					fild='lbl_email';
				}
			}
		}
		if(this.grecaptcha === undefined){
			this.captchaError = true;
			this.captchaError_msg = "Please enter captcha"
			flg=1;
			if(fild=='')
			{
				fild='lbl_captcha';
			}
		}if(flg==1){
			$('html, body').animate({
				scrollTop: $("#"+fild).offset().top
			}, 800);
			return;
		}else{
			this.captchaError = false;
			this.updating = true;
			this.fname =$('#namef').text();
			this.Address =$('#address').text();
			this.Phone =$('#telephone').text();
			this.Fax =$('#fax').text();
			this.Email =$('#email').text();
			this.Website =$('#website').text();
			this.comments =$('#comments').text();
			this.latitude =$('#latitude').text();
			this.longitude =$('#longitude').text();
			this.Landmark =$('#Landmark').html();
			this.WorkingTime=$('#WorkingTime').text();
			this.nweipAddress=$('#spn_ip').text();
		}
		this.userFileData={
			name:this.fname,
			address:this.Address,
			phone:this.Phone,
			fax:this.Fax,
			email:this.Email,
			website:this.Website,
			latitude:this.latitude,
			longitude:this.longitude,
			landmark:this.Landmark,
			workingTime:this.WorkingTime,
			comments:this.comments,
			ipAddress:this.nweipAddress,
			of_cn:this.country_name_name[0],
			in_cn:this.country_name_name[1],
			slug:this.cousulate,
			emb_type:'consulates',
		}
		this.userInputCntdetailsService.userInputData(this.userFileData).subscribe(
			data => {
				if(data='SUCCESS'){
					this.updating = false;
					this.success_msg_error = true;
					this.success_msg = 'Thank you for sending your suggestions.' 
					$('html,body').animate({ scrollTop: $('.scroll_msg').offset().top},'fast'); 
				}else if(data='ERROR'){
					this.updating = false;
					this.msg_error = true;
					this.erro_msg = 'you have any detail send'
					$('html,body').animate({ scrollTop: $('.scroll_msg').offset().top},'fast'); 
				}else{
					// do nothing
				}
			})
	}

	ErrorRermoveAdd(){
		$('#address').removeClass('borderCls')
	}

	ErrorRermoveName(){
		$('#namef').removeClass('borderCls')
	}
	ErrorRermovePhn(){
		$('#telephone').removeClass('borderCls')
	}
	ErrorRermoveEml(){
		$('#email').removeClass('borderCls')
	}

	setemb_map(){
		for(var i=0;i<this.multidateilsNew.length;i++){
			var idd=this.multidateilsNew[i].id;
			var rl='<iframe width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.it/maps?key=AIzaSyDhk_FjlzJ5Gn6JqJ9np-Z0XY-WBwDoogU&q='+this.multidateilsNew[i].maps+'&output=embed"></iframe>';
			$('#emb_map__div_'+idd).html(rl);
		}
	}

}
