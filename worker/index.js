import { buildHomeV2 } from "./home-v2.js";

const heroImage = "__HERO_IMAGE_DATA_URL__";
const heroVideo = "__HERO_VIDEO_DATA_URL__";
let heroVideoBytes;
const productImages = {
  h200: "__PRODUCT_H200_DATA_URL__",
  rtx: "__PRODUCT_RTX_PRO_6000_DATA_URL__",
  dgx: "__PRODUCT_DGX_SPARK_DATA_URL__",
  samsung32: "__PRODUCT_SAMSUNG_32_DATA_URL__",
  samsung64: "__PRODUCT_SAMSUNG_64_DATA_URL__",
};
const stavaTexture = "__STAVA_TEXTURE_DATA_URL__";
const archivoFont = "__ARCHIVO_FONT_DATA_URL__";
const chivoFont = "__CHIVO_FONT_DATA_URL__";
const chivoMonoFont = "__CHIVO_MONO_FONT_DATA_URL__";
const syncopateFont = "__SYNCOPATE_FONT_DATA_URL__";

const CNY_RATE = 12.3004;
const CNY_FEE = 1.02;
const commercialRound = (value) => Math.round((value + 10) / 10000) * 10000 - 10;
const rub = (value) => `${new Intl.NumberFormat("ru-RU").format(value).replaceAll(" ", " ")} ₽`;

