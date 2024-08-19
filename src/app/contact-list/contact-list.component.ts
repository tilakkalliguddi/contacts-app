import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { ContactService } from '../services/service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [MatDividerModule, MatListModule, MatToolbarModule, MatExpansionModule, MatIconModule, MatCardModule, RouterLink, RouterLinkActive],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {

  contacts: any = [];
  @Output() edit = new EventEmitter<{ contact: any, index: number }>();
  private contactListSub!: Subscription;
  contactService = inject(ContactService)
  router = inject(Router)

  ngOnInit(): void {
    this.loadContacts();
    this.contactListSub = this.contactService.contactListUpdated.subscribe(() => {
      this.loadContacts();
    });
  }

  loadContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  onEditContact(contact: any, index: number): void {
    this.edit.emit({ contact, index });
  }

  onDeleteContact(index: number): void {
    this.contactService.deleteContact(index);
    this.loadContacts();
  }
}
