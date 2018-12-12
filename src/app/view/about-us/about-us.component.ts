import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title:Title

  ) { }

  ngOnInit() {
    $('#profile_trans').hide();
    this.title.setTitle('About us | Get Visa Online');
this.meta.updateTag({ name:'title',content:'About us | Get Visa Online'});	
this.meta.updateTag({ name:'description',content:'about us, get visa online, visa services, tourist visa, business visa, travel visa, visa application, get visa online, visa processing online, myvisa, online visa application'});
this.meta.updateTag({ name:'keywords',content: 'about us, get visa online, visa services, tourist visa, business visa, travel visa, visa application, get visa online, visa processing online, myvisa, online visa application'});
    $(document).ready(function(){
      $('#scrollPage').click(function(){	
          $("html, body").animate({ scrollTop: 0 }, 1000);
      });
    });
  }

}
