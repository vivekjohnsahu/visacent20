import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import { VisaApplicationService } from '../../services/visa_application/visa-application.service';
import { CountriesListService } from '../../services/countries_list_home/countries-list.service';
import { EmbassiesCityDetailsService } from '../../services/embassies_city_details/embassies-city-details.service'
import { Meta, Title} from '@angular/platform-browser';
import { UserInputCntdetailsService } from '../../services/userInputCntdetails/user-input-cntdetails.service'

@Component({
  selector: 'app-apply-visa',
  templateUrl: './apply-visa.component.html',
  styleUrls: ['./apply-visa.component.css'],
  providers: [ CountriesListService, EmbassiesCityDetailsService, UserInputCntdetailsService ]
})
export class ApplyVisaComponent implements OnInit {

	constructor(
		public ngProgress: NgProgress,
		private router:Router,
		private visaApplicationService:VisaApplicationService,
		private routers : ActivatedRoute,
		private countriesListService:CountriesListService,
		private embassiesCityDetailsService:EmbassiesCityDetailsService,
		private meta: Meta,
		private title:Title,
		private userInputCntdetailsService:UserInputCntdetailsService
	) { }

	countryShow:any;
	country:any;
	visaUrl:any;
	tableViasaToggle:boolean;
	visaApplyTbl:any;
	tableRequired:boolean;
	tableRegular:boolean;
	currentVisa:any;
	country_ctn:any; 
	bnewCnty:any;
	topFiveCNtry=[];
	topCntry:any;
	documents_req:any;
	faq:any;
	intro:any;
	visa_req:any;
	pageHide:boolean;
	visa_flag:any;
	question:any;
	answer:any;
	faqQuestionAnswArry:any;
	requirementCountryName:any;
	countydetailsNew:any;
	phoneMulti:any;
	phoneM:any;
	faxMulti:any;
	faxMultiM:any;
	emaiMulti:any;
	emaiM:any;
	websiteMulti:any;
	websiteM:any;
	countydetails:any;
	consulateAd:any;
	EmbassyAd:any;
	Errortable:boolean;
	of_country_name:any;
	from_country_name:any;
	visaReq1:any;
	selectCountry:any;
	NewvisaReq:any;
	flagCnt=0;
	from_country_alternate_name:any;
	to_country_alternate_name:any;
	visaTypeName:any;
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
	numberRegEx = "^(0|[0-9][0-9]*)$";
	grecaptcha:any;
	captchaError:boolean;
	captchaError_msg:any;
	name:any;
	Landmark:any;
	WorkingTime:any;
	to_country_slug_name:any;
	from_country_slug_name:any;
	docu_feq_data='';
	e_visa:any;
	regular_visa:any;
	visa_not_required:any;
	form_show=true;
	country_name:any;
	belong_to:any;
	emb_cnt:boolean;
	cnrty_list:boolean;
	visa_req_sec:boolean;
	formPageShow:boolean;
	ipAddress:any;

