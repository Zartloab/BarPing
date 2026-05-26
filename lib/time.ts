export function formatEventTime(startsAt: string, endsAt: string) {
  const start = new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(startsAt));
  const end = new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(endsAt));
  return `${start} - ${end}`;
}

export function minutesRemaining(until: string) {
  const diff = new Date(until).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 60000));
}

export function shortTime(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

export function isExpired(endsAt: string) {
  return new Date(endsAt).getTime() < Date.now();
}
