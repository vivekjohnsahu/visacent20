import { Component, OnInit } from '@angular/core';
import { VisaApplicationService } from '../../services/visa_application/visa-application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CountriesListService } from '../../services/countries_list_home/countries-list.service';
import * as $ from 'jquery'; 
import { NgProgress } from 'ngx-progressbar';
import { Meta, Title} from '@angular/platform-browser';
import { EmbassiesCityDetailsService } from '../../services/embassies_city_details/embassies-city-details.service'
import { UserInputCntdetailsService } from '../../services/userInputCntdetails/user-input-cntdetails.service'
 
@Component({
  selector: 'app-visa-table',
  templateUrl: './visa-table.component.html',
  styleUrls: ['./visa-table.component.css'],
  providers: [ VisaApplicationService, CountriesListService, UserInputCntdetailsService]
})
export class VisaTableComponent implements OnInit {

	constructor(
		private visaApplicationService:VisaApplicationService,
		private router:Router,
		private routers:ActivatedRoute,
		private countriesListService:CountriesListService,
		public ngProgress: NgProgress,
		private meta: Meta,
		private title:Title,
		private embassiesCityDetailsService:EmbassiesCityDetailsService,
		private userInputCntdetailsService:UserInputCntdetailsService
	) { 
		this.title.setTitle('Check Visa Requirements | Visa Information | Visa Requirements and Online Applications');
		this.meta.updateTag({ name:'description',content:'Check Visa Requirements, Visa Information, Visa Requirements,  Online Applications, business visa requirements, tourist visa requirements, visa requirements, visa requirements and fees, travel visa requirements'});
		this.meta.updateTag({ name:'keywords',content:'You can check Visa Requirements brefore travelling anywhere in the world. Here you can check visa requirements, visa application requirements, visa infomation and what documents requirements for visa.'});
	}

	visaTable:any;
	detailsName:any;
	countryOne:any;
	countryTwo:any;
	ShapeTwocountry:any;
	ShapeOnecountry:any;
	nationalityChange:any;
	travellingChange:any;
	visaUrl:any;
	fromCountrySlugName:any;
	tableShow:boolean;
	tableRequired:boolean;
	tableRegular:any;
	dataShow = true;;
	currentVisa:any;
	inCountrySlugName:any;
	SnapeOneUrl:any;
	SnapeTwoUrl:any;
	loaderShow_first = true;
	loaderShow_second = true;
	visaTeblerequirements:any;
	indexOneVisa:any
	pageHide:boolean;
	moveForm:any;
	pade_error_show:boolean;
	country:any;
	nationalityChangeName:any;
	travellingChangeName:any;
	cntList:any;
	topCntryTwo:any;
	topCntryOne:any;
	topFiveCNtry=[];
	visaReq:any;
	documents_req:any;
	faq:any;
	intro:any;
	visa_req:any;
	selectChangeCntry:boolean;
	visa_flag:any;
	question:any;
	answer:any;
	faqQuestionAnswArry:any
	newTravellingCnt:any;
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
	country_ctn:any;
	belowList:boolean;
	map:any;
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
	stepFollow:boolean;
	belowAList:boolean;
	formPageShow:boolean;
	cnt_emb:any;
	visa_req_sec:boolean;
	currentId:any;
	currentIdBlong:any;
	currentIdNead:any;
	visaAllValue:any;
	ipAddress:any;

