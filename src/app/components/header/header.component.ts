import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mobileMenuOpen = false;
  isLoggedIn = false;
  currentUserFullName: string | null = null;
  currentUserRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Initial check on component load
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUserFullName = this.authService.getUserFullName();
    this.currentUserRole = this.authService.getUserRole();

    // Subscribe to changes in logged-in user
    this.authService.getLoggedInUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.currentUserFullName = user ? user.fullName : null;
      this.currentUserRole = user ? user.role : null;
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.currentUserFullName = null;
    this.currentUserRole = null;
    this.router.navigate(['/login']);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
