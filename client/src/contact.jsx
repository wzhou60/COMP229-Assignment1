import { Link } from "react-router-dom";
import "./contact.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
  /**
   * A callback function that is called when the contact form is submitted.
   * It takes one argument, an object containing the form data.
   * The function logs the form data to the console.
   */
  /* const onSubmit = (data) => {
    data.preventDefault();
    console.log("Form submitted");
    console.log(data);
      window.location.href = '/'; 

  }; */


  const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
    } = useForm();
  
    const onSubmit = async (data) => {
      setLoading(true);
      setSubmitStatus({ type: '', message: '' });
  
      try {
        // Simulate API call or send to your backend
        console.log("Form submitted:", data);
        
        // Example: Send to backend API
        // const response = await fetch('/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });
        
        // if (!response.ok) throw new Error('Failed to send message');
  
        setSubmitStatus({ 
          type: 'success', 
          message: 'Message sent successfully! Redirecting...' 
        });
  
        // Reset form after successful submission
        reset();
  
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
  
      } catch (error) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Failed to send message. Please try again.' 
        });
        console.error('Submission error:', error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <h3>Send Me a Message</h3>
        <div className="field">
          <label>First Name</label>
          <input type="text" name="firstName" id="firstName" required placeholder="John" />
        </div>

        <div className="field">
          <label>Last Name</label>
          <input type="text" name="lastName" id="lastName" required placeholder="Doe" />
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

          <button type="submit">Send Message</button>
        
      </form>
    </>
  );
}
