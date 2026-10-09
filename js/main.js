// ---------- Data ----------
const ICONS = {
  headphones: `<svg viewBox="0 0 160 160" fill="none"><path d="M30 100V80a50 50 0 0 1 100 0v20" stroke="#222" stroke-width="10" stroke-linecap="round"/><rect x="18" y="92" width="30" height="48" rx="12" fill="#222"/><rect x="112" y="92" width="30" height="48" rx="12" fill="#222"/><rect x="22" y="104" width="10" height="24" rx="5" fill="#d87d4a"/><rect x="128" y="104" width="10" height="24" rx="5" fill="#d87d4a"/></svg>`,
  speakers: `<svg viewBox="0 0 160 160" fill="none"><rect x="40" y="12" width="80" height="136" rx="14" fill="#222"/><circle cx="80" cy="52" r="14" fill="#d87d4a"/><circle cx="80" cy="102" r="30" fill="#111" stroke="#555" stroke-width="4"/><circle cx="80" cy="102" r="12" fill="#d87d4a"/></svg>`,
  earphones: `<svg viewBox="0 0 160 160" fill="none"><path d="M60 50c0-26 40-26 40 0v30" stroke="#222" stroke-width="8" stroke-linecap="round"/><rect x="40" y="62" width="40" height="40" rx="20" fill="#222"/><rect x="82" y="62" width="40" height="40" rx="20" fill="#222"/><circle cx="60" cy="82" r="8" fill="#d87d4a"/><circle cx="102" cy="82" r="8" fill="#d87d4a"/><path d="M60 102v34M102 102v34" stroke="#222" stroke-width="8" stroke-linecap="round"/></svg>`,
};
const icon = (cat, color) => color ? ICONS[cat].replaceAll("#222", color) : ICONS[cat];

const PRODUCTS = [
  { id: "xx99-mark-two", name: "XX99 Mark II Headphones", short: "XX99 Mark II", cat: "headphones", price: 2999, isNew: true,
    desc: "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    features: "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation.\n\nThe advanced Active Noise Cancellation with built-in equalizer allows you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to.",
    box: [[1, "Headphone Unit"], [2, "Replacement Earcups"], [1, "User Manual"], [1, "3.5mm 5m Audio Cable"], [1, "Travel Bag"]] },
  { id: "xx99-mark-one", name: "XX99 Mark I Headphones", short: "XX99 Mark I", cat: "headphones", price: 1750,
    desc: "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
    features: "As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience.\n\nFrom the handcrafted details to the signature sound, every part of these headphones is made for those who love music.",
    box: [[1, "Headphone Unit"], [2, "Replacement Earcups"], [1, "User Manual"], [1, "3.5mm 5m Audio Cable"]] },
  { id: "xx59", name: "XX59 Headphones", short: "XX59", cat: "headphones", price: 899,
    desc: "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
    features: "These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel.\n\nBluetooth connectivity and a long battery life keep the music going all day.",
    box: [[1, "Headphone Unit"], [2, "Replacement Earcups"], [1, "User Manual"], [1, "3.5mm 5m Audio Cable"]] },
  { id: "zx9", name: "ZX9 Speaker", short: "ZX9", cat: "speakers", price: 4500, isNew: true,
    desc: "Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound. Upgrade your sound system to a whole new level with the ZX9.",
    features: "Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching.\n\nExperience true surround sound with a clear, powerful and balanced stereo field.",
    box: [[1, "Speaker Unit"], [2, "Speaker Cloth Panel"], [1, "User Manual"], [1, "3.5mm 10m Audio Cable"], [1, "10m Optical Cable"]] },
  { id: "zx7", name: "ZX7 Speaker", short: "ZX7", cat: "speakers", price: 3500,
    desc: "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-quality components that ensure the best sound quality for all your audio needs.",
    features: "Perfectly balanced audio with a deep, clean low end. The ZX7 pairs effortlessly with any modern source and fits on a shelf, desk or stand.\n\nCrafted with a rigid enclosure to minimise resonance and keep every note clear.",
    box: [[1, "Speaker Unit"], [2, "Speaker Cloth Panel"], [1, "User Manual"], [1, "3.5mm 7.5m Audio Cable"]] },
  { id: "yx1", name: "YX1 Wireless Earphones", short: "YX1", cat: "earphones", price: 599, isNew: true,
    desc: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
    features: "Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit.\n\nA charging case keeps them powered for up to 24 hours.",
    box: [[2, "Earphone Unit"], [6, "Multi-size Earplugs"], [1, "User Manual"], [1, "USB-C Charging Cable"], [1, "Travel Pouch"]] },
];
const byId = (id) => PRODUCTS.find((p) => p.id === id);
const money = (n) => "$ " + n.toLocaleString("en-US");

