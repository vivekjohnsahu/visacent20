import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { NewsService } from '../../services/news/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';

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
		private routers : Router
	) { }

	Error_page:boolean;
	Error_page_msg:string;
	pageHide:boolean;
	newsList:any;

	pages : any = [];
	pageSize =2;
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

	// continueReading(value){
	// 	this.routers.navigate(['news',value]);
	// }

	// realtedPost(value){
	// 	this.routers.navigate(['news',value]);
	// }

	prevPage(){
		// $('html, body').animate({scrollTop: $("#topScreen").offset().top}, 2000);
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
		// $('html, body').animate({scrollTop: $("#topScreen").offset().top}, 2000);
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
