import fs from 'fs';
import path from 'path';

function escapeHtmlAttr(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceMetaTag(html, nameOrProperty, value, isProperty = false) {
  const attrName = isProperty ? 'property' : 'name';
  // Matches tags like <meta name="description" content="..." /> or <meta property="og:title" content="...">
  const regex = new RegExp(`<meta\\s+[^>]*?${attrName}="${nameOrProperty}"[^>]*?>`, 'i');
  const newTag = `<meta ${attrName}="${nameOrProperty}" content="${escapeHtmlAttr(value)}" />`;
  
  if (regex.test(html)) {
    return html.replace(regex, newTag);
  } else {
    return html.replace('</head>', `  ${newTag}\n</head>`);
  }
}

function replaceTitle(html, title) {
  const regex = /<title>[\s\S]*?<\/title>/i;
  const newTitle = `<title>${escapeHtmlAttr(title)}</title>`;
  if (regex.test(html)) {
    return html.replace(regex, newTitle);
  } else {
    return html.replace('</head>', `  ${newTitle}\n</head>`);
  }
}

export default function handler(req, res) {
  const { slug } = req.query;

  // Resolve file paths
  const postsPath = path.join(process.cwd(), 'dist', 'blog-posts.json');
  const htmlPath = path.join(process.cwd(), 'dist', 'index.html');

  // Load blog post metadata
  let posts = [];
  try {
    if (fs.existsSync(postsPath)) {
      posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
    } else {
      console.warn('blog-posts.json not found at:', postsPath);
    }
  } catch (err) {
    console.error('Error reading blog posts metadata:', err);
  }

  // Load base index.html template
  let html = '';
  try {
    if (fs.existsSync(htmlPath)) {
      html = fs.readFileSync(htmlPath, 'utf-8');
    } else {
      return res.status(404).send('HTML template not found');
    }
  } catch (err) {
    console.error('Error reading index.html template:', err);
    return res.status(500).send('Server Error');
  }

  // Find the post
  const post = posts.find((p) => p.slug === slug);

  if (post) {
    const title = `${post.title} — Bibhuti Bhushan Saha`;
    const description = post.excerpt || '';
    const ogImage = post.coverImage || 'https://bbs-kappa.vercel.app/assets/portfolio.png';
    const ogUrl = `https://bbs-kappa.vercel.app/blog/${slug}`;

    // Replace page title
    html = replaceTitle(html, title);

    // Replace standard tags
    html = replaceMetaTag(html, 'description', description, false);

    // Replace Open Graph tags
    html = replaceMetaTag(html, 'og:title', title, true);
    html = replaceMetaTag(html, 'og:description', description, true);
    html = replaceMetaTag(html, 'og:image', ogImage, true);
    html = replaceMetaTag(html, 'og:url', ogUrl, true);
    html = replaceMetaTag(html, 'og:type', 'article', true);

    // Replace Twitter tags
    html = replaceMetaTag(html, 'twitter:title', title, false);
    html = replaceMetaTag(html, 'twitter:description', description, false);
    html = replaceMetaTag(html, 'twitter:image', ogImage, false);
  }

  // Respond with the modified HTML
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
}
