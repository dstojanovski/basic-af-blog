import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
        }
      );
  }

  onSubmit(form: NgForm) {
    const PostData = {
      title: form.value.title,
      body: form.value.body,
    };

    console.log(PostData);
    if (this.editMode){

      console.log("EDIT MODE");
    }
    else {
      this.http.post('https://2bcom93be4.execute-api.eu-central-1.amazonaws.com/dev/add-blog',
       PostData ).subscribe(responseData => console.log(responseData))
      console.log("ADD MMODE");
    }
    // Send Http request
    // this.http.post('https://00879n2zla.execute-api.eu-central-1.amazonaws.com/dev', POSTBODY ).subscribe(responseData => )
  }

}
