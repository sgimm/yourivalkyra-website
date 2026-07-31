const images = {
  "IMG-01": { label: "Home hero · desktop", ratio: "16/9" },
  "IMG-02": { label: "Home hero · mobile", ratio: "9/16" },
  "IMG-03": { label: "Neon Shoreline cover artwork with Youri beside a neon-lit Miami shoreline", ratio: "1/1", file: "IMG-03.png" },
  "IMG-04": { label: "Youri Valkyra in dark cyberpunk streetwear in a rain-lit neon alley", ratio: "9/16", file: "IMG-04.png" },
  "IMG-05": { label: "Youri · music / performance", ratio: "16/9" },
  "IMG-06": { label: "Valkyra Universe · establishing scene", ratio: "21/9" },
  "IMG-07": { label: "Red Reborn · approved portrait", ratio: "4/5" },
  "IMG-08": { label: "Aris Voss · approved portrait", ratio: "4/5" },
  "IMG-09": { label: "Valkyra · abstract signal", ratio: "4/5" },
  "IMG-10": { label: "Gallery · selected artwork 01", ratio: "3/2" },
  "IMG-11": { label: "Gallery · selected artwork 02", ratio: "4/5" },
  "IMG-12": { label: "Gallery · selected artwork 03", ratio: "1/1" },
  "IMG-13": { label: "Gallery · selected artwork 04", ratio: "16/9" },
  "IMG-14": { label: "Gallery · selected artwork 05", ratio: "4/5" },
  "IMG-15": { label: "Gallery · selected artwork 06", ratio: "3/2" },
  "IMG-16": { label: "Gallery · selected artwork 07", ratio: "1/1" },
  "IMG-17": { label: "Gallery · selected artwork 08", ratio: "16/9" },
  "IMG-18": { label: "Support · studio / worldbuilding", ratio: "3/2" }
};
class YVImage extends HTMLElement {
  connectedCallback() {
    const key = innerWidth < 600 && this.dataset.mobileAsset ? this.dataset.mobileAsset : this.getAttribute("asset");
    const item = images[key];
    if (!item) return;
    const src = `/assets/images/${item.file || `${key}.webp`}`;
    this.innerHTML = `<div class="placeholder" style="--ratio:${item.ratio}" role="img" aria-label="${item.label}">
      <img src="${src}" alt="${item.label}" loading="${key === "IMG-01" || key === "IMG-02" ? "eager" : "lazy"}" onerror="this.remove()">
      <span class="placeholder-label"><b>${key}</b>${item.label}</span></div>`;
  }
}
customElements.define("yv-image", YVImage);
const links = [["/","Home"],["/youri/","Youri"],["/music/","Music"],["/universe/","Valkyra Universe"],["/gallery/","Gallery"],["/support/","Support"]];
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const path = location.pathname;
    this.innerHTML = `<header><div class="nav wrap"><a class="brand" href="/">YOURI VALKYRA <small>詠理</small></a><button class="menu" aria-expanded="false" aria-controls="nav">Menu</button><nav id="nav">${links.map(([url,name])=>`<a href="${url}"${path===url?' aria-current="page"':""}>${name}</a>`).join("")}</nav></div></header>`;
    const button=this.querySelector(".menu"),nav=this.querySelector("nav");
    button.addEventListener("click",()=>{const open=nav.classList.toggle("open");button.setAttribute("aria-expanded",open)});
    const header=this.querySelector("header"); addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>20),{passive:true});
  }
}
customElements.define("site-header", SiteHeader);
class SiteFooter extends HTMLElement {
  connectedCallback(){this.innerHTML=`<footer><div class="wrap"><div class="footer-grid"><a class="brand" href="/">YOURI VALKYRA</a><div class="footer-links"><a href="/imprint/">Imprint</a><a href="/privacy/">Privacy</a></div></div><p class="license">© 2026 Youri Valkyra. The Youri Valkyra character and Valkyra universe are privately owned intellectual property and are used by Nexus Bit UG (haftungsbeschränkt) under license. Draft wording—subject to legal review.</p></div></footer>`}
}
customElements.define("site-footer", SiteFooter);
