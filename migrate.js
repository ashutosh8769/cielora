const fs = require('fs');
const db = JSON.parse(fs.readFileSync('src/data/db.json'));
const pages = ['bracelets', 'charms', 'collections', 'earrings', 'for-him', 'necklaces', 'outlet', 'rings', 'shop-by'];
pages.forEach(p => {
  const content = fs.readFileSync(`src/app/${p}/page.tsx`, 'utf-8');
  const match = content.match(/const topFilters = \[([\s\S]*?)\];/);
  if (match) {
    const filtersStr = match[1];
    const filters = filtersStr.split(',').map(s => s.trim().replace(/^\"|\"$/g, '')).filter(s => s.length > 0);
    const tab = db.navbarTabs.find(t => t.href === `/${p}`);
    if (tab) {
      tab.groupFilters = filters;
    }
  }
});
fs.writeFileSync('src/data/db.json', JSON.stringify(db, null, 2));
console.log('Successfully updated db.json with groupFilters!');
