import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'content/blog');
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const files = fs.readdirSync(blogDir);
const posts = [];

for (const file of files) {
  if (file.endsWith('.mdx')) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/export const metadata = ({[\s\S]*?});/);
    if (match) {
      try {
        // Evaluate the object literal definition safely using new Function
        const metadata = new Function('return ' + match[1])();
        const slug = file.replace('.mdx', '');
        posts.push({
          slug,
          ...metadata
        });
      } catch (err) {
        console.error(`Error parsing metadata in ${file}:`, err);
      }
    }
  }
}

// Sort posts by date descending
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

fs.writeFileSync(
  path.join(publicDir, 'blog-posts.json'),
  JSON.stringify(posts, null, 2)
);
console.log(`Generated metadata for ${posts.length} blog posts in public/blog-posts.json`);
