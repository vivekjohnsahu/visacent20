import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { LoginService } from '../../services/login/login.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {

	constructor
	(
		private loginService:LoginService,
		private router : Router,
		private meta: Meta,
		private title:Title
	) 
	{
		var user = JSON.parse(localStorage.getItem('user'));
		if(!(user) || user==null || !(user.access_token) || user.access_token == '' || !(user.user_id) || user.user_id == ''){
			localStorage.removeItem('user');
			localStorage.removeItem('access_token');
			localStorage.removeItem('userData');
			
		}else{
			this.router.navigate(['my-profile'])
		}
	}

	loginpage:boolean;
	Email:any
	Password:any
	regExEmail="^([a-zA-Z0-9_.]+@[a-zA-Z0-9]+[.][.a-zA-Z]+)$";
	loginData:{};
	EmailForgot:any;
	genral:{};
	forgot_msg:any;
	forgot_msg_sus:boolean;
	email:{};
	login_msg_sus:boolean;
	login_msg:any;
	forgot_msg_error:boolean;
	forgot_error_msg:string;
	process:boolean;
	returnUrl:any;

    ngOnInit() {
		$('#profile_trans').hide();
		this.title.setTitle('Login to Visacent account | Apply for a Visa | Visacent');
		this.meta.updateTag({ name:'title',content:'Login to Visacent account | Apply for a Visa | Visacent'});
		this.meta.updateTag({ name:'description',content:'Login to Visacent account | Apply for a Visa | Visacent'});
		this.meta.updateTag({ name:'keywords',content:'Login to Visacent account | Apply for a Visa | Visacent'});
	}
	
	loginUser(){
		var flag = 0;
		let fild='';
		if(this.Email == "" || this.Email == undefined){
			$(".removeGmail").addClass("borderColor");
			flag = 1;
			if(fild=='')
			{
				fild='lbl_email';
			}	
		}if(!this.Email.match(this.regExEmail)){
			$(".removeGmail").addClass("borderColor");
			flag = 1;
			if(fild=='')
			{
				fild='lbl_email';
			}
		}if(this.Password == "" || this.Password == undefined){
			$(".removePassword").addClass("borderColor");
			flag = 1;
			if(fild=='')
			{
				fild='lbl_password';
			}
		}if(flag==1){
			$('html, body').animate({
				scrollTop: $("#"+fild).offset().top
			}, 800);
			return;
		}
		this.process = true;
		var navbar_pro=1;
		this.loginData={
			email:this.Email,
			password:this.Password,
		}

		this.loginService.loginDetails(this.loginData).subscribe(
			data =>{
				this.process = false;
				if(data.status == 'SUCCESS'){
					localStorage.setItem('user',JSON.stringify(data));
					localStorage.setItem('navbar_pro',JSON.stringify(navbar_pro=1));
					this.router.navigate(["my-profile"]);
				}else if(data.status == 'ERROR'){
					this.login_msg_sus = true;
					this.login_msg = 'Username or Password is wrong.';
					setTimeout(() => {
						$('html, body').animate({scrollTop: $("#myalert").offset().top}, 800);						
					}, 500);
				}
			})
	}

	emailForgotPg(){
		var flag = 0;
		let fild='';
		if(this.EmailForgot == "" || this.EmailForgot == undefined){
			$(".removeGmailForgot").addClass("borderColor");
			flag = 1;
			if(fild=='')
			{
				fild='lbl_forgot_email';
			}	
		}else if(!this.EmailForgot.match(this.regExEmail)){
			$(".removeGmailForgot").addClass("borderColor");
			flag = 1;
			if(fild=='')
			{
				fild='lbl_forgot_email';
			}	
		}if(flag==1){
			$('html, body').animate({
				scrollTop: $("#"+fild).offset().top
			}, 800);
			return;
		}

		this.email={
			email:this.EmailForgot,
		}

		this.loginService.forgotDetails(this.email).subscribe(
			data =>{
				if(data.status == 'SUCCESS'){
					this.forgot_msg_sus = true;
					this.forgot_msg = 'Please check your email. Password has been sent to your mail.';
					setTimeout(() => {
						$('html, body').animate({scrollTop: $(".my_alert_scr").offset().top}, 800);						
					}, 500);
					setTimeout(() => {
						this.loginpage = false;
					}, 2000);
				}else if(data.status == 'ERROR'){
					this.forgot_msg_error = true;
					this.forgot_error_msg = 'This email addess is not registered.';
					setTimeout(() => {
						$('html, body').animate({scrollTop: $(".my_alert_scr_er").offset().top}, 800);						
					}, 500);
				}
			})
	}

    forgot(){
		$('html, body').animate({scrollTop: $("#scrollTopPage").offset().top}, 500);
		this.loginpage=true;
		this.Email = ""
		this.Password = ""
		this.login_msg_sus = false;
    }

    login(){
		$('html, body').animate({scrollTop: $("#scrollTopPage").offset().top}, 500);
		this.loginpage=false;
		this.forgot_msg_sus = false;
		this.forgot_msg_error = false;
		this.forgot_msg = ""
		this.forgot_error_msg = ""
	}
	
	cleanerror(){
		$(".removeGmail").removeClass("borderColor");
		this.login_msg_sus = false;
	}

	cleanerror1(){
		$(".removePassword").removeClass("borderColor");
		this.login_msg_sus = false;
	}

	cleanerrorForgot(){
		$(".removeGmailForgot").removeClass("borderColor");
		this.forgot_msg_sus = false;	
		this.forgot_msg_error = false;
	}

}
