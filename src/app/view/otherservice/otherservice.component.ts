import { Component, OnInit } from '@angular/core';
import { Meta, Title} from '@angular/platform-browser';



@Component({
  selector: 'app-otherservice',
  templateUrl: './otherservice.component.html',
  styleUrls: ['./otherservice.component.css']
})
export class OtherserviceComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title:Title

  ) { }

  ngOnInit() {

    this.title.setTitle('Other Services we offers | Apply for a Visa | Visacent');
		this.meta.updateTag({ name:'title',content:'Other Services we offers | Apply for a Visa | Visacent'});
		this.meta.updateTag({ name:'description',content:'Other Services we offers | Apply for a Visa | Visacent'});
		this.meta.updateTag({ name:'keywords',content:'Other Services we offers | Apply for a Visa | Visacent'});

  }

}
