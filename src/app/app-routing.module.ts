import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {BodyComponent} from "./body/body.component";
import {FooterComponent} from "./footer/footer.component";

const routes: Routes = [
  { path: '', redirectTo: 'public/home', pathMatch: 'full' },
  // public Area
  {path: 'public/home',
    children: [
      {path: '', component: HeaderComponent, outlet: 'page_header'},
      {path: '', component: BodyComponent, outlet: 'page_body'},
      {path: '', component: FooterComponent, outlet: 'page_footer'},
    ]},
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
