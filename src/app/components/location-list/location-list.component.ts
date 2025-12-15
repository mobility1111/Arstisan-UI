import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations: Location[] = [];
  filteredLocations: Location[] = [];
  paginatedLocations: Location[] = [];
  searchTerm: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locationService.getLocations().subscribe({
      next: (data) => {
        this.locations = data.filter(loc => !!loc.id);
        this.filteredLocations = [...this.locations];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Failed to load locations:', err);
      }
    });
  }

  filterLocations(): void {
    if (!this.searchTerm.trim()) {
      this.filteredLocations = [...this.locations];
    } else {
      this.filteredLocations = this.locations.filter(loc =>
        loc.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredLocations.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedLocations = this.filteredLocations.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    if (this.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1);
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push(this.currentPage - 1);
        pages.push(this.currentPage);
        pages.push(this.currentPage + 1);
        pages.push(this.totalPages);
      }
    }
    
    return pages;
  }

  viewArtisans(locationId: string | undefined): void {
    if (!locationId) {
      console.warn('No location ID provided for artisan navigation.');
      return;
    }
    this.router.navigate(['/artisans-by-location', locationId]);
  }
}