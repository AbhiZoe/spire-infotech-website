import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type Status = "idle" | "loading" | "success" | "error";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
    }
  };

  return (
    <div className="card p-8">
      <h3 className="text-xl font-bold text-secondary-800 mb-6">
        Send Us a Message
      </h3>

      {status === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <svg
            className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-green-700 text-sm">
            Thank you! Your message has been sent successfully. We&apos;ll get
            back to you within 24 hours.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <svg
            className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-700 text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="form-label">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`form-input ${errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
              disabled={status === "loading"}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="form-label">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`form-input ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
              disabled={status === "loading"}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="form-label">
            Phone Number{" "}
            <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="form-input"
            disabled={status === "loading"}
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label htmlFor="message" className="form-label">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project or inquiry..."
            className={`form-input resize-none ${errors.message ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
            disabled={status === "loading"}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-600">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          {status === "loading" ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
