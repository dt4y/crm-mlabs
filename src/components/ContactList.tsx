import React, { useState } from "react";
import EditContact from "./EditContact";

export type Contacts = {
  id: string;
  companyID: string;
  email: string;
  contactName: string;
  phoneNumber: string;
  contactRole: string;
};

type Props = {
  contactData: Contacts;
  removeContact: (id: string) => void;
};

export default function ContactList({ contactData, removeContact }: Props) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [contact, setContact] = useState(contactData);

  return (
    <>
      <div className="listContainer">
        <div className="contactName">Name: {contact.contactName}</div>
        <div className="contactEmail">Email: {contact.email}</div>
        <div className="contactNumber">Phone Number: {contact.phoneNumber}</div>
        <div className="contactRole">Role: {contact.contactRole}</div>

        <button
          onClick={() => setOpenEditModal(!openEditModal)}
          className="editBtn"
        >
          Edit
        </button>

        <button className="deleteBtn" onClick={() => removeContact(contact.id)}>
          Delete
        </button>
      </div>
      {openEditModal && (
        <EditContact
          contactData={contact}
          setContact={(editContact: Contacts) => setContact(editContact)}
          closeModal={() => setOpenEditModal(!openEditModal)}
        />
      )}
    </>
  );
}
