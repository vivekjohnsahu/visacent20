import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import { VisaApplicationService } from '../../services/visa_application/visa-application.service';
import { CountriesListService } from '../../services/countries_list_home/countries-list.service';

@Component({
  selector: 'app-apply-visa',
  templateUrl: './apply-visa.component.html',
  styleUrls: ['./apply-visa.component.css'],
  providers: [ CountriesListService ]
})
export class ApplyVisaComponent implements OnInit {

	constructor(
		public ngProgress: NgProgress,
			private router:Router,
			private visaApplicationService:VisaApplicationService,
			private routers : ActivatedRoute,
			private countriesListService:CountriesListService
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
	faqQuestionAnswArry:any

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

}
