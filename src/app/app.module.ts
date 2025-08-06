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
    AboutComponent
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
