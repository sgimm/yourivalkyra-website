const images = {
  "IMG-01": { label: "Home hero · desktop", ratio: "16/9" },
  "IMG-02": { label: "Home hero · mobile", ratio: "9/16" },
  "IMG-03A": { label: "Neon of Broken Dreams official cover artwork", ratio: "1/1", file: "IMG-03A.webp" },
  "IMG-03B": { label: "Neon Runtime official cover artwork", ratio: "1/1", file: "IMG-03B.webp" },
  "IMG-03C": { label: "Only Signal official cover artwork", ratio: "1/1", file: "IMG-03C.webp" },
  "IMG-03D": { label: "Only Signal Deep Touch official cover artwork", ratio: "1/1", file: "IMG-03D.webp" },
  "IMG-03E": { label: "Valkyra Line official cover artwork", ratio: "1/1", file: "IMG-03E.webp" },
  "IMG-03F": { label: "Neon Shoreline official cover artwork", ratio: "1/1", file: "IMG-03F.webp" },
  "IMG-03G": { label: "Neon Shadow official cover artwork", ratio: "1/1", file: "IMG-03G.webp" },
  "IMG-03H": { label: "Shamisen in the Dark official cover artwork", ratio: "1/1", file: "IMG-03H.webp" },
  "IMG-03I": { label: "One World One Signal official cover artwork", ratio: "1/1", file: "IMG-03I.webp" },
  "IMG-04": { label: "Youri Valkyra in dark cyberpunk streetwear in a rain-lit neon alley", ratio: "9/16", file: "IMG-04.webp" },
  "IMG-05": { label: "Youri singing and moving across an underground stage", ratio: "16/9", file: "IMG-05.webp" },
  "IMG-06A": { label: "Beach Club", ratio: "21/9", file: "IMG-06A.webp" },
  "IMG-06B": { label: "Canal District", ratio: "21/9" },
  "IMG-06C": { label: "Rooftop Residence", ratio: "21/9" },
  "IMG-06D": { label: "Night Store", ratio: "21/9" },
  "IMG-07": { label: "Red Reborn · approved portrait", ratio: "4/5" },
  "IMG-08": { label: "Aris Voss · approved portrait", ratio: "4/5" },
  "IMG-09": { label: "Valkyra · abstract signal", ratio: "4/5" },
  "IMG-10": { label: "Youri overlooking the city from a hilltop railing at sunset", ratio: "16/9", file: "IMG-10.webp" },
  "IMG-11": { label: "Youri dance-walking along a rain-lit neon promenade", ratio: "16/9", file: "IMG-11.webp" },
  "IMG-12": { label: "Youri checking her phone beside violet-lit vending machines", ratio: "16/9", file: "IMG-12.webp" },
  "IMG-13": { label: "Youri sitting on a wooden pier beneath a crescent moon", ratio: "16/9", file: "IMG-13.webp" },
  "IMG-14": { label: "Youri walking along a neon-lit beach at night", ratio: "16/9", file: "IMG-14.webp" },
  "IMG-15": { label: "Gallery · selected artwork 06", ratio: "3/2" },
  "IMG-16": { label: "Gallery · selected artwork 07", ratio: "1/1" },
  "IMG-17": { label: "Gallery · selected artwork 08", ratio: "16/9" },
  "IMG-18": { label: "Youri Valkyra creating music and character artwork in her home studio", ratio: "3/2", file: "IMG-18.webp" },
  "IMG-19": { label: "Youri Valkyra sitting thoughtfully by a rain-lit window", ratio: "3/2", file: "IMG-19.webp" },
  "IMG-20": { label: "Youri Valkyra resting on her bed beneath violet city light", ratio: "3/2", file: "IMG-20.webp" }
};
const galleryImageKeys = ["IMG-10", "IMG-11", "IMG-12", "IMG-13", "IMG-14", "IMG-19", "IMG-20"];
class YVImage extends HTMLElement {
  connectedCallback() {
    const key = innerWidth < 600 && this.dataset.mobileAsset ? this.dataset.mobileAsset : this.getAttribute("asset");
    const item = images[key];
    if (!item) return;
    const image = item.file
      ? `<img src="/assets/images/${item.file}" alt="${item.label}" loading="${key === "IMG-01" || key === "IMG-02" ? "eager" : "lazy"}">`
      : "";
    this.innerHTML = `<div class="placeholder" style="--ratio:${item.ratio}" role="img" aria-label="${item.label}">
      ${image}
      <span class="placeholder-label"><b>${key}</b>${item.label}</span></div>`;
  }
}
customElements.define("yv-image", YVImage);
class YVGalleryPreview extends HTMLElement {
  connectedCallback() {
    const selection = [...galleryImageKeys]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    this.classList.add("gallery-strip", "wrap");
    this.innerHTML = selection.map(key => `<yv-image asset="${key}"></yv-image>`).join("");
  }
}
customElements.define("yv-gallery-preview", YVGalleryPreview);
class YVCarousel extends HTMLElement {
  connectedCallback() {
    const slides = ["IMG-06A", "IMG-06B", "IMG-06C", "IMG-06D"];
    const id = `carousel-${Math.random().toString(36).slice(2)}`;
    this.innerHTML = `<div class="universe-carousel" role="region" aria-roledescription="carousel" aria-label="Places in the Valkyra Universe">
      <div class="carousel-viewport" id="${id}" tabindex="0">${slides.map((key, index) => `<article class="carousel-slide" aria-roledescription="slide" aria-label="${index + 1} of ${slides.length}: ${images[key].label}"><yv-image asset="${key}"></yv-image><span class="slide-location">${images[key].label}</span></article>`).join("")}</div>
      <div class="carousel-controls"><p class="carousel-count" aria-live="polite"><span>01</span> / 04</p><div class="carousel-arrows"><button type="button" class="carousel-arrow previous" aria-label="Previous place">←</button><button type="button" class="carousel-arrow next" aria-label="Next place">→</button></div></div>
    </div>`;
    const viewport = this.querySelector(".carousel-viewport");
    const slideElements = [...this.querySelectorAll(".carousel-slide")];
    const count = this.querySelector(".carousel-count span");
    let current = 0;
    const update = index => {
      current = (index + slideElements.length) % slideElements.length;
      count.textContent = String(current + 1).padStart(2, "0");
    };
    const goTo = index => {
      const next = (index + slideElements.length) % slideElements.length;
      slideElements[next].scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest", inline: "start" });
      update(next);
    };
    this.querySelector(".previous").addEventListener("click", () => goTo(current - 1));
    this.querySelector(".next").addEventListener("click", () => goTo(current + 1));
    viewport.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Home" || event.key === "End") {
        event.preventDefault();
        if (event.key === "ArrowLeft") goTo(current - 1);
        if (event.key === "ArrowRight") goTo(current + 1);
        if (event.key === "Home") goTo(0);
        if (event.key === "End") goTo(slideElements.length - 1);
      }
    });
    let frame;
    viewport.addEventListener("scroll", () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const left = viewport.getBoundingClientRect().left;
        const nearest = slideElements.reduce((best, slide, index) => Math.abs(slide.getBoundingClientRect().left - left) < best.distance ? { index, distance: Math.abs(slide.getBoundingClientRect().left - left) } : best, { index: 0, distance: Infinity });
        update(nearest.index);
      });
    }, { passive: true });
  }
}
customElements.define("yv-carousel", YVCarousel);
const links = [["/","Home"],["/youri/","Youri"],["/music/","Music"],["/universe/","Valkyra Universe"],["/gallery/","Gallery"],["/support/","Support"]];
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const path = location.pathname;
    this.innerHTML = `<header><div class="nav wrap"><a class="brand" href="/">YOURI VALKYRA <small>詠理</small></a><button class="menu" aria-expanded="false" aria-controls="nav">Menu</button><nav id="nav">${links.map(([url,name])=>`<a href="${url}"${path===url||(url!=="/"&&path.startsWith(url))?' aria-current="page"':""}>${name}</a>`).join("")}</nav></div></header>`;
    const button=this.querySelector(".menu"),nav=this.querySelector("nav");
    button.addEventListener("click",()=>{const open=nav.classList.toggle("open");button.setAttribute("aria-expanded",open)});
    const header=this.querySelector("header"); addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>20),{passive:true});
  }
}
customElements.define("site-header", SiteHeader);
class SiteFooter extends HTMLElement {
  connectedCallback(){this.innerHTML=`<footer><div class="wrap"><div class="footer-grid"><a class="brand" href="/">YOURI VALKYRA</a><div class="footer-links"><a href="mailto:youri@yourivalkyra.com">youri@yourivalkyra.com</a><a href="https://discord.gg/KGDW9UDGVV" target="_blank" rel="noopener noreferrer">Valkyra Signal Hub ↗</a><a href="/imprint/">Imprint</a><a href="/privacy/">Privacy</a></div></div><p class="license">© 2026 Youri Valkyra. The Youri Valkyra character and Valkyra universe are privately owned intellectual property and are used by Nexus Bit UG (haftungsbeschränkt) under license. Draft wording—subject to legal review.</p></div></footer>`}
}
customElements.define("site-footer", SiteFooter);