  	ngOnInit(){
		this.ngProgress.start();
		this.tableRequired=false;
		this.tableShow=true;
		this.cnt_emb=false;
		this.tableRegular=false;
		this.formPageShow=false;
		this.stepFollow=true;
		$('#profile_trans').hide();
		$(document).ready(function(){
			$(".filter").click(function(){
				$('html,body').animate({ scrollTop: $('#link_slid').offset().top},'slow');
			});
		});
		
		this.cntList =JSON.parse(localStorage.getItem('countrylist'));
		if(this.cntList!="" && this.cntList!=null){
			this.ngProgress.done();
			this.country = this.cntList;
			this.countryOne = this.cntList;
			this.countryTwo = this.cntList;
			this.topFiveCNtry = $.grep(this.country, function(item) { 
				if(item.slug_country_name == 'australia')
					return item.slug_country_name;
				if(item.slug_country_name == 'india')
					return item.slug_country_name;
				if(item.slug_country_name == 'china')
					return item.slug_country_name;
				if(item.slug_country_name == 'canada')
					return item.slug_country_name;
				if(item.slug_country_name == 'united-kingdom')
					return item.slug_country_name;
				if(item.slug_country_name == 'united-states-of-america')
					return item.slug_country_name;
			});	
			this.topCntryTwo=this.topFiveCNtry;
			this.topCntryOne=this.topFiveCNtry;
			this.router_parameters();
		}else{
			this.countriesListService.countriesList().subscribe(
				data => {
					this.ngProgress.done();
					this.country = data;
					this.countryOne = data;
					this.countryTwo = data;
					this.topFiveCNtry = $.grep(this.country, function(item) { 
						if(item.slug_country_name == 'australia')
							return item.slug_country_name;
						if(item.slug_country_name == 'india')
							return item.slug_country_name;
						if(item.slug_country_name == 'china')
							return item.slug_country_name;
						if(item.slug_country_name == 'canada')
							return item.slug_country_name;
						if(item.slug_country_name == 'united-kingdom')
							return item.slug_country_name;
						if(item.slug_country_name == 'united-states-of-america')
							return item.slug_country_name;
					});	
					this.topCntryTwo=this.topFiveCNtry;
					this.topCntryOne=this.topFiveCNtry;
					this.router_parameters();
				})
		}	
	}

	router_parameters(){
		this.routers.params.subscribe(val => {
		this.currentId = this.router.url.split('/')
		this.currentId = this.currentId[2]
		this.currentId = this.currentId.split('-visas-for-')
		this.currentIdBlong = this.currentId[1]
		this.currentIdNead = this.currentId[0]
			if(this.currentIdBlong!='' && this.currentIdBlong!=null && this.currentIdBlong!=undefined && this.currentIdNead!='' && this.currentIdNead!=null && this.currentIdNead!=undefined){
				this.visaAllDetails()
				var cmd=this;
				let nationalityTwoPlaceObj = this.countryOne.filter(function(list){ return list.slug_country_name==cmd.currentIdBlong;});
				this.countryTwo = $.grep(this.countryTwo, function(item) {	
					if(nationalityTwoPlaceObj.length>0){
						return item.name !== nationalityTwoPlaceObj[0].name;
					}else{
						return item.name;
					}
				});
				
				this.topCntryTwo = this.topFiveCNtry;
				let nationalityTopTwoPlaceObj = this.topCntryOne.filter(function(list){ return list.slug_country_name==cmd.currentIdBlong;});
				this.topCntryTwo = $.grep(this.topCntryTwo, function(item) { 
					if(nationalityTopTwoPlaceObj.length>0){
						return item.name !== nationalityTopTwoPlaceObj[0].name;
					}else{
						return item.name;
					}
				});

				let nationalityOnePlaceObj = this.countryTwo.filter(function(list){ return list.slug_country_name==cmd.currentIdNead;});
				this.countryOne = $.grep(this.countryOne, function(item) { 
					if(nationalityOnePlaceObj.length>0){
						return item.name !== nationalityOnePlaceObj[0].name;
					}else{
						return item.name;
					}
				});
				this.topCntryOne = this.topFiveCNtry;
				let nationalityTopOnePlaceObj = this.topCntryTwo.filter(function(list){ return list.slug_country_name==cmd.currentIdNead;});
				this.topCntryOne = $.grep(this.topCntryOne, function(item) { 
					if(nationalityTopOnePlaceObj.length>0){
						return item.name !== nationalityTopOnePlaceObj[0].name;
					}else{
						return item.name;
					}
				});
			}	
		})
	}
	
