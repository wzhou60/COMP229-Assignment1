import { useNavigate } from "react-router-dom";
import "./contact.css";
import React, { useState } from "react";
import { create } from "../user/api-contacts.js";
import ContactList from "./ContactList.jsx";

export default function Contact() {
  return (
    <>
      <h2 className="contact-header">Contact Me</h2>
      <ContactDetails />
      <ContactForms />
      <ContactList />
    </>
  );
}

function ContactDetails() {
  return (
    <div className="content-boxContact">
      <h3>My Contact Info</h3>
      <p>
        <strong>Email:</strong> <a href="mailto:jzhou39@gmail.com">jzhou39@gmail.com</a>
      </p>
      <p>
        <strong>Phone:</strong> <a href="tel:+16476146663">+1 (647) 137-4203</a>
      </p>
      <p>
        <strong>Location:</strong> Toronto, Ontario, Canada
      </p>
    </div>
  );
}

function ContactForms() {
  const navigate = useNavigate(); //use navigate to get to other pages

  // Initialize state for all form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  // Update state when user types in an input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the browser reload

    const contact = {
      firstname: formData.firstName || undefined,
      lastname: formData.lastName || undefined,
      email: formData.email || undefined,
    };

    create(contact).then((data) => {
      if (data.error) {
        setFormData({ ...formData, error: data.error });
      } else {
        //setOpen(true);
      }
    });

    console.log("Form submitted successfully");
    console.log("Message:", formData);

    // Navigate to home page without full page reload
    //navigate("/");
    navigate("/", { state: { message: "Your message has been sent!" } });
  };

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <h3>Become a Contact</h3>
        <div className="field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            placeholder="Joe"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            placeholder="Bama"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            id="contactNumber"
            placeholder="+1 416 123 6789"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea
            rows="5"
            name="message"
            id="message"
            placeholder="What would you like to talk about?"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Send Message</button>
      </form>
    </>
  );
}
