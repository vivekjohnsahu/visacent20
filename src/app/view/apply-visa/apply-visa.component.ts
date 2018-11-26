import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import { VisaApplicationService } from '../../services/visa_application/visa-application.service';
import { CountriesListService } from '../../services/countries_list_home/countries-list.service';
import { EmbassiesCityDetailsService } from '../../services/embassies_city_details/embassies-city-details.service'

@Component({
  selector: 'app-apply-visa',
  templateUrl: './apply-visa.component.html',
  styleUrls: ['./apply-visa.component.css'],
  providers: [ CountriesListService, EmbassiesCityDetailsService ]
})
export class ApplyVisaComponent implements OnInit {

	constructor(
		public ngProgress: NgProgress,
			private router:Router,
			private visaApplicationService:VisaApplicationService,
			private routers : ActivatedRoute,
			private countriesListService:CountriesListService,
			private embassiesCityDetailsService:EmbassiesCityDetailsService
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

  	ngOnInit() {
		this.ngProgress.start();
		$('#profile_trans').hide();
		this.routers.params.subscribe(val => {
			this.country_ctn = this.routers.snapshot.params["value"]
			this.visaApplicationService.visaSelectCnt(this.country_ctn).subscribe(
				data =>{
					this.ngProgress.done();
					this.pageHide=true;
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
				})
		})
		this.countryShow =JSON.parse(localStorage.getItem('countrylist'));
		if(this.countryShow!=null || this.countryShow!=''){
			this.country = this.countryShow;
		}else{
			this.countriesListService.countriesList().subscribe(
				data => {
					this.country = data;
				})
		}

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
	}
	  
	changeCuntry(listName){
		this.ngProgress.start();
		this.bnewCnty = listName.value;
		this.visaUrl = this.country_ctn+"-visas-for-"+this.bnewCnty;
		this.Errortable = false;
		this.visaApplicationService.visaTableList(this.visaUrl).subscribe(
			data => {
				if(data.status=='SUCCUSS'){
					this.ngProgress.done();
					this.visaApplyTbl = data.visa
					this.tableViasaToggle = true;
					if(this.visaApplyTbl.length == 0){
						this.tableViasaToggle = false;
						this.tableRequired = false;
						this.tableRegular = true; 
					}else if(this.visaApplyTbl[0].visa_type!= 0){
						this.tableViasaToggle = true;
						this.tableRequired = false;
						this.tableRegular = false;
					}else if(this.visaApplyTbl[0].visa_not_required!= 0){
						this.tableRequired = true;
						this.tableRegular = false;
						this.tableViasaToggle = false;
					}else{
						this.Errortable = true;
						this.tableRequired = false;
						this.tableRegular = true; 
						this.tableViasaToggle = false;
					}
				}else if(data.status=='FAIL'){
					this.ngProgress.done();
					this.tableViasaToggle = false;
					this.tableRequired = false;
					this.tableRegular = true;  
				}
			})
			this.requirementCountryName = this.country_ctn + '/' + this.bnewCnty;
			this.requirementCountry()
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
				if(this.countydetailsNew=='' && this.tableViasaToggle==false){
					this.Errortable = true;
				}
				this.consulateAd=new Array();
				this.EmbassyAd=new Array()
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
						this.countydetailsNew[i].phoneM1 = this.phoneM;
						this.countydetailsNew[i].lnthTelepone=1;
					}else{
						this.countydetailsNew[i].lnthTelepone=0;	
					}

					if(this.countydetailsNew[i].Fax!=null && $.trim(this.countydetailsNew[i].Fax)!='' && $.trim(this.countydetailsNew[i].Fax)!=' '){
						this.faxMulti = this.countydetailsNew[i].Fax;
						this.faxMultiM =this.faxMulti.split('<br />');
						this.countydetailsNew[i].faxMultiM1 = this.faxMultiM;
						this.countydetailsNew[i].lnthFax=1;
					}else{
						this.countydetailsNew[i].lnthFax=0;	
					}
		
					if(this.countydetailsNew[i].E_maiil!=null && $.trim(this.countydetailsNew[i].E_maiil)!='' && $.trim(this.countydetailsNew[i].E_maiil)!=' '){
						this.emaiMulti = this.countydetailsNew[i].E_maiil;
						this.emaiM =this.emaiMulti.split('<br />');
						this.countydetailsNew[i].emaiM1 = this.emaiM;
						this.countydetailsNew[i].lnthE_maiil=1;
					}else{
						this.countydetailsNew[i].lnthE_maiil=0;	
					}

					if(this.countydetailsNew[i].website!=null && $.trim(this.countydetailsNew[i].website)!='' && $.trim(this.countydetailsNew[i].website)!=' '){
						this.websiteMulti = this.countydetailsNew[i].website;
						this.websiteM =this.websiteMulti.split('<br />');
						this.countydetailsNew[i].websiteM1 =this.websiteM;
						this.countydetailsNew[i].lnthwebsite=1;
					}else{
						this.countydetailsNew[i].lnthwebsite=0;	
					}
				}			
			})
	}


}
