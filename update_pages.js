const fs = require('fs');
const pages = ['bracelets', 'charms', 'collections', 'earrings', 'for-him', 'necklaces', 'outlet', 'rings', 'shop-by'];

pages.forEach(p => {
  const filePath = `src/app/${p}/page.tsx`;
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace the hardcoded topFilters array with the dynamic one
  content = content.replace(/const topFilters = \[[\s\S]*?\];/, `const topFilters = navbarTabs.find(t => t.href === '/${p}')?.groupFilters || [];`);
  
  // Update useProducts to extract navbarTabs
  content = content.replace(/const { products: dbProducts, loading } = useProducts\(\);/, `const { products: dbProducts, navbarTabs, loading } = useProducts();`);
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${p}`);
});