  	ngOnInit() {
		this.ngProgress.start();
		var cmt = this;
		$.getJSON('https://jsonip.com?callback=?', function(response) {
			cmt.ipAddress=response.ip
			$('#spn_ip').text(cmt.ipAddress);
		});	
		this.tableRegular=false;
		this.tableViasaToggle=false;
		this.emb_cnt=false;
		this.cnrty_list=false;
		this.visa_req_sec=true;
		this.formPageShow=false;
		this.tableRequired=false;
		$('#profile_trans').hide();
		this.routers.params.subscribe(val => {
			this.country_ctn = this.routers.snapshot.params["value"]
			this.visaReq1 = this.routers.snapshot.params["a"];
			if(this.visaReq1!='' && this.visaReq1!=null && this.visaReq1!=undefined){
				this.NewvisaReq = this.visaReq1.split('from-')
				if(this.NewvisaReq.length==2){
					this.flagCnt=1
					this.selectCountry = this.NewvisaReq[1]
					this.country_change()
				}	
			}else{
				this.visa_req_doc()
			}
			
		})
		this.countryShow =JSON.parse(localStorage.getItem('countrylist'));
		if(this.countryShow!=null && this.countryShow!=''){
			this.country = this.countryShow;
			var var_country_ctn=this.country_ctn;
			this.topFiveCNtry = $.grep(this.country, function(item) { 
				if(item.slug_country_name == 'australia' && item.slug_country_name!=var_country_ctn)
					return item.slug_country_name;
				if(item.slug_country_name == 'india' && item.slug_country_name!=var_country_ctn)
					return item.slug_country_name;
				if(item.slug_country_name == 'china' && item.slug_country_name!=var_country_ctn)
					return item.slug_country_name;
				if(item.slug_country_name == 'canada' && item.slug_country_name!=var_country_ctn)
					return item.slug_country_name;
				if(item.slug_country_name == 'united-kingdom' && item.slug_country_name!=var_country_ctn)
					return item.slug_country_name;
				if(item.slug_country_name == 'united-states-of-america' && item.slug_country_name!=var_country_ctn)
					return item.slug_country_name;
			});	
			this.topCntry=this.topFiveCNtry;
		}else{
			this.countriesListService.countriesList().subscribe(
				data => {
					this.country = data;
					var var_country_ctn=this.country_ctn;
					this.topFiveCNtry = $.grep(this.country, function(item) { 
						if(item.slug_country_name == 'australia' && item.slug_country_name!=var_country_ctn)
							return item.slug_country_name;
						if(item.slug_country_name == 'india' && item.slug_country_name!=var_country_ctn)
							return item.slug_country_name;
						if(item.slug_country_name == 'china' && item.slug_country_name!=var_country_ctn)
							return item.slug_country_name;
						if(item.slug_country_name == 'canada' && item.slug_country_name!=var_country_ctn)
							return item.slug_country_name;
						if(item.slug_country_name == 'united-kingdom' && item.slug_country_name!=var_country_ctn)
							return item.slug_country_name;
						if(item.slug_country_name == 'united-states-of-america' && item.slug_country_name!=var_country_ctn)
							return item.slug_country_name;
					});	
					this.topCntry=this.topFiveCNtry;
				})
		}

		var cmd=this;
		this.topCntry = this.topFiveCNtry;
		let nationalityTopOnePlaceObj = this.topCntry.filter(function(list){ return list.slug_country_name==cmd.country_name;});
		this.topCntry = $.grep(this.topCntry, function(item) { 
			if(nationalityTopOnePlaceObj.length>0){
				return item.name !== nationalityTopOnePlaceObj[0].name;
			}else{
				return item.name;
			}
		});
	}

	visa_req_doc(){
		this.visaApplicationService.visaSelectCnt(this.country_ctn).subscribe(
			data =>{
				this.ngProgress.done();
				this.pageHide=true;
				this.country_name = data.country_name;
				this.title.setTitle('Apply '+this.country_name+' visa, '+this.country_name+' Visa Application, Documents required for '+this.country_name+' Visa, '+this.country_name+' Visa');
				this.meta.updateTag({ name:'title',content:'Apply '+this.country_name+' visa, '+this.country_name+' Visa Application, Documents required for '+this.country_name+' Visa, '+this.country_name+' Visa'});	
				this.meta.updateTag({ name:'description',content:'Apply for '+this.country_name+' visa, Visa to '+this.country_name+' for Tourist or Business. Apply Now! Individual visa seeker can to apply for the '+this.country_name+' Visa through Online.'});
				this.meta.updateTag({ name:'keywords',content: 'Apply '+this.country_name+' visa, '+this.country_name+' Visa Application, Documents required for '+this.country_name+' Visa, '+this.country_name+' Visa, '+this.country_name+' Tourist or Business Visa, Apply '+this.country_name+' Visa online, e-visa application.'});
				
				if(data.country_visa.documents_req!=null || data.country_visa.country_visa!=null || data.country_visa.intro!=null || data.country_visa.visa_req!=null){
					this.emb_cnt=false;
					this.cnrty_list=false;
					this.visa_req_sec=true;
					this.formPageShow=false;
					this.tableRequired=false;
					this.documents_req = data.country_visa.documents_req;
					this.faq = data.country_visa.faq;
					var faqQuestionAnswer:any;
					this.faqQuestionAnswArry=new Array
					this.intro = data.country_visa.intro;
					this.visa_req = data.country_visa.visa_req;
					this.visa_flag = data.country_flag
					if(this.faq!=null){
						for(var i=0; this.faq.length>i;i++){
							this.question=this.faq[i].question;
							this.answer=this.faq[i].answer;
							faqQuestionAnswer={
								question:this.question,
								answer:this.answer
							}
							this.faqQuestionAnswArry.push(faqQuestionAnswer)	
						}
					}
				}else{
					this.visaEligibleCountries(this.country_ctn);
					this.tableRegular=false;
					this.tableViasaToggle=false;
					this.emb_cnt=false;
					this.cnrty_list=true;
					this.visa_req_sec=false;
					this.formPageShow=false;
					this.tableRequired=false;
				}
			})	
	}

	changeCuntry(listName){
		this.bnewCnty = listName.value;
		var url = this.country_ctn+"/from-"+this.bnewCnty;
		this.router.navigate(['apply-visa/'+url])
		this.country_change()
	}

