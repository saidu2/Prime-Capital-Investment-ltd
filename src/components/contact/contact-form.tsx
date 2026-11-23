"use client";

import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

/* Submission logic unchanged: POST /api/contact with the same payload. */

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="block text-[12px] font-bold uppercase tracking-[0.2em] text-text-muted-dark transition-colors group-focus-within:text-gold-refined"
      >
        {label} {required && <span className="text-gold-refined">*</span>}
      </label>
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold-refined transition-transform duration-700 ease-soft group-focus-within:scale-x-100"
      />
    </div>
  );
}

const INPUT =
  "mt-2 block w-full border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-[16px] text-ink placeholder:text-ink/30 focus:border-ink/15 focus:outline-none focus:ring-0";

export function ContactForm() {
  const [formData, setFormData] = useState(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success(
        "Thank you for contacting Prime Capital. Our team will get back to you shortly.",
        {
          duration: 5000,
        },
      );
      setFormData(EMPTY);
    } catch (error) {
      toast.error(
        "There was an error sending your message. Please try again or contact us directly at info@primecapital.ng",
        {
          duration: 7000,
        },
      );
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <Field id="name" label="Full Name" required>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            className={INPUT}
            required
          />
        </Field>
        <Field id="email" label="Email Address" required>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            autoComplete="email"
            className={INPUT}
            required
          />
        </Field>
      </div>
      <div className="grid gap-9 sm:grid-cols-2">
        <Field id="phone" label="Phone Number">
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+234 ..."
            autoComplete="tel"
            className={INPUT}
          />
        </Field>
        <Field id="subject" label="Inquiry Type" required>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Portfolio Management"
            className={INPUT}
            required
          />
        </Field>
      </div>
      <Field id="message" label="Message" required>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you achieve your financial goals?"
          rows={5}
          className={`${INPUT} resize-none`}
          required
        />
      </Field>

      <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2.5 text-[13px] leading-snug text-text-muted-dark">
          <ShieldCheck
            aria-hidden
            className="h-4 w-4 shrink-0 text-gold-refined"
          />
          Your information is handled with absolute confidentiality in line with
          our fiduciary duty.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-sheen group inline-flex shrink-0 items-center justify-center gap-3 rounded-[2px] bg-ink px-9 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-white transition-colors duration-500 hover:bg-gold-refined hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
          {isSubmitting ? (
            <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:translate-x-1"
            />
          )}
        </button>
      </div>
    </form>
  );
}
