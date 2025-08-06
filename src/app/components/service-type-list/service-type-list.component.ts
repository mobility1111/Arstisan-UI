import { Component, OnInit } from '@angular/core';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import { ServiceType } from 'src/app/models/service-type.model';

@Component({
  selector: 'app-service-type-list',
  templateUrl: './service-type-list.component.html'
})
export class ServiceTypeListComponent implements OnInit {
  serviceTypes: ServiceType[] = [];

  constructor(private serviceTypeService: ServiceTypeService) { }

  ngOnInit(): void {
    this.loadServiceTypes();
  }

  loadServiceTypes() {
    this.serviceTypeService.getServiceTypes().subscribe(data => {
      this.serviceTypes = data;
    });
  }
}
