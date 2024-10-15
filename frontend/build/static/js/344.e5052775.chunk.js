"use strict";(self.webpackChunkecommerceproject=self.webpackChunkecommerceproject||[]).push([[344],{344:(e,t,i)=>{i.r(t),i.d(t,{default:()=>n});var a=i(43),l=i(25);const o=i.p+"static/media/carticon.08b599bf55825169941b1ef19aafcf34.svg";var c=i(475),s=i(519),r=i(169),d=i(579);const n=()=>{const{activeCategory:e}=(0,s.N)(),[t,i]=(0,a.useState)([]),[n,u]=(0,a.useState)(!1),{addToCart:v}=(0,r._)();(0,a.useEffect)((()=>{(async()=>{u(!0);const t=l.J1`
        query($category: String) {
          products(category: $category) {
            id
            name
            inStock
            category
            imageUrl
            prices {
              amount
              currencySymbol
            }
            attributes {
              id
              name
              items {
                id
                display_value
                value
              }
            }
          }
        }
      `,a="all"===e?null:"clothes"===e?"2":"3";try{const e=await(0,l.Em)("http://localhost:8000/graphql.php",t,{category:a});i(e.products)}catch(o){console.error("Error fetching products:",o)}finally{u(!1)}})()}),[e]);const m="all"===e?t:t.filter((t=>"clothes"===e?"2"===t.category:"3"===t.category));return(0,d.jsxs)("div",{className:"product-list-container",children:[(0,d.jsx)("h2",{children:"all"===e?"all":e}),n?(0,d.jsx)("p",{children:"Loading products..."}):(0,d.jsxs)("div",{className:"product-grid",children:[0===m.length&&(0,d.jsx)("p",{children:"No products available."}),m.map((e=>{var t,i,a,l;return(0,d.jsxs)("div",{className:"product-card "+(e.inStock?"":"out-of-stock"),"data-testid":`product-${e.name.toLowerCase().replace(/\s+/g,"-")}`,children:[(0,d.jsxs)(c.N_,{to:`/product/${e.id}`,className:"product-image-link",children:[(0,d.jsx)("img",{src:e.imageUrl||"default-image-url",alt:e.name,className:"product-image",style:{filter:e.inStock?"none":"grayscale(100%)"}}),!e.inStock&&(0,d.jsx)("div",{className:"out-of-stock-label",children:"OUT OF STOCK"})]}),(0,d.jsxs)("div",{className:"product-info",children:[(0,d.jsx)("h3",{children:e.name}),(0,d.jsxs)("p",{children:[(null===(t=e.prices)||void 0===t||null===(i=t[0])||void 0===i?void 0:i.currencySymbol)||"$",((null===(a=e.prices)||void 0===a||null===(l=a[0])||void 0===l?void 0:l.amount)||0).toFixed(2)]})]}),e.inStock&&(0,d.jsx)("div",{className:"quick-shop",onClick:t=>((e,t)=>{var i,a,l,o,c,s,r,d,n,u,m,p;e.preventDefault(),e.stopPropagation();const h=(null===(i=t.attributes.find((e=>"Color"===e.name)))||void 0===i||null===(a=i.items[0])||void 0===a?void 0:a.value)||"",g=(null===(l=t.attributes.find((e=>"Capacity"===e.name)))||void 0===l||null===(o=l.items[0])||void 0===o?void 0:o.value)||"",f=(null===(c=t.attributes.find((e=>"Size"===e.name)))||void 0===c||null===(s=c.items[0])||void 0===s?void 0:s.value)||"",y=(null===(r=t.attributes.find((e=>"Touch ID in keyboard"===e.name)))||void 0===r||null===(d=r.items[0])||void 0===d?void 0:d.value)||"",b=(null===(n=t.attributes.find((e=>"With USB 3 ports"===e.name)))||void 0===n||null===(u=n.items[0])||void 0===u?void 0:u.value)||"",j={...t,selectedColor:h,selectedCapacity:g,selectedSize:f,selectedTouchID:y,selectedUSBPorts:b,price:(null===(m=t.prices)||void 0===m||null===(p=m[0])||void 0===p?void 0:p.amount)||0,quantity:1};v(j)})(t,e),children:(0,d.jsx)("img",{src:o,alt:"Cart"})})]},e.id)}))]})]})}}}]);
//# sourceMappingURL=344.e5052775.chunk.js.map