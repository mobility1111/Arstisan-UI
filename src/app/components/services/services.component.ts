// services.component.ts
import { Component } from '@angular/core';

interface Service {
  id: number;
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  currentPage = 1;
  servicesPerPage = 8;

  services: Service[] = [
    { id: 1, name: 'Chefs', icon: 'bi bi-egg-fried', description: 'Professional cooking services' },
    { id: 2, name: 'Electrician', icon: 'bi bi-lightning-charge', description: 'Electrical installation and repairs' },
    { id: 3, name: 'Hair Makers/Dressers', icon: 'bi bi-scissors', description: 'Professional hair styling and care' },
    { id: 4, name: 'Tailors', icon: 'bi bi-scissors', description: 'Custom clothing and alterations' },
    { id: 5, name: 'Painters', icon: 'bi bi-brush', description: 'Interior and exterior painting' },
    { id: 6, name: 'Masons', icon: 'bi bi-hammer', description: 'Brick and stone construction work' },
    { id: 7, name: 'Iron Bender', icon: 'bi bi-tools', description: 'Metal bending and fabrication' },
    { id: 8, name: 'Vulcanizers', icon: 'bi bi-circle', description: 'Tire repair and vulcanization' },
    { id: 9, name: 'Bakers', icon: 'bi bi-cake2', description: 'Professional baking and pastry services' },
    { id: 10, name: 'House AC Repairers', icon: 'bi bi-snow', description: 'Residential air conditioning repair' },
    { id: 11, name: 'Car AC Repairers', icon: 'bi bi-fan', description: 'Automotive air conditioning service' },
    { id: 12, name: 'Auto Electrician', icon: 'bi bi-battery-charging', description: 'Vehicle electrical system repairs' },
    { id: 13, name: 'Structural Welders', icon: 'bi bi-fire', description: 'Heavy-duty welding and fabrication' },
    { id: 14, name: 'Pipeline Welders', icon: 'bi bi-building', description: 'Specialized pipeline welding services' },
    { id: 15, name: 'Pop Installers', icon: 'bi bi-house-door', description: 'Plaster of Paris ceiling installation' },
    { id: 16, name: 'Mechanic', icon: 'bi bi-wrench-adjustable-circle', description: 'Vehicle maintenance and repair' }
  ];

  get totalPages(): number {
    return Math.ceil(this.services.length / this.servicesPerPage);
  }

  get currentServices(): Service[] {
    const startIndex = (this.currentPage - 1) * this.servicesPerPage;
    return this.services.slice(startIndex, startIndex + this.servicesPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.servicesPerPage + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.servicesPerPage, this.services.length);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onBookService(service: Service): void {
    console.log('Booking service:', service.name);
    // Add your booking logic here
  }
}