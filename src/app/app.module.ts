import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BodyComponent} from './body/body.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {OfferDetailsComponent} from './offers/offer-details/offer-details.component';
import {LoginComponent} from './login/login.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {UsersItemsManagementComponent} from './user/users-items-management/users-items-management.component';
import {UsersOffersManagementComponent} from './user/users-offers-management/users-offers-management.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";
import {UsersAddItemComponent} from './user/users-items-management/users-add-item/users-add-item.component';
import { ImageMaximizeComponent } from './shared/image-maximize/image-maximize.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { UsersDeleteItemComponent } from './user/users-items-management/users-delete-item/users-delete-item.component';
import { UsersDetailsItemComponent } from './user/users-items-management/users-details-item/users-details-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    OfferDetailsComponent,
    LoginComponent,
    ResetPasswordComponent,
    UsersItemsManagementComponent,
    UsersOffersManagementComponent,
    UsersAddItemComponent,
    ImageMaximizeComponent,
    UsersDeleteItemComponent,
    UsersDetailsItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatProgressBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatPaginatorModule

  ],
  exports: [MatFormFieldModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
