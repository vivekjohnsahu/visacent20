import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import { VisaApplicationService } from '../../services/visa_application/visa-application.service';
import { CountriesListService } from '../../services/countries_list_home/countries-list.service';
import { Meta, Title} from '@angular/platform-browser';
import { EmbassiesCityDetailsService } from '../../services/embassies_city_details/embassies-city-details.service'

@Component({
  selector: 'app-apply-e-visa',
  templateUrl: './apply-e-visa.component.html',
  styleUrls: ['./apply-e-visa.component.css'],
  providers: [ CountriesListService, EmbassiesCityDetailsService ]
})
export class ApplyEVisaComponent implements OnInit {

	countryShow:any;
	belong_to:any
	need_visa_for:any
	country:any;
	belongCnty:any;
	needForVisa:any;
	visaUrl:any;
	tableViasaToggle:boolean;
	visaApplyTbl:any;
	tableRequired:boolean;
	tableRegular:boolean;
	currentVisa:any;
	country_ctn:any; 
	country_ctnSet:any;
	topCntryTwo:any;
	topCntryOne:any;
	topFiveCNtry=[];
	visaReq:any;
	documents_req:any;
	faq:any;
	intro:any;
	visa_req:any;
	pageHide:boolean;
	selectChangeCntry:boolean;
	visa_req_sec:boolean;
	cnt_emb:boolean;
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
	con_visa_req_sec:boolean;
	currentUrl:any;
	of_country_name:any;
	from_country_name:any;
	visaReqBlong:any;
	visaReqNead:any;
	visaReq1:any;
	pageName:any;
	to_country_alternate_name:any;
	from_country_alternate_name:any;
	visaTypeName:any;

	constructor(
		public ngProgress: NgProgress,
		private router:Router,
		private visaApplicationService:VisaApplicationService,
		private routers : ActivatedRoute,
		private countriesListService:CountriesListService,
		private meta: Meta,
		private title:Title,
		private embassiesCityDetailsService:EmbassiesCityDetailsService
	) {
		this.title.setTitle('Apply for a Visa | Online Visa Application | Expedited Visa Services | Most Sought Visas');
		this.meta.updateTag({ name:'title',content:'Apply for a Visa | Online Visa Application | Expedited Visa Services | Most Sought Visas'});
		this.meta.updateTag({ name:'description',content:'Apply for a Visa, Online Visa Application, Expedited Visa Services, Most Sought Visas, apply business and tourist visa, visa and immigration services, visa processing services, expedited visa services, apply for an expedited visa services, visa company, expedited business visa services, tourist expedited visa services, international visa services, myvisa visa services'});
		this.meta.updateTag({ name:'keywords',content:'Apply for a Visa, Online Visa Application, Most Sought Visas. VisaCent commits to deliver open information on visa requirements for all the countries.'});
	}

	ngOnInit() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		this.cnt_emb=false;
		this.visa_req_sec=false;
		this.con_visa_req_sec=true;
		this.ngProgress.start();
		this.currentUrl = this.router.url.split('=');
		this.currentUrl = this.currentUrl[1]
		if(this.currentUrl!=undefined){
			localStorage.setItem('refferalCurrentUrl',JSON.stringify(this.currentUrl))
		}
		$('#profile_trans').hide();
		this.routers.params.subscribe(val => {
			this.visaReq = this.routers.snapshot.params["to"];
			this.visaReq1 = this.routers.snapshot.params["a"];
		})
		if(this.router.url=='/apply-e-visa'){
			this.pageName = 'Apply for e-Visa'
		}else if(this.router.url=='/apply-visa-tool'){
			this.pageName = 'Visa apply tool'
		}else if(this.router.url=='/visa-requirements'){
			this.pageName = 'Requirement to apply e-Visa'
		}
	
