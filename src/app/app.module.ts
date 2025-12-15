import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtisanRegisterComponent } from './components/artisan-register/artisan-register.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FeaturedArtisansComponent } from './components/featured-artisans/featured-artisans.component';
import { LandingComponent } from './components/landing/landing.component';
import { ServicesComponent } from './components/services/services.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { LoginComponent } from './components/login/login.component';
import { ArtisanComponent } from './components/artisan/artisan.component';
import { ArtisanListComponent } from './components/artisan-list/artisan-list.component';
import { ArtisanDetailsComponent } from './components/artisan-details/artisan-details.component';
import { RegisterChoiceComponent } from './components/register-choice/register-choice.component';
import { HireArtisanComponent } from './components/hire-artisan/hire-artisan.component';
import { JobRequestComponent } from './components/job-request/job-request.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { ServiceTypeListComponent } from './components/service-type-list/service-type-list.component';
import { ServiceTypeAddComponent } from './components/service-type-add/service-type-add.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { ArtisanByLocationComponent } from './components/artisan-by-location/artisan-by-location.component';
import { AboutComponent } from './components/about/about.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ArtisanProfileComponent } from './components/artisan-profile/artisan-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { AdminJobListComponent } from './components/admin-job-list/admin-job-list.component';
import { JobAssignComponent } from './components/job-assign/job-assign.component';
import { JobChargeComponent } from './components/job-charge/job-charge.component';
import { JobCompleteComponent } from './components/job-complete/job-complete.component';
import { CustomerConfirmJobComponent } from './components/customer-confirm-job/customer-confirm-job.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { EditCustomerProfileComponent } from './components/edit-customer-profile/edit-customer-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { NotificationBellComponent } from './components/notification-bell/notification-bell.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetComponent } from './components/reset/reset.component';


@NgModule({
  declarations: [
    AppComponent,
    ArtisanRegisterComponent,
    FooterComponent,
    ContactComponent,
    HeaderComponent,
    HowItWorksComponent,
    FeaturedArtisansComponent,
    LandingComponent,
    ServicesComponent,
    CustomerRegisterComponent,
    LoginComponent,
    ArtisanComponent,
    ArtisanListComponent,
    ArtisanDetailsComponent,
    RegisterChoiceComponent,
    HireArtisanComponent,
    JobRequestComponent,
    JobListComponent,
    JobDetailsComponent,
    ServiceTypeListComponent,
    ServiceTypeAddComponent,
    LocationListComponent,
    AddLocationComponent,
    ArtisanByLocationComponent,
    AboutComponent,
    ArtisanProfileComponent,
    EditProfileComponent,
    EditProfileComponent,
    LocationListComponent,
    AddLocationComponent,
    CreateJobComponent,
    MyJobsComponent,
    AdminJobListComponent,
    JobAssignComponent,
    JobChargeComponent,
    JobCompleteComponent,
    CustomerConfirmJobComponent,
    CustomerProfileComponent,
    EditCustomerProfileComponent,
    ChangePasswordComponent,
    AdminDashboardComponent,
    EditJobComponent,
    NotificationBellComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ResetComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
   providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
