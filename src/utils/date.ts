/**
 * Format date to a readable string
 */
export function formatDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj)
}

/**
 * Get relative time string with i18n support
 * @param date - The date to format
 * @param t - i18n translation function
 * @returns Localized relative time string
 */
export function getRelativeTime(
  date: Date | string,
  t: (key: string, options?: { count: number }) => string,
): string {
  // Ensure we have a proper Date object
  const dateObj = date instanceof Date ? date : new Date(date)

  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (diffInSeconds < 60) return t("time.justNow")

  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return t("time.minutesAgo", { count: minutes })
  }

  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return t("time.hoursAgo", { count: hours })
  }

  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return t("time.daysAgo", { count: days })
  }

  return formatDate(dateObj)
}
