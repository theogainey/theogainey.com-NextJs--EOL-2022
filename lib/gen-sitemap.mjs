import { writeFileSync } from 'fs';
import prettier from 'prettier';

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${`https://theogainey.com`}</loc>
      </url>
      <url>
        <loc>${`https://theogainey.com/HelpfulLinks`}</loc>
      </url>
      <url>
        <loc>${`https://theogainey.com/projects/theogainey-dot-com`}</loc>
      </url>
      <url>
        <loc>${`https://theogainey.com/projects/Cloud-One-Link`}</loc>
      </url>
      <url>
        <loc>${`https://theogainey.com/projects/Vanillia-JS-Games`}</loc>
      </url>
      <url>
        <loc>${`https://theogainey.com/projects/Card-Game-Scorer`}</loc>
      </url>
    </urlset>
    `;
    const formatted = prettier.format(sitemap, {
      ...prettierConfig,
      parser: 'html'
    });

    writeFileSync('public/sitemap.xml', formatted);
}

generate();
