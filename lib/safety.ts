const blockedTerms = ["harass", "hate", "explicit", "creepy", "pressure"];

export function containsAbusePlaceholder(value: string) {
  const normalized = value.toLowerCase();
  return blockedTerms.some((term) => normalized.includes(term));
}

export function friendlyError(message?: string) {
  if (!message) {
    return "Something did not go through. Please try again or speak to venue staff.";
  }

  if (message.toLowerCase().includes("network")) {
    return "The room connection is a little slow. Please try again.";
  }

  return "That action could not be completed safely. Please try again.";
}

export function canUseEventActions({ isBanned, isBlocked }: { isBanned?: boolean; isBlocked?: boolean }) {
  return !isBanned && !isBlocked;
}
