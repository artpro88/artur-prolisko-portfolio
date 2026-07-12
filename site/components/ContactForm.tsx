"use client";

import { useState } from "react";

/**
 * Contact form — posts to /api/contact, which sends the email
 * server-side (no mailto handoff; that silently stalls on machines
 * without a configured mail client). States: idle → sending → sent /
 * error / unconfigured. "unconfigured" (503) means the server has no
 * RESEND_API_KEY yet; we surface a direct-email fallback rather than a
 * dead end. The email/LinkedIn links under the form (in Contact) are the
 * no-JS fallback.
 */
const EMAIL = "pokacity@gmail.com";

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      company: String(data.get("company") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        form.reset();
        setStatus("sent");
      } else if (res.status === 503 || json.code === "not_configured") {
        setStatus("unconfigured");
      } else {
        setStatus("error");
        setError(json.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network error.");
    }
  };

  if (status === "sent") {
    // reveal-now (not reveal): this element mounts AFTER the scroll
    // observer has already passed the section, so it must animate itself
    // in and end visible rather than wait for an .in that never comes.
    return (
      <div className="cform cform-done reveal-now" role="status" aria-live="polite">
        <p className="cform-done-t">Message sent.</p>
        <p className="cform-done-s">
          Thanks — it&apos;s landed in my inbox and I&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="cform reveal" onSubmit={onSubmit} noValidate>
      <div className="cform-row">
        <label className="field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required disabled={sending} />
        </label>
        <label className="field">
          <span>Company / role</span>
          <input name="company" type="text" autoComplete="organization" disabled={sending} />
        </label>
      </div>
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required disabled={sending} />
      </label>
      <label className="field">
        <span>What do you need?</span>
        <textarea name="message" rows={4} required disabled={sending} />
      </label>
      <div className="cform-foot">
        <button type="submit" className="btn-primary" disabled={sending}>
          {sending ? "Sending…" : "Start a conversation →"}
        </button>
        {status === "error" && (
          <span className="cform-note cform-err" role="status">
            {error} Email me at{" "}
            <a className="link-quiet" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </span>
        )}
        {status === "unconfigured" && (
          <span className="cform-note" role="status">
            Reach me directly at{" "}
            <a className="link-quiet" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </span>
        )}
      </div>
    </form>
  );
}
