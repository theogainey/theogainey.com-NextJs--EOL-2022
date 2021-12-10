import { writeFileSync } from 'fs';

async function generate() {
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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

  // eslint-disable-next-line no-sync
  writeFileSync('public/sitemap.xml', sitemap);
}

generate();
