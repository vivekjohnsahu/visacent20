import { Component, OnInit } from '@angular/core';
import { VisaApplicationService } from '../../services/visa_application/visa-application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CountriesListService } from '../../services/countries_list_home/countries-list.service';
import * as $ from 'jquery'; 
import { NgProgress } from 'ngx-progressbar';
import { Meta, Title} from '@angular/platform-browser';
import { EmbassiesCityDetailsService } from '../../services/embassies_city_details/embassies-city-details.service'

@Component({
  selector: 'app-visa-table',
  templateUrl: './visa-table.component.html',
  styleUrls: ['./visa-table.component.css'],
  providers: [ VisaApplicationService, CountriesListService]
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
		private embassiesCityDetailsService:EmbassiesCityDetailsService
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

  	ngOnInit(){
		this.ngProgress.start();
		$('#profile_trans').hide();
		$(document).ready(function(){
			$(".filter").click(function(){
				$('html,body').animate({ scrollTop: $('#link_slid').offset().top},'slow');
			});
		});
		
		this.cntList =JSON.parse(localStorage.getItem('countrylist'));
		if(this.cntList!="" || this.cntList!=undefined){
			this.ngProgress.done();
			this.country = this.cntList;
			this.countryOne = this.cntList;
			this.countryTwo = this.cntList;
		}else{
			this.countriesListService.countriesList().subscribe(
				data => {
					this.ngProgress.done();
					this.country = data;
					this.countryOne = data;
					this.countryTwo = data;
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
		this.visaAllDetails()
		
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
					
					if(this.visaTable.length == 0){
						this.Errortable = true;
						this.tableShow = false;
						this.tableRequired = false;
						this.tableRegular = true;  
						this.dataShow = false;
					}else if(this.visaTable[0].visa_type!= 0){
						this.Errortable = false;
						this.tableShow = true;
						this.tableRequired = false;
						this.tableRegular = false;
						this.dataShow = false;
					}else if(this.visaTable[0].visa_not_required!= 0){
						this.Errortable = false;
						this.tableShow = false;
						this.tableRequired = true;
						this.tableRegular = false;
						this.dataShow = false;
					}else{
						this.Errortable = true;
						this.tableShow = false;
						this.tableRequired = false;
						this.tableRegular = true; 
						this.dataShow = false;
					}
					this.requirementCountry()
					this.selectDropCtry()
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
		this.dataShow = true;
		this.nationalityChange = listName.value;
		this.requirementCountryName = this.travellingChange + '/' + this.nationalityChange;
		this.countryTwo = this.country
		let nationalityTwoPlaceObj = this.countryOne.filter(function(list){ return list.slug_country_name==listName.value;});
        this.countryTwo = $.grep(this.countryTwo, function(item) { 
            return item.name !== nationalityTwoPlaceObj[0].name;
		});
		this.snapOne()
		this.topCntryTwo = this.topFiveCNtry;
		let nationalityTopTwoPlaceObj = this.topCntryOne.filter(function(list){ return list.slug_country_name==listName.value;});
		this.topCntryTwo = $.grep(this.topCntryTwo, function(item) { 
            return item.name !== nationalityTopTwoPlaceObj[0].name;
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
		this.dataShow = true;
		this.travellingChange = listName.value;
		this.requirementCountryName = this.travellingChange + '/' + this.nationalityChange;
		this.countryOne = this.country
		let nationalityOnePlaceObj = this.countryTwo.filter(function(list){ return list.slug_country_name==listName.value;});
		this.countryOne = $.grep(this.countryOne, function(item) { 
            return item.name !== nationalityOnePlaceObj[0].name;
		});
		this.snapTwo()
		this.topCntryOne = this.topFiveCNtry;
		let nationalityTopOnePlaceObj = this.topCntryTwo.filter(function(list){ return list.slug_country_name==listName.value;});
		this.topCntryOne = $.grep(this.topCntryOne, function(item) { 
            return item.name !== nationalityTopOnePlaceObj[0].name;
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
	}

	ChangeBottom(i){
		this.visaTeblerequirements = this.visaTable[i]
		// $('html, body').animate({
		// 	scrollTop: $("#scrollTable").offset().top}, 1500);
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
			})
	}

}
