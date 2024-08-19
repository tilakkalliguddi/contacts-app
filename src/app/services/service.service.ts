import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactListUpdated = new EventEmitter<void>();

  saveContact(contact: any): void {
    const contacts = this.getContacts();
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.contactListUpdated.emit();
  }

  getContacts(): any[] {
    const existingData = localStorage.getItem('contacts');
    return existingData ? JSON.parse(existingData) : [];
  }

  getContactById(id: string): any {
    const contacts = this.getContacts();
    return contacts.find(contact => contact.id === id);
  }

  updateContact(id: string, updatedContact: any): void {
    const contacts = this.getContacts();
    const index = contacts.findIndex(contact => contact.id === id);

    if (index !== -1) {
      contacts[index] = updatedContact;
      localStorage.setItem('contacts', JSON.stringify(contacts));
      this.contactListUpdated.emit();
    } else {
      console.error('Contact not found for update');
    }
  }

  deleteContact(index: number): void {
    const contacts = this.getContacts();
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.contactListUpdated.emit();
  }
}
