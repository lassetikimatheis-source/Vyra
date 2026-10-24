import test from "node:test";
import assert from "node:assert/strict";
import { handleContact, validateContact } from "../lib/contact.mjs";
const valid = {
  name: "Lasse",
  email: "test@example.org",
  message: "Eine Frage zur aktuellen Beta.",
};
const req = (data = valid, origin = "https://vyra.example") =>
  new Request("https://vyra.example/api/contact", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
test("No SMTP attempt without configuration; availability is explicit", async () => {
  assert.equal((await handleContact(req(), { password: "" })).status, 503);
  assert.deepEqual(
    await (
      await handleContact(new Request("https://vyra.example/api/contact"), {
        password: "",
      })
    ).json(),
    { available: false },
  );
});
test("Reject invalid data, injection and honeypot", () => {
  for (const data of [
    null,
    [],
    {},
    { ...valid, email: "a@b.de\r\nBcc:x@y.de" },
    { ...valid, name: "A\nB" },
    { ...valid, message: "short" },
    { ...valid, message: "x".repeat(5001) },
    { ...valid, company: "spam" },
  ])
    assert.equal(validateContact(data), null);
});
test("Cross-origin submission is rejected", async () =>
  assert.equal(
    (
      await handleContact(req(valid, "https://evil.example"), {
        password: "test",
      })
    ).status,
    403,
  ));
test("Only fixed recipient and validated reply-to reach SMTP; success requires acceptance", async () => {
  let sent;
  let closed = false;
  const response = await handleContact(req(), {
    password: "test",
    transportFactory: (config) => {
      assert.equal(config.host, "smtp.ionos.de");
      assert.equal(config.secure, true);
      return {
        sendMail: async (mail) => {
          sent = mail;
          return { accepted: ["info@vyra.solutions"] };
        },
        close: () => (closed = true),
      };
    },
  });
  assert.equal(response.status, 200);
  assert.equal(sent.to, "info@vyra.solutions");
  assert.equal(sent.from.address, "info@vyra.solutions");
  assert.equal(sent.replyTo.address, valid.email);
  assert.ok(closed);
});
test("SMTP rejection is a failure and never exposes credentials", async () => {
  const response = await handleContact(req(), {
    password: "SECRET",
    transportFactory: () => ({
      sendMail: async () => {
        throw Error("SECRET");
      },
    }),
  });
  assert.equal(response.status, 502);
  assert.ok(!(await response.text()).includes("SECRET"));
});
test("Missing SMTP acceptance cannot report success", async () =>
  assert.equal(
    (
      await handleContact(req(), {
        password: "test",
        transportFactory: () => ({ sendMail: async () => ({ accepted: [] }) }),
      })
    ).status,
    502,
  ));
test("Oversized payload is rejected before SMTP", async () =>
  assert.equal(
    (
      await handleContact(req({ ...valid, message: "x".repeat(24001) }), {
        password: "test",
      })
    ).status,
    413,
  ));