		if(this.router.url=='/apply-e-visa'+'/'+this.visaReq+'/'+this.visaReq1){
			this.pageName = 'Apply for e-Visa'
			if(this.visaReq!='' && this.visaReq!=null && this.visaReq!=undefined){
				this.visaReqNead = this.visaReq;
				this.country_ctnSet = this.visaReqNead	
			}
	
			if(this.visaReq1!='' && this.visaReq1!=null && this.visaReq1!=undefined){
				var NewvisaReq = this.visaReq1.split('from-')
				if(NewvisaReq.length==2){
					this.visaReqBlong = NewvisaReq[1]
					this.belongCnty = this.visaReqBlong
				}	
			}
		}else if(this.router.url=='/apply-visa-tool'+'/'+this.visaReq){
			this.pageName = 'Visa apply tool'
			if(this.visaReq!='' && this.visaReq!=null && this.visaReq!=undefined){
				var NewvisaReq = this.visaReq.split('-visa-requirements-for-')
				if(NewvisaReq.length==2){
					this.visaReqNead=NewvisaReq[0]
					this.country_ctnSet = this.visaReqNead	
					this.visaReqBlong = NewvisaReq[1]
					this.belongCnty = this.visaReqBlong
				}	
			}
		}else if(this.router.url=='/visa-requirements'+'/'+this.visaReq){
			this.pageName = 'Requirement to apply e-Visa'
			if(this.visaReq!='' && this.visaReq!=null && this.visaReq!=undefined){
				var NewvisaReq = this.visaReq.split('-visa-requirements-for-')
				if(NewvisaReq.length==2){
					this.visaReqNead=NewvisaReq[0]
					this.country_ctnSet = this.visaReqNead	
					this.visaReqBlong = NewvisaReq[1]
					this.belongCnty = this.visaReqBlong
				}	
			}
		}
			
