import { Component, OnInit } from '@angular/core';
import { ConsulateGerneralService  } from '../../services/consulate-gerneral/consulate-gerneral.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { NgProgress } from 'ngx-progressbar';
import { UpdateAddressService } from '../../services/update_address/update-address.service';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-consulate-general',
  templateUrl: './consulate-general.component.html',
  styleUrls: ['./consulate-general.component.css'],
  providers: [ ConsulateGerneralService, UpdateAddressService ]
  
})
export class ConsulateGeneralComponent implements OnInit {

	countydetails:any;
	in_flag:any;
	of_flag:any;
	name:any;
	of_cntname:any;
	in_cntname:any;
	in_country_slug_name:any;
	of_country_slug_name:any;
	clickCountry:any;
	countryName:any;
	address:any;
	phone:any;
	fax:any;
	email:any;
	website:any;
	multiCountry=[];
	in_coutnry_flag: any;
	of_coutnry_flag: any;
	loaderShow:boolean;
	slug_name:any;
	malti_lenght:any;
	head_of_mission:any;
	office_hour:any;
	update_user_details:{};
	newAddress:any;
	newPhone:any;
	newFax:any;
	newEmail:any;
	newWebsite:any;
	newOffice:any;
	newHead:any;
	grecaptcha:any;
	captchaError_msg:string;
	captchaError:boolean;
	in_cntname_of:any;
	emai:any;
	phoneMulti:any;
	faxMulti:any;
	emaiMulti :any;
	emailMulti :any;
	websiteMulti:any;
	phoneM:any;
	faxMultiM:any;
	emaiM:any;
	websiteM:any;
	pageHide:boolean;
	comments:any;
	embassy_id:any;
	ipAddress:any;
	addressTag:any;
	address1:any;
	phone1:any;
	fax1:any;
	slid_id='slid_id';
	pade_error_show:boolean;
	lengthemaiM:any;
	success_msg:string
	success_msg_error:boolean;
	updating_msg:boolean;
	in_cntname_lower:any;
	of_cntname_lower:any;
	Latitude:any;
	Longitude:any;
	latitude:any;
	longitude:any;
	Landmark:any;
	WorkingTime:any;
	consulateAd:any;
	EmbassyAd:any;
	of_country:any;
	homescroolId="Most-Sought-Visas"

	constructor( 
		private consulateGerneralService:ConsulateGerneralService,
		private router : ActivatedRoute,
		private routers : Router,
		public ngProgress: NgProgress,
		private updateAddressService:UpdateAddressService,
		private meta: Meta,
		private title:Title
	) { }

	ngOnInit() {
		$('#profile_trans').hide();
		$.getJSON('https://jsonip.com?callback=?', function(response) {
			this.ipAddress=response.ip
			$('#spn_ip').text(this.ipAddress);
		});
		$(document).ready(function() {
			$("#rep_pop").click(function() {
				$("#report_popup").show();
                $("body").css({"overflow":"hidden"});
			});
			$("#trigger1,#report_cancel").click(function() {
				$("#report_popup").hide();
                $("body").css({"overflow-y":"scroll"});
			});
		
			$(document).keydown(function(e) {
				if (e.keyCode === 27) {
					$("#report_popup").hide();
                    $("body").css({"overflow-y":"scroll"});
				}
			});
            $("#rep_pop,.report_container").click(function(e){
                e.stopPropagation();
            });
            $(document).click(function(){
                $("#report_popup").hide();
                $("body").css({"overflow-y":"scroll"});
			});  
			
			
			
		});
		this.ngProgress.start();
		this.countryAllData()
		
	}

