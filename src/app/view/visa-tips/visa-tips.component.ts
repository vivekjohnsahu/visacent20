import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import { VisaApplicationService } from '../../services/visa_application/visa-application.service';
import { CountriesListService } from '../../services/countries_list_home/countries-list.service';
import { Meta, Title} from '@angular/platform-browser';
import { EmbassiesCityDetailsService } from '../../services/embassies_city_details/embassies-city-details.service'

@Component({
  selector: 'app-visa-tips',
  templateUrl: './visa-tips.component.html',
  styleUrls: ['./visa-tips.component.css'],
  providers: [ CountriesListService, VisaApplicationService, EmbassiesCityDetailsService ]
})
export class VisaTipsComponent implements OnInit {

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
	visa_flag:any;
	question:any;
	answer:any;
	faqQuestionAnswArry:any;
	con_visa_req_sec:boolean;
	requirementCountryName:any;
	cnt_emb:boolean;
	visa_req_sec:boolean;
	of_country_name:boolean;
	from_country_name:boolean;
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
	currentId:any;
	currentIdBlong:any;
	currentIdNead:any;

	constructor(
		public ngProgress: NgProgress,
		private router:Router,
		private visaApplicationService:VisaApplicationService,
		private routers : ActivatedRoute,
		private countriesListService:CountriesListService,
		private meta: Meta,
		private title:Title,
		private embassiesCityDetailsService:EmbassiesCityDetailsService
	) {}
	
  ngOnInit() {
	$('#profile_trans').hide();
	this.title.setTitle('Apply For e-Visa | Applying Visa Online | Online Visa application form');
	this.meta.updateTag({ name:'description',content:'Apply For e-Visa, Applying Visa Online, Online Visa application form, visa application, work visa, tourist visa, travel visa, apply for visa, apply for visa online, visa legal services, get visa online, online visa'});
	this.meta.updateTag({ name:'keywords',content:'You can apply visa online following just simple step, fill online visa application from, receive visa via email and enter destination where you want to go.'});
	this.visa_flag = 'assets/images/default1.png';
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	this.cnt_emb=false;
	this.visa_req_sec=false;
	this.con_visa_req_sec=true;
	this.routers.params.subscribe(val => {
		this.currentId = this.routers.snapshot.params["id"];
	})
	if(this.currentId!='' && this.currentId!=null && this.currentId!=undefined){
		this.currentId = this.currentId.split('-visa-application-from-')
		this.currentIdBlong = this.currentId[1]
		this.currentIdNead = this.currentId[0]
		this.country_ctnSet = this.currentIdNead;
		this.belongCnty = this.currentIdBlong;
		this.visafor()
	}
    this.countryShow =JSON.parse(localStorage.getItem('countrylist'));
		if(this.countryShow!=null || this.countryShow!=''){
			this.ngProgress.done();
			this.country = this.countryShow;
			this.belong_to = this.countryShow;
			this.need_visa_for = this.countryShow;
		}else{
			this.countriesListService.countriesList().subscribe(
				data => {
					this.ngProgress.done();
					this.country = data;
					this.belong_to = data;
					this.need_visa_for = data;
				})
		}

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
		this.visafor()

	}

	changeBelong(listName){
		this.belongCnty = listName.value;
		this.need_visa_for = this.country
		let BelongToObj = this.belong_to.filter(function(list){ return list.slug_country_name==listName.value;});
		this.need_visa_for = $.grep(this.need_visa_for, function(item){ return item.name !== BelongToObj[0].name;});
		this.topCntryTwo = this.topFiveCNtry;
		this.visafor()
		let nationalityTopTwoPlaceObj = this.topCntryOne.filter(function(list){ return list.slug_country_name==listName.value;});
		this.topCntryTwo = $.grep(this.topCntryTwo, function(item) { 
            return item.name !== nationalityTopTwoPlaceObj[0].name;
        });
		this.visafor()
	}

