import { NgModule } from "@angular/core";
import { RouterModule ,Routes } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BlogComponent } from './blog/blog.component'
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component'
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component'
import { BlogStartComponent } from './blog/blog-start/blog-start.component'

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/blog', pathMatch: 'full' },
    { path: 'blog', component: BlogComponent, children: [
      { path: '', component: BlogStartComponent },
      { path: 'add', component: BlogEditComponent },
      { path: ':id', component: BlogDetailComponent },
      { path: ':id/edit', component: BlogEditComponent },
  ] 
},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    // providers: [AuthGuard]
  })

export class AppRoutingModule {

}