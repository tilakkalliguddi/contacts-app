import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../services/service.service';
import { MatIconModule } from '@angular/material/icon';
import { v4 as uuidv4 } from 'uuid';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

  fb = inject(FormBuilder);
  contactService = inject(ContactService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  isEditMode: boolean = false;
  contactId: string | null = null;

  contactForm = this.fb.group({
    id: [uuidv4()],
    name: ["", Validators.required],
    emails: this.fb.array([this.createEmailField()]),
    phoneNumbers: this.fb.array([this.createPhoneNumberField()]),
    address: [""]
  });

  phoneLabels: { value: string, viewValue: string }[] = [
    { value: 'Home', viewValue: 'Home' },
    { value: 'Mobile', viewValue: 'Mobile' },
    { value: 'Office', viewValue: 'Office' },
  ];

  mailLabels: { value: string, viewValue: string }[] = [
    { value: 'Home', viewValue: 'Home' },
    { value: 'personal', viewValue: 'personal' },
    { value: 'Office', viewValue: 'Office' },
  ];

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.isEditMode = true;
      this.loadContactDetails(this.contactId);
    }
  }

  // Phone numbers field

  get phoneNumbers(): FormArray {
    return this.contactForm.get('phoneNumbers') as FormArray;
  }

  createPhoneNumberField(phoneNumber: string = "", label: string = ""): FormGroup {
    return this.fb.group({
      phoneNumber: [phoneNumber, Validators.required],
      label: [label, Validators.required]
    });
  }
  addPhoneNumber() {
    this.phoneNumbers.push(this.createPhoneNumberField());
  }
  removePhoneNumber(index: number) {
    if (this.phoneNumbers.length > 1) {
      this.phoneNumbers.removeAt(index);
    }
  }

  // Email field

  get emails(): FormArray {
    return this.contactForm.get('emails') as FormArray;
  }
  createEmailField(email: string = "", label: string = ""): FormGroup {
    return this.fb.group({
      email: [email, Validators.required],
      label: [label, Validators.required]
    });
  }
  addEmail() {
    this.emails.push(this.createEmailField());
  }
  removeEmail(index: number) {
    if (this.emails.length > 1) {
      this.emails.removeAt(index);
    }
  }


  SaveData() {
    if (this.contactForm.valid) {
      const formData = {
        ...this.contactForm.value,
        id: this.isEditMode && this.contactId ? this.contactId : uuidv4()
      };

      if (this.isEditMode && this.contactId) {
        this.contactService.updateContact(this.contactId, formData);
      } else {
        this.contactService.saveContact(formData);
      }

      this.resetForm();
      this.router.navigate(['/']);
    }
  }


  editContact(contact: any): void {
    this.contactForm.patchValue(contact);
    this.setPhoneNumbers(contact.phoneNumbers || []);
    this.setEmails(contact.email || []);

    this.contactId = contact.id;
    this.isEditMode = true;
  }

  setPhoneNumbers(phoneNumbers: any[]): void {
    this.phoneNumbers.clear();
    phoneNumbers.forEach(phone => {
      this.phoneNumbers.push(this.createPhoneNumberField(phone.phoneNumber, phone.label));
    });
  }

  setEmails(emails: any[]): void {
    this.emails.clear();
    emails.forEach(mail => {
      this.emails.push(this.createEmailField(mail.email, mail.label));
    });
  }

  loadContactDetails(id: string): void {
    const contact = this.contactService.getContactById(id);
    if (contact) {
      this.contactForm.patchValue(contact);
      this.setPhoneNumbers(contact.phoneNumbers || []);
      this.setEmails(contact.emails || []);
      this.isEditMode = true;
    } else {
      console.error('Contact not found!');
    }
  }

  resetForm(): void {
    this.contactForm.reset({
      id: uuidv4(),
      name: "",
      address: ""
    });
    this.phoneNumbers.clear();
    this.phoneNumbers.push(this.createPhoneNumberField());
    this.emails.clear();
    this.emails.push(this.createEmailField());
    this.contactForm.markAsPristine();
    this.contactForm.markAsUntouched();
    this.isEditMode = false;
    this.contactId = null;
  }
}