	country_change(){
		this.bnewCnty = this.selectCountry;
		this.ngProgress.start();
		this.visaUrl = this.country_ctn+"-visas-for-"+this.bnewCnty;
		this.Errortable = false;
		this.visaApplicationService.visaTableList(this.visaUrl).subscribe(
			data => {
				this.pageHide=true;
				this.of_country_name = data.to_country_name;
				this.country_name = this.of_country_name;
				this.from_country_name = data.from_country_name;
				this.from_country_alternate_name = data.from_country_alternate_name;
				this.to_country_alternate_name = data.to_country_alternate_name;
				this.to_country_slug_name= data.to_country_slug_name;
				this.from_country_slug_name= data.from_country_slug_name;
				this.visa_flag = data.country_flag;
				if(this.bnewCnty!=undefined && this.country_ctn!=undefined){
					this.requirementCountryName = this.country_ctn + '/' + this.bnewCnty;
				}
				if(data.status=='SUCCUSS'){
					this.ngProgress.done();
					this.visaApplyTbl = data.visa
					this.tableViasaToggle = true;
					setTimeout(() => {$('html, body').animate({scrollTop: $(".table_scroll_").offset().top}, 800);}, 1000);
					if(this.visaApplyTbl.length == 0){
						this.tableRegular=true;
						this.tableViasaToggle=false;
						this.emb_cnt=false;
						this.cnrty_list=false;
						this.visa_req_sec=false;
						this.formPageShow=false;
						this.tableRequired=false;
						this.visa_req_doc()
					}else if(this.visaApplyTbl[0].visa_type!= 0){
						if(this.visaApplyTbl.length>1){
							this.visaTypeName = this.visaApplyTbl[0].visa_type+', '+this.visaApplyTbl[1].visa_type
						}else{
							this.visaTypeName = this.visaApplyTbl[0].visa_type
						}
						this.tableRegular=false;
						this.tableViasaToggle=true;
						this.emb_cnt=false;
						this.cnrty_list=false;
						this.visa_req_sec=false;
						this.formPageShow=false;
						this.tableRequired=false;
						this.visa_req_doc()
					}else if(this.visaApplyTbl[0].visa_not_required!= 0){
						this.tableRegular=false;
						this.tableViasaToggle=false;
						this.tableRequired=true;
						this.emb_cnt=false;
						this.cnrty_list=false;
						this.visa_req_sec=false;
						this.formPageShow=false;
						this.requirementCountry()
					}else{
						this.tableRegular=true;
						this.tableViasaToggle=false;
						this.emb_cnt=false;
						this.cnrty_list=false;
						this.visa_req_sec=false;
						this.formPageShow=false;
						this.tableRequired=false;
						this.requirementCountry()
					}
				}else if(data.status=='FAIL'){
					this.ngProgress.done();
					this.tableRegular=true;
					this.tableViasaToggle=false;
					this.emb_cnt=false;
					this.cnrty_list=false;
					this.visa_req_sec=false;
					this.formPageShow=false;
					this.tableRequired=false;
					this.requirementCountry()
				}
			})
		}
	
	visaDetial(visa){
		this.currentVisa = visa;
		this.router.navigate(["apply-online",this.currentVisa]);
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}

	radioChek(){
		$('.tableSelect tr').click(function() {
			$(this).find('td input:radio').prop('checked', true);
			$('.tableSelect tr').css({"background-color":"transparent"});
		    $(this).css({"background-color":"#e8e8e8"});
		})
	}
	
