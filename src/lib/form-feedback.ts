import type { FormEvent } from "react";
import toast from "react-hot-toast";

export function notifyInvalidField(event: FormEvent<HTMLFormElement>) {
  // Show one message for the first invalid field while the browser focuses it.
  const field = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  if (field !== event.currentTarget.querySelector(":invalid")) return;
  const label = field.labels?.[0]?.textContent?.trim();
  const message = field.validationMessage || "Please check this field";
  toast.error(label ? `${label}: ${message}` : message, { id: "form-validation" });
}
