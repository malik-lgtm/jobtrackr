// Supabase errors are not always `Error` instances, so check both shapes.
export function getErrorMessage(error, fallback = "Something went wrong. Try again.") {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = error.message;
    if (typeof message === "string" && message) return message;
  }
  return fallback;
}