const products = [
  { family: "NVIDIA", name: "H200 NVL 141 ГБ", pn: "900-21010-0040-000", slug: "nvidia-h200-nvl-141gb-900-21010-0040-000", imageKey: "h200", imagePath: "/assets/products/h200.webp", imageAlt: "Серверные ускорители NVIDIA H200 NVL 141 ГБ", imageNote: "Официальный визуал NVIDIA H200 NVL", currency: "RUB", quote: 5783971.20, markup: .0375, channel: "Проектные поставки", use: "ИИ, инференс, обучение моделей и высокопроизводительные вычисления", summary: "Серверный ускоритель NVIDIA H200 NVL с 141 ГБ HBM3e в исполнении PCIe. Поставляется по точному P/N для совместимых серверных платформ." },
  { family: "NVIDIA", name: "RTX PRO 6000 Max-Q", pn: "900-5G153-2200-000", slug: "nvidia-rtx-pro-6000-max-q-900-5g153-2200-000", imageKey: "rtx", imagePath: "/assets/products/rtx-pro-6000.webp", imageAlt: "Видеокарта NVIDIA RTX PRO 6000 Blackwell", imageNote: "Официальный визуал линейки RTX PRO 6000; исполнение определяется P/N", currency: "RUB", quote: 1621577.64, markup: .05, channel: "Опт и розница", use: "Профессиональные рабочие станции и плотные конфигурации", summary: "Профессиональная графика NVIDIA RTX PRO 6000 Max-Q для рабочих станций и корпоративных вычислительных задач." },
  { family: "NVIDIA", name: "RTX PRO 6000 Workstation", pn: "900-5G144-2500-000", slug: "nvidia-rtx-pro-6000-workstation-900-5g144-2500-000", imageKey: "rtx", imagePath: "/assets/products/rtx-pro-6000.webp", imageAlt: "Видеокарта NVIDIA RTX PRO 6000 Blackwell Workstation", imageNote: "Официальный визуал линейки RTX PRO 6000; исполнение определяется P/N", currency: "RUB", quote: 1952090.28, markup: .05, channel: "Опт и розница", use: "3D, визуализация, инженерные и AI-задачи", summary: "Версия NVIDIA RTX PRO 6000 для профессиональных рабочих станций. Точная модификация фиксируется в спецификации." },
  { family: "NVIDIA", name: "RTX PRO 6000 Server", pn: "900-2G153-0000-000", slug: "nvidia-rtx-pro-6000-server-900-2g153-0000-000", imageKey: "rtx", imagePath: "/assets/products/rtx-pro-6000.webp", imageAlt: "Ускоритель NVIDIA RTX PRO 6000 Blackwell", imageNote: "Официальный визуал линейки RTX PRO 6000; серверное исполнение определяется P/N", currency: "RUB", quote: 2530487.40, markup: .05, channel: "Опт и розница", use: "Серверная виртуализация, AI и удалённая графика", summary: "Серверное исполнение NVIDIA RTX PRO 6000 для корпоративных и вычислительных инфраструктур." },
  { family: "NVIDIA", name: "DGX Spark", pn: "940-54242-0006-000", slug: "nvidia-dgx-spark-940-54242-0006-000", imageKey: "dgx", imagePath: "/assets/products/dgx-spark-v2.webp", imageAlt: "Компактная система NVIDIA DGX Spark на чёрном фоне", imageNote: "NVIDIA DGX Spark — внешний вид устройства", currency: "RUB", quote: 712667.88, markup: .07, channel: "Для компаний", use: "Локальная разработка и прототипирование AI", summary: "Компактная система NVIDIA DGX Spark для разработки, тестирования и прототипирования задач искусственного интеллекта." },
  { family: "Samsung", name: "DDR5 RDIMM 32 ГБ 5600", pn: "M321R4GA3EB0-CWM", slug: "samsung-ddr5-rdimm-32gb-5600-m321r4ga3eb0-cwm", imageKey: "samsung32", imagePath: "/assets/products/samsung-32gb.webp", imageAlt: "Серверный модуль памяти Samsung DDR5 RDIMM 32 ГБ 5600", imageNote: "Внешний вид линейки 32 ГБ; точная модификация фиксируется по P/N", currency: "CNY", quote: 11668.8, markup: .10, channel: "Опт и розница", use: "Серверы и корпоративные системы", summary: "Серверный модуль памяти Samsung DDR5 RDIMM 32 ГБ 5600 по точному P/N." },
  { family: "Samsung", name: "DDR5 RDIMM 32 ГБ 5600", pn: "M321R4GA3PB0-CWM", slug: "samsung-ddr5-rdimm-32gb-5600-m321r4ga3pb0-cwm", imageKey: "samsung32", imagePath: "/assets/products/samsung-32gb.webp", imageAlt: "Серверный модуль памяти Samsung M321R4GA3PB0-CWM", imageNote: "Фото модуля Samsung M321R4GA3PB0-CWM", currency: "CNY", quote: 11668.8, markup: .10, channel: "Розница", use: "Серверы и корпоративные системы", summary: "Серверный модуль памяти Samsung DDR5 RDIMM 32 ГБ 5600, модификация M321R4GA3PB0-CWM." },
  { family: "Samsung", name: "DDR5 RDIMM 64 ГБ 5600", pn: "M321R8GA0EB2-CWM", slug: "samsung-ddr5-rdimm-64gb-5600-m321r8ga0eb2-cwm", imageKey: "samsung64", imagePath: "/assets/products/samsung-64gb.webp", imageAlt: "Серверный модуль памяти Samsung M321R8GA0EB2-CWM 64 ГБ", imageNote: "Фото модуля Samsung M321R8GA0EB2-CWM", currency: "CNY", quote: 25194, markup: .07, channel: "Опт и розница", use: "Серверы с повышенными требованиями к памяти", summary: "Серверный модуль памяти Samsung DDR5 RDIMM 64 ГБ 5600 по точному P/N." },
].map((product) => {
  const supplierPrice = product.currency === "RUB" ? product.quote : product.quote * CNY_RATE * CNY_FEE;
  const priceValue = commercialRound(supplierPrice * (1 + product.markup));
  return { ...product, supplierPrice, priceValue, price: rub(priceValue), status: "В наличии у поставщика" };
});

const SITE_URL = "https://nasledie-it-supply.metriccord512.chatgpt.site";
const SITE_NAME = "G Server";
const CONTACT_EMAIL = "info@nasledie77.ru";
const buildMailto = (product = "") => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Запрос коммерческого предложения G Server${product ? ` — ${product}` : ""}`)}&body=${encodeURIComponent(`${product ? `Оборудование: ${product}\n` : ""}Количество: \nГород поставки: \nКомпания: \nКонтактное лицо: \nКомментарий: `)}`;
const mainDescription = "NVIDIA H200 NVL, RTX PRO 6000, DGX Spark и память Samsung с поставкой по России до 14 дней. Цены, точный P/N, договор и расчёт опта.";
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Поставка профессиональных GPU NVIDIA и серверной памяти Samsung по России.",
  legalName: "ООО НАСЛЕДИЕ",
  taxID: "7716828623",
  email: CONTACT_EMAIL,
  telephone: "+7-499-113-14-36",
  address: { "@type": "PostalAddress", postalCode: "101000", addressLocality: "Москва", streetAddress: "ул. Мясницкая, д. 11, помещ. 28/1/2", addressCountry: "RU" },
};
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ru-RU",
};

