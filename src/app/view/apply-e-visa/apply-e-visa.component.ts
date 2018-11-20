import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import { VisaApplicationService } from '../../services/visa_application/visa-application.service';
import { CountriesListService } from '../../services/countries_list_home/countries-list.service';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-apply-e-visa',
  templateUrl: './apply-e-visa.component.html',
  styleUrls: ['./apply-e-visa.component.css'],
  providers: [ CountriesListService ]
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
	visa_flag:any;
	question:any;
	answer:any;
	faqQuestionAnswArry:any

	constructor(
		public ngProgress: NgProgress,
		private router:Router,
		private visaApplicationService:VisaApplicationService,
		private routers : ActivatedRoute,
		private countriesListService:CountriesListService,
		private meta: Meta,
		private title:Title
	) {
		this.title.setTitle('Apply For e-Visa | Applying Visa Online | Online Visa application form');
		this.meta.updateTag({ name:'description',content:'Apply For e-Visa, Applying Visa Online, Online Visa application form, visa application, work visa, tourist visa, travel visa, apply for visa, apply for visa online, visa legal services, get visa online, online visa'});
		this.meta.updateTag({ name:'keywords',content:'You can apply visa online following just simple step, fill online visa application from, receive visa via email and enter destination where you want to go.'});
	}

	ngOnInit() {
		this.ngProgress.start();
		$('#profile_trans').hide();
		this.routers.params.subscribe(val => {
			this.visaReq = this.routers.snapshot.params["id"];
		})

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
		this.country_ctnSet = listName.value;
		this.visaApplicationService.eVisaSelectCnt(this.country_ctnSet).subscribe(
			data =>{
				this.ngProgress.done();
				this.selectChangeCntry=true;
				this.documents_req = data.country_visa.documents_req;
				var faqQuestionAnswer:any;
				this.faqQuestionAnswArry=new Array
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
			})
		this.belong_to = this.country
		let NeedVisaForObj = this.need_visa_for.filter(function(list){ return list.slug_country_name==listName.value;});
		this.belong_to = $.grep(this.belong_to, function(item){ return item.name !== NeedVisaForObj[0].name;});
		this.topCntryOne = this.topFiveCNtry;
		this.visafor()
		let nationalityTopOnePlaceObj = this.topCntryTwo.filter(function(list){ return list.slug_country_name==listName.value;});
		this.topCntryOne = $.grep(this.topCntryOne, function(item) { 
            return item.name !== nationalityTopOnePlaceObj[0].name;
        });
		this.visafor()
	}

	visafor(){
		if(this.belongCnty == undefined || this.belongCnty == ''){
			return;
		}else if(this.country_ctnSet == undefined || this.country_ctnSet == ''){
			return;
		}else{
			this.ngProgress.start();
			this.visaUrl = this.country_ctnSet+"-visas-for-"+this.belongCnty;
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
