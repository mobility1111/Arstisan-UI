import { Component } from '@angular/core';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html'
})
export class AddLocationComponent {
  newLocation: Location = { name: '' };

  constructor(private locationService: LocationService) { }

  addLocation() {
    if (this.newLocation.name) {
      this.locationService.addLocation(this.newLocation).subscribe(() => {
        alert('Location added!');
        this.newLocation.name = '';
      });
    }
  }
}
