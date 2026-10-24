const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const fields = form.querySelector("fieldset");
const submit = form.querySelector('button[type="submit"]');
async function checkAvailability() {
  try {
    const response = await fetch("/api/contact", {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok || !(await response.json()).available) throw new Error();
    fields.disabled = false;
    status.textContent =
      "Wir freuen uns auf deine Nachricht. E-Mail-Adresse und Nachricht sind erforderlich.";
  } catch {
    status.textContent =
      "Das Kontaktformular ist noch nicht freigeschaltet. Bitte versuche es zu einem späteren Zeitpunkt erneut.";
  }
}
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity() || fields.disabled || submit.disabled) return;
  const values = new FormData(form);
  submit.disabled = true;
  status.textContent = "Deine Nachricht wird versendet …";
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(Object.fromEntries(values)),
      signal: AbortSignal.timeout(25000),
    });
    const result = await response.json();
    if (!response.ok)
      throw new Error(
        result.error ||
          "Der Versand ist fehlgeschlagen. Bitte versuche es später erneut.",
      );
    status.textContent = result.message;
    form.reset();
  } catch (error) {
    status.textContent =
      error.name === "TimeoutError"
        ? "Die Verbindung wurde unterbrochen. Ob deine Nachricht zugestellt wurde, ist unklar. Deine Eingaben bleiben erhalten."
        : error instanceof TypeError
          ? "Keine Verbindung zum Server. Deine Eingaben bleiben erhalten."
          : error.message;
  } finally {
    submit.disabled = false;
  }
});
checkAvailability();
