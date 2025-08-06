import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Interface for Artisan data
export interface Artisan {

  id: string;
  name: string;
  service: string;
  location: string;
  photoUrl: string;
  rating: number;
  reviewsCount?: number;
  completedJobs?: number;
  experience?: number;
  hourlyRate?: number;
  isOnline?: boolean;
  featured?: boolean;
  phoneNumber?: string;
  email?: string;
  description?: string;
  skills?: string[];
  joinedDate?: Date;
}

@Component({
  selector: 'app-featured-artisans',
  templateUrl: './featured-artisans.component.html',
  styleUrls: ['./featured-artisans.component.css']
})
export class FeaturedArtisansComponent implements OnInit, OnDestroy {
  artisans: Artisan[] = [];
  loading = false;
  error: string | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    // Inject your artisan service here
    // private artisanService: ArtisanService,
    // private toastr: ToastrService // for notifications
  ) {}

  ngOnInit(): void {
    this.loadFeaturedArtisans();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load featured artisans from the service
   */
  loadFeaturedArtisans(): void {
    this.loading = true;
    this.error = null;

    // Replace with your actual service call
    // this.artisanService.getFeaturedArtisans()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (artisans) => {
    //       this.artisans = artisans;
    //       this.loading = false;
    //     },
    //     error: (error) => {
    //       this.error = 'Failed to load featured artisans';
    //       this.loading = false;
    //       console.error('Error loading artisans:', error);
    //     }
    //   });

    // Mock data for demonstration
    this.loadMockData();
  }

  /**
   * Mock data for demonstration purposes
   * Remove this when implementing actual service
   */
  private loadMockData(): void {
    setTimeout(() => {
      this.artisans = [
        {
          id: '1',
          name: 'Adebayo Johnson',
          service: 'Plumbing Services',
          location: 'Lagos, Nigeria',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          rating: 4.8,
          reviewsCount: 156,
          completedJobs: 342,
          experience: 8,
          hourlyRate: 3500,
          isOnline: true,
          featured: true,
          phoneNumber: '+234 801 234 5678',
          email: 'adebayo.johnson@email.com',
          description: 'Expert plumber with 8+ years experience in residential and commercial projects.',
          skills: ['Pipe Installation', 'Water Heater Repair', 'Drain Cleaning', 'Leak Detection'],
          joinedDate: new Date('2021-03-15')
        },
        {
          id: '2',
          name: 'Fatima Aliyu',
          service: 'Electrical Works',
          location: 'Abuja, Nigeria',
          photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=400&h=400&fit=crop&crop=face',
          rating: 4.9,
          reviewsCount: 203,
          completedJobs: 478,
          experience: 12,
          hourlyRate: 4200,
          isOnline: true,
          featured: true,
          phoneNumber: '+234 802 345 6789',
          email: 'fatima.aliyu@email.com',
          description: 'Certified electrician specializing in home automation and solar installations.',
          skills: ['Wiring Installation', 'Solar Systems', 'Home Automation', 'Electrical Repairs'],
          joinedDate: new Date('2020-01-20')
        },
        {
          id: '3',
          name: 'Chinedu Okafor',
          service: 'Carpentry & Furniture',
          location: 'Port Harcourt, Nigeria',
          photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
          rating: 4.7,
          reviewsCount: 89,
          completedJobs: 167,
          experience: 6,
          hourlyRate: 2800,
          isOnline: false,
          featured: false,
          phoneNumber: '+234 803 456 7890',
          email: 'chinedu.okafor@email.com',
          description: 'Skilled carpenter creating custom furniture and home improvements.',
          skills: ['Custom Furniture', 'Kitchen Cabinets', 'Door Installation', 'Wood Finishing'],
          joinedDate: new Date('2022-06-10')
        },
        {
          id: '4',
          name: 'Aisha Mohammed',
          service: 'Painting & Decoration',
          location: 'Kano, Nigeria',
          photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
          rating: 4.6,
          reviewsCount: 134,
          completedJobs: 289,
          experience: 5,
          hourlyRate: 2200,
          isOnline: true,
          featured: false,
          phoneNumber: '+234 804 567 8901',
          email: 'aisha.mohammed@email.com',
          description: 'Professional painter with expertise in interior and exterior decorating.',
          skills: ['Interior Painting', 'Exterior Painting', 'Wall Texturing', 'Color Consultation'],
          joinedDate: new Date('2022-09-05')
        },
        {
          id: '5',
          name: 'Emeka Nwankwo',
          service: 'Air Conditioning',
          location: 'Enugu, Nigeria',
          photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
          rating: 4.5,
          reviewsCount: 67,
          completedJobs: 123,
          experience: 4,
          hourlyRate: 3200,
          isOnline: true,
          featured: true,
          phoneNumber: '+234 805 678 9012',
          email: 'emeka.nwankwo@email.com',
          description: 'AC technician specializing in installation, repair, and maintenance.',
          skills: ['AC Installation', 'Refrigeration', 'HVAC Systems', 'Maintenance'],
          joinedDate: new Date('2023-01-12')
        },
        {
          id: '6',
          name: 'Blessing Okoro',
          service: 'Cleaning Services',
          location: 'Ibadan, Nigeria',
          photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
          rating: 4.8,
          reviewsCount: 198,
          completedJobs: 456,
          experience: 7,
          hourlyRate: 1800,
          isOnline: false,
          featured: false,
          phoneNumber: '+234 806 789 0123',
          email: 'blessing.okoro@email.com',
          description: 'Professional cleaner offering residential and commercial cleaning services.',
          skills: ['Deep Cleaning', 'Office Cleaning', 'Carpet Cleaning', 'Window Cleaning'],
          joinedDate: new Date('2021-11-18')
        }
      ];
      this.loading = false;
    }, 1000); // Simulate API delay
  }

  /**
   * Generate array for star rating display
   */
  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  /**
   * Contact an artisan
   */
  contactArtisan(artisan: Artisan): void {
    if (!artisan.isOnline) {
      // Show notification that artisan is offline
      console.log(`${artisan.name} is currently offline`);
      // this.toastr.warning(`${artisan.name} is currently offline. You can still leave a message.`);
      return;
    }

    // Handle contact logic here
    console.log('Contacting artisan:', artisan);
    
    // Options for contacting:
    // 1. Open chat/messaging interface
    // 2. Make phone call
    // 3. Send email
    // 4. Navigate to booking page
    
    // Example: Navigate to booking page
    this.router.navigate(['/book-artisan', artisan.id]);
    
    // Or show contact options modal
    // this.showContactModal(artisan);
  }

  /**
   * View artisan profile
   */
  viewProfile(artisan: Artisan): void {
    console.log('Viewing profile for:', artisan);
    this.router.navigate(['/artisan-profile', artisan.id]);
  }

  /**
   * Navigate to all artisans page
   */
  viewAllArtisans(): void {
    this.router.navigate(['/artisans']);
  }

  /**
   * Show contact options modal
   */
  private showContactModal(artisan: Artisan): void {
    // Implement modal logic here
    // You can use Angular Material Dialog, Bootstrap Modal, or custom modal
    console.log('Show contact modal for:', artisan);
  }

  /**
   * Make phone call (if on mobile device)
   */
  callArtisan(artisan: Artisan): void {
    if (artisan.phoneNumber) {
      window.location.href = `tel:${artisan.phoneNumber}`;
    }
  }

  /**
   * Send email to artisan
   */
  emailArtisan(artisan: Artisan): void {
    if (artisan.email) {
      const subject = encodeURIComponent(`Service Request - ${artisan.service}`);
      const body = encodeURIComponent(`Hello ${artisan.name},\n\nI would like to request your services for ${artisan.service}.\n\nBest regards`);
      window.location.href = `mailto:${artisan.email}?subject=${subject}&body=${body}`;
    }
  }

  /**
   * Handle retry when error occurs
   */
  retryLoad(): void {
    this.loadFeaturedArtisans();
  }

  /**
   * Track by function for ngFor performance
   */
  trackByArtisan(index: number, artisan: Artisan): string {
    return artisan.id;
  }
}



// import { Component, OnInit } from '@angular/core';
// import { ArtisanService } from 'src/app/services/artisan.service';
// import { Artisan } from 'src/app/models/artisan.model';

// @Component({
//   selector: 'app-featured-artisans',
//   templateUrl: './featured-artisans.component.html',
//   styleUrls: ['./featured-artisans.component.css']
// })
// export class FeaturedArtisansComponent implements OnInit {
//   featuredArtisans: Artisan[] = [];

//   constructor(private artisanService: ArtisanService) {}

//   ngOnInit(): void {
//     this.artisanService.getArtisans().subscribe({
//       next: (res) => {
//         this.featuredArtisans = res
//           .filter(a => a.rating >= 4) // Or however you choose to "feature" them
//           .slice(0, 4);
//       },
//       error: (err) => console.error('Error fetching artisans', err)
//     });
//   }
// }
