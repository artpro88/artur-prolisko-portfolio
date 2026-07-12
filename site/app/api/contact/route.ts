import { Resend } from "resend";

/**
 * Contact endpoint — actually sends the email server-side (no mailto
 * handoff, which silently stalls on machines without a mail client).
 *
 * Configuration (set in the Vercel project's Environment Variables):
 *   RESEND_API_KEY  – required. From https://resend.com (free tier).
 *   CONTACT_TO      – optional, defaults to pokacity@gmail.com.
 *   CONTACT_FROM    – optional. Must be a Resend-verified sender, or the
 *                     shared "onboarding@resend.dev" which (in Resend's
 *                     test mode) delivers to the account owner's own
 *                     address — enough to receive enquiries at the Gmail
 *                     the Resend account was created with, no domain
 *                     verification needed.
 *
 * Until RESEND_API_KEY is set the route replies 503 { code: "not_configured" }
 * and the form shows a direct-email fallback — never a silent stall.
 */
const TO = process.env.CONTACT_TO || "pokacity@gmail.com";
const FROM = process.env.CONTACT_FROM || "Portfolio Enquiries <onboarding@resend.dev>";

const isEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !message || !isEmail(email)) {
    return Response.json(
      { ok: false, error: "Please add your name, a valid email, and a message." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Portfolio enquiry — ${name}`,
      text: [
        `Name:    ${name}`,
        company && `Company: ${company}`,
        `Email:   ${email}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      return Response.json({ ok: false, error: "Could not send just now." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Could not send just now." }, { status: 502 });
  }
}
