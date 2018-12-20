import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { NewsService } from '../../services/news/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsService]
})
	export class NewsComponent implements OnInit {

	constructor(
		public ngProgress: NgProgress,
		private newsService:NewsService,
		private router : ActivatedRoute,
		private routers : Router,
		private meta: Meta,
		private title:Title
	) { }

	Error_page:boolean;
	Error_page_msg:string;
	pageHide:boolean;
	newsList:any;

	pages : any = [];
	pageSize =3;
	pageNumber : number = 0;
	currentPage : number = 0;
	pagesIndex : Array<number>;
	pageStart : any = 1;
	current_product = []; 
	startIndex: number = 0;
	arrIndex:number=1;

	ngOnInit() {
		this.ngProgress.start();
		$('#profile_trans').hide();
		this.newsService.NewsData().subscribe(
		data => {
				if(data.status=='SUCCESS'){
					this.ngProgress.done();
					this.newsList = data.news_list;
					this.pageHide = true;
					this.title.setTitle('Check Latest Updated About Visas | Online Visa News');
					this.meta.updateTag({ name:'title',content:'Check Latest Updated About Visas | Online Visa News'});	
					this.meta.updateTag({ name:'description',content:'Read latest news about visa related from this platform, we provide latest and updated news about visa related and also provide visa services of any country.'});
					this.meta.updateTag({ name:'keywords',content: 'visa news, visa services, online visa news, check lates updated about visas, online news about visa, get online visa, online news, application of visa'});
					this.current_product = this.newsList.slice(this.startIndex,this.startIndex+this.pageSize);
					this.currentPage = 1;
					this.pageStart = 1;
					this.pageNumber = parseInt(""+ (this.newsList.length / this.pageSize));
					if(this.newsList.length % this.pageSize != 0){
						this.pageNumber ++;
					}
					while(this.arrIndex<=this.pageNumber){
						this.pages.push(this.arrIndex);
						this.arrIndex++;
					}
				}else if(data.status=='ERROR'){
					this.ngProgress.done();
					this.Error_page = true;
					this.Error_page_msg = 'Oops! News not found!'
					this.pageHide = true;
				}
			})

	}

	prevPage(){
		if(this.currentPage>1){
		   this.currentPage --;
		} 
		if(this.currentPage < this.pageStart){
		   this.pageStart = this.currentPage;
		}
		this.startIndex = (this.currentPage-1)*this.pageSize;
		this.current_product = this.newsList.slice(this.startIndex,this.startIndex+this.pageSize);
	}

	nextPage(){
		if(this.currentPage < this.pageNumber){
			  this.currentPage ++;
		}
		if(this.currentPage >= (this.pageStart + this.pages)){
		   this.pageStart = this.currentPage - this.pages + 1;
		}
		this.startIndex = (this.currentPage-1)*this.pageSize;
		this.current_product = this.newsList.slice(this.startIndex,this.startIndex+this.pageSize);
	}

	setPage(index : number){
		$('html, body').animate({scrollTop: $("#topScreen").offset().top}, 2000);
		this.currentPage = index;
		this.startIndex = (this.currentPage-1)*this.pageSize;
		this.current_product = this.newsList.slice(this.startIndex,this.startIndex+this.pageSize);
	  }

}