		this.countryShow =JSON.parse(localStorage.getItem('countrylist'));
		if(this.countryShow!=null && this.countryShow!=''){
			this.ngProgress.done();
			this.country = this.countryShow;
			this.belong_to = this.countryShow;
			this.need_visa_for = this.countryShow;
			this.topFiveCNtry = $.grep(this.country, function(item){ 
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
		}else{
			this.countriesListService.countriesList().subscribe(
				data => {
					this.ngProgress.done();
					this.country = data;
					this.belong_to = data;
					this.need_visa_for = data;
					this.topFiveCNtry = $.grep(this.country, function(item){ 
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
				})
		}	


		if(this.belongCnty!='' && this.belongCnty!=null && this.country_ctnSet!='' && this.country_ctnSet!=null)
		{
			
			this.visafor()
			// var cmd=this;
			// let BelongToObj = this.belong_to.filter(function(list){ return list.slug_country_name==cmd.belongCnty;});
			// this.need_visa_for = $.grep(this.need_visa_for, function(item){ return item.name !== BelongToObj[0].name;});
			// this.topCntryTwo = this.topFiveCNtry;
	
			// let nationalityTopTwoPlaceObj = this.topCntryOne.filter(function(list){ return list.slug_country_name==cmd.belongCnty;});
			// this.topCntryTwo = $.grep(this.topCntryTwo, function(item) { 
			// 	if(nationalityTopTwoPlaceObj.length>0){
			// 		return item.name !== nationalityTopTwoPlaceObj[0].name;
			// 	}else{
			// 		return item.name;
			// 	}
			// });


			// let NeedVisaForObj = this.need_visa_for.filter(function(list){ return list.slug_country_name==cmd.country_ctnSet;});
			// this.belong_to = $.grep(this.belong_to, function(item){
			// 	if(NeedVisaForObj.length>0){
			// 		return item.name !== NeedVisaForObj[0].name;
			// 	}else{
			// 		return item.name;
			// 	}	
			// });
			// this.topCntryOne = this.topFiveCNtry;
			// let nationalityTopOnePlaceObj = this.topCntryTwo.filter(function(list){ return list.slug_country_name==cmd.country_ctnSet;});
			// this.topCntryOne = $.grep(this.topCntryOne, function(item) { 
			// 	if(nationalityTopOnePlaceObj.length>0){
			// 		return item.name !== nationalityTopOnePlaceObj[0].name;
			// 	}else{
			// 		return item.name;
			// 	}
			// });

		}
	}

  	changeBelong(listName){
		 this.belongCnty = listName.value;
		// this.need_visa_for = this.country
		// let BelongToObj = this.belong_to.filter(function(list){ return list.slug_country_name==listName.value;});
		// this.need_visa_for = $.grep(this.need_visa_for, function(item){ return item.name !== BelongToObj[0].name;});
		// this.topCntryTwo = this.topFiveCNtry;
		// // this.visafor()
		// let nationalityTopTwoPlaceObj = this.topCntryOne.filter(function(list){ return list.slug_country_name==listName.value;});
		// this.topCntryTwo = $.grep(this.topCntryTwo, function(item) { 
		// 	if(nationalityTopTwoPlaceObj.length>0){
		// 		return item.name !== nationalityTopTwoPlaceObj[0].name;
		// 	}else{
		// 		return item.name;
		// 	}
        // });
		// this.visafor()
		this.check_values();
	}

	changeNeedVisa(listName){
		this.visa_flag = 'assets/images/default1.png';	
		this.visaApplicationService.eVisaSelectCnt(listName).subscribe(
			data =>{
				this.ngProgress.done();
				this.metaTags()
				this.visa_flag = data.country_flag;					
				this.visa_req_sec=true;
				this.cnt_emb=false;
				this.documents_req = data.country_visa.documents_req;
				var faqQuestionAnswer:any;
				this.faqQuestionAnswArry=new Array;
				this.faq = data.country_visa.faq;
				this.intro = data.country_visa.intro;
				this.visa_req = data.country_visa.visa_req;
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
			})
		// this.belong_to = this.country
		// let NeedVisaForObj = this.need_visa_for.filter(function(list){ return list.slug_country_name==listName.value;});
		// this.belong_to = $.grep(this.belong_to, function(item){
		// 	if(NeedVisaForObj.length>0){
		// 		return item.name !== NeedVisaForObj[0].name;
		// 	}else{
		// 		return item.name;
		// 	}	
		// });
		// this.topCntryOne = this.topFiveCNtry;
		// let nationalityTopOnePlaceObj = this.topCntryTwo.filter(function(list){ return list.slug_country_name==listName.value;});
		// this.topCntryOne = $.grep(this.topCntryOne, function(item) { 
		// 	if(nationalityTopOnePlaceObj.length>0){
		// 		return item.name !== nationalityTopOnePlaceObj[0].name;
		// 	}else{
		// 		return item.name;
		// 	}
        // });
	}

	visafor1(listName){
		this.country_ctnSet = listName.value;
		// var cmd=this;
		// let NeedVisaForObj = this.need_visa_for.filter(function(list){ return list.slug_country_name==cmd.country_ctnSet;});
		// 	this.belong_to = $.grep(this.belong_to, function(item){
		// 		if(NeedVisaForObj.length>0){
		// 			return item.name !== NeedVisaForObj[0].name;
		// 		}else{
		// 			return item.name;
		// 		}	
		// 	});
		// 	this.topCntryOne = this.topFiveCNtry;
		// 	let nationalityTopOnePlaceObj = this.topCntryTwo.filter(function(list){ return list.slug_country_name==cmd.country_ctnSet;});
		// 	this.topCntryOne = $.grep(this.topCntryOne, function(item) { 
		// 		if(nationalityTopOnePlaceObj.length>0){
		// 			return item.name !== nationalityTopOnePlaceObj[0].name;
		// 		}else{
		// 			return item.name;
		// 		}
		// 	});
		// this.visafor();
		this.check_values();
	}

	check_values(){
		if(this.belongCnty == undefined || this.belongCnty == ''){
			return;
		}else if(this.country_ctnSet == undefined || this.country_ctnSet == ''){
			return;
		}else{
			if(this.router.url.indexOf('apply-e-visa')>-1){
				var url = this.country_ctnSet+"/from-"+this.belongCnty;
				this.router.navigate(['apply-e-visa/'+url])
				this.visafor();
			}
			else if(this.router.url.indexOf('apply-visa-tool')>-1){
				var url = this.country_ctnSet+"-visa-requirements-for-"+this.belongCnty;
				this.router.navigate(['/apply-visa-tool/'+url])
				this.visafor();
			}
			else if(this.router.url.indexOf('visa-requirements')>-1){
				var url = this.country_ctnSet+"-visa-requirements-for-"+this.belongCnty;
				this.router.navigate(['/visa-requirements/'+url])
				this.visafor();
			}
		}
	}

	visafor(){
		if(this.belongCnty == undefined || this.belongCnty == ''){
			return;
		}else if(this.country_ctnSet == undefined || this.country_ctnSet == ''){
			return;
		}else{
			this.ngProgress.start();
			this.visaUrl = this.country_ctnSet+"-visas-for-"+this.belongCnty;
			this.requirementCountryName = this.country_ctnSet + "/" + this.belongCnty;
			this.visaApplicationService.visaTableList(this.visaUrl).subscribe(
				data => {
					this.visa_flag = 'assets/images/default1.png';
					this.visa_req_sec=false;
					this.cnt_emb=false;
					this.of_country_name = data.to_country_name;
					this.from_country_name = data.from_country_name;
					this.from_country_alternate_name = data.from_country_alternate_name;
					this.to_country_alternate_name = data.to_country_alternate_name;
					if(data.status=='SUCCUSS'){
						this.ngProgress.done();
						this.visaApplyTbl = data.visa
						this.tableViasaToggle = true;
						this.of_country_name = data.to_country_name;
						this.from_country_name = data.from_country_name;
						this.visa_flag = data.country_flag;
						this.country_ctn = data.to_country_name
						if(this.visaApplyTbl[0].visa_type!= 0){
							this.con_visa_req_sec = false;
							if(this.visaApplyTbl.length>1){
								this.visaTypeName = this.visaApplyTbl[0].visa_type+', '+this.visaApplyTbl[1].visa_type
							}else{
								this.visaTypeName = this.visaApplyTbl[0].visa_type
							}
							var cnt_id = data.to_country_slug_name;
							this.tableViasaToggle = true;
							this.tableRequired = false;
							this.tableRegular = false;
							this.changeNeedVisa(cnt_id)
						}else if(this.visaApplyTbl.length == 0){
							this.con_visa_req_sec=false;
							this.tableViasaToggle = false;
							this.tableRequired = false;
							this.tableRegular = true;  
							this.requirementCountry()
						}else if(this.visaApplyTbl[0].visa_not_required!= 0){
							this.con_visa_req_sec=false;
							this.tableRequired = true;
							this.tableRegular = false;
							this.tableViasaToggle = false;
							this.metaTags()
							// this.requirementCountry()
						}else{
							this.con_visa_req_sec=false;
							this.tableRequired = false;
							this.tableRegular = true; 
							this.tableViasaToggle = false;
							this.requirementCountry()
						}
					}else if(data.status=='FAIL'){
						this.con_visa_req_sec=false;
						this.ngProgress.done();
						this.visaApplyTbl = data.visa
						this.tableViasaToggle = false;
						this.tableRequired = false;
						this.tableRegular = true; 
						this.requirementCountry()
					}
				})
		}  
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
				this.countydetails = data.data;
				this.countydetailsNew = data.data;
				this.consulateAd=new Array();
				this.EmbassyAd=new Array()
				this.metaTags()
				if(this.countydetails.length>0){
					this.cnt_emb=true;
					this.visa_req_sec=false;	
					this.con_visa_req_sec=false;
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
					}	
					var cmt=this;
					setTimeout(function(){
						cmt.setemb_map();
					},2000);
				}
				else{
					this.con_visa_req_sec=false;
					this.cnt_emb=false;
					this.visa_req_sec=true;
					this.documents_req=null; 
					this.visa_req=null;
					this.faq=null
					this.intro=null;
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

		if(this.router.url.indexOf('apply-visa-tool')>-1 || this.router.url.indexOf('visa-requirements')>-1){
			this.applyVisaTool()
			return true;
		}

		if(this.visaApplyTbl.length==0 || this.visaApplyTbl[0].visa_required!='0'){
			this.title.setTitle('Sorry, No eVisa available for '+this.from_country_name+', Need a regular '+this.to_country_alternate_name+' Visa from '+this.from_country_name+'');
			this.meta.updateTag({ name:'title',content:'Sorry, No eVisa available for '+this.from_country_name+', Need a regular '+this.to_country_alternate_name+' Visa from '+this.from_country_name+''});	
			this.meta.updateTag({ name:'description',content:'Sorry, No eVisa available for '+this.from_country_name+', Need a regular '+this.to_country_alternate_name+' Visa from '+this.from_country_name+'. Apply for '+this.to_country_alternate_name+' regular Visa from '+this.from_country_name+', You have to apply for a visa through a '+this.of_country_name+' diplomatic mission or one of its authorized visa agents outside '+this.of_country_name+'.'});
			this.meta.updateTag({ name:'keywords',content: 'No eVisa available for '+this.from_country_name+', Apply for '+this.to_country_alternate_name+' regular Visa, '+this.to_country_alternate_name+' Visa application from '+this.from_country_name+', Visa through a '+this.of_country_name+' diplomatic mission, '+this.to_country_alternate_name+' regular Visa'});
		}else if(this.visaApplyTbl[0].visa_not_required!='0'){
			this.title.setTitle('No eVisa to travel '+this.of_country_name+' form '+this.from_country_name+'. No visa required for '+this.of_country_name+' from '+this.from_country_name+'.');
			this.meta.updateTag({ name:'title',content:'No eVisa to travel '+this.of_country_name+' form '+this.from_country_name+'. No visa required for '+this.of_country_name+' from '+this.from_country_name+'.'});	
			this.meta.updateTag({ name:'description',content:'hey, No eVisa to travel '+this.of_country_name+' form '+this.from_country_name+'. No visa required for '+this.of_country_name+' from '+this.from_country_name+'.'});
			this.meta.updateTag({ name:'keywords',content: 'No eVisa to travel '+this.of_country_name+' form '+this.from_country_name+', No '+this.to_country_alternate_name+' Visa, Visa free.'});		
		}else{
			this.title.setTitle('Apply '+this.to_country_alternate_name+' eVisa, '+this.to_country_alternate_name+' eVisa application for '+this.from_country_alternate_name+', '+this.to_country_alternate_name+' eVisa online from '+this.from_country_name+'');
			this.meta.updateTag({ name:'title',content: 'Apply '+this.to_country_alternate_name+' eVisa, '+this.to_country_alternate_name+' eVisa application for '+this.from_country_alternate_name+', '+this.to_country_alternate_name+' eVisa online from '+this.from_country_name+''});	
			this.meta.updateTag({ name:'description',content: 'Get '+this.of_country_name+' eVisa, Apply for '+this.to_country_alternate_name+' eVisa application online, '+this.from_country_alternate_name+'ese Citizens can apply online for '+this.to_country_alternate_name+' e-visa. '+this.visaTypeName});
			this.meta.updateTag({ name:'keywords',content: 'Apply '+this.to_country_alternate_name+' eVisa, '+this.to_country_alternate_name+' eVisa application for '+this.from_country_alternate_name+', '+this.to_country_alternate_name+' eVisa online from '+this.from_country_name+', '+this.to_country_alternate_name+' eVisa, '+this.visaTypeName});		
		}
	}

	applyVisaTool(){
		if(this.visaApplyTbl.length==0 || this.visaApplyTbl[0].visa_required!='0'){
			this.title.setTitle('Visa requirements Check, A regular Visa from '+this.from_country_name+' to travel '+this.of_country_name+' required.');
			this.meta.updateTag({ name:'title',content:'Visa requirements Check, A regular Visa from '+this.from_country_name+' to travel '+this.of_country_name+' required.'});	
			this.meta.updateTag({ name:'description',content:'We check your Visa requirements, A '+this.of_country_name+' regular Visa from '+this.from_country_name+' to travel '+this.of_country_name+' required.'});
			this.meta.updateTag({ name:'keywords',content: 'Visa requirements Check, '+this.of_country_name+' Visa Check, Visa requirements from '+this.from_country_name+', A regular Visa from '+this.from_country_name+'.'});	
		}else if(this.visaApplyTbl[0].visa_not_required!='0'){
			this.title.setTitle('Visa requirements Check, No Visa required from '+this.from_country_name+' to travel '+this.of_country_name+'.');
			this.meta.updateTag({ name:'title',content:'Visa requirements Check, No Visa required from '+this.from_country_name+' to travel '+this.of_country_name+'.'});	
			this.meta.updateTag({ name:'description',content:'We check your Visa requirements, No '+this.of_country_name+' Visa required from '+this.from_country_name+' to travel '+this.of_country_name+'.'});
			this.meta.updateTag({ name:'keywords',content: 'Visa requirements Check, '+this.of_country_name+' Visa Check, Visa requirements from '+this.from_country_name+', No Visa from '+this.from_country_name+'.'});	
		}else{
			this.title.setTitle('Visa requirements Check, A eVisa from '+this.from_country_name+' to travel '+this.of_country_name+' required.');
			this.meta.updateTag({ name:'title',content:'Visa requirements Check, A eVisa from '+this.from_country_name+' to travel '+this.of_country_name+' required.'});	
			this.meta.updateTag({ name:'description',content:'We check your Visa requirements, A '+this.of_country_name+' eVisa from '+this.from_country_name+' to travel '+this.of_country_name+' required.'});
			this.meta.updateTag({ name:'keywords',content: 'Visa requirements Check, '+this.of_country_name+' Visa Check, Visa requirements from '+this.from_country_name+', A eVisa from '+this.from_country_name+'.'});		
		}	
	}

}
