(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))u(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function d(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(n){if(n.ep)return;n.ep=!0;const t=d(n);fetch(n.href,t)}})();document.addEventListener("DOMContentLoaded",function(){const a=document.querySelector(".menu-button"),l=document.querySelector(".nav-wrap"),d=document.querySelector("body");a.addEventListener("click",()=>{a.classList.toggle("active"),l.classList.toggle("active"),d.classList.toggle("no-scroll")}),l.addEventListener("click",u=>{u.target.className=="menu-item"&&(a.classList.remove("active"),l.classList.remove("active"),d.classList.remove("no-scroll"))})});const T={init:()=>{document.addEventListener("DOMContentLoaded",T.load)},load:()=>{T.getData()},getData:()=>{switch(document.body.id){case"homePage":T.goHomePage();break;case"menuPage":T.goMenuPage();break;default:T.goHomePage()}},goHomePage:()=>{const a=document.querySelector(".slide-wrap"),l=document.querySelector(".carousel"),d=document.querySelectorAll(".slide"),u=document.querySelectorAll(".arrow"),n=document.querySelectorAll(".dash");let t=0,c,m=n[t].querySelector(".dash-progress").animate({width:"100%"},5e3);const b=o=>{document.querySelector(".progress .active").classList.remove("active"),o.classList.add("active"),m&&m.cancel(),m=n[t].querySelector(".dash-progress").animate({width:"100%"},5e3)};let r,S=new Date,g,L;const q=o=>{const h=L?5e3-o-L:5e3-o;S=new Date,r=setTimeout(()=>{++t,t===d.length?t=0:t=t<0?d.length-1:t,b(n[t]),l.style.transform=`translate(-${t*100}%)`,w()},h)},w=()=>{S=new Date,r=void 0,c=setInterval(()=>{++t,k()},5e3)};w();const k=()=>{t===d.length?t=0:t=t<0?d.length-1:t,b(n[t]),l.style.transform=`translate(-${t*100}%)`,S=new Date,g=0,r=void 0,L=0},x=o=>{clearInterval(c),clearTimeout(r),t+=o.currentTarget.id==="next"?1:-1,k(),w()},v=(o,h)=>{o.addEventListener("click",()=>{clearInterval(c),clearTimeout(r),t=h,b(o),k(),w()})};u.forEach(o=>o.addEventListener("click",x)),n.forEach(v);const C=()=>{r?(L=g,g=0,clearTimeout(r)):L=0,g=new Date-S,clearInterval(c),m.pause()},E=()=>{q(g),m.play()};a.addEventListener("mouseenter",C),a.addEventListener("mouseleave",E);let $=0,p=0,y;a.addEventListener("touchstart",o=>{o.preventDefault(),$=o.touches[0].clientX,y=setTimeout(C,0)}),a.addEventListener("touchmove",o=>{p=o.touches[0].clientX}),a.addEventListener("touchend",()=>{clearTimeout(y);let o=$-p;clearInterval(c),clearTimeout(r),Math.abs(o)>30&&p!=0?(o>0?t+=1:t-=1,p=0,k(),w()):(clearTimeout(y),E())})},goMenuPage:()=>{async function a(){try{const s=await(await fetch("./products.json")).json();let i=localStorage.getItem("category")||"coffee";return w(s,i),s}catch(e){console.error("Error: ",e)}}a();const l=document.querySelector("#products");let d=window.innerWidth;const u=document.querySelector(".refresh"),n=document.querySelector("body");let t=d<769,c,m=0,b,r;const S=()=>{b&&clearTimeout(b),b=setTimeout(function(){d=window.innerWidth,t=d<769,l.innerHTML="",q(r)},300)};window.addEventListener("resize",S),l.addEventListener("click",A);const g=(e,s)=>s.filter(i=>i.category===e),L=(e,s)=>{const i=[];for(let f=0;f<e.length;f+=s)i.push(e.slice(f,f+s));return i},q=e=>{t&&e.length>4?(c=L(e,4),m=c.length-1,x(c[0]),c.shift()):(m=0,x(e))};function w(e,s){document.querySelector(`#${s}`).classList.add("active"),r=g(s,e),q(r),document.querySelectorAll(".secondary-btn").forEach(f=>{f.addEventListener("click",()=>{document.querySelector(".secondary-btn.active").classList.remove("active"),f.classList.add("active"),l.innerHTML="",localStorage.setItem("category",f.id),r=g(f.id,e),q(r)})})}function k(){m=m-1,x(c[0]),c.shift()}function x(e){e.forEach(s=>{const i=document.createElement("div");i.setAttribute("class","grid-item"),i.setAttribute("id",`${s.id}`),i.innerHTML=`
          <figure class="item-img">
            <img src=${s.src} alt=${s.name}>
          </figure>
          <div class="item-text">
            <h3 class="title">${s.name}</h3>
            <p>${s.description}</p>
            <h3 class="card-footer">&#36;${s.price}</h3>
          </div>`,l.appendChild(i)}),t&&m!=0?(u.classList.remove("hide"),u.addEventListener("click",k)):u&&(u.classList.contains("hide")||u.classList.add("hide"))}let v;const C=e=>{const s=v.getBoundingClientRect();(e.clientX<s.left||e.clientX>s.right||e.clientY<s.top||e.clientY>s.bottom)&&v.close()},E=document.querySelector(".modal"),$=e=>(E.innerHTML=`
        <div class="dialog-wrap">
          <div class="dialog-img hide-sm">
            <img src=${e.src} alt=${e.name}>
          </div>
          <div class="dialog-content">
            <h3 class="title">${e.name}</h3>
            <p>${e.description}</p>
            <form id="costForm">
              <fieldset>
                <legend>Size</legend>
                <label class="secondary-btn">
                  <input type="radio" checked="checked" name="radioGroup" value="0">
                  <span class="circle">S</span>
                  <span class="title">
                    ${e.sizes.s.size}
                  </span>
                </label>
                <label class="secondary-btn">
                  <input type="radio" name="radioGroup" value="0.5">
                  <span class="circle">M</span>
                  <span class="title">
                    ${e.sizes.m.size}
                  </span>
                </label>
                <label class="secondary-btn">
                  <input type="radio" name="radioGroup" value="1">
                  <span class="circle">L</span>
                  <span class="title">
                    ${e.sizes.l.size}
                  </span>
                </label>
              </fieldset>
            
              <fieldset>
                <legend>Additives</legend>
                <label class="secondary-btn">
                  <input type="checkbox" name="checkboxGroup" value="0.5">
                  <span class="circle">1</span>
                  <span class="title">
                    ${e.additives[0].name}
                  </span>
                </label>
                <label class="secondary-btn">
                  <input type="checkbox" name="checkboxGroup" value="0.5">
                  <span class="circle">2</span>
                  <span class="title">
                    ${e.additives[1].name}
                  </span>
                </label>
                <label class="secondary-btn">
                  <input type="checkbox" name="checkboxGroup" value="0.5">
                  <span class="circle">3</span>
                  <span class="title">
                    ${e.additives[2].name}
                  </span>
                </label>
              </fieldset>

              <h3 class="total">
                <span>Total:</span>
                <span>&#36;<span id="totalCost">${e.price}</span></span>
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
      `,n.appendChild(E),E);let p,y=0,o=0,h,M;function A(e){if(e.target.classList.contains("grid-item")){const s=e.target.id,i=r.find(f=>f.id===s);h=parseFloat(i.price),p=h,v=$(i),v.showModal(),v.addEventListener("click",C),M=v.querySelector("#costForm"),M.addEventListener("change",P)}}function P(e){let s=e.target,i=document.querySelector("#totalCost");e.target.type==="radio"&&s.checked&&(y=parseFloat(s.value),p=h+y+o,i.textContent=p.toFixed(2)),e.target.type==="checkbox"&&(s.checked?(o+=.5,p=h+y+o,i.textContent=p.toFixed(2)):(o-=.5,p=h+y+o,i.textContent=p.toFixed(2)))}}};T.init();
//# sourceMappingURL=main-MSEJA5IU.js.map
