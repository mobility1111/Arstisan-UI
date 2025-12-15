import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  isSubmitting = false;
  showSuccessToast = false;

  sendMessage() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Message sent!', this.contact);
      
      // Show success toast
      this.showSuccessToast = true;
      
      // Reset form
      this.contact = { name: '', email: '', message: '' };
      this.isSubmitting = false;

      // Hide toast after 3 seconds
      setTimeout(() => {
        this.showSuccessToast = false;
      }, 3000);
    }, 1500);
  }
}