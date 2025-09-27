import { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "./contact.css";
export default function Contact() {
  return (
    <>
      <h2 className="contact-header">Contact Me</h2>
      <ContactDetails />
      <ContactForms />
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
        <strong>Phone:</strong> <a href="tel:+16476146663">+1 (647) 614-6663</a>
      </p>
      <p>
        <strong>Location:</strong> Toronto, Ontario, Canada
      </p>
    </div>
  );
}

function ContactForms() {
  function submitForm(data) {
    console.log("Form submitted:", data);
  }

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <h3>Send Me a Message</h3>
        <div className="field">
          <label>First Name</label>
          <input type="text" required placeholder="John" />
        </div>

        <div className="field">
          <label>Last Name</label>
          <input type="text" required placeholder="Doe" />
        </div>

        <div className="field">
          <label>Contact Number</label>
          <input type="tel" placeholder="+1 416 123 6789" />
        </div>

        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input type="email" required placeholder="email@example.com" />
        </div>

        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea rows="5" placeholder="What would you like to talk about?" />
        </div>

        <Link to="/">
          <button type="submit">Send Message</button>
        </Link>
      </form>
    </>
  );
}
