import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  return (
    <>
      <h2>Contact Me</h2>
      <ContactForms />
    </>
  );
}

function ContactForms() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const navigate = useNavigate();

  // Update state when inputs change
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    // Redirect to Home with banner message
    navigate("/", {
      state: { banner: `Thanks, ${form.firstName}! Your message has been captured.` },
      replace: true,
    });
  }

  return (
    <>
      <div className="contact-panel">
        <h3>Reach Me</h3>
        <p>
          <strong>Email:</strong> jzhou39@gmail.com
        </p>
        <p>
          <strong>Phone:</strong> +1 (647) 614-6663
        </p>
        <p>
          <strong>Location:</strong> Toronto, ON
        </p>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              required
              placeholder="Jane"
            />
          </div>
          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              required
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="phone">Contact Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 647 614 6663"
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="jane@example.com"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            placeholder="How can I help?"
          />
        </div>

        <button className="btn primary" type="submit">
          Send Message
        </button>
      </form>
    </>
  );
}
