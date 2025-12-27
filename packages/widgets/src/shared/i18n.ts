/**
 * Simple i18n utility for widgets
 *
 * Reads locale from window.openai.locale and provides:
 * - Number formatting
 * - Currency formatting
 * - Date formatting
 * - Simple message translation
 *
 * For production apps, consider using react-intl or similar.
 */

// Default locale
const DEFAULT_LOCALE = "en-US";

/**
 * Get the current locale from window.openai or fallback to default
 */
export function getLocale(): string {
  if (typeof window !== "undefined" && window.openai?.locale) {
    return window.openai.locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * Format a number according to the current locale
 */
export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  const locale = getLocale();
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Format a currency value according to the current locale
 */
export function formatCurrency(
  value: number,
  currency = "USD",
  options?: Intl.NumberFormatOptions,
): string {
  const locale = getLocale();
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...options,
  }).format(value);
}

/**
 * Format a date according to the current locale
 */
export function formatDate(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
): string {
  const locale = getLocale();
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Format a relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(
  date: Date | string | number,
  options?: Intl.RelativeTimeFormatOptions,
): string {
  const locale = getLocale();
  const dateObj = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffMs = dateObj.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
    ...options,
  });

  if (Math.abs(diffSec) < 60) {
    return rtf.format(diffSec, "second");
  } else if (Math.abs(diffMin) < 60) {
    return rtf.format(diffMin, "minute");
  } else if (Math.abs(diffHour) < 24) {
    return rtf.format(diffHour, "hour");
  } else {
    return rtf.format(diffDay, "day");
  }
}

/**
 * Simple message translations
 * For production, use a proper i18n library like react-intl
 */
type MessageKey =
  | "cart.empty"
  | "cart.items"
  | "cart.subtotal"
  | "cart.checkout"
  | "cart.clear"
  | "auth.signIn"
  | "auth.signOut"
  | "auth.authenticated"
  | "auth.notAuthenticated"
  | "common.loading"
  | "common.error"
  | "common.success";

const messages: Record<string, Record<MessageKey, string>> = {
  "en-US": {
    "cart.empty": "Your cart is empty",
    "cart.items": "{count} item(s)",
    "cart.subtotal": "Subtotal",
    "cart.checkout": "Checkout",
    "cart.clear": "Clear Cart",
    "auth.signIn": "Sign In",
    "auth.signOut": "Sign Out",
    "auth.authenticated": "Authenticated",
    "auth.notAuthenticated": "Not authenticated",
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success",
  },
  "es-ES": {
    "cart.empty": "Tu carrito está vacío",
    "cart.items": "{count} artículo(s)",
    "cart.subtotal": "Subtotal",
    "cart.checkout": "Pagar",
    "cart.clear": "Vaciar carrito",
    "auth.signIn": "Iniciar sesión",
    "auth.signOut": "Cerrar sesión",
    "auth.authenticated": "Autenticado",
    "auth.notAuthenticated": "No autenticado",
    "common.loading": "Cargando...",
    "common.error": "Ocurrió un error",
    "common.success": "Éxito",
  },
  "fr-FR": {
    "cart.empty": "Votre panier est vide",
    "cart.items": "{count} article(s)",
    "cart.subtotal": "Sous-total",
    "cart.checkout": "Commander",
    "cart.clear": "Vider le panier",
    "auth.signIn": "Se connecter",
    "auth.signOut": "Se déconnecter",
    "auth.authenticated": "Authentifié",
    "auth.notAuthenticated": "Non authentifié",
    "common.loading": "Chargement...",
    "common.error": "Une erreur est survenue",
    "common.success": "Succès",
  },
};

/**
 * Get a translated message
 * @param key - Message key
 * @param params - Optional parameters for interpolation
 */
export function t(key: MessageKey, params?: Record<string, string | number>): string {
  const locale = getLocale();
  // Try exact locale, then language code, then fallback to en-US
  const langCode = locale.split("-")[0];
  const messageSet =
    messages[locale] || messages[`${langCode}-${langCode.toUpperCase()}`] || messages["en-US"];

  let message = messageSet[key] || key;

  // Simple parameter interpolation
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      message = message.replace(`{${paramKey}}`, String(value));
    });
  }

  return message;
}

/**
 * React hook for locale-aware formatting
 */
export function useI18n() {
  const locale = getLocale();

  return {
    locale,
    formatNumber,
    formatCurrency,
    formatDate,
    formatRelativeTime,
    t,
  };
}