// ---------- Cart ----------
let cart = [];
try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch { cart = []; }
const saveCart = () => { try { localStorage.setItem("cart", JSON.stringify(cart)); } catch {} updateCart(); };
const cartTotal = () => cart.reduce((s, i) => s + byId(i.id).price * i.qty, 0);

function addToCart(id, qty) {
  const item = cart.find((i) => i.id === id);
  item ? (item.qty += qty) : cart.push({ id, qty });
  saveCart();
  toggleCart(true);
}
function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
  saveCart();
}
function toggleCart(open) {
  const cartEl = document.getElementById("cart");
  const overlay = document.getElementById("overlay");
  const state = open ?? !cartEl.classList.contains("open");
  cartEl.classList.toggle("open", state);
  overlay.classList.toggle("open", state);
}
function updateCart() {
  document.getElementById("cartCount").textContent = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById("cart");
  const count = cart.reduce((s, i) => s + i.qty, 0);
  el.innerHTML = `
    <div class="cart__head"><h3>Cart (${count})</h3>${cart.length ? '<button data-act="clear">Remove all</button>' : ""}</div>
    ${cart.length ? cart.map((i) => { const p = byId(i.id); return `
      <div class="cart__item">
        <div class="thumb">${icon(p.cat)}</div>
        <div><b>${p.short}</b><small>${money(p.price)}</small></div>
        <div class="qty"><button data-act="dec" data-id="${p.id}">−</button><span>${i.qty}</span><button data-act="inc" data-id="${p.id}">+</button></div>
      </div>`; }).join("") : '<p class="muted">Your cart is empty.</p>'}
    <div class="cart__total"><span class="muted">TOTAL</span><b>${money(cartTotal())}</b></div>
    ${cart.length ? '<a href="#/checkout" class="btn btn--orange btn--full" data-act="close">Checkout</a>' : ""}`;
}

// ---------- Views ----------
const aboutSection = () => `
  <section class="about container">
    <div class="about__text">
      <h2>Bringing you the <span style="color:var(--orange)">best</span> audio gear</h2>
      <p class="muted">Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
    </div>
    <div class="about__img">${icon("headphones", "#d87d4a")}</div>
  </section>`;

const catCards = () => `
  <section class="cats container">
    ${["headphones", "speakers", "earphones"].map((c) => `
      <a class="cat" href="#/category/${c}">${icon(c)}<h3>${c}</h3><span>Shop →</span></a>`).join("")}
  </section>`;

function homeView() {
  return `
  <section class="hero"><div class="container hero__inner">
    <div class="hero__text">
      <span class="overline">New product</span>
      <h1>XX99 Mark II Headphones</h1>
      <p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
      <a class="btn btn--orange" href="#/product/xx99-mark-two">See product</a>
    </div>
    <div class="hero__img">${icon("headphones", "#d87d4a")}</div>
  </div></section>
  ${catCards()}
  <section class="promo container">
    <div class="zx9">
      <div class="zx9__img">${icon("speakers", "#101010")}</div>
      <div class="zx9__text">
        <h1>ZX9<br>Speaker</h1>
        <p>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
        <a class="btn btn--black" href="#/product/zx9">See product</a>
      </div>
    </div>
    <div class="zx7"><h2>ZX7 Speaker</h2><a class="btn btn--outline" href="#/product/zx7">See product</a></div>
    <div class="pair">
      <div class="pair__img">${icon("earphones", "#101010")}</div>
      <div class="pair__text"><h2>YX1 Earphones</h2><a class="btn btn--outline" href="#/product/yx1">See product</a></div>
    </div>
  </section>
  ${aboutSection()}`;
}

