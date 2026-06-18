import os
import glob

pages = [
    'bracelets', 'charms', 'collections', 'earrings', 
    'for-him', 'necklaces', 'outlet', 'rings', 'shop-by'
]

active_filters_code = """
        {/* Active Filters */}
        {Object.entries(selectedFilters).some(([_, vals]) => vals.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-4 items-center">
            <span className="text-[12px] text-gray-500 mr-2">Applied Filters:</span>
            {Object.entries(selectedFilters).map(([category, values]) => 
              values.map(val => (
                <button
                  key={${category}-}
                  onClick={() => toggleFilter(category as keyof FilterState, val)}
                  className="flex items-center gap-1 border border-gray-300 px-2 py-1 text-[11px] text-gray-700 hover:bg-gray-100 rounded-sm transition-colors"
                >
                  {val}
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>
              ))
            )}
            <button
              onClick={() => setSelectedFilters({ CATEGORY: [], PRICE: [], SIZE: [], PLATING: [], COMPONENT: [], LEATHER: [], COLOR: [] })}
              className="text-[11px] text-gray-500 hover:text-black underline ml-2 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

      {/* Product Grid */}"""

for p in pages:
    file_path = f"src/app/{p}/page.tsx"
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "Active Filters" in content:
        print(f"Skipping {p}, already has Active Filters.")
        continue
        
    new_content = content.replace("      {/* Product Grid */}", active_filters_code)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {p}")

