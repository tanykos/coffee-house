(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))d(s);new MutationObserver(s=>{for(const e of s)if(e.type==="childList")for(const u of e.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function a(s){const e={};return s.integrity&&(e.integrity=s.integrity),s.referrerPolicy&&(e.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?e.credentials="include":s.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function d(s){if(s.ep)return;s.ep=!0;const e=a(s);fetch(s.href,e)}})();function q(){const i=document.querySelector(".menu-button"),n=document.querySelector(".nav-wrap"),a=document.querySelector("body");i.addEventListener("click",()=>{i.classList.toggle("active"),n.classList.toggle("active"),a.classList.toggle("no-scroll")}),n.addEventListener("click",d=>{d.target.className=="menu-item"&&(i.classList.remove("active"),n.classList.remove("active"),a.classList.remove("no-scroll"))})}function x(){const i=document.querySelector(".slide-wrap"),n=document.querySelector(".carousel"),a=document.querySelectorAll(".slide"),d=document.querySelectorAll(".arrow"),s=document.querySelectorAll(".dash");let e=0,u,g=s[e].querySelector(".dash-progress").animate({width:"100%"},5e3);const f=r=>{document.querySelector(".progress .active").classList.remove("active"),r.classList.add("active"),g&&g.cancel(),g=s[e].querySelector(".dash-progress").animate({width:"100%"},5e3)};let t,o=new Date,p,v;const b=r=>{const E=v?5e3-r-v:5e3-r;o=new Date,t=setTimeout(()=>{++e,e===a.length?e=0:e=e<0?a.length-1:e,f(s[e]),n.style.transform=`translate(-${e*100}%)`,y()},E)},y=()=>{o=new Date,t=void 0,u=setInterval(()=>{++e,L()},5e3)};y();const L=()=>{e===a.length?e=0:e=e<0?a.length-1:e,f(s[e]),n.style.transform=`translate(-${e*100}%)`,o=new Date,p=0,t=void 0,v=0},S=r=>{clearInterval(u),clearTimeout(t),e+=r.currentTarget.id==="next"?1:-1,L(),y()},c=(r,E)=>{r.addEventListener("click",()=>{clearInterval(u),clearTimeout(t),e=E,f(r),L(),y()})};d.forEach(r=>r.addEventListener("click",S)),s.forEach(c);const l=()=>{t?(v=p,p=0,clearTimeout(t)):v=0,p=new Date-o,clearInterval(u),g.pause()},m=()=>{b(p),g.play()};i.addEventListener("mouseenter",l),i.addEventListener("mouseleave",m);let h=0,k=0,T;i.addEventListener("touchstart",r=>{r.preventDefault(),h=r.touches[0].clientX,T=setTimeout(l,0)}),i.addEventListener("touchmove",r=>{k=r.touches[0].clientX}),i.addEventListener("touchend",()=>{clearTimeout(T);let r=h-k;clearInterval(u),clearTimeout(t),Math.abs(r)>30&&k!=0?(r>0?e+=1:e-=1,k=0,L(),y()):(clearTimeout(T),m())})}function C(){let i,n,a=0,d=0,s,e;const u=t=>{const o=document.querySelector(".modal"),p=document.querySelector("body");return o.innerHTML=`
      <div class="dialog-wrap">
        <div class="dialog-img hide-sm">
          <img src=${t.src} alt=${t.name}>
        </div>
        <div class="dialog-content">
          <h3 class="title">${t.name}</h3>
          <p>${t.description}</p>
          <form id="costForm">
            <fieldset>
              <legend>Size</legend>
              <label class="secondary-btn">
                <input type="radio" checked="checked" name="radioGroup" value="0">
                <span class="circle">S</span>
                <span class="title">
                  ${t.sizes.s.size}
                </span>
              </label>
              <label class="secondary-btn">
                <input type="radio" name="radioGroup" value="0.5">
                <span class="circle">M</span>
                <span class="title">
                  ${t.sizes.m.size}
                </span>
              </label>
              <label class="secondary-btn">
                <input type="radio" name="radioGroup" value="1">
                <span class="circle">L</span>
                <span class="title">
                  ${t.sizes.l.size}
                </span>
              </label>
            </fieldset>
          
            <fieldset>
              <legend>Additives</legend>
              <label class="secondary-btn">
                <input type="checkbox" name="checkboxGroup" value="0.5">
                <span class="circle">1</span>
                <span class="title">
                  ${t.additives[0].name}
                </span>
              </label>
              <label class="secondary-btn">
                <input type="checkbox" name="checkboxGroup" value="0.5">
                <span class="circle">2</span>
                <span class="title">
                  ${t.additives[1].name}
                </span>
              </label>
              <label class="secondary-btn">
                <input type="checkbox" name="checkboxGroup" value="0.5">
                <span class="circle">3</span>
                <span class="title">
                  ${t.additives[2].name}
                </span>
              </label>
            </fieldset>

            <h3 class="total">
              <span>Total:</span>
              <span>&#36;<span id="totalCost">${t.price}</span></span>
            </h3>
            <div class="info">
              <span class="icon-info">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="info-empty" clip-path="url(#clip0_268_9737)">
                  <path id="Vector" d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                  <path id="Vector_2" d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                  <path id="Vector_3" d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_268_9737">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
              </span>
              <span class="text-info">
                The cost is not final. Download our mobile app to see the final price and place your order.
                Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
              </span>
            </div>

          <button class="cancel-btn primary-btn" formmethod="dialog">Close</button>
          </form>
        </div>
      </div>
    `,p.appendChild(o),o};function g(t){const o=i.getBoundingClientRect();(t.clientX<o.left||t.clientX>o.right||t.clientY<o.top||t.clientY>o.bottom)&&i.close()}function f(t){let o=t.target,p=document.querySelector("#totalCost");t.target.type==="radio"&&o.checked&&(a=parseFloat(o.value),n=s+a+d,p.textContent=n.toFixed(2)),t.target.type==="checkbox"&&(o.checked?(d+=.5,n=s+a+d,p.textContent=n.toFixed(2)):(d-=.5,n=s+a+d,p.textContent=n.toFixed(2)))}return function(o,p){if(o.target.classList.contains("grid-item")){const v=o.target.id,b=p.find(y=>y.id===v);s=parseFloat(b.price),n=s,i=u(b),i.showModal(),i.addEventListener("click",g),e=i.querySelector("#costForm"),e.addEventListener("change",f)}}}const w={init:()=>{document.addEventListener("DOMContentLoaded",w.load)},load:()=>{w.getData(),q()},getData:()=>{switch(document.body.id){case"homePage":w.goHomePage();break;case"menuPage":w.goMenuPage();break;default:w.goHomePage()}},goHomePage:()=>{x()},goMenuPage:()=>{async function i(){try{const l=await(await fetch("./products.json")).json();let m=localStorage.getItem("category")||"coffee";return y(l,m),l}catch(c){console.error("Error: ",c)}}i();const n=document.querySelector("#products");let a=window.innerWidth;const d=document.querySelector(".refresh");let s=a<769,e,u=0,g,f;const t=()=>{g&&clearTimeout(g),g=setTimeout(function(){a=window.innerWidth,s=a<769,n.innerHTML="",b(f)},300)};window.addEventListener("resize",t);const o=C();n.addEventListener("click",c=>o(c,f));const p=(c,l)=>l.filter(m=>m.category===c),v=(c,l)=>{const m=[];for(let h=0;h<c.length;h+=l)m.push(c.slice(h,h+l));return m},b=c=>{s&&c.length>4?(e=v(c,4),u=e.length-1,S(e[0]),e.shift()):(u=0,S(c))};function y(c,l){document.querySelector(`#${l}`).classList.add("active"),f=p(l,c),b(f),document.querySelectorAll(".secondary-btn").forEach(h=>{h.addEventListener("click",()=>{document.querySelector(".secondary-btn.active").classList.remove("active"),h.classList.add("active"),n.innerHTML="",localStorage.setItem("category",h.id),f=p(h.id,c),b(f)})})}function L(){u=u-1,S(e[0]),e.shift()}function S(c){c.forEach(l=>{const m=document.createElement("div");m.setAttribute("class","grid-item"),m.setAttribute("id",`${l.id}`),m.innerHTML=`
          <figure class="item-img">
            <img src=${l.src} alt=${l.name}>
          </figure>
          <div class="item-text">
            <h3 class="title">${l.name}</h3>
            <p>${l.description}</p>
            <h3 class="card-footer">&#36;${l.price}</h3>
          </div>`,n.appendChild(m)}),s&&u!=0?(d.classList.remove("hide"),d.addEventListener("click",L)):d&&(d.classList.contains("hide")||d.classList.add("hide"))}}};w.init();
//# sourceMappingURL=main-QPRSUuVR.js.map
