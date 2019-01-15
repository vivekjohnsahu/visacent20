import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news/news.service';
import * as $ from 'jquery';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
  providers: [NewsService]
})
export class NewsDetailComponent implements OnInit {

	constructor(
		public ngProgress: NgProgress,
		private router : ActivatedRoute,
		private routers : Router,
		private newsService:NewsService,
		private meta: Meta,
		private title:Title
	) { }

	Error_page:boolean;
	Error_page_msg:string;
	pageHide:boolean;
	name:any;
	email:any;
	message:any;
	regExEmail="^([a-zA-Z0-9_.]+@[a-zA-Z0-9]+[.][.a-zA-Z]+)$";
	leaveRpy:{};
	suce_sh:boolean;
	suce_msg_sh:string;
	suce_error_sh:boolean;
	error_msg_sh:string;
	newsData:any;
	realted:any
	grecaptcha:any;
	captchaError:boolean;
	captchaError_msg:string;
	newsId:any;
	leatestComments:any;

	ngOnInit() {
		$('#profile_trans').hide();
		this.router.params.subscribe(val => {
		let currentValue = this.router.snapshot.params["value"];
		this.ngProgress.start();
		this.newsService.NewsCurrentValue(currentValue).subscribe(
				data =>{
					this.ngProgress.done();
					if(data.status == 'SUCCESS'){
						this.newsId = data.news.id;
						this.leatestComments = data.news_comments;
						this.newsData = data.news;
						this.title.setTitle(this.newsData.title);
						this.meta.updateTag({ name:'title',content:this.newsData.title});	
						this.meta.updateTag({ name:'description',content:this.newsData.title});
						this.meta.updateTag({ name:'keywords',content: 'visa news, visa services, online visa news, check lates updated about visas, online news about visa, get online visa, online news, application of visa'});
						this.newsData = new Array(this.newsData);
						this.realted = data.news_list;
						this.pageHide = true;
						var ctrlscrol = false;
						$(window).keydown(function(evt) {
							if (evt.which == 17) { 
								ctrlscrol = true;
							}
						}).keyup(function(evt) {
							if (evt.which == 17) {
								ctrlscrol = false;
							}
						});
						$('Toproll').click(function(){	
							if(!ctrlscrol){
								$("html, body").animate({ scrollTop: 0 }, 1000);
							}
						});
					}else if(data.status == 'ERROR'){
						this.Error_page = true;
						this.Error_page_msg = 'Oops! News not found!';
						this.pageHide = true;
					}else{
						// Do nothing;
					}
				})
		})
	
	}
	
	resolved(captchaResponse: string) {
		this.grecaptcha = captchaResponse;
		this.captchaError = false;
    }

	leaveReply(){
		var flag = 0;
		let fild='';
		if(this.name =='' || this.name ==undefined){
			$('.nameBrd').addClass('borderCls');
			flag = 1;
			if(fild=='')
			{
				fild='lbl_name';
			}
		}if(this.email =='' || this.email ==undefined){
			$('.emailBrd').addClass('borderCls');
			flag = 1;
			if(fild=='')
			{
				fild='lbl_email';
			}
		}else if(!(this.email=='') && !this.email.match(this.regExEmail)){
			$('.emailBrd').addClass('borderCls');
			flag = 1;
			if(fild=='')
			{
				fild='lbl_email';
			}
		}if(this.message =='' || this.message ==undefined){
			$('.msgBrd').addClass('borderCls');
			flag = 1;
			if(fild=='')
			{
				fild='lbl_message';
			}
		}if(this.grecaptcha === undefined){
			this.captchaError = true;
			this.captchaError_msg = "Please enter captcha";
			flag = 1;
			if(fild=='')
			{
				fild='lbl_capcha';
			}
		}
		if(flag==1){
			$('html, body').animate({
				scrollTop: $("#"+fild).offset().top
			}, 800);
			return;
		}

		this.leaveRpy = {
			name:this.name,
			email:this.email,
			message:this.message,
			newsId:this.newsId
		}
		
		this.newsService.leaveData(this.leaveRpy).subscribe(
			data => {
				if(data.status=="SUCCESS"){
					this.suce_sh = true;
					this.suce_msg_sh = 'Your reply successfully submit.';
					$('html, body').animate({scrollTop: $("#scr_sus_msg").offset().top}, 800);
					setTimeout(() => {
						$('#myalert').hide()
						this.name=''
						this.email=''
						this.message=''
					}, 2500);
					$('#myalert').show()
				}else{
					// do nothing
				}
			})
	}

	nameRemove(){
		$('.nameBrd').removeClass('borderCls');
	}
	emailRemove(){
		$('.emailBrd').removeClass('borderCls');
	}
	msgRemove(){
		$('.msgBrd').removeClass('borderCls');
	}

}