	requirementCountry(){
		this.embassiesCityDetailsService.requirementCountryCtn(this.requirementCountryName).subscribe(
			data =>{
				this.metaTags()
				this.countydetails = data.data;
				this.countydetailsNew = data.data;
				this.consulateAd=new Array();
				this.EmbassyAd=new Array()
				if(this.countydetailsNew!='' && this.tableViasaToggle!=null && this.countydetailsNew!=undefined){
					this.emb_cnt=true;
					this.cnrty_list=false;
					this.visa_req_sec=false;
					this.formPageShow=false;
					for(i=0;this.countydetails.length>i;i++){
						if(data.data[i].name.indexOf("Consulate")>-1){
							this.consulateAd.push(this.countydetails[i])
						}else{
							this.EmbassyAd.push(this.countydetails[i])
						}	
					}
					for(var i=0;i<this.countydetailsNew.length;i++){
						if(this.countydetailsNew[i].Telepone!=null && $.trim(this.countydetailsNew[i].Telepone)!='' && $.trim(this.countydetailsNew[i].Telepone)!=' '){
							this.phoneMulti = this.countydetailsNew[i].Telepone;
							this.phoneM =this.phoneMulti.split('<br />');
							this.phoneM = this.phoneM.filter(function(v){return v!==''});
							this.countydetailsNew[i].phoneM1 = this.phoneM;
							this.countydetailsNew[i].lnthTelepone=1;
						}else{
							this.countydetailsNew[i].lnthTelepone=0;	
						}
	
						if(this.countydetailsNew[i].Fax!=null && $.trim(this.countydetailsNew[i].Fax)!='' && $.trim(this.countydetailsNew[i].Fax)!=' '){
							this.faxMulti = this.countydetailsNew[i].Fax;
							this.faxMultiM =this.faxMulti.split('<br />');
							this.faxMultiM = this.faxMultiM.filter(function(v){return v!==''});
							this.countydetailsNew[i].faxMultiM1 = this.faxMultiM;
							this.countydetailsNew[i].lnthFax=1;
						}else{
							this.countydetailsNew[i].lnthFax=0;	
						}
			
						if(this.countydetailsNew[i].E_maiil!=null && $.trim(this.countydetailsNew[i].E_maiil)!='' && $.trim(this.countydetailsNew[i].E_maiil)!=' '){
							this.emaiMulti = this.countydetailsNew[i].E_maiil;
							this.emaiM =this.emaiMulti.split('<br />');
							this.emaiM = this.emaiM.filter(function(v){return v!==''});
							this.countydetailsNew[i].emaiM1 = this.emaiM;
							this.countydetailsNew[i].lnthE_maiil=1;
						}else{
							this.countydetailsNew[i].lnthE_maiil=0;	
						}
	
						if(this.countydetailsNew[i].website!=null && $.trim(this.countydetailsNew[i].website)!='' && $.trim(this.countydetailsNew[i].website)!=' '){
							this.websiteMulti = this.countydetailsNew[i].website;
							this.websiteM =this.websiteMulti.split('<br />');
							this.websiteM = this.websiteM.filter(function(v){return v!==''});
							this.countydetailsNew[i].websiteM1 =this.websiteM;
							this.countydetailsNew[i].lnthwebsite=1;
						}else{
							this.countydetailsNew[i].lnthwebsite=0;	
						}
						var cmt=this;
						setTimeout(function(){
							cmt.setemb_map();
						},1000);
					}		
				}else{
					this.emb_cnt=false;
					this.cnrty_list=false;
					this.visa_req_sec=false;
					this.formPageShow=true;
				}			
			})
	}

	setemb_map(){
		for(var i=0;i<this.EmbassyAd.length;i++){
			var idd=this.EmbassyAd[i].id;
			var rl='<iframe rel="nofollow" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.it/maps?key=AIzaSyDhk_FjlzJ5Gn6JqJ9np-Z0XY-WBwDoogU&q='+this.EmbassyAd[i].maps+'&output=embed"></iframe>';
			$('#emb_map__div_'+idd).html(rl);
		}

		for(var i=0;i<this.consulateAd.length;i++){
			var cidd=this.consulateAd[i].id;
			var crl='<iframe rel="nofollow" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.it/maps?key=AIzaSyDhk_FjlzJ5Gn6JqJ9np-Z0XY-WBwDoogU&q='+this.consulateAd[i].maps+'&output=embed"></iframe>';
			$('#cnst_map__div_'+cidd).html(crl);
		}
	}

