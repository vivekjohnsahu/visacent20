import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { RefferalService } from '../../services/refferal/refferal.service';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-refferal',
  templateUrl: './refferal.component.html',
  styleUrls: ['./refferal.component.css']
})
export class RefferalComponent implements OnInit {

  constructor(
	  private refferalService:RefferalService,
	  private meta: Meta,
	  private title:Title
  ) { 
	this.title.setTitle('Make money through network, invite your friends, Earn $10 for refer');
	this.meta.updateTag({ name:'title',content:'Make money through network, invite your friends, Earn $10 for refer'});	
	this.meta.updateTag({ name:'description',content:'Make money through your network, invite your friends and Earn $10 for every new applicant you refer, Nobody can tell the our story better than our customers. Get a friend to start apply for a visa today and earn $10 when they complete their first application. '});
	this.meta.updateTag({ name:'keywords',content:'Make money through network, invite your friends, Earn $10 for refer'});	  
  }

  email:any;
  regExEmail="^([a-zA-Z0-9_.]+@[a-zA-Z0-9]+[.][.a-zA-Z]+)$";
  refferalShow:boolean;
  refferal:any;
  textCopyCompleteCent:boolean;
  textCopyCompleteIndia:boolean;
  process:boolean;
  isN:any;
  isnewUser:boolean;
  refferalCountry='visacent';
  indiaevisas_referral:any;
  grecaptcha:any;
  captchaError:boolean;
  captchaError_msg:any;
  BonusAmount:any;

	ngOnInit() {
		$(document).ready(function () {
			$(document).ready(function () {
				var $accord = $('.open');
				$(".new").click(function () {
				var $ans = $(this).next(".open").slideToggle();
				});
				$(".new").click(function(){
					$(this).find("i").toggleClass("rotate");								
				});
				$("#last_faq_a").click(function(){
					$(this).toggleClass("border-bottom");
				});
			});
		});

		this.getBonusAmount()
	}

	refferalUser(){
		let flag=0;
		if(this.email=='' || this.email==null || this.email==undefined){
			$('.emailCls').addClass('borderColor');
			flag=1;
		}else if(!this.email.match(this.regExEmail)){
			$(".emailCls").addClass("borderColor");
			flag=1;
		}if(this.grecaptcha === undefined){
			this.captchaError = true;
			this.captchaError_msg = "Please enter captcha"
			flag=1;
		}if(flag==1){
			return;
		}

		this.process = true;
		var email = {
			email:this.email,
			refferalCountry:this.refferalCountry
		}	

		this.refferalService.refferalEmail(email).subscribe(
			data => {
				if(data.status=="SUCCESS"){
					this.process = false;
					this.refferalShow = true;
					this.refferal = data.referral;
					this.indiaevisas_referral = data.indiaevisas_referral;
					this.isN = data.isN;
					if(this.isN==1){
						this.isnewUser = true;
					}
				}else if(data.status=="ERROR"){
					this.process = false;
					// do nothing
				}else{
					// do nothing
				}	
			})
			
	}

	removclsAppli(){
		$('.emailCls').removeClass('borderColor');
	}

	copyToClipboard(element) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($(element).text()).select();
		document.execCommand("copy");
		$temp.remove();
		this.textCopyCompleteCent = true;
		setTimeout(() => {
			this.textCopyCompleteCent = false;
		}, 800);
	}

	copyToClipboar2(element){
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($(element).text()).select();
		document.execCommand("copy");
		$temp.remove();
		this.textCopyCompleteIndia = true;
		setTimeout(() => {
			this.textCopyCompleteIndia = false;
		}, 800);
	}
	
	resolved(captchaResponse: string) {
		this.grecaptcha = captchaResponse;
		this.captchaError = false;
	}

	getBonusAmount(){
		this.refferalService.bonusAmount().subscribe(
			data =>{
				if(data.status="status"){
					this.BonusAmount = data.amount;
				}else{
					this.BonusAmount = '10';
				}
			})
	}

}
