import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceType } from 'src/app/models/service-type.model';
import { ServiceTypeService } from 'src/app/services/service-type.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
    serviceTypes: ServiceType[] = [];
     isLoggedIn = false;

  constructor(private el: ElementRef, private renderer: Renderer2,private router: Router,
    private serviceTypeService: ServiceTypeService
  ) { }

  ngOnInit(): void {
    this.initializeInteractiveEffects();
        this.loadServiceTypes();
  }

  onBookService(): void {
    // Handle book service click
    this.router.navigate(['/ register-choice']);
    console.log('Book service clicked');
   
    // Add your booking logic here
  }

   loadServiceTypes() {
    this.serviceTypeService.getServiceTypes().subscribe(data => {
      this.serviceTypes = data;
    });
  }

  onCtaButtonClick(event: MouseEvent): void {
    event.preventDefault();
    
    // Create ripple effect
    const button = event.currentTarget as HTMLElement;
    const ripple = this.renderer.createElement('span');
    
    this.renderer.setStyle(ripple, 'position', 'absolute');
    this.renderer.setStyle(ripple, 'border-radius', '50%');
    this.renderer.setStyle(ripple, 'background', 'rgba(255,255,255,0.5)');
    this.renderer.setStyle(ripple, 'animation', 'ripple 0.6s linear');
    this.renderer.setStyle(ripple, 'pointer-events', 'none');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    this.renderer.setStyle(ripple, 'width', size + 'px');
    this.renderer.setStyle(ripple, 'height', size + 'px');
    this.renderer.setStyle(ripple, 'left', (event.clientX - rect.left - size/2) + 'px');
    this.renderer.setStyle(ripple, 'top', (event.clientY - rect.top - size/2) + 'px');
    
    this.renderer.setStyle(button, 'position', 'relative');
    this.renderer.appendChild(button, ripple);
    
    setTimeout(() => {
      if (ripple && ripple.parentNode) {
        this.renderer.removeChild(button, ripple);
      }
    }, 600);

    // Call the actual booking function
    this.onBookService();
  }

  private initializeInteractiveEffects(): void {
    // Add hover effect to worker card
    const workerCard = this.el.nativeElement.querySelector('.worker-card');
    if (workerCard) {
      this.renderer.listen(workerCard, 'mouseenter', () => {
        this.renderer.setStyle(workerCard, 'transform', 'translateY(-10px) scale(1.02)');
        this.renderer.setStyle(workerCard, 'transition', 'all 0.3s ease');
      });

      this.renderer.listen(workerCard, 'mouseleave', () => {
        this.renderer.setStyle(workerCard, 'transform', 'translateY(0) scale(1)');
      });
    }
  }
}
