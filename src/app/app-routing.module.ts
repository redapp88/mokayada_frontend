import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { BodyUserComponent } from './user/body-user/body-user.component';
import { HeaderUserComponent } from './user/header-user/header-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'public/home', pathMatch: 'full' },
  {
    path: 'public/home',
    children: [
      { path: '', component: HeaderUserComponent, outlet: 'page_header' },
      { path: '', component: BodyUserComponent, outlet: 'page_body' },
      { path: '', component: FooterComponent, outlet: 'page_footer' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