	visaAllDetails(){
		this.routers.params.subscribe(val => {
		let visaAllValue = this.routers.snapshot.params["value"]
		this.visaApplicationService.visaTableList(visaAllValue).subscribe(
			data => {
				if(data!=null){
					this.ngProgress.done();
					this.pageHide = true;
					this.detailsName = data;
					this.visaTable = data.visa;
					this.visaTeblerequirements = this.visaTable[0];
					this.fromCountrySlugName = this.detailsName.from_country_name;
					this.inCountrySlugName = this.detailsName.to_country_name;
					this.nationalityChange = data.from_country_slug_name;
					this.travellingChange = data.to_country_slug_name;
					this.nationalityChangeName = data.from_country_name;
					this.travellingChangeName = data.to_country_name;
					this.newTravellingCnt = this.inCountrySlugName;
					this.requirementCountryName = this.travellingChange + '/' + this.nationalityChange;
					this.country_ctn = data.to_country_name;
					this.to_country_slug_name= data.to_country_slug_name;
					setTimeout(() => {$('html, body').animate({scrollTop: $(".table_scroll_").offset().top}, 800);}, 1000);
					this.from_country_slug_name= data.from_country_slug_name;
					if(this.visaTable.length == 0){
						this.tableRequired=false;
						this.tableShow=false;
						this.cnt_emb=false;
						this.tableRegular=true;
						this.formPageShow=false;
						this.stepFollow=false;
						this.requirementCountry()
					}else if(this.visaTable[0].visa_type!= 0){
						this.tableRequired=false;
						this.tableShow=true;
						this.cnt_emb=false;
						this.tableRegular=false;
						this.formPageShow=false;
						this.stepFollow=true;
					}else if(this.visaTable[0].visa_not_required!= 0){
						this.tableRequired=true;
						this.tableShow=false;
						this.cnt_emb=false;
						this.tableRegular=false;
						this.formPageShow=false;
						this.stepFollow=true;
						this.requirementCountry()
					}else{
						this.tableRequired=false;
						this.tableShow=false;
						this.cnt_emb=false;
						this.tableRegular=true;
						this.formPageShow=false;
						this.stepFollow=false;
						this.requirementCountry()
					}
				}else{
					this.pade_error_show = true;
				}
			})
		})
	}

	radioChek(){
		$('.tableSelect tr').click(function() {
			$(this).find('td input:radio').prop('checked', true);
			$('.tableSelect tr').css({"background-color":"transparent"});
		    $(this).css({"background-color":"#e8e8e8"});
		})
	}

	formDetial(visa_type){
		this.currentVisa = visa_type;
		this.router.navigate(["apply-online",this.currentVisa]);
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}
	
	changeShapeOne(listName){
		this.ngProgress.start();
		this.dataShow = true;
		this.nationalityChange = listName.value;
		this.requirementCountryName = this.travellingChange + '/' + this.nationalityChange;
		this.countryTwo = this.country
		let nationalityTwoPlaceObj = this.countryOne.filter(function(list){ return list.slug_country_name==listName.value;});
        this.countryTwo = $.grep(this.countryTwo, function(item) {	
			if(nationalityTwoPlaceObj.length>0){
				return item.name !== nationalityTwoPlaceObj[0].name;
			}else{
				return item.name;
			}
		});
		this.snapOne()
		this.topCntryTwo = this.topFiveCNtry;
		let nationalityTopTwoPlaceObj = this.topCntryOne.filter(function(list){ return list.slug_country_name==listName.value;});
		this.topCntryTwo = $.grep(this.topCntryTwo, function(item) { 
			if(nationalityTopTwoPlaceObj.length>0){
				return item.name !== nationalityTopTwoPlaceObj[0].name;
			}else{
				return item.name;
			}
		});
		this.snapOne()	
	}

	snapOne(){
		this.fromCountrySlugName = this.nationalityChange;
		this.visaUrl = this.travellingChange.trim()+"-visas-for-"+this.nationalityChange.trim();
		this.router.navigate(["requirement",this.visaUrl]);
		this.visaApplicationService.visaTableList(this.visaUrl).subscribe(
			data => {
				if(data.status=="SUCCUSS"){
					this.visaTable = data.visa;
					this.dataShow = false;
				}else if(data.status=="FAIL"){
					this.Errortable = true;
				}else{
					// do nothing
				}
			})
	}
	
