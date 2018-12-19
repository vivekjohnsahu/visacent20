import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import * as $ from 'jquery';
import { NgProgress } from 'ngx-progressbar';
import { CountriesListService } from '../../services/countries_list_home/countries-list.service';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [ CountriesListService ]
})

export class HomePageComponent implements OnInit {

	nationality:any;
	travelling:any;
	country:any;
	nationalityOne:any;
	travellingTwo:any;
	visaUrl:any;
	loaderShow:boolean;
	countryOne: any;
	ShapeTwocountry:any;
	ShapeOnecountry:any;
	countryTwo:any;
	loaderShow_first = true;
	loaderShow_second = true;
	cntList:any;
	topCntryTwo:any;
	topCntryOne:any;
	topFiveCNtry=[];
	country_id:any;

	constructor(
		private router:Router,
		private routers:ActivatedRoute,
		public ngProgress: NgProgress,
		private countriesListService:CountriesListService,
		private meta: Meta,
		private title:Title

	) { 
		this.title.setTitle('Apply for a Visa | Online Visa Application | Expedited Visa Services | Most Sought Visas');
		this.meta.updateTag({ name:'description',content:'Apply for a Visa, Online Visa Application, Expedited Visa Services, Most Sought Visas, apply business and tourist visa, visa and immigration services, visa processing services, expedited visa services, apply for an expedited visa services, visa company, expedited business visa services, tourist expedited visa services, international visa services, myvisa visa services'});
		this.meta.updateTag({ name:'keywords',content:'Apply for a Visa, Online Visa Application, Most Sought Visas. VisaCent commits to deliver open information on visa requirements for all the countries.'});

	}

	ngOnInit() {
		this.ngProgress.start();
		$('#profile_trans').hide();
		setTimeout(() => {
			this.cntList =JSON.parse(localStorage.getItem('countrylist'));
			if(this.cntList!="" && this.cntList!=undefined){
				this.ngProgress.done();
				this.country = this.cntList;
				this.countryOne = this.cntList;
				this.countryTwo = this.cntList;
			}else{
				this.countriesListService.countriesList().subscribe(
					data => {
						this.ngProgress.done();
						this.country = data;
						this.countryOne = this.cntList;
						this.countryTwo = this.cntList;
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
		}, 2000);

		this.routers.params.subscribe(val => {
		this.country_id = this.routers.snapshot.params["Id"];
			if(this.country_id==null || this.country_id=='' || this.country_id==undefined){
				// do nothing
			}else{
				$('html, body').animate({
				scrollTop: $("#scrollTable").offset().top}, 500);
			}
		})
	}
				
	changeShapeOne(listName){
        this.loaderShow_second = true;
        this.nationality = listName.value;
        this.countryTwo = this.country
        let nationalityTwoPlaceObj = this.countryOne.filter(function(list){ return list.slug_country_name==listName.value;});
        this.countryTwo = $.grep(this.countryTwo, function(item) {
			if(nationalityTwoPlaceObj.length>0){
				return item.name !== nationalityTwoPlaceObj[0].name;
			}else{
				return item.name;
			}
		});
		this.visaTable()
		this.topCntryTwo = this.topFiveCNtry;
		let nationalityTopTwoPlaceObj = this.topCntryOne.filter(function(list){ return list.slug_country_name==listName.value;});
		this.topCntryTwo = $.grep(this.topCntryTwo, function(item) { 
			if(nationalityTopTwoPlaceObj.length>0){
				return item.name !== nationalityTopTwoPlaceObj[0].name;
			}else{
				return item.name;
			}
        });
        this.visaTable()
	}
	
	changeShapeTwo(listName){
		this.loaderShow_first = true;
		this.travelling = listName.value;
		this.countryOne = this.country
		let nationalityOnePlaceObj = this.countryTwo.filter(function(list){ return list.slug_country_name==listName.value;});
		this.countryOne = $.grep(this.countryOne, function(item) { 
            return item.name !== nationalityOnePlaceObj[0].name;
		});
		this.visaTable()
		this.topCntryOne = this.topFiveCNtry;
		let nationalityTopOnePlaceObj = this.topCntryTwo.filter(function(list){ return list.slug_country_name==listName.value;});
		this.topCntryOne = $.grep(this.topCntryOne, function(item) { 
            return item.name !== nationalityTopOnePlaceObj[0].name;
        });
        this.visaTable()
	}

	visaTable(){
		if(this.nationality == undefined){
			this.nationalityOne=false;
		}else if(this.travelling == undefined){
			this.travellingTwo=false;
		}else{
			this.visaUrl = this.travelling+"-visas-for-"+this.nationality;
			this.router.navigate(["requirement",this.visaUrl]);
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		}  
	}
	
	getCntyName(cty){
		this.router.navigate(["apply-visa",cty]);
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}

}