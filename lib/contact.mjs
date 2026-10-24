import nodemailer from "nodemailer";
const mailbox = "info@vyra.solutions";
const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};
const json = (body, status = 200) => Response.json(body, { status, headers });
export function validateContact(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const { name = "", email, message, company = "" } = data;
  if (![name, email, message, company].every((v) => typeof v === "string"))
    return null;
  if (company || name.length > 120 || /[\r\n\x00-\x1f\x7f]/.test(name))
    return null;
  if (
    email.length > 254 ||
    !/^[^\s@<>\x00-\x1f\x7f]+@[^\s@<>\x00-\x1f\x7f]+\.[^\s@<>\x00-\x1f\x7f]+$/.test(
      email,
    )
  )
    return null;
  if (
    message.trim().length < 10 ||
    message.length > 5000 ||
    message.includes("\0")
  )
    return null;
  return { name: name.trim(), email, message: message.trim() };
}
// The recipient, sender and SMTP host cannot be controlled by a visitor.
export async function handleContact(
  request,
  {
    password = process.env.IONOS_SMTP_PASSWORD,
    transportFactory = nodemailer.createTransport,
  } = {},
) {
  if (request.method === "GET") return json({ available: Boolean(password) });
  if (request.method !== "POST")
    return new Response(null, {
      status: 405,
      headers: { ...headers, Allow: "GET, POST" },
    });
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return json({ error: "Diese Anfrage ist nicht zulässig." }, 403);
  if (!password)
    return json(
      {
        error:
          "Der Formularversand ist noch nicht eingerichtet. Bitte versuche es später erneut.",
      },
      503,
    );
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return json({ error: "Ungültiges Datenformat." }, 415);
  // Enforce the byte limit even when Content-Length is missing or dishonest.
  let bytes = 0;
  const chunks = [];
  const reader = request.body?.getReader();
  if (!reader) return json({ error: "Die Nachricht fehlt." }, 400);
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 24000) {
        await reader.cancel();
        return json({ error: "Die Nachricht ist zu lang." }, 413);
      }
      chunks.push(value);
    }
  } catch {
    return json({ error: "Die Nachricht konnte nicht gelesen werden." }, 400);
  }
  let data;
  try {
    data = validateContact(JSON.parse(Buffer.concat(chunks).toString("utf8")));
  } catch {
    return json({ error: "Ungültige Formulardaten." }, 400);
  }
  if (!data)
    return json(
      { error: "Bitte prüfe E-Mail-Adresse und Nachricht (10–5.000 Zeichen)." },
      400,
    );
  const transport = transportFactory({
    host: "smtp.ionos.de",
    port: 465,
    secure: true,
    auth: { user: mailbox, pass: password },
    tls: { minVersion: "TLSv1.2" },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    logger: false,
    debug: false,
  });
  try {
    const result = await transport.sendMail({
      from: { name: "VYRA Website", address: mailbox },
      to: mailbox,
      replyTo: { name: data.name, address: data.email },
      subject: "Neue Kontaktanfrage über die VYRA Website",
      text: `Name: ${data.name || "Nicht angegeben"}\nE-Mail: ${data.email}\n\n${data.message}`,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    if (
      !result.accepted?.some(
        (address) => String(address).toLowerCase() === mailbox,
      )
    )
      throw new Error("Not accepted");
    return json({
      message:
        "Deine Nachricht wurde vom Mailserver zur Zustellung angenommen. Danke für dein Feedback!",
    });
  } catch {
    // Do not return or log SMTP errors, credentials or message contents.
    return json(
      {
        error:
          "Deine Nachricht konnte nicht versendet werden. Deine Eingaben bleiben im Formular. Bitte versuche es später erneut.",
      },
      502,
    );
  } finally {
    transport.close?.();
  }
}