	metaTags(){
		if(this.visaApplyTbl.length==0 || this.visaApplyTbl[0].visa_required!='0'){
			this.title.setTitle('Apply for '+this.to_country_alternate_name+' regular Visa, '+this.to_country_alternate_name+' Visa application from '+this.from_country_name+', '+this.of_country_name+' Visa online');
			this.meta.updateTag({ name:'title',content:'Apply for '+this.to_country_alternate_name+' regular Visa, '+this.to_country_alternate_name+' Visa application from '+this.from_country_name+', '+this.of_country_name+' Visa online'});	
			this.meta.updateTag({ name:'description',content:'Apply for '+this.to_country_alternate_name+' regular Visa from '+this.from_country_name+', You have to apply for a visa through a '+this.of_country_name+' diplomatic mission or one of its authorized visa agents outside '+this.of_country_name+'.'});
			this.meta.updateTag({ name:'keywords',content: 'Apply for '+this.to_country_alternate_name+' regular Visa, '+this.to_country_alternate_name+' Visa application from '+this.from_country_name+', '+this.of_country_name+' Visa online, visa through a '+this.of_country_name+' diplomatic mission, '+this.to_country_alternate_name+' regular Visa'});
		}else if(this.visaApplyTbl[0].visa_not_required!='0'){
			this.title.setTitle(''+this.from_country_name+' Citizens do not required a visa to travel '+this.of_country_name+'. No visa required for '+this.of_country_name+' from '+this.from_country_name+'.');
			this.meta.updateTag({ name:'title',content:''+this.from_country_name+' Citizens do not required a visa to travel '+this.of_country_name+'. No visa required for '+this.of_country_name+' from '+this.from_country_name+'.'});	
			this.meta.updateTag({ name:'description',content:'Good news, '+this.of_country_name+' Citizens do not required a visa to travel United State of America. No Visa visa required to travel to United State of America.'});
			this.meta.updateTag({ name:'keywords',content: ''+this.of_country_name+' visa for '+this.from_country_name+', '+this.from_country_name+' Citizens travel '+this.of_country_name+', No visa required for '+this.of_country_name+' from '+this.from_country_name+'.'});
		}else{
			this.title.setTitle( 'Apply for '+this.to_country_alternate_name+' eVisa, '+this.to_country_alternate_name+' eVisa application for '+this.from_country_alternate_name+', '+this.of_country_name+' eVisa online');
			this.meta.updateTag({ name:'title',content: 'Apply for '+this.to_country_alternate_name+' eVisa, '+this.to_country_alternate_name+' eVisa application for '+this.from_country_alternate_name+', '+this.of_country_name+' eVisa online'});	
			this.meta.updateTag({ name:'description',content: 'Get '+this.of_country_name+' eVisa online, '+this.from_country_alternate_name+' Citizens can get e-visa for '+this.of_country_name+' online, '+this.of_country_name+' visa for '+this.from_country_name+', '+this.visaTypeName});
			this.meta.updateTag({ name:'keywords',content: 'Apply for '+this.to_country_alternate_name+' eVisa, '+this.to_country_alternate_name+' eVisa application for '+this.from_country_alternate_name+', '+this.of_country_name+' eVisa online, '+this.visaTypeName});	
		}
	}

	resolved(captchaResponse: string) {
		this.grecaptcha = captchaResponse;
		this.captchaError = false;
	}

	update_btn(){
		let flg=0;
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
			this.name =$('#namef').text();
			this.Address =$('#address').text();
			this.Phone =$('#telephone').text();
			this.Fax =$('#fax').text();
			this.Email =$('#email').text();
			this.Website =$('#website').text();
			this.comments =$('#comments').text();
			this.latitude =$('#latitude').text();
			this.longitude =$('#longitude').text();
			this.nweipAddress=$('#spn_ip').text();
			this.Landmark =$('#Landmark').html();
			this.WorkingTime=$('#WorkingTime').text();
		}
		this.userFileData={
			name:this.name,
			address:this.Address,
			phone:this.Phone,
			fax:this.Fax,
			email:this.Email,
			website:this.Website,
			comments:this.comments,
			ipAddress:this.nweipAddress,
			landmark:this.Landmark,
			workingTime:this.WorkingTime,
			of_cn:this.to_country_slug_name,
			in_cn:this.from_country_slug_name,
			slug:'',
			emb_type:'',
		}
		this.userInputCntdetailsService.userInputData(this.userFileData).subscribe(
			data => {
				if(data.status='SUCCESS'){
					this.updating = false;
					this.success_msg_error = true;
					this.success_msg = 'Thank you for sending your suggestions.'
					setTimeout(() => {$('html, body').animate({scrollTop: $(".my_alert_scr").offset().top}, 800);}, 500);
					$('html,body').animate({ scrollTop: $('.scroll_msg').offset().top},'fast'); 
                    $(document).ready(function(){
                    setTimeout(function(){
                        $('.myalert').fadeOut('fast');}, 3000);
                        $('.myalert').fadeIn();
                    })
				}else if(data.status='ERROR'){
					this.updating = false;
					this.msg_error = true;
					this.erro_msg = 'Error! Information did not send!'
					setTimeout(() => {$('html, body').animate({scrollTop: $(".my_alert_scr").offset().top}, 800);}, 500);
                    $(document).ready(function(){
                    setTimeout(function(){
                        $('.myalert').fadeOut('fast');}, 3000);
                        $('.myalert').fadeIn();
                    })
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
	
	visaEligibleCountries(country_eligible){
		this.visaApplicationService.visa_eligible_country(country_eligible).subscribe(
			data => {
				this.e_visa = data.data.e_visa;
				this.regular_visa = data.data.regular_visa;
				this.visa_not_required = data.data.visa_not_required;
			})
	}
	
}
