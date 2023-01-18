import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderUserComponent } from './user/header-user/header-user.component';
import { BodyUserComponent } from './user/body-user/body-user.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderUserComponent,
    BodyUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
