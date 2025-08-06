import { Component } from '@angular/core';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import { ServiceType } from 'src/app/models/service-type.model';

@Component({
  selector: 'app-service-type-add',
  templateUrl: './service-type-add.component.html'
})
export class ServiceTypeAddComponent {
  serviceType: ServiceType = { name: '', description: '' };

  constructor(private serviceTypeService: ServiceTypeService) { }

  addServiceType() {
    this.serviceTypeService.addServiceType(this.serviceType).subscribe(() => {
      alert('Service Type Added Successfully');
      this.serviceType = { name: '', description: '' };
    });
  }
}
