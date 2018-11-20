import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#profile_trans').hide();
    $(document).ready(function(){
      $('#scrollPage').click(function(){	
          $("html, body").animate({ scrollTop: 0 }, 1000);
      });
    });
  }

}
