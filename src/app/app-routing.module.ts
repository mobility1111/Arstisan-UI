import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Public
import { LandingComponent } from './components/landing/landing.component';
import { ServicesComponent } from './components/services/services.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { FeaturedArtisansComponent } from './components/featured-artisans/featured-artisans.component';

// Auth
import { LoginComponent } from './components/login/login.component';
import { RegisterChoiceComponent } from './components/register-choice/register-choice.component';
import { ArtisanRegisterComponent } from './components/artisan-register/artisan-register.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';

// Artisan
import { ArtisanListComponent } from './components/artisan-list/artisan-list.component';
import { ArtisanDetailsComponent } from './components/artisan-details/artisan-details.component';
import { ArtisanProfileComponent } from './components/artisan-profile/artisan-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

// Customer
import { CreateJobComponent } from './components/create-job/create-job.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { CustomerConfirmJobComponent } from './components/customer-confirm-job/customer-confirm-job.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { EditCustomerProfileComponent } from './components/edit-customer-profile/edit-customer-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

// Admin
import { AdminJobListComponent } from './components/admin-job-list/admin-job-list.component';
import { JobAssignComponent } from './components/job-assign/job-assign.component';
import { JobChargeComponent } from './components/job-charge/job-charge.component';
import { JobCompleteComponent } from './components/job-complete/job-complete.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { ServiceTypeListComponent } from './components/service-type-list/service-type-list.component';
import { ServiceTypeAddComponent } from './components/service-type-add/service-type-add.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { NotificationBellComponent } from './components/notification-bell/notification-bell.component';
import { ResetComponent } from './components/reset/reset.component';

const routes: Routes = [

  // ⬇ PUBLIC ROUTES
  { path: '', component: LandingComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'featured-artisans', component: FeaturedArtisansComponent },
  {path:'resetss', component: ResetComponent},

  // ⬇ AUTH ROUTES
  { path: 'login', component: LoginComponent },
  { path: 'register-choice', component: RegisterChoiceComponent },
  { path: 'register-artisan', component: ArtisanRegisterComponent },
  { path: 'register-customer', component: CustomerRegisterComponent },
  { path: "notifications", component: NotificationBellComponent },


  // ⬇ ARTISAN
  { path: 'artisan/profile', component: ArtisanProfileComponent, canActivate: [AuthGuard] },
  { path: 'artisan/profile/edit', component: EditProfileComponent, canActivate: [AuthGuard] },

  // ⬇ PUBLIC ARTISAN BROWSING
  { path: 'artisans', component: ArtisanListComponent },
  { path: 'artisan/:id', component: ArtisanDetailsComponent },

  // ⬇ CUSTOMER ROUTES (Require Login)
  { path: 'customer/profile', component: CustomerProfileComponent, canActivate: [AuthGuard] },
  { path: 'customer/profile/edit', component: EditCustomerProfileComponent, canActivate: [AuthGuard] },
  { path: 'customer/change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'customer/job/edit/:id', component: EditJobComponent, canActivate: [AuthGuard] },
  { path: 'customer/create-job', component: CreateJobComponent, canActivate: [AuthGuard] },
  
  { path: 'customer/jobs', component: MyJobsComponent, canActivate: [AuthGuard] },
  { path: 'customer/confirm-job/:id', component: CustomerConfirmJobComponent, canActivate: [AuthGuard] },

  // ⬇ ADMIN ROUTES (Require Role = Admin)

  // ADMIN DASHBOARD
{ 
  path: 'admin/dashboard', 
  component: AdminDashboardComponent,
  canActivate: [RoleGuard],
  data: { expectedRole: 'Admin' }
},



  { 
    path: 'admin/jobs', 
    component: AdminJobListComponent, 
    canActivate: [RoleGuard], 
    data: { expectedRole: 'Admin' } 
  },

  {
    path: 'admin/job/assign/:id',
    component: JobAssignComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'Admin' }
  },

  {
    path: 'admin/job/charge/:id',
    component: JobChargeComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'Admin' }
  },

  {
    path: 'admin/job/complete/:id',
    component: JobCompleteComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'Admin' }
  },

  // ADMIN: LOCATIONS
  { path: 'admin/locations', component: LocationListComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
  { path: 'admin/location/add', component: AddLocationComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },

  // ADMIN: SERVICE TYPES
  { path: 'admin/service-types', component: ServiceTypeListComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
  { path: 'admin/service-type/add', component: ServiceTypeAddComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },

  // ⬇ 404 fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