function categoryView(cat) {
  const list = PRODUCTS.filter((p) => p.cat === cat);
  if (!list.length) return notFound();
  return `
  <div class="page-head"><h2>${cat}</h2></div>
  <div class="container">
    ${list.map((p) => `
      <article class="row">
        <div class="row__img">${icon(p.cat)}</div>
        <div class="row__text">
          ${p.isNew ? '<span class="tag">New product</span>' : ""}
          <h2>${p.name.replace(/ (Headphones|Speaker|Wireless Earphones)$/, "<br>$1")}</h2>
          <p class="muted">${p.desc}</p>
          <a class="btn btn--orange" href="#/product/${p.id}">See product</a>
        </div>
      </article>`).join("")}
  </div>
  ${catCards()}
  ${aboutSection()}`;
}

function productView(id) {
  const p = byId(id);
  if (!p) return notFound();
  const others = PRODUCTS.filter((x) => x.id !== p.id).sort(() => Math.random() - 0.5).slice(0, 3);
  return `
  <div class="container">
    <a class="back" href="#/category/${p.cat}">Go Back</a>
    <section class="detail">
      <div class="row__img">${icon(p.cat)}</div>
      <div class="row__text">
        ${p.isNew ? '<span class="tag">New product</span>' : ""}
        <h2>${p.name}</h2>
        <p class="muted">${p.desc}</p>
        <span class="price">${money(p.price)}</span>
        <div class="buy">
          <div class="qty"><button id="qMinus">−</button><span id="qVal">1</span><button id="qPlus">+</button></div>
          <button class="btn btn--orange" id="addBtn" data-id="${p.id}">Add to cart</button>
        </div>
      </div>
    </section>
    <section class="features">
      <div><h3>Features</h3>${p.features.split("\n\n").map((t) => `<p class="muted">${t}</p>`).join("")}</div>
      <div><h3>In the box</h3><ul class="inbox">${p.box.map(([n, t]) => `<li><b>${n}x</b><span class="muted">${t}</span></li>`).join("")}</ul></div>
    </section>
    <section class="gallery">
      <div>${icon(p.cat)}</div><div>${icon(p.cat, "#d87d4a")}</div><div>${icon(p.cat, "#555")}</div>
    </section>
    <section class="also">
      <h3>You may also like</h3>
      <div class="also__grid">
        ${others.map((o) => `
          <div class="also__item">
            <div class="row__img">${icon(o.cat)}</div>
            <h3>${o.short}</h3>
            <a class="btn btn--orange" href="#/product/${o.id}">See product</a>
          </div>`).join("")}
      </div>
    </section>
  </div>
  ${catCards()}
  ${aboutSection()}`;
}

