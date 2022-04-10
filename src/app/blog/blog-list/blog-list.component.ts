import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { Blog } from '../blog.model';
import { BlogService } from '../blog.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  // blogsApi = [];

  constructor(private blogService: BlogService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit() {
    const blogs1 = this.getBlogs1();
    console.log(blogs1);
    this.blogs = this.blogService.getBlogs();
  }

  onNewBlog() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  private getBlogs1() {
      this.http.get<{ [key:string]: Blog}>('https://2bcom93be4.execute-api.eu-central-1.amazonaws.com/dev/blogs')
        .pipe(map(responseData => {
          console.log(responseData);
          console.log(responseData['Items']);
          const blogsArray = [];
          for (const key in responseData['Items']){
            console.log(responseData['Items'][key]['BlogId']['S']);
            
              blogsArray.push({ ...responseData['Items'][key], id: responseData['Items'][key]['BlogId']['S'] });
            
          }
          return blogsArray;
        }))
        .subscribe(responseData => {
          this.blogs = responseData;
        });
      }
}
