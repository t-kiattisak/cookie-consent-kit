export const safeJsonParse = <T>(
  jsonString: string | undefined | null,
  fallback: T
): T => {
  if (!jsonString) return fallback

  try {
    const parsed = JSON.parse(jsonString) as T
    return parsed !== null && typeof parsed === "object" ? parsed : fallback
  } catch (error) {
    console.debug(
      "JSON parsing failed:",
      error instanceof Error ? error.message : "Unknown error"
    )
    return fallback
  }
}