	changeNeedVisa(listName){
		this.visa_flag = 'assets/images/default1.png';	
		this.visaApplicationService.eVisaSelectCnt(listName).subscribe(
			data =>{
				this.ngProgress.done();
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
		this.belong_to = this.country
		let NeedVisaForObj = this.need_visa_for.filter(function(list){ return list.slug_country_name==listName.value;});
		this.belong_to = $.grep(this.belong_to, function(item){ return item.name !== NeedVisaForObj[0].name;});
		this.topCntryOne = this.topFiveCNtry;
		let nationalityTopOnePlaceObj = this.topCntryTwo.filter(function(list){ return list.slug_country_name==listName.value;});
		this.topCntryOne = $.grep(this.topCntryOne, function(item) { 
            return item.name !== nationalityTopOnePlaceObj[0].name;
        });
	}

	visafor1(listName){
		this.country_ctnSet = listName.value;
		this.visafor();
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
					if(data.status=='SUCCUSS'){
						this.ngProgress.done();
						this.visaApplyTbl = data.visa
						this.metaTags()
						this.tableViasaToggle = true;
						this.of_country_name = data.to_country_name;
						this.from_country_name = data.from_country_name;
						this.visa_flag = data.country_flag;
						if(this.visaApplyTbl[0].visa_type!= 0){
							this.con_visa_req_sec = false;
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
							this.requirementCountry()
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

	metaTags(){
		if(this.visaApplyTbl[0].visa_required!='0'){
			this.title.setTitle('Tips for '+this.country_ctnSet+' visa application from '+this.belongCnty+', A regular visa required application required in advance.');
			this.meta.updateTag({ name:'title',content:'Tips for '+this.country_ctnSet+' visa application from '+this.belongCnty+', A regular visa required application required in advance.'});	
			this.meta.updateTag({ name:'description',content:'Tips for '+this.country_ctnSet+' visa application from '+this.belongCnty+'. Citizens of the '+this.belongCnty+' must obtain a visa in advance. You have to apply for a visa through a '+this.country_ctnSet+' diplomatic mission or one of its authorized visa agents outside '+this.country_ctnSet+'.'});
			this.meta.updateTag({ name:'keywords',content: 'Tips for '+this.country_ctnSet+' visa, '+this.country_ctnSet+' Visa, Apply for '+this.country_ctnSet+' Visa, '+this.country_ctnSet+' regular visa from '+this.belongCnty+', regular visa required, '+this.country_ctnSet+' visa.'});
		}else if(this.visaApplyTbl[0].visa_not_required!='0'){
			this.title.setTitle( this.belongCnty+' Citizens do not required a visa to travel '+this.country_ctnSet+'. Travel Visa requirements');
			this.meta.updateTag({ name:'title',content: this.belongCnty+' Citizens do not required a visa to travel '+this.country_ctnSet+'. Travel Visa requirements'});	
			this.meta.updateTag({ name:'description',content: this.belongCnty+' Citizens do not required a visa to travel '+this.country_ctnSet+'. No Visa visa required to travel to '+this.country_ctnSet+'.'});
			this.meta.updateTag({ name:'keywords',content: this.belongCnty+' Citizens travel '+this.country_ctnSet+'. '+this.belongCnty+' Citizens visa for '+this.country_ctnSet+', visa for '+this.country_ctnSet+', '+this.country_ctnSet+' visa.'});	
		}else{
			this.title.setTitle('Tips for '+this.country_ctnSet+' e-visa application from '+this.belongCnty+', A e-visa required required in advance.');
			this.meta.updateTag({ name:'title',content:'Tips for '+this.country_ctnSet+' e-visa application from '+this.belongCnty+', A e-visa required required in advance.'});	
			this.meta.updateTag({ name:'description',content:'Tips for '+this.country_ctnSet+' e-visa application from '+this.belongCnty+'. Citizens of the '+this.belongCnty+' must obtain a visa in advance. You have to apply online or through a '+this.country_ctnSet+' diplomatic mission.'});
			this.meta.updateTag({ name:'keywords',content: 'Tips for '+this.country_ctnSet+' e-visa application, '+this.country_ctnSet+' e-Visa, Apply for '+this.country_ctnSet+' e-Visa, '+this.country_ctnSet+' e-visa from '+this.belongCnty+', '+this.country_ctnSet+' visa.'});
		}
	}

}