function checkoutView() {
  if (!cart.length) {
    return `<div class="container"><a class="back" href="#/">Go Back</a><div class="card" style="margin-bottom:140px"><h2>Your cart is empty</h2><a class="btn btn--orange" href="#/">Continue shopping</a></div></div>`;
  }
  const shipping = 50, vat = Math.round(cartTotal() * 0.2);
  const field = (n, label, ph, type = "text") => `<label>${label}<input name="${n}" type="${type}" placeholder="${ph}" required></label>`;
  return `
  <div class="container" style="background:var(--white)">
    <a class="back" href="javascript:history.back()">Go Back</a>
    <div class="checkout">
      <form class="card" id="checkoutForm" novalidate>
        <h2>Checkout</h2>
        <h4>Billing details</h4>
        <div class="fields">
          ${field("name", "Name", "Alexei Ward")}
          ${field("email", "Email Address", "alexei@mail.com", "email")}
          ${field("phone", "Phone Number", "+1 202-555-0136", "tel")}
        </div>
        <h4>Shipping info</h4>
        <div class="fields">
          <label style="grid-column:1/-1">Address<input name="address" placeholder="1137 Williams Avenue" required></label>
          ${field("zip", "ZIP Code", "10001")}
          ${field("city", "City", "New York")}
          ${field("country", "Country", "United States")}
        </div>
        <h4>Payment details</h4>
        <div class="fields">
          ${field("card", "Card Number", "2345 6789 0123 4567")}
          ${field("pin", "Card PIN", "6891")}
        </div>
      </form>
      <aside class="card summary">
        <h3 style="font-size:18px;margin-bottom:32px">Summary</h3>
        <div class="items">${cart.map((i) => { const p = byId(i.id); return `
          <div class="cart__item" style="grid-template-columns:64px 1fr auto">
            <div class="thumb">${icon(p.cat)}</div>
            <div><b>${p.short}</b><small>${money(p.price)}</small></div><small>x${i.qty}</small>
          </div>`; }).join("")}</div>
        <div class="line"><span class="muted">TOTAL</span><b>${money(cartTotal())}</b></div>
        <div class="line"><span class="muted">SHIPPING</span><b>${money(shipping)}</b></div>
        <div class="line"><span class="muted">VAT (INCLUDED)</span><b>${money(vat)}</b></div>
        <div class="line total" style="margin-top:24px"><span class="muted">GRAND TOTAL</span><b>${money(cartTotal() + shipping)}</b></div>
        <button class="btn btn--orange btn--full" form="checkoutForm" style="margin-top:24px">Continue & Pay</button>
      </aside>
    </div>
  </div>`;
}

const notFound = () => `<div class="container"><div class="card" style="margin:80px 0"><h2>Page not found</h2><a class="btn btn--orange" href="#/">Home</a></div></div>`;

// ---------- Router ----------
function render() {
  const [, page, arg] = location.hash.replace(/^#/, "").split("/");
  const app = document.getElementById("app");
  const views = { "": homeView, category: () => categoryView(arg), product: () => productView(arg), checkout: checkoutView };
  app.innerHTML = (views[page || ""] || notFound)();
  window.scrollTo(0, 0);
  document.getElementById("nav").classList.remove("open");
  toggleCart(false);
  bindView();
}

function bindView() {
  const add = document.getElementById("addBtn");
  if (add) {
    let q = 1;
    const val = document.getElementById("qVal");
    document.getElementById("qMinus").onclick = () => { q = Math.max(1, q - 1); val.textContent = q; };
    document.getElementById("qPlus").onclick = () => { q += 1; val.textContent = q; };
    add.onclick = () => { addToCart(add.dataset.id, q); q = 1; val.textContent = 1; };
  }
  const form = document.getElementById("checkoutForm");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll("input").forEach((inp) => {
        const bad = !inp.value.trim() || (inp.type === "email" && !/^\S+@\S+\.\S+$/.test(inp.value));
        inp.classList.toggle("err", bad);
        if (bad) ok = false;
      });
      if (!ok) return;
      const total = cartTotal() + 50;
      const modal = document.getElementById("modal");
      modal.innerHTML = `<div class="modal__box"><div class="check">✓</div><h2>Thank you<br>for your order</h2><p class="muted">You will receive an email confirmation shortly.</p><p><b>Grand total: ${money(total)}</b></p><a href="#/" class="btn btn--orange btn--full" id="done">Back to home</a></div>`;
      modal.classList.add("open");
      document.getElementById("done").onclick = () => { modal.classList.remove("open"); cart = []; saveCart(); };
    };
  }
}

document.getElementById("cartBtn").onclick = () => toggleCart();
document.getElementById("overlay").onclick = () => toggleCart(false);
document.getElementById("burger").onclick = () => document.getElementById("nav").classList.toggle("open");
document.getElementById("cart").addEventListener("click", (e) => {
  const t = e.target.closest("[data-act]");
  if (!t) return;
  const { act, id } = t.dataset;
  if (act === "inc") changeQty(id, 1);
  if (act === "dec") changeQty(id, -1);
  if (act === "clear") { cart = []; saveCart(); }
  if (act === "close") toggleCart(false);
});
window.addEventListener("hashchange", render);
updateCart();
render();
