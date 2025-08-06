import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  sendMessage() {
    console.log('Message sent!', this.contact);
    alert('Thank you for contacting us! We’ll get back to you shortly.');
    this.contact = { name: '', email: '', message: '' };
  }
}
