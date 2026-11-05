export function getTodayInDhaka(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Dhaka", year: "numeric", month: "2-digit", day: "2-digit",
    }).formatToParts(now).map(({ type, value }) => [type, value])
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function getEarliestEventDate(now = new Date()) {
  const tomorrow = new Date(`${getTodayInDhaka(now)}T00:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

export function getEventValidationError(data: Record<string, unknown>) {
  const requiredFields = {
    title: "Title", description: "Description", eventType: "Category",
    thumbnail: "Image URL", location: "Location", date: "Event date",
  };
  for (const [field, label] of Object.entries(requiredFields)) {
    if (typeof data[field] !== "string" || !data[field].trim()) {
      return `${label} is required`;
    }
  }
  const categories = ["Cleanup", "Plantation", "Donation", "Education", "Food Distribution", "Winter Relief"];
  if (!categories.includes(String(data.eventType))) return "Choose a valid event category";
  try {
    const imageURL = new URL(String(data.thumbnail));
    if (!["http:", "https:"].includes(imageURL.protocol)) throw new Error("Invalid image URL");
  } catch {
    return "Enter a valid image URL starting with http:// or https://";
  }
  const date = String(data.date);
  const parsed = new Date(`${date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== date || date <= getTodayInDhaka()) {
    return "Choose a valid future event date: tomorrow or later in Bangladesh time";
  }
  return null;
}
