/**
 * Posts a form submission to Netlify Forms.
 *
 * Netlify accepts urlencoded posts to any deployed HTML path; `/__forms.html`
 * carries the field definitions so the deploy-time parser registers both forms.
 */
const NETLIFY_FORM_ENDPOINT = "/__forms.html";

export function createReference() {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(16).slice(2);
  return `RM-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export async function submitEnquiry(
  formName: string,
  fields: Record<string, string | boolean | null | undefined>,
) {
  const body = new URLSearchParams({ "form-name": formName });
  for (const [key, value] of Object.entries(fields)) {
    if (value === null || value === undefined) continue;
    body.append(key, typeof value === "boolean" ? (value ? "yes" : "no") : value);
  }

  const response = await fetch(NETLIFY_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error("We could not submit the enquiry. Please try again.");
  }
}
