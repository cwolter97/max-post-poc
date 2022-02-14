import { Injectable } from "@angular/core";
import { ContactEvent } from "../types/contact";

interface ContactList extends Array<ContactEvent> {
  update?(c: ContactEvent): void;
}
@Injectable({
  providedIn: "root",
})

export class ContactService {
  contacts: ContactList = [];

  opener: Window;

  constructor() {
    this.opener = window.opener || window.parent;
    const subscriptionTypes = ["all"];

    window.addEventListener("message", this.listener);

    this.opener.postMessage(
      /*
        Subscribe to MAX events
      */
      {
        issuer: "CWTestApp",
        messageType: "RegisterForClientEvents",
        subscriptionTypes: subscriptionTypes,
      },
      "*",
    );

    Object.defineProperty(this.contacts, "update", {
      /*
        Implement custom update method for @ContactList
      */
      value: (c: ContactEvent) => {
        for (let contact of this.contacts) {
          if (contact.ContactID === c.ContactID) {
            Object.assign(contact, c);
            return;
          }
        }
        this.contacts.push(c);
      },
    });
  }
  ngOnDestroy() {
    /*
      Unsubscribe from events
    */
    this.opener.postMessage(
      {
        issuer: "CWTestApp",
        messageType: "UnegisterFromClientEvents",
      },
      "*",
    );
  }

  getContacts() {
    return this.contacts;
  }

  private doSomething = (events: any) => {
    for (let eventIndex in events) {
      if (events.hasOwnProperty(eventIndex)) {
        let event = events[eventIndex];
        console.log(event);
        this.contacts.update(event);
      }
    }
  };

  private listener = (event: any) => {
    if (event.data && event.data.events && event.data.issuer === "MAX") {
      console.log(`==== Received ${event.data.events.length} events =====`);

      let events: any = event.data.events;
      let contactEvents: ContactList = [];
      for (let e of events) {
        if (e.hasOwnProperty("Type") && e.Type.includes("Contact")) {
          contactEvents.push(e);
        }
      }

      console.log(`==== Received ${contactEvents.length} contact events =====`);

      this.doSomething(contactEvents);
    }
  };
}