const pageV2 = buildHomeV2({
  products,
  siteUrl: SITE_URL,
  organizationSchema: { ...organizationSchema, name: SITE_NAME },
  websiteSchema: { ...websiteSchema, name: SITE_NAME },
  archivoFont,
  chivoFont,
  chivoMonoFont,
});


const productPage = (product) => {
  const canonical = `${SITE_URL}/${product.slug}`;
  const title = `${product.family} ${product.name} купить за ${product.price} — поставка до 14 дней | ${SITE_NAME}`;
  const description = `${product.family} ${product.name}, P/N ${product.pn} — ${product.price}. Поставка по России до 14 дней, точная спецификация, договор и счёт.`;
  const productRequestLink = buildMailto(`${product.name} — P/N ${product.pn}`);
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.family} ${product.name}`,
    description: product.summary,
    sku: product.pn,
    mpn: product.pn,
    brand: { "@type": "Brand", name: product.family },
    image: [`${SITE_URL}${product.imagePath}`],
    offers: {
      "@type": "Offer",
      url: canonical,
      price: product.priceValue,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "P/N", value: product.pn },
      { "@type": "PropertyValue", name: "Срок поставки", value: "до 14 календарных дней" },
    ],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: `${product.family} ${product.name}`, item: canonical },
    ],
  };
  return `<!doctype html><html lang="ru" class="light"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title><meta name="description" content="${description}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1"><link rel="canonical" href="${canonical}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml"><meta name="theme-color" content="#10182a">
  <meta property="og:type" content="product"><meta property="og:locale" content="ru_RU"><meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${SITE_URL}${product.imagePath}"><meta property="og:image:alt" content="${product.imageAlt}">
  <meta property="product:price:amount" content="${product.priceValue}"><meta property="product:price:currency" content="RUB">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${SITE_URL}${product.imagePath}">
  <script type="application/ld+json">${JSON.stringify(productSchema)}</script><script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
  <style>
  @font-face{font-family:Archivo;src:url('${archivoFont}') format('woff2');font-weight:100 900;font-display:swap}@font-face{font-family:Chivo;src:url('${chivoFont}') format('woff2');font-weight:300 900;font-display:swap}@font-face{font-family:'Chivo Mono';src:url('${chivoMonoFont}') format('woff2');font-weight:100 900;font-display:swap}@font-face{font-family:Syncopate;src:url('${syncopateFont}') format('woff2');font-weight:700;font-display:swap}
  :root{color-scheme:dark;--bg:#10182a;--deep:#0c1220;--panel:#151f33;--line:rgba(231,229,224,.14);--bone:#e7e5e0;--text:#c9cdd6;--muted:#8e98ab;--money:#4fd08a;--money-hi:#7ee0a8;--money-ink:#06261a;--tint:rgba(79,208,138,.1);--navy:#1a2540;--shadow:0 18px 48px rgba(0,0,0,.35)}html.light{color-scheme:light;--bg:#f6f7f9;--deep:#fff;--panel:#eceef2;--line:rgba(11,17,29,.14);--bone:#151a26;--text:#151a26;--muted:#4f586a;--money:#0f7a45;--money-hi:#128449;--money-ink:#fff;--tint:rgba(15,122,69,.08);--navy:#e9ecf2;--shadow:0 18px 48px rgba(11,17,29,.14)}
  *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.55 Chivo,system-ui,sans-serif}body:before{content:"";position:fixed;inset:0;z-index:-1;background:url('${stavaTexture}') 0 0/512px 512px;opacity:.05;pointer-events:none}html.light body:before{opacity:0}a{color:inherit;text-decoration:none}.shell{width:min(calc(100% - 40px),1180px);margin:auto}.nav{height:72px;display:flex;align-items:center;border-bottom:1px solid var(--line);position:sticky;top:0;background:color-mix(in srgb,var(--bg) 94%,transparent);backdrop-filter:blur(16px);z-index:10}.nav__in{display:flex;align-items:center;justify-content:space-between}.brand{font:700 .9rem Syncopate,system-ui;color:var(--bone)}.nav__actions{display:flex;gap:8px}.theme,.cta{min-height:44px;border:0;border-radius:8px;padding:0 16px;font-weight:750;cursor:pointer}.theme{background:var(--navy);color:var(--bone)}.cta{display:inline-flex;align-items:center;background:var(--money);color:var(--money-ink)}
  .crumbs{padding-top:30px;color:var(--muted);font-size:.88rem}.crumbs a:hover{color:var(--bone)}.product-hero{padding:clamp(54px,8vw,104px) 0}.product-hero__grid{display:grid;grid-template-columns:1.15fr .85fr;gap:clamp(40px,7vw,90px);align-items:start}.eyebrow{font:600 .76rem/1.4 'Chivo Mono',monospace;text-transform:uppercase;letter-spacing:.14em;color:var(--money);margin:0 0 18px}.product-hero h1{font:700 clamp(3rem,7vw,6.8rem)/.92 Archivo,system-ui;color:var(--bone);letter-spacing:-.055em;margin:0}.lead{font-size:1.16rem;color:var(--muted);max-width:720px;margin:28px 0 0}.product-visual{margin:34px 0 0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--deep);box-shadow:var(--shadow)}.product-visual img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}.product-visual--Samsung img{object-fit:contain;background:#fff;padding:24px}.product-visual figcaption{display:flex;justify-content:space-between;gap:20px;padding:12px 15px;border-top:1px solid var(--line);color:var(--muted);font-size:.78rem}.product-visual figcaption b{color:var(--bone);font-family:'Chivo Mono',monospace}.price-card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:26px;box-shadow:var(--shadow);position:sticky;top:102px}.price-card>span{color:var(--muted)}.price-card strong{display:block;color:var(--bone);font:700 clamp(2.1rem,4vw,3.6rem)/1 Archivo,system-ui;margin:7px 0 18px}.status{display:flex;gap:9px;align-items:center;color:var(--money);font-weight:700}.status i{width:8px;height:8px;border-radius:50%;background:var(--money);box-shadow:0 0 0 4px var(--tint)}.price-card dl{margin:24px 0;display:grid;gap:0}.price-card dl div{display:flex;justify-content:space-between;gap:20px;padding:12px 0;border-top:1px solid var(--line)}.price-card dt{color:var(--muted)}.price-card dd{margin:0;color:var(--bone);font-weight:650;text-align:right}.price-card .cta{width:100%;justify-content:center;min-height:52px}
  .content{padding:0 0 clamp(70px,9vw,120px)}.content__grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:12px;overflow:hidden}.content article{background:var(--panel);padding:30px;min-height:230px}.content article span{font-family:'Chivo Mono',monospace;color:var(--money);font-size:.78rem}.content h2{font:700 clamp(1.8rem,3vw,2.7rem)/1 Archivo,system-ui;color:var(--bone);margin:38px 0 12px}.content p{color:var(--muted);margin:0}.related{padding:clamp(70px,9vw,110px) 0;background:var(--deep);border-top:1px solid var(--line)}.related h2{font:700 clamp(2.3rem,5vw,4.5rem)/.95 Archivo,system-ui;color:var(--bone);margin:0 0 38px}.related__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.related a{display:grid;gap:8px;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px 12px 20px;transition:transform .12s;overflow:hidden}.related a:hover{transform:translateY(-2px)}.related img{width:100%;height:138px;object-fit:cover;border-radius:8px;background:var(--deep);margin-bottom:8px}.related a[data-family="Samsung"] img{object-fit:contain;background:#fff;padding:12px}.related small,.related b,.related span,.related strong{margin-left:10px;margin-right:10px}.related small{color:var(--money)}.related b{font-size:1.1rem;color:var(--bone)}.related span{color:var(--muted)}footer{padding:30px 0;background:var(--deep);border-top:1px solid var(--line);color:var(--muted)}.footer{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}.footer b{font-family:Syncopate;color:var(--bone)}
  @media(max-width:820px){.product-hero__grid{grid-template-columns:1fr}.price-card{position:static}.content__grid{grid-template-columns:1fr}.related__grid{grid-template-columns:1fr}.theme{width:44px;padding:0;font-size:0}.theme:after{content:"◐";font-size:1rem}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.related a:hover{transform:none}}
  </style></head><body>
  <header class="nav"><div class="shell nav__in"><a class="brand" href="/">G Server</a><div class="nav__actions"><a class="cta" href="${productRequestLink}">Получить КП</a></div></div></header>
  <main><div class="shell crumbs"><a href="/">Главная</a> · <a href="/#catalog">Каталог</a> · ${product.family} ${product.name}</div>
  <section class="product-hero"><div class="shell product-hero__grid"><div><p class="eyebrow">${product.family} · профессиональное оборудование</p><h1>${product.name}</h1><p class="lead">${product.summary}</p><figure class="product-visual product-visual--${product.family}"><img src="${product.imagePath}" alt="${product.imageAlt}" width="1200" height="675" fetchpriority="high"><figcaption><span>${product.imageNote}</span><b>P/N ${product.pn}</b></figcaption></figure></div><aside class="price-card"><span>Цена за 1 единицу</span><strong>${product.price}</strong><div class="status"><i></i>${product.status}</div><dl><div><dt>P/N</dt><dd>${product.pn}</dd></div><div><dt>Поставка</dt><dd>до 14 календарных дней</dd></div><div><dt>Доставка</dt><dd>включена в предложение</dd></div><div><dt>Документы</dt><dd>КП, договор, счёт</dd></div></dl><a class="cta" href="${productRequestLink}">Запросить коммерческое предложение</a></aside></div></section>
  <section class="content"><div class="shell content__grid"><article><span>01</span><h2>Для каких задач</h2><p>${product.use}.</p></article><article><span>02</span><h2>Точная версия</h2><p>Фиксируем модель и P/N ${product.pn} в спецификации до оплаты.</p></article><article><span>03</span><h2>Цена для партии</h2><p>Для оптового заказа запрашиваем дополнительный дисконт и готовим отдельный расчёт.</p></article><article><span>04</span><h2>Поставка по договору</h2><p>Согласовываем цену, срок и комплект документов, затем сопровождаем заказ по этапам.</p></article></div></section>
  <section class="related"><div class="shell"><p class="eyebrow">Другие позиции</p><h2>Профессиональное оборудование в наличии</h2><div class="related__grid">${related.map((item)=>`<a href="/${item.slug}" data-family="${item.family}"><img src="${item.imagePath}" alt="${item.imageAlt}" width="420" height="240" loading="lazy"><small>${item.family}</small><b>${item.name}</b><span>${item.pn}</span><strong>${item.price}</strong></a>`).join("")}</div></div></section></main>
  <footer><div class="shell footer"><span><b>G Server</b> · ООО «НАСЛЕДИЕ»</span><span>ИНН 7716828623 · ОГРН 1167746628060</span><a href="/privacy">Политика обработки персональных данных</a></div></footer>
  </body></html>`;
};

const privacyPage = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Политика обработки персональных данных | G Server</title><meta name="description" content="Политика ООО НАСЛЕДИЕ в отношении обработки персональных данных на сайте G Server."><meta name="robots" content="index,follow"><link rel="canonical" href="${SITE_URL}/privacy"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><style>
@font-face{font-family:Archivo;src:url('${archivoFont}') format('woff2');font-weight:100 900;font-display:swap}@font-face{font-family:Chivo;src:url('${chivoFont}') format('woff2');font-weight:300 900;font-display:swap}:root{--paper:#f5f6f2;--ink:#090b0a;--muted:#5d655d;--green:#76b900;--line:#d7dbd4}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.65 Chivo,system-ui,sans-serif}.shell{width:min(calc(100% - 40px),920px);margin:auto}a{color:inherit}.nav{height:76px;border-bottom:1px solid var(--line);display:flex;align-items:center;background:rgba(245,246,242,.92);position:sticky;top:0;backdrop-filter:blur(16px)}.nav__in{display:flex;justify-content:space-between;align-items:center}.brand{font:800 1.1rem Archivo,system-ui;text-decoration:none}.back{font-weight:700;text-underline-offset:4px}main{padding:clamp(56px,8vw,110px) 0 100px}.eyebrow{font-size:.78rem;text-transform:uppercase;letter-spacing:.12em;color:#426900;font-weight:800}h1{font:800 clamp(2.5rem,6vw,5.5rem)/.95 Archivo,system-ui;letter-spacing:-.055em;margin:14px 0 24px}h2{font:750 clamp(1.35rem,3vw,2rem)/1.1 Archivo,system-ui;margin:48px 0 14px}.lead{font-size:1.12rem;color:var(--muted);max-width:760px}.card{background:#fff;border:1px solid var(--line);border-radius:22px;padding:clamp(24px,4vw,42px);margin:36px 0}.card p{margin:5px 0}.content p,.content li{color:#343b34}.notice{border-left:5px solid var(--green);padding:18px 22px;background:#eef7df;border-radius:0 14px 14px 0;margin:30px 0}footer{border-top:1px solid var(--line);padding:30px 0;color:var(--muted)}@media(max-width:600px){.nav{height:66px}.card{border-radius:16px}}
</style></head><body><header class="nav"><div class="shell nav__in"><a class="brand" href="/">G Server</a><a class="back" href="/">Вернуться на сайт</a></div></header><main><div class="shell content"><span class="eyebrow">Редакция от 21 ноября 2026 года</span><h1>Политика обработки персональных данных</h1><p class="lead">Настоящая политика описывает, как ООО «НАСЛЕДИЕ» обрабатывает персональные данные при использовании сайта G Server и при обращении по указанным на сайте каналам связи.</p>
<section class="card"><h2 style="margin-top:0">Оператор</h2><p><b>ООО «НАСЛЕДИЕ»</b></p><p>ИНН 7716828623 · ОГРН 1167746628060 · КПП 770801001</p><p>101000, г. Москва, вн. тер. г. муниципальный округ Красносельский, ул. Мясницкая, д. 11, помещ. 28/1/2</p><p><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> · <a href="tel:+74991131436">+7 (499) 113-14-36</a></p></section>
<div class="notice"><b>На сайте нет формы заявки.</b> Сайт не принимает и не сохраняет имя, телефон, адрес электронной почты или содержание запроса. Для обращения посетитель самостоятельно открывает свою почтовую программу либо совершает телефонный звонок.</div>
<h2>1. Какие данные могут обрабатываться</h2><p>Если вы по собственной инициативе обращаетесь к оператору по электронной почте или телефону, могут обрабатываться сообщённые вами сведения: имя, контактные данные, организация, должность, содержание запроса, сведения о требуемом оборудовании и иные данные, которые вы добровольно указали.</p><p>Хостинговая инфраструктура может автоматически обрабатывать технические данные запроса, необходимые для доставки страницы и обеспечения безопасности: IP-адрес, дату и время обращения, адрес запрошенной страницы, тип браузера и устройства. Оператор не использует на сайте системы веб-аналитики, рекламные пиксели или маркетинговые cookies.</p>
<h2>2. Цели и основания обработки</h2><p>Данные из обращения используются для ответа, подготовки коммерческого предложения, согласования условий, заключения и исполнения договора, а также выполнения требований законодательства. Основанием является обращение субъекта и обработка, необходимая для заключения или исполнения договора по его инициативе, а в предусмотренных законом случаях — согласие или обязанность оператора.</p>
<h2>3. Действия, сроки и получатели</h2><p>Оператор может собирать, записывать, систематизировать, хранить, уточнять, использовать, передавать уполномоченным подрядчикам в необходимом объёме, блокировать и уничтожать данные. Данные хранятся не дольше, чем этого требуют цели обработки, договор и обязательные сроки хранения документов. После достижения целей данные удаляются или обезличиваются, если закон не требует иного.</p><p>Оператор не продаёт персональные данные и не использует их для рекламных рассылок без отдельного законного основания. Доступ получают только лица, которым он необходим для обработки обращения, исполнения договора, работы связи, бухгалтерского, юридического и технического сопровождения.</p>
<h2>4. Защита данных</h2><p>Оператор принимает правовые, организационные и технические меры, необходимые для защиты данных от неправомерного или случайного доступа, изменения, раскрытия, блокирования, копирования, предоставления, распространения и уничтожения.</p>
<h2>5. Права пользователя</h2><p>Вы вправе запросить сведения об обработке своих данных, потребовать их уточнения, блокирования или уничтожения, отозвать согласие, если обработка основана на согласии, а также обжаловать действия оператора. Направьте запрос на <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>; оператор может попросить подтвердить личность, чтобы не раскрыть сведения постороннему лицу.</p>
<h2>6. Cookies и обновление политики</h2><p>Сайт не устанавливает собственные аналитические или рекламные cookies. Необходимые технические механизмы хостинга могут применяться для безопасности и работоспособности сервиса. Политика может обновляться; актуальная версия всегда размещена по адресу <a href="${SITE_URL}/privacy">${SITE_URL}/privacy</a>.</p></div></main><footer><div class="shell">G Server · ООО «НАСЛЕДИЕ» · <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></div></footer></body></html>`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc><lastmod>2026-11-21</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>\n  <url><loc>${SITE_URL}/privacy</loc><lastmod>2026-11-21</lastmod><changefreq>monthly</changefreq><priority>0.4</priority></url>\n${products.map((product)=>`  <url><loc>${SITE_URL}/${product.slug}</loc><lastmod>2026-11-21</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join("\n")}\n</urlset>`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#10182a"/><path d="M16 46V18h7l18 18V18h7v28h-7L23 28v18z" fill="#4fd08a"/></svg>`;
const dataUrlBytes = (value) => Uint8Array.from(atob(value.slice(value.indexOf(",") + 1)), (char) => char.charCodeAt(0));
const productAssetRoutes = new Map([
  ["/assets/hero-gpu-poster.webp", "__HERO_VIDEO_POSTER_DATA_URL__"],
  ["/assets/categories/professional-gpu.webp", "__CATEGORY_PROFESSIONAL_GPU_DATA_URL__"],
  ["/assets/categories/gpu-server.webp", "__CATEGORY_GPU_SERVER_DATA_URL__"],
  ["/assets/products/h200.webp", productImages.h200],
  ["/assets/products/rtx-pro-6000.webp", productImages.rtx],
  ["/assets/products/dgx-spark-v2.webp", productImages.dgx],
  ["/assets/products/samsung-32gb.webp", productImages.samsung32],
  ["/assets/products/samsung-64gb.webp", productImages.samsung64],
]);

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname !== "/" && url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
    if (request.method === "GET" && path === "/") {
      return new Response(pageV2, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=60" } });
    }
    if (request.method === "GET" && path === "/privacy") {
      return new Response(privacyPage, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300" } });
    }
    if (request.method === "GET" && path === "/robots.txt") {
      return new Response(robots, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
    }
    if (request.method === "GET" && path === "/sitemap.xml") {
      return new Response(sitemap, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
    }
    if (request.method === "GET" && path === "/favicon.svg") {
      return new Response(favicon, { headers: { "content-type": "image/svg+xml; charset=utf-8", "cache-control": "public, max-age=86400" } });
    }
    if (request.method === "GET" && path === "/assets/hero.webp") {
      return new Response(dataUrlBytes(heroImage), { headers: { "content-type": "image/webp", "cache-control": "public, max-age=31536000, immutable" } });
    }
    if ((request.method === "GET" || request.method === "HEAD") && path === "/assets/hero-gpu.mp4") {
      const bytes = heroVideoBytes ??= dataUrlBytes(heroVideo);
      const headers = {
        "content-type": "video/mp4",
        "accept-ranges": "bytes",
        "content-length": String(bytes.length),
        "cache-control": "public, max-age=31536000, immutable",
      };
      const range = request.method === "GET" ? request.headers.get("range") : null;
      // Multiple ranges and unknown units may use a normal full response.
      if (range && /^bytes=/i.test(range) && !range.includes(",")) {
        const match = /^bytes=(\d*)-(\d*)$/i.exec(range);
        let start = 0, end = bytes.length - 1;
        if (match) {
          if (match[1]) {
            start = Number(match[1]);
            if (match[2]) end = Math.min(Number(match[2]), end);
          } else {
            start = Math.max(0, bytes.length - Number(match[2]));
          }
        }
        if (!match || start > end) {
          headers["content-range"] = `bytes */${bytes.length}`;
          headers["content-length"] = "0";
          return new Response(null, { status: 416, headers });
        }
        headers["content-range"] = `bytes ${start}-${end}/${bytes.length}`;
        headers["content-length"] = String(end - start + 1);
        return new Response(bytes.subarray(start, end + 1), { status: 206, headers });
      }
      return new Response(request.method === "HEAD" ? null : bytes, { headers });
    }
    if (request.method === "GET" && productAssetRoutes.has(path)) {
      return new Response(dataUrlBytes(productAssetRoutes.get(path)), { headers: { "content-type": "image/webp", "cache-control": "public, max-age=31536000, immutable" } });
    }
    if (request.method === "GET") {
      const product = products.find((item) => `/${item.slug}` === path);
      if (product) return new Response(productPage(product), { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300" } });
    }
    return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  },
};
