import { Component, OnInit } from "@angular/core";
import { ContactEvent } from "../types/contact";
import { ContactService } from "./contact.service";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.less"],
})
export class ContactsComponent implements OnInit {
  contacts: Array<ContactEvent>;
  selectedContact: ContactEvent;

  constructor(contactService: ContactService) {
    this.contacts = contactService.getContacts();
  }

  ngOnInit(): void {}

  onSelect(contact: ContactEvent): void {
    if (this.selectedContact && this.selectedContact.ContactID == contact.ContactID) {
      this.selectedContact = undefined;
    } else {
      this.selectedContact = contact;
    }
  }
}
