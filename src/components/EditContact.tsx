import React, { useState } from "react";
import { Contacts } from "./ContactList";
import axios from "axios";
import { formatContactEditData } from "../utils";

type Props = {
  contactData: Contacts;
  closeModal: () => void;
  setContact: (editContact: Contacts) => void;
};

const Contact_ENPOINT =
  "https://6hbbtovt68.execute-api.us-east-2.amazonaws.com/default/contacts";

export default function EditContact({
  contactData,
  closeModal,
  setContact,
}: Props) {
  const [updateContact, setUpdateContact] = useState(contactData);

  const editContact = async (e: any) => {
    e.preventDefault();

    const params = formatContactEditData(updateContact);

    try {
      await axios.put(Contact_ENPOINT, params);
      setContact(updateContact);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: any) => {
    setUpdateContact({
      ...updateContact,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="editContainer">
      <div className="edit">
        <form onSubmit={editContact}>
          <div className="addContact">
            <label className="labels">
              Email
              <input
                className="inputField"
                type="text"
                value={updateContact.email}
                name="email"
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="labels">
              Contact Name
              <input
                className="inputField"
                type="text"
                value={updateContact.contactName}
                name="contactName"
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="labels">
              Phone Number
              <input
                className="inputField"
                type="text"
                value={updateContact.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="labels">
              Contact Role
              <input
                className="inputField"
                type="text"
                value={updateContact.contactRole}
                name="contactRole"
                onChange={handleChange}
              />
            </label>
            <br />
            <input type="submit" value="Edit" className="addCompanyBtn" />
          </div>
        </form>
      </div>
    </div>
  );
}
