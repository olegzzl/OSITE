import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(), 
    viteSingleFile(),
    {
      name: 'remove-module-crossorigin',
      enforce: 'post',
      transformIndexHtml(html) {
        let newHtml = html.replace(/type="module" crossorigin/g, '');
        // Move the inline script to the end of the body
        const scriptRegex = /<script\s*>([\s\S]*?)<\/script>/;
        const match = newHtml.match(scriptRegex);
        if (match) {
          newHtml = newHtml.replace(match[0], '');
          newHtml = newHtml.replace('</body>', `${match[0]}\n  </body>`);
        }
        return newHtml;
      }
    }
  ],
});
