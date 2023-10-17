import { resolve } from "path";
/** @type {import('vite').UserConfig} */
export default {
    build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            button: resolve(__dirname, 'pages/button.html'),
          },
        },
      },
}