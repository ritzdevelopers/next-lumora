/**
 * Fire-and-forget notification to the site API so leads are emailed to the team.
 * Does not throw; failures are logged in the browser console only.
 */
export function sendLeadEmailNotification(payload) {
  if (typeof window === "undefined") return;

  fetch("/api/notify-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error("Lead email notification failed:", err);
  });
}
