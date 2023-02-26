/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    VITE_BASE_URL: string;
    VITE_DEFAULT_LOCALE: string;
    VITE_FALLBACK_LOCALE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}