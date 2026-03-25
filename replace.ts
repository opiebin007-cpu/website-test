import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(/bg-white\/\[0\.02\]/g, 'bg-black/[0.02] dark:bg-white/[0.02]');
content = content.replace(/bg-white\/\[0\.01\]/g, 'bg-black/[0.01] dark:bg-white/[0.01]');

fs.writeFileSync('src/App.tsx', content);
