import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Send Me a Message</h3>

      {submitStatus.message && (
        <div className={`alert alert-${submitStatus.type}`} style={{
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '4px',
          backgroundColor: submitStatus.type === 'success' ? '#d4edda' : '#f8d7da',
          color: submitStatus.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${submitStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {submitStatus.message}
        </div>
      )}

      <div className="field">
        <label>First Name</label>
        <input type="text" placeholder="John" {...register('firstName', {required: 'First name is required',
            minLength: {
              value: 2,
              message: 'First name must be at least 2 characters'
            }
          })}
        />
        {errors.firstName && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className="field">
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Doe"
          {...register('lastName', {
            required: 'Last name is required',
            minLength: {
              value: 2,
              message: 'Last name must be at least 2 characters'
            }
          })}
        />
        {errors.lastName && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className="field">
        <label>Contact Number</label>
        <input
          type="tel"
          placeholder="+1 416 123 6789"
          {...register('phone', {
            required: 'Contact number is required',
            pattern: {
              value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
              message: 'Invalid phone number format'
            }
          })}
        />
        {errors.phone && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.phone.message}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          placeholder="email@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          rows="5"
          placeholder="What would you like to talk about?"
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters'
            }
          })}
        />
        {errors.message && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.message.message}
          </span>
        )}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}