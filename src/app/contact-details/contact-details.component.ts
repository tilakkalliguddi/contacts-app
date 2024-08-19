import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/service.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, RouterLinkActive],
})
export class ContactDetailsComponent implements OnInit {
  constructor(private router: Router) { }
  contact: any;
  contacts: any[] = [];
  route = inject(ActivatedRoute);
  contactService = inject(ContactService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id) {
        this.contact = this.contactService.getContactById(id);
        if (!this.contact) {
          console.error('Contact not found!');
        }
      }
    });
  }

  loadContacts(): void {
    this.contacts = this.contactService.getContacts();
  }
  editContact(contactId: string): void {
    this.router.navigate(['home', 'edit-contact', contactId]);
  }

}
