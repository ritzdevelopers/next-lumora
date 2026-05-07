import nodemailer from "nodemailer";

const DEFAULT_TO = "info@lumoraestates.com";

function buildEmailBody({ source, Name, Email, Phone, Message, Date, Time }) {
  return [
    `Source: ${source || "website"}`,
    `Name: ${Name ?? ""}`,
    `Email: ${Email ?? ""}`,
    `Phone: ${Phone ?? ""}`,
    `Message: ${Message ?? ""}`,
    `Date: ${Date ?? ""}`,
    `Time: ${Time ?? ""}`,
  ].join("\n");
}

/** Gmail App Passwords are 16 letters without spaces; spaces are only for display. */
function normalizeSmtpPassword(pass) {
  return String(pass || "").replace(/\s/g, "");
}

function createTransport(host, port, secure, userTrim, passClean) {
  const hostLower = String(host || "").toLowerCase();
  const useGmail =
    hostLower.includes("gmail") || userTrim.toLowerCase().endsWith("@gmail.com");

  if (useGmail) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: { user: userTrim, pass: passClean },
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: port === 587 && !secure,
    auth: { user: userTrim, pass: passClean },
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const { Name, Email, Phone, Message, Date, Time, source } = body;

  const hasAny =
    (typeof Name === "string" && Name.trim()) ||
    (typeof Email === "string" && Email.trim()) ||
    (typeof Phone === "string" && Phone.trim()) ||
    (typeof Message === "string" && Message.trim());

  if (!hasAny) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const passRaw = process.env.SMTP_PASS;
  const passClean = normalizeSmtpPassword(passRaw);

  if (!host || !user || !passClean) {
    console.warn(
      "[notify-lead] Set SMTP_HOST, SMTP_USER, and SMTP_PASS (e.g. in .env.local)."
    );
    return res.status(200).json({ ok: true, emailed: false });
  }

  if (
    /gmail/i.test(host || "") &&
    passClean.length > 0 &&
    passClean.length < 16
  ) {
    console.warn(
      "[notify-lead] Gmail App Password should be 16 characters after removing spaces. If .env has spaces, use quotes: SMTP_PASS=\"xxxx xxxx xxxx xxxx\" or paste without spaces."
    );
  }

  const to = DEFAULT_TO;
  const subject = `[Lumora] New lead — ${source || "website"}`;
  const text = buildEmailBody({
    source,
    Name,
    Email,
    Phone,
    Message,
    Date,
    Time,
  });
  const replyTo =
    typeof Email === "string" && Email.trim() ? Email.trim() : undefined;

  const port = Number(process.env.SMTP_PORT) || 587;
  const secure =
    process.env.SMTP_SECURE === "true" || String(port) === "465";

  const transporter = createTransport(host, port, secure, user, passClean);

  const from = process.env.SMTP_FROM?.trim() || user;

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: replyTo || undefined,
      subject,
      text,
    });
    return res.status(200).json({ ok: true, emailed: true });
  } catch (err) {
    console.error("[notify-lead]", err);
    return res.status(500).json({ ok: false, emailed: false });
  }
}
