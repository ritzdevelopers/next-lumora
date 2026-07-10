const fs = require("fs");
const path = require("path");

const PAGES_DIR = path.join(__dirname, "../src/pages");
const PUBLIC_DIR = path.join(__dirname, "../public");
const SITE_URL = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://lumoraestates.com"
).replace(/\/$/, "");

const PAGE_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx"]);
const URLS_PER_SITEMAP = 50000;

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function filePathToRoute(relativePath) {
  const ext = path.extname(relativePath);
  const withoutExt = relativePath.slice(0, -ext.length);
  const segments = withoutExt.split(path.sep).filter(Boolean);

  if (segments.length === 0) {
    return "/";
  }

  if (segments[segments.length - 1] === "index") {
    segments.pop();
  }

  if (segments.length === 0) {
    return "/";
  }

  return `/${segments.join("/")}`;
}

function collectPageRoutes(dir, base = "") {
  const routes = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const relativePath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "api") {
        continue;
      }

      routes.push(...collectPageRoutes(path.join(dir, entry.name), relativePath));
      continue;
    }

    const ext = path.extname(entry.name);
    if (!PAGE_EXTENSIONS.has(ext)) {
      continue;
    }

    const pageName = path.basename(entry.name, ext);
    if (pageName.startsWith("_")) {
      continue;
    }

    const route = filePathToRoute(relativePath);
    if (route.includes("[")) {
      continue;
    }

    const absoluteFilePath = path.join(dir, entry.name);
    routes.push({
      route,
      lastmod: fs.statSync(absoluteFilePath).mtime,
    });
  }

  return routes;
}

function formatLastmod(date) {
  return date.toISOString().split("T")[0];
}

function getPriority(route) {
  return route === "/" ? "1.0" : "0.8";
}

function buildUrlsetXml(entries) {
  const urls = entries
    .map(({ route, lastmod }) => {
      const loc = `${SITE_URL}${route === "/" ? "" : route}`;

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${formatLastmod(lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${getPriority(route)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildSitemapIndexXml(sitemapFiles) {
  const today = formatLastmod(new Date());
  const sitems = sitemapFiles
    .map(
      (filename) => `  <sitemap>
    <loc>${escapeXml(`${SITE_URL}/${filename}`)}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitems}
</sitemapindex>
`;
}

function chunkArray(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function generateSitemaps() {
  const pageRoutes = collectPageRoutes(PAGES_DIR).sort((a, b) => {
    if (a.route === "/") return -1;
    if (b.route === "/") return 1;
    return a.route.localeCompare(b.route);
  });

  if (pageRoutes.length === 0) {
    throw new Error("No public pages found in src/pages");
  }

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const existingSitemaps = fs
    .readdirSync(PUBLIC_DIR)
    .filter((file) => /^sitemap-\d+\.xml$/.test(file));

  for (const file of existingSitemaps) {
    fs.unlinkSync(path.join(PUBLIC_DIR, file));
  }

  const chunks = chunkArray(pageRoutes, URLS_PER_SITEMAP);
  const sitemapFiles = chunks.map((chunk, index) => {
    const filename = `sitemap-${index}.xml`;
    fs.writeFileSync(
      path.join(PUBLIC_DIR, filename),
      buildUrlsetXml(chunk),
      "utf8"
    );
    return filename;
  });

  fs.writeFileSync(
    path.join(PUBLIC_DIR, "sitemap.xml"),
    buildSitemapIndexXml(sitemapFiles),
    "utf8"
  );

  console.log(`Generated sitemap.xml with ${sitemapFiles.length} sitemap file(s)`);
  console.log(`Included ${pageRoutes.length} URL(s):`);
  for (const { route } of pageRoutes) {
    console.log(`  - ${SITE_URL}${route === "/" ? "" : route}`);
  }
}

generateSitemaps();