	countryAllData(){
		this.router.params.subscribe(val => {
			let country_ctn = this.router.snapshot.params["value"]
			this.consulateGerneralService.countryConsulatenew(country_ctn).subscribe(
				data => {
					if(data.status == 'SUCCESS'){
						if(data!=null){
							this.ngProgress.done();
							$("#emb_sec1").show();
							$(".ReloadPageShow").hide();
							this.countydetails = data;
							this.embassy_id = this.countydetails.embassy_detail.id;
							this.clickCountry = data.embassy_detail;
							this.name = this.clickCountry.name;
							this.in_cntname = data.in_coutnry;
							this.in_cntname_lower = data.in_coutnry.toLowerCase();
							this.of_cntname_lower = data.of_country.toLowerCase();
							this.of_cntname = data.of_country;
							this.in_country_slug_name = this.countydetails.in_country_slug_name
							this.of_country_slug_name = this.countydetails.of_country_slug_name
							this.of_country=this.countydetails.of_country
							let lenght=this.multiCountry.length+1;
							this.title.setTitle(''+this.name+', '+this.in_cntname+' '+'|'+' '+ this.of_country+' '+'Consulates in '+' '+ this.in_cntname+'.');
							this.meta.updateTag({ name:'title',content:''+this.name+', '+this.in_cntname+' '+'|'+' '+ this.of_country+' '+'Consulates in '+' '+ this.in_cntname+'.'});
							this.meta.updateTag({ name:'description',content:this.name+' '+this.in_cntname+', Get addresses, telephone numbers, email addresses, websites. '+this.of_country+' have '+ lenght+' Consulates General in other cities of '+this.in_cntname+'.'});
							this.meta.updateTag({ name:'keywords',content:this.name+' '+this.in_cntname+'. '+this.of_country+' Consulates in '+this.in_cntname+', '+this.of_country+' Consulates General, '+this.of_country+' Consulates General address in '+this.in_cntname+'. '+this.of_country+' Consulates General address in '+this.in_cntname+'.'});

							if(this.countydetails.in_coutnry_flag!=''){
								this.in_coutnry_flag = this.countydetails.in_coutnry_flag; 
							}else{
								this.in_coutnry_flag = "assets/images/default1.png"	;	
							}
							if(this.countydetails!='' ){
								this.of_coutnry_flag = this.countydetails.of_coutnry_flag;  
							}else{
								this.of_coutnry_flag = "assets/images/default1.png";
							}	

							this.address1=this.clickCountry.Address
							this.addressTag = this.clickCountry.Address
							this.address = this.clickCountry.Address.replace(/(<([^>]+)>)/ig,"");
							this.phone1 = this.clickCountry.Telepone;
							this.phone = this.clickCountry.Telepone
							this.fax1 = this.clickCountry.Fax
							this.fax = this.clickCountry.Fax
							this.emai = this.clickCountry.E_maiil;
							this.website = this.clickCountry.website;
							this.Latitude = this.clickCountry.Latitude;
							this.Longitude = this.clickCountry.Longitude;
							this.office_hour = this.clickCountry.office_hour;
							if(this.phone!=''){
								this.phone = this.clickCountry.Telepone.split('<br />');
								this.phone = this.phone.filter(function(v){return v!==''});
							}
							else{
								this.phone=0;
							}
							if(this.fax!=''){
								this.fax = this.clickCountry.Fax.split('<br />');
								this.fax = this.fax.filter(function(v){return v!==''});
							}
							else{
								this.fax=0;
							}
							if(this.emai!=''){
								this.email = this.emai.split('<br />');
								this.email = this.email.filter(function(v){return v!==''});
							}
							else{
								this.emai=0;
							}
							if(this.website!=''){
								this.website = this.website.split('<br />');
								this.website = this.website.filter(function(v){return v!==''});
							}
							else{
								this.website=0;
							}	
							this.head_of_mission = this.clickCountry.head_of_mission;
							this.office_hour = this.clickCountry.office_hour;
							if(this.Latitude!=''){
								this.Latitude = this.clickCountry.Latitude;
							}else{
								this.Latitude = "NA";
							}
							if(this.Longitude!=''){
								this.Longitude = this.clickCountry.Longitude;
							}else{
								this.Longitude = 'NA';
							}	
										
							this.multiCountry = data.data;
							this.consulateAd=new Array()
							this.EmbassyAd=new Array()
							for(i=0;this.multiCountry.length>i;i++){
								if(data.data[i].name.indexOf("Consulate")>-1){
									this.consulateAd.push(this.multiCountry[i]);
								}else{
									this.EmbassyAd.push(this.multiCountry[i]);
								}	
							}

							for(var i=0;i<this.multiCountry.length;i++){
								if(this.multiCountry[i].Telepone!=null && $.trim(this.multiCountry[i].Telepone)!='' && $.trim(this.multiCountry[i].Telepone)!=' '){
									this.phoneMulti = this.multiCountry[i].Telepone;
									this.phoneM =this.phoneMulti.split('<br />');
									this.phoneM = this.phoneM.filter(function(v){return v!==''});
									this.multiCountry[i].phoneM1 = this.phoneM;
									this.multiCountry[i].lnthTelepone=1;
								}else{
									this.multiCountry[i].lnthTelepone=0;	
								}
			
								if(this.multiCountry[i].Fax!=null && $.trim(this.multiCountry[i].Fax)!='' && $.trim(this.multiCountry[i].Fax)!=' '){
									this.faxMulti = this.multiCountry[i].Fax;
									this.faxMultiM =this.faxMulti.split('<br />');
									this.faxMultiM = this.faxMultiM.filter(function(v){return v!==''});
									this.multiCountry[i].faxMultiM1 = this.faxMultiM;
									this.multiCountry[i].lnthFax=1;
								}else{
									this.multiCountry[i].lnthFax=0;
								}	
				
								if(this.multiCountry[i].E_maiil!=null && $.trim(this.multiCountry[i].E_maiil)!='' && $.trim(this.multiCountry[i].E_maiil)!=' '){
									this.emaiMulti = this.multiCountry[i].E_maiil;
									this.emaiM =this.emaiMulti.split('<br />');
									this.emaiM = this.emaiM.filter(function(v){return v!==''});
									this.multiCountry[i].emaiM1 = this.emaiM;
									this.multiCountry[i].lnth=1;
								}else{
									this.multiCountry[i].lnth=0;
								}

								if(this.multiCountry[i].website!=null && $.trim(this.multiCountry[i].website)!='' && $.trim(this.multiCountry[i].website)!=' '){
									this.websiteMulti = this.multiCountry[i].website;
									this.websiteM =this.websiteMulti.split('<br />');
									this.websiteM = this.websiteM.filter(function(v){return v!==''});
									this.multiCountry[i].websiteM1 =this.websiteM;
									this.multiCountry[i].lnthwebsite=1;
								}else{
									this.multiCountry[i].lnthwebsite=0;
								}
							}	

							var ctrlPressed = false;
							$(window).keydown(function(evt) {
								if (evt.which == 17) { 
									ctrlPressed = true;
								}
							}).keyup(function(evt) {
								if (evt.which == 17) {
									ctrlPressed = false;
								}
							});

							setTimeout(function(){
								$('.ToprollCtrl').click(function(e){	
									if(!ctrlPressed)
										$("html, body").animate({ scrollTop: 10 }, 1000);
								});
							},2000);
							
						}			
					}else if(data.status == 'ERROR'){
						this.ngProgress.done();
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

	// topData(slug_name){
	// 	this.routers.navigate(["consulate-general",slug_name]);
	// 	$('html,body').animate({ scrollTop: 0 }, 'slow');
	// }
	
	update_btn(){
		if($('#textarea').text()==''){
			$('#textarea').addClass('borderCls')
			return		
		}else if(this.grecaptcha === undefined){
			this.captchaError = true;
			this.captchaError_msg = "Please enter captcha"
			return false;
		}else{
			this.captchaError = false;
			this.updating_msg = true;
			this.newAddress =$('#textarea').html();
			this.newPhone =$('#textareaPhone1').html();
			this.newFax =$('#textareaFax1').html();
			this.newEmail =$('#textareaEmail').html();
			this.newWebsite =$('#textareaWebsite').html();
			this.newOffice =$('#textareaoFfice_hour').html();
			this.comments =$('#textareaoComments').html();
			this.latitude =$('#latitude').html();
			this.longitude =$('#longitude').html();
			this.Landmark =$('#Landmark').html();
			this.WorkingTime=$('#WorkingTime').text();
			this.ipAddress=$('#spn_ip').text();
			this.update_user_details = {
				address:this.newAddress,
				phone:this.newPhone,
				fax:this.newFax,
				email:this.newEmail,
				website:this.newWebsite,
				latitude:this.latitude,
				longitude:this.longitude,
				office_hour:this.newOffice,
				comments:this.comments,
				embassy_id:this.embassy_id,
				ipAddress:this.ipAddress,
				landmark:this.Landmark,
				workingTime:this.WorkingTime
		}
		this.updateAddressService.updateData(this.update_user_details).subscribe(
			data => {
				if(data.status="SUCCESS"){
					this.success_msg_error = true;
                    setTimeout(function(){
					  	$('#mydiv').fadeOut('fast');
							  $("#report_popup").hide();
							  $("body").css({"overflow-y":"scroll"});
                       	}, 1000);
					   	$('#mydiv').fadeIn('fast');
							   $("#report_popup").show();
					this.updating_msg = false;
					this.success_msg = "Your information has been updated."
				}
			})
	    }
	}

	ErrorRermove(){
		$('#textarea').removeClass('borderCls')
	}

	popup_Hide_msg(){
		this.captchaError = false;
		this.success_msg_error = false;
		grecaptcha.reset();
	}

}
