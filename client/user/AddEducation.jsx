import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEducation() {
  const navigate = useNavigate();

  // Initialize state based on the EducationSchema
  const [formData, setFormData] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "", // Will be a string from the date input
    description: "",
  });

  const [error, setError] = useState(null);

  // Single handler for all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/educations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add education");
      }

      console.log("Education added:", data);
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Submission error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={onSubmit}>
        <h3>Add New Education/Qualification</h3>

        <div className="field">
          <label htmlFor="title">Title / Degree</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., BSc Computer Science"
          />
        </div>

        <div className="field">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="email@example.com"
          />
        </div>

        <div className="field">
          <label htmlFor="completion">Completion Date</label>
          <input
            type="date"
            name="completion"
            id="completion"
            value={formData.completion}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Optional: A brief description"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Add Education</button>
      </form>
    </div>
  );
}
