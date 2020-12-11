import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ContactList, { Contacts } from "../components/ContactList";
import { formatContactDeleteData, formatContactPostData } from "../utils";

const CONTACT_ENDPOINT =
  "https://6hbbtovt68.execute-api.us-east-2.amazonaws.com/default/contacts";

const initialContact = {
  id: "",
  companyID: "",
  email: "",
  contactName: "",
  phoneNumber: "",
  contactRole: "",
};

export default function CompanyContacts() {
  const { companyID } = useParams<{ companyID: string }>();
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [newContact, setNewContact] = useState<Contacts>(initialContact);

  useEffect(() => {
    const fetchContacts = async (companyID: string) => {
      const res = await axios.get(`${CONTACT_ENDPOINT}?companyID=${companyID}`);
      setContacts(res.data.Items);
    };

    fetchContacts(companyID);
  }, [companyID]);

  const addContact = async (e: any) => {
    e.preventDefault();
    const id = uuidv4();

    const contact = newContact;
    contact.id = id;
    contact.companyID = companyID;
    const params = formatContactPostData(contact);

    try {
      await axios.post(CONTACT_ENDPOINT, params);
      setContacts((prev) => [contact, ...prev]);
    } catch (error) {
      console.error(error);
    }
    console.log(params);
  };

  const handleChange = (e: any) => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value,
    });
  };

  const removeContact = async (id: string) => {
    const params = formatContactDeleteData(id);

    try {
      await axios.delete(CONTACT_ENDPOINT, { data: params });
      const filteredContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(filteredContacts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <div className="pageTitle">Contacts</div>
        <div className="heading">Add New Contact</div>
        <form onSubmit={addContact}>
          <div className="addContact">
            <label className="labels">
              Email
              <input
                className="inputField"
                type="text"
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
                name="contactRole"
                onChange={handleChange}
              />
            </label>
            <br />
            <input type="submit" value="Add" className="addCompanyBtn" />
          </div>
        </form>
      </div>
      <div className="main">
        {contacts.map((contact) => (
          <ContactList
            key={contact.id}
            contactData={contact}
            removeContact={removeContact}
          />
        ))}
      </div>
    </div>
  );
}
