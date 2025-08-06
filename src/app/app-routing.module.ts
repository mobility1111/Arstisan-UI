import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { LandingComponent } from './components/landing/landing.component';
import { ServicesComponent } from './components/services/services.component';
import { ArtisanDetailsComponent } from './components/artisan-details/artisan-details.component';
import { ArtisanListComponent } from './components/artisan-list/artisan-list.component';
import { ArtisanRegisterComponent } from './components/artisan-register/artisan-register.component';
import { ContactComponent } from './components/contact/contact.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { FeaturedArtisansComponent } from './components/featured-artisans/featured-artisans.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterChoiceComponent } from './components/register-choice/register-choice.component';
import { JobRequestComponent } from './components/job-request/job-request.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { ServiceTypeAddComponent } from './components/service-type-add/service-type-add.component';
import { ServiceTypeListComponent } from './components/service-type-list/service-type-list.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
   { path: '', component: LandingComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'register-artisan', component: ArtisanRegisterComponent },
  { path: 'register-customer', component: CustomerRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'artisans', component: ArtisanListComponent,canActivate:[RoleGuard] },
  { path: 'artisan/:id', component: ArtisanDetailsComponent },
  { path: 'featured-artisans', component: FeaturedArtisansComponent },
   { path: 'register-choice', component: RegisterChoiceComponent},
   { path: 'request-service', component: JobRequestComponent,canActivate:[AuthGuard] },
   { path: 'admin/job-requests', component: JobListComponent },
   { path: 'service-types', component: ServiceTypeListComponent,canActivate:[RoleGuard] },
  { path: 'add-service-type', component: ServiceTypeAddComponent,canActivate:[RoleGuard] },
  { path: 'add-location', component: AddLocationComponent,canActivate:[RoleGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'locations', component: LocationListComponent,canActivate:[RoleGuard] },


  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
