import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import jp from "./locales/jp.json";
import swe from "./locales/swe.json";

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    warnHtmlMessage: false,
    legacy: false,
    globalInjection: true,
    messages: { en, jp, swe }
})