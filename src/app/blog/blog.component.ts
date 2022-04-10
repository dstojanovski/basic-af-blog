import { Component, OnInit } from '@angular/core';

import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [BlogService]
})
export class BlogComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {

  }

}
