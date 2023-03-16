import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';
import { fileURLToPath, URL } from "node:url";

export default defineConfig(
    mergeConfig(viteConfig, { // extending app vite config
        test: {
            setupFiles: ['src/components/__tests__/unit.setup.ts'],
            globals: true,
            environment: 'jsdom',
        },
        resolve: {
            alias: {
              "@": fileURLToPath(new URL("./src", import.meta.url))
            },
          },
    })
);