	changeShapeTwo(listName){
		this.ngProgress.start();
		this.dataShow = true;
		this.travellingChange = listName.value;
		this.requirementCountryName = this.travellingChange + '/' + this.nationalityChange;
		this.countryOne = this.country
		let nationalityOnePlaceObj = this.countryTwo.filter(function(list){ return list.slug_country_name==listName.value;});
		this.countryOne = $.grep(this.countryOne, function(item) { 
			if(nationalityOnePlaceObj.length>0){
				return item.name !== nationalityOnePlaceObj[0].name;
			}else{
				return item.name;
			}
		});
		this.snapTwo()
		this.topCntryOne = this.topFiveCNtry;
		let nationalityTopOnePlaceObj = this.topCntryTwo.filter(function(list){ return list.slug_country_name==listName.value;});
		this.topCntryOne = $.grep(this.topCntryOne, function(item) { 
			if(nationalityTopOnePlaceObj.length>0){
				return item.name !== nationalityTopOnePlaceObj[0].name;
			}else{
				return item.name;
			}
		});
		this.snapTwo()
	}

	snapTwo(){
		this.inCountrySlugName = this.travellingChange;
		this.visaUrl = this.travellingChange.trim()+"-visas-for-"+this.nationalityChange.trim();
		this.router.navigate(["requirement",this.visaUrl]);
		this.visaApplicationService.visaTableList(this.visaUrl).subscribe(
			data => {
				this.visaTable = data.visa;
				this.dataShow = false;
			})
	}

	selectDropCtry(){
		this.newTravellingCnt=this.travellingChange;
		this.visaApplicationService.eVisaSelectCnt(this.newTravellingCnt).subscribe(
			data =>{
				this.ngProgress.done();
				this.selectChangeCntry=true;
				this.documents_req = data.country_visa.documents_req;
				var faqQuestionAnswer:any;
				this.faqQuestionAnswArry=new Array
				if(data.country_visa.documents_req!=null || data.country_visa.country_visa!=null || data.country_visa.intro!=null || data.country_visa.visa_req!=null){
					this.tableRequired=false;
					this.tableShow=false;
					this.Errortable=false;
					this.belowAList=false;
					this.cnt_emb=false;
					this.tableRegular=false;
					this.formPageShow=false;
					this.stepFollow=true;
					this.visa_req_sec=false;
				}else{
					this.tableRequired=false;
					this.tableShow=false;
					this.Errortable=false;
					this.belowAList=false;
					this.cnt_emb=false;
					this.tableRegular=false;
					this.formPageShow=false;
					this.stepFollow=false;
					this.visa_req_sec=true;
					this.faq = data.country_visa.faq;
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
				}
				
				
			})
	}

	ChangeBottom(i){
		this.visaTeblerequirements = this.visaTable[i]
	}

	getStartedApply(){
		this.moveForm = this.visaTeblerequirements.visa_type_slug
		this.router.navigate(["apply-online",this.moveForm]);
		document.body.scrollTop = document.documentElement.scrollTop = 0;  
	}
	
	requirementCountry(){
		this.embassiesCityDetailsService.requirementCountryCtn(this.requirementCountryName).subscribe(
			data =>{
				this.countydetails = data.data;
				this.countydetailsNew = data.data;
				this.consulateAd=new Array();
				this.EmbassyAd=new Array()
				if(this.countydetails!=null && this.countydetails!=undefined && this.countydetails!='' && this.countydetails.length>0){
					this.cnt_emb=true;
					this.formPageShow=false;
					this.stepFollow=false;
					if(this.consulateAd=='' && this.EmbassyAd==''){
						this.belowAList=false;
					}
					for(i=0;this.countydetails.length>i;i++){
						if(data.data[i].name.indexOf("Consulate")>-1){
							this.consulateAd.push(this.countydetails[i])
						}else{
							this.EmbassyAd.push(this.countydetails[i])
						}	
						this.belowAList=true;
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
						var ctl= this;
						setTimeout(function(){
							ctl.setemb_map();
						},1000);
					}	
				}else{
					this.cnt_emb=false;
					this.formPageShow=true;
					this.stepFollow=false;
					var cmt = this;
					$.getJSON('https://jsonip.com?callback=?', function(response) {
						cmt.ipAddress=response.ip
						$('#spn_ip').text(cmt.ipAddress);
					});	
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


}