function applyValkyraHeadlineGlyphs() {
  const approvedHeadlinesByPage = {
    "/": new Set(["Youri Valkyra", "Fragments of the Valkyra Universe"]),
    "/youri/": new Set(["Youri Valkyra"]),
    "/universe/": new Set(["Valkyra Universe"])
  };
  const approvedHeadlines = approvedHeadlinesByPage[location.pathname];
  if (!approvedHeadlines) return;

  document.querySelectorAll("h1, h2, h3").forEach(heading => {
    if (!approvedHeadlines.has(heading.textContent.trim())) return;

    [...heading.childNodes].forEach(node => {
      if (node.nodeType !== Node.TEXT_NODE || !node.nodeValue.includes("Valkyra")) return;
      const parts = node.nodeValue.split("Valkyra");
      const fragment = document.createDocumentFragment();
      parts.forEach((part, index) => {
        if (index) {
          const wordmark = document.createElement("span");
          wordmark.className = "valkyra-wordmark";
          wordmark.innerHTML = '<span class="valkyra-v-glyph"><span class="visually-hidden">V</span><img src="/assets/valkyra-v-bold.svg" alt="" aria-hidden="true"></span>alkyra';
          fragment.append(wordmark);
        }
        fragment.append(document.createTextNode(part));
      });
      node.replaceWith(fragment);
    });
  });
}
applyValkyraHeadlineGlyphs();
