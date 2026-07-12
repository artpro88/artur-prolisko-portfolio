"use client";

import { useState } from "react";

/**
 * Contact form — progressive enhancement over the plain mailto link.
 * Guided fields (name / company / message) lower the friction of a blank
 * email and signal intent, then compose a structured mailto on submit.
 *
 * No backend is wired yet, so this hands off to the visitor's mail client
 * rather than posting server-side. To capture leads in-page instead, swap
 * the handler for a POST to a Route Handler (e.g. Resend) — the markup
 * here doesn't need to change. Without JS, the email/LinkedIn links below
 * the form (in Contact) remain the fallback path.
 */
const EMAIL = "pokacity@gmail.com";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const from = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = `Portfolio enquiry${name ? ` — ${name}` : ""}`;
    const body = [
      message,
      "",
      "—",
      name && `Name: ${name}`,
      company && `Company: ${company}`,
      from && `Email: ${from}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="cform reveal" onSubmit={onSubmit} noValidate>
      <div className="cform-row">
        <label className="field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className="field">
          <span>Company / role</span>
          <input name="company" type="text" autoComplete="organization" />
        </label>
      </div>
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="field">
        <span>What do you need?</span>
        <textarea name="message" rows={4} required />
      </label>
      <div className="cform-foot">
        <button type="submit" className="btn-primary">
          Start a conversation →
        </button>
        {sent && (
          <span className="cform-note" role="status">
            Opening your email app…
          </span>
        )}
      </div>
    </form>
  );
}
