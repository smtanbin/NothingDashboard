import type en from "./dictionaries/en.json";

export type Dictionary = typeof en;

// Use Object.create(null) so the map itself has no prototype, giving us
// an additional layer of defence against prototype-pollution attacks.
const dictionaries: Record<string, (() => Promise<Dictionary>) | undefined> = Object.assign(
    Object.create(null) as object,
    {
        en: () => import("./dictionaries/en.json").then((m) => m.default),
        // Add more locales here, e.g.:
        // bn: () => import("./dictionaries/bn.json").then((m) => m.default),
    }
);

export type Locale = "en"; // Extend this union as you add locales

export const defaultLocale: Locale = "en";

// Uses hasOwnProperty instead of `in` to avoid traversing the prototype chain.
// `in` would return true for keys like "__proto__" or "constructor".
export const hasLocale = (locale: string): locale is Locale =>
    Object.prototype.hasOwnProperty.call(dictionaries, locale);

export const getDictionary = async (locale: string = defaultLocale): Promise<Dictionary> => {
    // Runtime validation: reject any key not present as an own property.
    // This guards against prototype pollution even if TypeScript types are bypassed.
    const safeLocale = hasLocale(locale) ? locale : defaultLocale;
    return dictionaries[safeLocale]!();
};
