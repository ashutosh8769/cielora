const fs = require('fs');
const pages = ['bracelets', 'charms', 'collections', 'earrings', 'for-him', 'necklaces', 'outlet', 'rings', 'shop-by'];

pages.forEach(p => {
  const filePath = `src/app/${p}/page.tsx`;
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // We need to move `const { products: dbProducts, navbarTabs, loading } = useProducts();`
  // above `const topFilters = ...`
  
  // 1. Remove the line `const { products: dbProducts, navbarTabs, loading } = useProducts();`
  content = content.replace(/\s*const \{ products: dbProducts, navbarTabs, loading \} = useProducts\(\);/, '');
  
  // 2. Insert it just before `const topFilters = ...`
  content = content.replace(/(const topFilters = navbarTabs\.find)/, `const { products: dbProducts, navbarTabs, loading } = useProducts();\n  $1`);
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${p}`);
});
