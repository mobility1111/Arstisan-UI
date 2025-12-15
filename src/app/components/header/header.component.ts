import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobileMenuOpen = false;
  isLoggedIn = false;
  currentUserFullName: string | null = null;
  currentUserRole: string | null = null;
  notifications: any[] = [];
  unreadCount = 0;
  showNotifications = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService, 
    private notificationService: NotificationService,
    private router: Router
  ) {
    console.log('🏠 HeaderComponent constructor');
  }

  ngOnInit(): void {
    console.log('🏠 HeaderComponent ngOnInit');
    
    // Initial check on component load
    this.updateUserState();

    // Subscribe to changes in logged-in user
    const userSub = this.authService.getLoggedInUser().subscribe(user => {
      console.log('👤 User state changed:', user);
      
      this.isLoggedIn = !!user;
      this.currentUserFullName = user ? user.fullName : null;
      this.currentUserRole = user ? user.role : null;

      // Load notifications when user logs in
      if (this.isLoggedIn) {
        console.log('✅ User logged in, loading notifications...');
        this.loadNotifications();
      } else {
        console.log('❌ User logged out, clearing notifications');
        this.notifications = [];
        this.unreadCount = 0;
      }
    });

    // Subscribe to shared unread count from service
    const countSub = this.notificationService.unreadCount$.subscribe((count: number) => {
      console.log('🔔 Unread count updated from service:', count);
      this.unreadCount = count;
    });

    // Reload notifications when navigating away from notifications page
    const routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('🔄 Route changed to:', event.url);
        
        // Close mobile menu on route change
        if (this.mobileMenuOpen) {
          this.closeMobileMenu();
        }

        // Reload notifications when leaving the notifications page
        if (this.isLoggedIn && !event.url.includes('/notifications')) {
          console.log('↩️ Left notifications page, reloading count...');
          this.loadNotifications();
        }
      });

    this.subscriptions.add(userSub);
    this.subscriptions.add(countSub);
    this.subscriptions.add(routerSub);

    // Initial load if already logged in
    if (this.isLoggedIn) {
      console.log('✅ Already logged in on init, loading notifications...');
      this.loadNotifications();
    }
  }

  ngOnDestroy(): void {
    console.log('🏠 HeaderComponent destroyed');
    this.subscriptions.unsubscribe();
  }

  /**
   * Update user state from auth service
   */
  private updateUserState(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUserFullName = this.authService.getUserFullName();
    this.currentUserRole = this.authService.getUserRole();
    
    console.log('🔄 User state updated:', {
      isLoggedIn: this.isLoggedIn,
      fullName: this.currentUserFullName,
      role: this.currentUserRole
    });
  }

  /**
   * Handle user logout
   */
  logout(): void {
    console.log('🚪 Logging out...');
    this.authService.logout();
    this.isLoggedIn = false;
    this.currentUserFullName = null;
    this.currentUserRole = null;
    this.notifications = [];
    this.unreadCount = 0;
    this.notificationService.updateUnreadCount(0);
    this.closeMobileMenu();
    this.router.navigate(['/login']);
  }

  /**
   * Toggle mobile menu open/closed
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    
    // Prevent body scroll when menu is open
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Close mobile menu
   */
  private closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  /**
   * Toggle notification dropdown
   */
  toggleNotifications(): void {
    console.log('🔔 Toggle notifications clicked');
    this.showNotifications = !this.showNotifications;
    console.log('🔔 Notifications visible:', this.showNotifications);
  }

  /**
   * Navigate to notifications page to see all notifications
   */
  goToNotificationsPage(): void {
    console.log('📄 Navigating to notifications page');
    this.showNotifications = false;
    this.router.navigate(['/notifications']);
  }

  /**
   * Load notifications from API
   */
  loadNotifications(): void {
    console.log('📡 Loading notifications in header...');
    
    this.notificationService.getMyNotifications().subscribe({
      next: (res: any) => {
        console.log('✅ Notifications response:', res);
        console.log('📊 Response structure:', {
          hasData: !!res.data,
          isArray: Array.isArray(res.data),
          length: res.data?.length,
          unreadCount: res.unreadCount
        });

        this.notifications = res.data || [];
        this.unreadCount = res.unreadCount || 0;

        console.log('✨ Header state updated:');
        console.log('  - Notifications count:', this.notifications.length);
        console.log('  - Unread count:', this.unreadCount);
        
        // Log each notification
        this.notifications.forEach((n, i) => {
          console.log(`  📬 Notification ${i}:`, {
            id: n.id?.substring(0, 8),
            message: n.message,
            isRead: n.isRead
          });
        });
      },
      error: (err) => {
        console.error('❌ Error loading notifications:', err);
        this.notifications = [];
        this.unreadCount = 0;
      }
    });
  }

  /**
   * Open a notification - marks as read and updates count immediately
   */
  openNotification(n: any): void {
    console.log('📬 Opening notification:', n);

    if (!n.isRead) {
      console.log('📖 Marking as read:', n.id);
      
      // Optimistically update the UI immediately
      n.isRead = true;
      this.unreadCount = Math.max(0, this.unreadCount - 1);
      console.log('🔢 Unread count decreased to:', this.unreadCount);
      
      // Update shared service count
      this.notificationService.updateUnreadCount(this.unreadCount);
      
      this.notificationService.markAsRead(n.id).subscribe({
        next: () => {
          console.log('✅ Marked as read successfully on server');
          
          // Navigate if there's a link
          if (n.link) {
            console.log('🔗 Navigating to:', n.link);
            this.router.navigateByUrl(n.link);
          }
          
          // Close dropdown
          this.showNotifications = false;
        },
        error: (err) => {
          console.error('❌ Error marking as read:', err);
          // Revert optimistic update on error
          n.isRead = false;
          this.unreadCount++;
          this.notificationService.updateUnreadCount(this.unreadCount);
          console.log('⚠️ Reverted unread count to:', this.unreadCount);
        }
      });
    } else {
      // Already read, just navigate
      if (n.link) {
        console.log('🔗 Navigating to:', n.link);
        this.router.navigateByUrl(n.link);
      }
      this.showNotifications = false;
    }
  }

  /**
   * Close mobile menu when clicking escape key
   */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
    if (this.showNotifications) {
      this.showNotifications = false;
    }
  }

  /**
   * Close mobile menu on window resize to desktop size
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const width = (event.target as Window).innerWidth;
    if (width >= 992 && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /**
   * Debug method - can be called from template or console
   */
  debugState(): void {
    console.log('🐛 Header Component State:', {
      isLoggedIn: this.isLoggedIn,
      currentUserFullName: this.currentUserFullName,
      currentUserRole: this.currentUserRole,
      notificationsCount: this.notifications.length,
      unreadCount: this.unreadCount,
      showNotifications: this.showNotifications,
      notifications: this.notifications
    });
  }
}