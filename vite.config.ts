import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(), 
    viteSingleFile(),
    {
      name: 'postprocess-singlefile-html',
      closeBundle() {
        const filePath = path.resolve('dist/index.html');
        if (fs.existsSync(filePath)) {
          console.log('--- Post-processing SingleFile HTML ---');
          let html = fs.readFileSync(filePath, 'utf8');
          console.log('Original HTML length:', html.length);
          
          // Remove type="module" crossorigin to make it a standard local script tag
          let newHtml = html.replace(/type="module" crossorigin/g, '');
          
          // Extract the inlined script tag (which contains the entire compiled application)
          const scriptRegex = /<script\s*>([\s\S]*?)<\/script>/;
          const match = newHtml.match(scriptRegex);
          console.log('Inline script found:', !!match);
          
          if (match) {
            console.log('Script length:', match[0].length);
            // Remove the script from its original position (head)
            newHtml = newHtml.replace(match[0], '');
            
            // Move the script to the end of the body so that document.getElementById('root') works correctly!
            // We use a function as the second argument to prevent Javascript's replace() engine 
            // from parsing special '$' sequences in the minified bundle (like $$typeof or $&).
            newHtml = newHtml.replace('</body>', () => `${match[0]}\n  </body>`);
            
            fs.writeFileSync(filePath, newHtml, 'utf8');
            console.log('Successfully moved inlined script to the end of the body in dist/index.html!');
          }
        }
      }
    }
  ],
});
