# fix below error message of the vercel deployment

- Warning - ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy

- error -
```
Type error: Parameter 'filter' implicitly has an 'any' type.
  241 |         {/* Top Filter Buttons */}
  242 |         <div className="flex flex-wrap gap-[6px] mb-0">
> 243 |           {topFilters.map((filter, index) => (
      |                            ^
  244 |             <button
  245 |               key={index}
  246 |               onClick={() => setSelectedTopFilter(selectedTopFilter === filter ? null : f...
  ```
  and
  ` Error: Command "npm run build" exited with 1`




