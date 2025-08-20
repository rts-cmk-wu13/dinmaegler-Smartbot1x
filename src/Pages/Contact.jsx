import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../Styles/contact.scss";

// supabase client from environment variables
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const { error } = await supabase.from("Form").insert([
        {
          Nav: formData.name,
          Email: formData.email,
          Emne: formData.subject,
          Besked: formData.message,
        },
      ]);

      if (error) {
        setSubmitStatus("error");
      } else {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          newsletter: false,
        });
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="header">
          <h1>Vi sidder klar til at besvare dine spørgsmål</h1>
          <hr
            className="
          divider"
          />
          {/* <div className="divider"></div> */}
          <p>
            Der kan opstå tvivl om mange ting når man gerne vil, eller er i gang
            med at sælge sin bolig.
            <br />
            Vores medarbejdere sidder klar alle ugens dage til at svare på dine
            spørgsmål.
          </p>
        </div>
        <div className="main-grid">
          {/* Contact Form */}
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label htmlFor="name">Navn</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Indtast dit navn"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Indtast din email"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject">Emne</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Indtast emne"
                  required
                />
              </div>
              <div>
                <label htmlFor="message">Besked</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Indtast din besked..."
                  required
                ></textarea>
              </div>
              <div className="checkbox-row">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                />
                <label htmlFor="newsletter">
                  Ja tak, jeg vil gerne modtage Din Mæglers nyhedsbrev.
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? "Sender..." : "Send besked"}
              </button>
              {submitStatus === "success" && (
                <p className="status-success">Din besked er sendt!</p>
              )}
              {submitStatus === "error" && (
                <p className="status-error">
                  Der opstod en fejl. Prøv igen senere.
                </p>
              )}
            </form>
          </div>
          {/* Contact Information */}
          <div className="info-section">
            <div className="info-card">
              <div className="icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3>Ring til os</h3>
              <p>+45 7070 4000</p>
            </div>
            <div className="info-card">
              <div className="icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3>Send en mail</h3>
              <p>4000@dinmaegler.dk</p>
            </div>
            <div className="info-card">
              <div className="icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3>Besøg butikken</h3>
              <p>
                Stændertorvet 78,
                <br />
                4000 Roskilde
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
