/**
 * ROSELLSA HAUTE BEAUTY SANCTUARY - WESTFOLK EDITORIAL ENGINE
 * Comprehensive Multi-Section Engine with 52 Master Treatments,
 * Dedicated Home Services Catalog, Retail Beauty Lab,
 * Specialist Consultations, Customer Feedback Form, and Rebooking Engine.
 */

// 1. GLOBAL STATE & CONFIGURATION
let currentCurrency = 'OMR';
const CURRENCY_RATES = {
  OMR: { symbol: 'OMR', rate: 1, prefix: false },
  INR: { symbol: '₹', rate: 217.5, prefix: true },
  USD: { symbol: '$', rate: 2.60, prefix: true }
};

let currentCategory = 'all';
let searchQuery = '';

// Category Metadata
const CATEGORY_META = {
  facials: { name: '6 SIGNATURE FACIALS', subtitle: 'CLINICAL & MARINE SKIN THERAPY' },
  hammam: { name: 'MOROCCAN HAMMAM & SPA', subtitle: 'AUTHENTIC PRIVATE STEAM RITUALS' },
  hair: { name: 'HAIR DESIGN & TEXTURE', subtitle: 'PRECISION CUTS, BALAYAGE & KERATIN' },
  nails: { name: 'HANDS & FEET (NAILS)', subtitle: 'RUSSIAN MANICURE & EXTENSIONS' },
  waxing: { name: 'WAXING & SUGARING', subtitle: '100% ORGANIC BOTANICAL HALAWA' },
  makeup: { name: 'MAKEUP & EYELASHES', subtitle: 'VIP BRIDAL & RED CARPET GLAM' }
};

// 2. OFFICIAL 52-TREATMENT SALON DATABASE
const SALON_SERVICES = [
  // CATEGORY 1: 6 SIGNATURE FACIALS
  {
    id: 'fac-1',
    category: 'facials',
    title: 'Facial Classic',
    arabic: 'تنظيف بشرة كلاسيك',
    desc: 'Gentle steam cleansing, organic botanical exfoliation & soothing mask for natural glow.',
    priceOMR: 10,
    homeService: true
  },
  {
    id: 'fac-2',
    category: 'facials',
    title: 'Facial Regeneration',
    arabic: 'فيشل تجديد خلايا البشرة',
    desc: 'Reviving, cellular regeneration formulated for tired, dehydrated, or sun-stressed skin.',
    priceOMR: 25,
    homeService: true
  },
  {
    id: 'fac-3',
    category: 'facials',
    title: 'Hydra Facial',
    arabic: 'هيدرا فيشل للوجه المتكامل',
    desc: '7-step medical vortex extraction, lactic gentle peel & hyaluronic antioxidant infusion.',
    priceOMR: 35,
    homeService: false // STRICT AUDIO DIRECTIVE: IN-SALON MACHINE ONLY
  },
  {
    id: 'fac-4',
    category: 'facials',
    title: 'Facial Anti-aging',
    arabic: 'فيشل محاربة التجاعيد والشد',
    desc: 'Collagen-peptide micro-circulation massage to visibly uplift contours and smooth fine lines.',
    priceOMR: 45,
    homeService: true
  },
  {
    id: 'fac-5',
    category: 'facials',
    title: 'Facial Thalgo',
    arabic: 'فيشل تالجو الفرنسي بالمعادن',
    desc: 'Prestigious French marine algae complex to soothe, mineralize, and restore fatigued skin.',
    priceOMR: 40,
    homeService: true
  },
  {
    id: 'fac-6',
    category: 'facials',
    title: 'Powerful Brightening Facial',
    arabic: 'فيشل التفتيح المركز والنضارة',
    desc: 'High-potency vitamin C & botanical radiance complex targeting hyperpigmentation.',
    priceOMR: 50,
    homeService: true
  },

  // CATEGORY 2: MOROCCAN HAMMAM BATHS & SPAS (In-Salon Suites Only)
  {
    id: 'ham-1',
    category: 'hammam',
    title: 'Royal Moroccan Hammam',
    arabic: 'حمام مغربي ملكي بالأعشاب',
    desc: 'Traditional eucalyptus black soap wash, steam scrub with authentic Kessa glove & herbal rinse.',
    priceOMR: 20,
    homeService: false // STRICT AUDIO DIRECTIVE: IN-SALON SUITE ONLY
  },
  {
    id: 'ham-2',
    category: 'hammam',
    title: 'Special Moroccan Hammam',
    arabic: 'حمام مغربي خاص بالطين',
    desc: 'Deep steam exfoliation followed by Atlas mountain Ghassoul clay detox wrap & floral rinse.',
    priceOMR: 25,
    homeService: false
  },
  {
    id: 'ham-3',
    category: 'hammam',
    title: 'VIP Moroccan Hammam Bath',
    arabic: 'حمام مغربي في آي بي فاخر',
    desc: 'Extended private steam suite massage, deep scalp argan mask & hydrating essential oil veil.',
    priceOMR: 30,
    homeService: false
  },
  {
    id: 'ham-4',
    category: 'hammam',
    title: 'Bride Moroccan Hammam Bath',
    arabic: 'حمام مغربي العروسة الامبراطوري',
    desc: 'Imperial bridal ritual: intensive Nila whitening pack, rose water mist & gold body elixir.',
    priceOMR: 40,
    homeService: false
  },
  {
    id: 'ham-5',
    category: 'hammam',
    title: 'Rosellsa Signature Hammam',
    arabic: 'حمام روزيلسا المميز',
    desc: 'Signature full-body herbal exfoliation, customized essential oils & relaxing stone wrap.',
    priceOMR: 35,
    homeService: false
  },
  {
    id: 'ham-6',
    category: 'hammam',
    title: 'Rosellsa Full Body Massage (1 Hr)',
    arabic: 'مساج استرخائي لكامل الجسم ساعة',
    desc: 'Swedish therapeutic relaxation massage using warm botanical aroma oils.',
    priceOMR: 25,
    homeService: false
  },
  {
    id: 'ham-7',
    category: 'hammam',
    title: 'Hot Stone Therapeutic Massage',
    arabic: 'مساج الأحجار البركانية الساخنة',
    desc: 'Heated basalt volcanic stones to melt muscle tension and restore energy balance.',
    priceOMR: 35,
    homeService: false
  },
  {
    id: 'ham-8',
    category: 'hammam',
    title: 'Bamboo Herbal Massage (1 Hr)',
    arabic: 'مساج الخيزران الطبيعي',
    desc: 'Deep tissue bamboo rolling technique combined with soothing herbal compresses.',
    priceOMR: 30,
    homeService: false
  },
  {
    id: 'ham-9',
    category: 'hammam',
    title: 'Swedish Eye & Face Massage',
    arabic: 'مساج السويدي للوجه وحول العين',
    desc: 'Targeted lymphatic drainage reducing facial puffiness, dark circles, and sinus tension.',
    priceOMR: 15,
    homeService: false
  },

  // CATEGORY 3: HAIR CARE & BLOWDRY
  {
    id: 'hair-1',
    category: 'hair',
    title: 'Adult Bespoke Haircut',
    arabic: 'قص شعر احترافي واستشوار',
    desc: 'Precision bespoke haircut customized to face shape, includes cleansing & blowdry.',
    priceOMR: 8,
    homeService: true
  },
  {
    id: 'hair-2',
    category: 'hair',
    title: 'Blowdry w/ Ceramic Finish',
    arabic: 'استشوار سيراميك ناعم',
    desc: 'Silky smooth blowdry with thermal heat shield and radiant high-gloss ceramic polish.',
    priceOMR: 10,
    homeService: true
  },
  {
    id: 'hair-3',
    category: 'hair',
    title: 'Hair Style Retro / Glam',
    arabic: 'تسريحة شعر ريترو أنيقة',
    desc: 'Classic Hollywood waves, vintage curls, or textured half-up party styling.',
    priceOMR: 20,
    homeService: true
  },
  {
    id: 'hair-4',
    category: 'hair',
    title: 'Hairstyle Full Design',
    arabic: 'تسريحة شعر كاملة للمناسبات',
    desc: 'Intricate couture updo, braided chignon, or red-carpet event styling.',
    priceOMR: 30,
    homeService: true
  },
  {
    id: 'hair-5',
    category: 'hair',
    title: 'Full Hair Color Couture',
    arabic: 'صبغة شعر كاملة كوتور',
    desc: 'Rich multi-tonal permanent coloration using ammonia-free Italian luxury dyes.',
    priceOMR: 35,
    homeService: true
  },
  {
    id: 'hair-6',
    category: 'hair',
    title: 'Root Touch-up Color',
    arabic: 'صبغة جذور الشعر وتغطية الشيب',
    desc: 'Flawless root regrowth color blending with 100% grey coverage and gloss rinse.',
    priceOMR: 15,
    homeService: true
  },
  {
    id: 'hair-7',
    category: 'hair',
    title: 'Aloe Vera Organic Treatment',
    arabic: 'علاج الألوفيرا الطبيعي للشعر',
    desc: 'Pure cold-pressed organic aloe vera gel mask soothing scalp dryness and restoring hydration.',
    priceOMR: 15,
    homeService: true
  },
  {
    id: 'hair-8',
    category: 'hair',
    title: 'Scalp Detox w/ Deep Mask',
    arabic: 'ديتوكس الفروة مع ماسك التغذية',
    desc: 'Purifying clay scalp scrub to remove sebum and product buildup, followed by a peptide mask.',
    priceOMR: 18,
    homeService: true
  },
  {
    id: 'hair-9',
    category: 'hair',
    title: 'Argan Therapy Treatment',
    arabic: 'جلسة علاج زيت الأرجان المركز',
    desc: 'Moroccan argan oil steam therapy infused with liquid gold lipid replenishment.',
    priceOMR: 22,
    homeService: true
  },
  {
    id: 'hair-10',
    category: 'hair',
    title: 'Protein Straightening Infusion',
    arabic: 'بروتين فرد وتنعيم الشعر المركز',
    desc: 'Brazilian organic keratin and amino-acid straightening for up to 6 months of frizz control.',
    priceOMR: 45,
    homeService: true
  },
  {
    id: 'hair-11',
    category: 'hair',
    title: 'Collagen & Argan Straightening',
    arabic: 'علاج الكولاجين والأرجان الملكي',
    desc: 'Dual-action collagen fiber rebuilding with Moroccan argan restructuring for silky hair.',
    priceOMR: 55,
    homeService: true
  },

  // CATEGORY 4: HANDS & FEET CARE (NAILS)
  {
    id: 'nail-1',
    category: 'nails',
    title: 'Acrylic Extension + Filing + Color',
    arabic: 'تركيب أظافر أكريليك مع لون',
    desc: 'Full sculpted acrylic set with precision Russian filing and premium gel polish.',
    priceOMR: 25,
    homeService: true
  },
  {
    id: 'nail-2',
    category: 'nails',
    title: 'Acrylic Nails Refill',
    arabic: 'تعبئة أظافر أكريليك مع تجديد',
    desc: 'Professional rebalancing, regrowth infill, and fresh gloss finish.',
    priceOMR: 15,
    homeService: true
  },
  {
    id: 'nail-3',
    category: 'nails',
    title: 'Poly Gel Extension + One Color',
    arabic: 'بولي جل للأظافر مع لون موحد',
    desc: 'Feather-light, ultra-durable hybrid poly gel extension with flawless gloss.',
    priceOMR: 15,
    homeService: true
  },
  {
    id: 'nail-4',
    category: 'nails',
    title: 'Gel Polish + Manicure',
    arabic: 'مناكير علاجي مع طلاء جل دائم',
    desc: 'Cuticle detail, nail contouring, hand hydration, and long-wear chip-resistant gel polish.',
    priceOMR: 12,
    homeService: true
  },
  {
    id: 'nail-5',
    category: 'nails',
    title: 'Gel Ombre Art',
    arabic: 'تدرج ألوان أظافر جل أومبري',
    desc: 'Artisan hand-blended dual-tone ombre gradient art with high-shine top coat.',
    priceOMR: 8,
    homeService: true
  },
  {
    id: 'nail-6',
    category: 'nails',
    title: 'Manicure / Pedicure Spa Duo',
    arabic: 'سبا متكامل لليدين والقدمين',
    desc: 'Dual indulgence: sea salt foot bath, dead skin filing, sugar scrub, and relaxing massage.',
    priceOMR: 15,
    homeService: true
  },
  {
    id: 'nail-7',
    category: 'nails',
    title: 'Manicure / Pedicure Express',
    arabic: 'مناكير وبدكير سريع وعصري',
    desc: 'Nail shaping, cuticle tidy, buffing, and traditional breathable enamel polish.',
    priceOMR: 10,
    homeService: true
  },
  {
    id: 'nail-8',
    category: 'nails',
    title: 'Manicure Spa Intensive',
    arabic: 'سبا فاخر ومغذي لليدين',
    desc: 'Rosewater soak, honey almond scrub, warm paraffin dip, and collagen hand massage.',
    priceOMR: 8,
    homeService: true
  },
  {
    id: 'nail-9',
    category: 'nails',
    title: 'Pedicure Spa Intensive',
    arabic: 'سبا علاجي مكثف للقدمين',
    desc: 'Eucalyptus foot jacuzzi, callus smoothing, mint mask, and deep reflex foot massage.',
    priceOMR: 10,
    homeService: true
  },
  {
    id: 'nail-10',
    category: 'nails',
    title: 'French Gel Nails',
    arabic: 'أظافر فرينش جل كلاسيكية أنيقة',
    desc: 'Timeless crisp white tip line with semi-sheer blush pink nude overlay.',
    priceOMR: 8,
    homeService: true
  },
  {
    id: 'nail-11',
    category: 'nails',
    title: 'Nails Extension Normal',
    arabic: 'تركيب أظافر عادية خفيفة',
    desc: 'Full cover lightweight tip overlay for quick events and celebrations.',
    priceOMR: 8,
    homeService: true
  },
  {
    id: 'nail-12',
    category: 'nails',
    title: 'Nail Extension Normal + Gel Polish',
    arabic: 'تركيب أظافر مع طلاء جل دائم',
    desc: 'Tip overlay paired with LED-cured high-shine gel color.',
    priceOMR: 14,
    homeService: true
  },

  // CATEGORY 5: WAXING & SUGARING (HALAWA)
  {
    id: 'wax-1',
    category: 'waxing',
    title: 'Full Body Halawa (Sugaring)',
    arabic: 'حلاوة طبيعية لكامل الجسم',
    desc: 'Traditional all-natural sugar paste hair removal, leaves skin velvety smooth for 4+ weeks.',
    priceOMR: 39,
    homeService: true
  },
  {
    id: 'wax-2',
    category: 'waxing',
    title: 'Full Body Waxing',
    arabic: 'شمع حراري لكامل الجسم',
    desc: 'Soothing chamomile strip and hot wax for fast, gentle full-body hair removal.',
    priceOMR: 29,
    homeService: true
  },
  {
    id: 'wax-3',
    category: 'waxing',
    title: 'Underarm Halawa / Wax',
    arabic: 'إزالة شعر الإبطين بحلاوة أو شمع',
    desc: 'Gentle underarm hair removal with post-wax calming lavender aloe gel.',
    priceOMR: 4,
    homeService: true
  },
  {
    id: 'wax-4',
    category: 'waxing',
    title: 'Full Legs Halawa',
    arabic: 'حلاوة الساقين بالكامل',
    desc: 'Silky hair removal from thighs to toes with organic sugaring technique.',
    priceOMR: 12,
    homeService: true
  },
  {
    id: 'wax-5',
    category: 'waxing',
    title: 'Full Body Bleaching Treatment',
    arabic: 'تشقير كامل الجسم بالبابونج',
    desc: 'Gentle chamomile skin bleaching cream to lighten fine body hair and unify skin appearance.',
    priceOMR: 20,
    homeService: true
  },
  {
    id: 'wax-6',
    category: 'waxing',
    title: 'Facial Threading & Neck',
    arabic: 'حف الوجه والرقبة بالخيط',
    desc: 'Precise antibacterial cotton threading for upper lip, chin, cheeks, and neck.',
    priceOMR: 6,
    homeService: true
  },

  // CATEGORY 6: MAKEUP & EYELASHES
  {
    id: 'mu-1',
    category: 'makeup',
    title: 'Arosa (Bridal) Makeup w/ Hair',
    arabic: 'مكياج عروس كوتور مع تسريحة',
    desc: 'Imperial bridal glam: skin prep, luxury HD foundation, mink lashes & couture hairstyling.',
    priceOMR: 180,
    homeService: true
  },
  {
    id: 'mu-2',
    category: 'makeup',
    title: 'Engagement Makeup w/ Hair',
    arabic: 'مكياج ملكي للخطوبة مع تسريحة',
    desc: 'Sophisticated romantic glam, contouring, dramatic eyes & coordinating hair design.',
    priceOMR: 80,
    homeService: true
  },
  {
    id: 'mu-3',
    category: 'makeup',
    title: 'Special Occasion Glam',
    arabic: 'مكياج سهرة مميز للمناسبات',
    desc: 'Full-glam event makeup with precision wing, cut-crease or smokey eye and lashes.',
    priceOMR: 35,
    homeService: true
  },
  {
    id: 'mu-4',
    category: 'makeup',
    title: 'Normal Glam Makeup',
    arabic: 'مكياج نهاري ناعم وطبيعي',
    desc: 'Radiant soft dewy finish, natural eyeshadow tones, and subtle lip definition.',
    priceOMR: 25,
    homeService: true
  },
  {
    id: 'mu-5',
    category: 'makeup',
    title: 'Eyelash Extensions Set',
    arabic: 'تركيب رموش حبة حبة طبيعي',
    desc: 'Individual silk or volume lash extensions attached strand-by-strand for fluttery volume.',
    priceOMR: 20,
    homeService: true
  },
  {
    id: 'mu-6',
    category: 'makeup',
    title: 'Microblading Eyebrow Art',
    arabic: 'تحديد وتعبئة الحواجب مايكروبليدنج',
    desc: 'Semi-permanent hair-stroke feathering technique for naturally dense, symmetrical arches.',
    priceOMR: 120,
    homeService: true
  },
  {
    id: 'mu-7',
    category: 'makeup',
    title: 'Eyebrow Lifting / Lamination',
    arabic: 'رفع وتثبيت الحواجب كيراتين',
    desc: 'Keratin perm formula setting brow hairs into full, brushed-up model arches for 6 weeks.',
    priceOMR: 15,
    homeService: true
  },
  {
    id: 'mu-8',
    category: 'makeup',
    title: 'Eyelash Keratin Lifting',
    arabic: 'رفع وتكثيف الرموش كيراتين',
    desc: 'Natural curl uplift and deep black tint enhancing your own lashes without extensions.',
    priceOMR: 15,
    homeService: true
  }
];

// 3. CURATED RETAIL BEAUTY LAB PRODUCTS (Audio Directives 6 & 12)
const SALON_PRODUCTS = [
  {
    id: 'prod-1',
    brand: 'THALGO PARIS',
    title: 'Marine Radiance Resurfacing Cream',
    desc: 'French marine active algae with bio-peptides for intense hydration and cellular renewal.',
    priceOMR: 32,
    image: 'assets/generated/thalgo_facial.jpg'
  },
  {
    id: 'prod-2',
    brand: 'ROSELLSA BOTANICS',
    title: 'Atlas Mountain Liquid Gold Argan Oil',
    desc: '100% pure cold-pressed Moroccan argan oil for silky hair restoration and supple skin veil.',
    priceOMR: 18,
    image: 'assets/generated/lookbook_cosmetics.jpg'
  },
  {
    id: 'prod-3',
    brand: 'LOREAL / KERATIN LAB',
    title: 'Collagen & Amino Post-Care Hair Mask',
    desc: 'Salon-grade restructuring mask designed to prolong protein straightening and seal ends.',
    priceOMR: 24,
    image: 'assets/generated/lookbook_hair.jpg'
  },
  {
    id: 'prod-4',
    brand: 'AURELIA CLINIQUE',
    title: 'Lumina 24K Botanical Boosting Elixir',
    desc: 'Restorative antioxidant serum enriched with squalane and rosehip for radiant Muscat glow.',
    priceOMR: 28,
    image: 'assets/generated/lookbook_cosmetics.jpg'
  }
];

// 4. PRICE FORMATTER (Locked Strictly to Official OMR)
function formatPrice(priceOMR) {
  return `${priceOMR} OMR`;
}

// 5. RENDER IN-SALON SERVICES (WESTFOLK 2-COLUMN MENU)
function renderServices() {
  const container = document.getElementById('servicesGrid');
  if (!container) return;

  let filtered = SALON_SERVICES.filter(service => {
    if (currentCategory !== 'all' && service.category !== currentCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = service.title.toLowerCase().includes(q);
      const matchArabic = service.arabic.toLowerCase().includes(q);
      const matchDesc = service.desc.toLowerCase().includes(q);
      if (!matchTitle && !matchArabic && !matchDesc) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 16px; color: var(--text-muted); font-family: var(--font-serif); margin-bottom: 12px;">No treatments match your criteria.</p>
        <button type="button" class="btn-westfolk-dark" onclick="resetServiceFilters()">Reset Filter</button>
      </div>
    `;
    return;
  }

  const grouped = {};
  filtered.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  let html = '';
  Object.keys(grouped).forEach(catKey => {
    const items = grouped[catKey];
    const meta = CATEGORY_META[catKey] || { name: catKey.toUpperCase() };

    html += `
      <div class="service-category-block">
        <div class="category-block-header">
          <h3 class="category-block-title">${meta.name}</h3>
          <span class="category-count">${items.length} Treatments</span>
        </div>

        <div class="service-items-list">
          ${items.map(service => {
            const badgeClass = service.homeService ? 'home-available' : 'in-salon-only';
            const badgeLabel = service.homeService ? 'Home Service Available' : 'In-Salon Sanctuary Only';

            return `
              <div class="service-item-row" id="item-${service.id}">
                <div class="item-main-header">
                  <div class="item-name-group">
                    <h4 class="item-name">${service.title}</h4>
                    <span class="item-arabic">${service.arabic}</span>
                  </div>
                  <div class="item-price-tag">${formatPrice(service.priceOMR)}</div>
                </div>

                <p class="item-desc">${service.desc}</p>

                <div class="item-meta-bar">
                  <span class="item-badge ${badgeClass}">${badgeLabel}</span>
                  <button type="button" class="item-book-action" onclick="openBookingDrawer('${service.id}', 'salon')">Reserve &rarr;</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// 6. RENDER DEDICATED HOME SERVICES (Audio 1 & 10: Strict Exclusion of Hammam & Hydra Facial)
function renderHomeServices() {
  const container = document.getElementById('homeServicesGrid');
  if (!container) return;

  // Strict Audio Rule: Only services where homeService === true
  const homeAvailable = SALON_SERVICES.filter(s => s.homeService === true);

  const grouped = {};
  homeAvailable.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  let html = '';
  Object.keys(grouped).forEach(catKey => {
    const items = grouped[catKey];
    const meta = CATEGORY_META[catKey] || { name: catKey.toUpperCase() };

    html += `
      <div class="service-category-block">
        <div class="category-block-header">
          <h3 class="category-block-title">HOME &bull; ${meta.name}</h3>
          <span class="category-count">${items.length} Options</span>
        </div>

        <div class="service-items-list">
          ${items.map(service => `
            <div class="service-item-row">
              <div class="item-main-header">
                <div class="item-name-group">
                  <h4 class="item-name">${service.title}</h4>
                  <span class="item-arabic">${service.arabic}</span>
                </div>
                <div class="item-price-tag">${formatPrice(service.priceOMR)}</div>
              </div>

              <p class="item-desc">${service.desc}</p>

              <div class="item-meta-bar">
                <span class="item-badge home-available">Certified Home Call</span>
                <button type="button" class="item-book-action" onclick="openBookingDrawer('${service.id}', 'home')">Book Home Call &rarr;</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// 7. RENDER RETAIL PRODUCTS (Audio Directives 6 & 12)
function renderProducts() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  container.innerHTML = SALON_PRODUCTS.map(prod => `
    <article class="product-card">
      <div class="product-photo-box">
        <img src="${prod.image}" alt="${prod.title}" class="product-photo">
      </div>
      <span class="product-brand">${prod.brand}</span>
      <h3 class="product-title">${prod.title}</h3>
      <p class="product-desc">${prod.desc}</p>
      <div class="product-footer">
        <span class="product-price">${formatPrice(prod.priceOMR)}</span>
        <a href="https://wa.me/96898564463?text=${encodeURIComponent(`Hello Rosellsa, I would like to order the ${prod.brand} - ${prod.title} (${prod.priceOMR} OMR).`)}" target="_blank" rel="noopener noreferrer" class="product-order-btn">
          Order via WhatsApp &rarr;
        </a>
      </div>
    </article>
  `).join('');
}

// 8. UPDATE CATEGORY COUNTS
function updateCategoryCounters() {
  const counts = { all: SALON_SERVICES.length };
  SALON_SERVICES.forEach(s => {
    counts[s.category] = (counts[s.category] || 0) + 1;
  });

  Object.keys(counts).forEach(cat => {
    const el = document.getElementById(`count-${cat}`);
    if (el) el.textContent = counts[cat];
  });
}

// 9. CURRENCY SWITCHING LOGIC (Removed - All Prices Official OMR)
function setCurrency(currencyCode) {
  // Locked to OMR
}

// 10. POPULATE SELECTS (DRAWER & INLINE)
function populateServiceSelect(selectId, selectedId = null, filterHomeOnly = false) {
  const select = document.getElementById(selectId);
  if (!select) return;

  const list = filterHomeOnly ? SALON_SERVICES.filter(s => s.homeService) : SALON_SERVICES;

  select.innerHTML = list.map(s => {
    const isSelected = selectedId === s.id ? 'selected' : '';
    const tag = s.homeService ? '' : ' [In-Salon Sanctuary Only]';
    return `<option value="${s.id}" ${isSelected}>${s.title} (${s.priceOMR} OMR)${tag}</option>`;
  }).join('');
}

// 11. INLINE BOOKING FORM LOGIC (Audio 9: New Customer vs Rebooking)
function handleInlineServiceChange() {
  updateInlineLocationRules();
  updateInlinePriceDisplay();
}

function updateInlinePriceDisplay() {
  const select = document.getElementById('inlineServiceSelect');
  const display = document.getElementById('inlinePriceDisplay');
  if (!select || !display) return;

  const service = SALON_SERVICES.find(s => s.id === select.value);
  if (service) {
    display.textContent = `Official Fee: ${formatPrice(service.priceOMR)} (${service.priceOMR} OMR)`;
  }
}

function updateInlineLocationRules() {
  const select = document.getElementById('inlineServiceSelect');
  if (!select) return;

  const service = SALON_SERVICES.find(s => s.id === select.value);
  const homeRadio = document.getElementById('inlineLocHome');
  const salonRadio = document.getElementById('inlineLocSalon');
  const homeLabel = document.getElementById('inlineHomeLabel');
  const noteEl = document.getElementById('inlineAudioRuleNote');
  const addressGroup = document.getElementById('inlineHomeAddressGroup');
  const addressInput = document.getElementById('inlineAddress');

  if (!service) return;

  if (!service.homeService) {
    if (homeRadio) homeRadio.disabled = true;
    if (homeLabel) {
      homeLabel.style.opacity = '0.4';
      homeLabel.style.cursor = 'not-allowed';
    }
    if (salonRadio) salonRadio.checked = true;
    if (noteEl) {
      noteEl.style.display = 'block';
      noteEl.textContent = `★ Strict Audio Rule: ${service.title} requires specialized salon machinery/steam suites and is exclusively conducted in our private Muscat Sanctuary.`;
    }
    if (addressGroup) addressGroup.style.display = 'none';
    if (addressInput) addressInput.required = false;
  } else {
    if (homeRadio) homeRadio.disabled = false;
    if (homeLabel) {
      homeLabel.style.opacity = '1';
      homeLabel.style.cursor = 'pointer';
    }
    if (noteEl) noteEl.style.display = 'none';

    const isHome = homeRadio && homeRadio.checked;
    if (addressGroup) addressGroup.style.display = isHome ? 'block' : 'none';
    if (addressInput) addressInput.required = isHome;
  }
}

function handleInlineBookingSubmit(e) {
  e.preventDefault();

  const clientType = document.querySelector('input[name="inlineClientType"]:checked').value;
  const select = document.getElementById('inlineServiceSelect');
  const service = SALON_SERVICES.find(s => s.id === select.value);
  const locationType = document.querySelector('input[name="inlineLocation"]:checked').value;
  const name = document.getElementById('inlineName').value.trim();
  const phone = document.getElementById('inlinePhone').value.trim();
  const date = document.getElementById('inlineDate').value;
  const time = document.getElementById('inlineTime').value;
  const address = document.getElementById('inlineAddress') ? document.getElementById('inlineAddress').value.trim() : '';

  const locationText = locationType === 'home'
    ? `Home Service (Muscat Address: ${address || 'Provided in chat'})`
    : `In-Salon Sanctuary (Muscat Villa)`;

  const msgLines = [
    `✨ *ROSELLSA SANCTUARY — APPOINTMENT RESERVATION* ✨`,
    ``,
    `*Client Status:* ${clientType === 'Rebooking Customer' ? '🔄 Returning Client (Rebooking)' : '⭐ New Customer (First-Time Visit)'}`,
    `*Guest Name:* ${name}`,
    `*Phone / WhatsApp:* ${phone}`,
    `*Selected Treatment:* ${service ? service.title : 'Bespoke Consultation'} (${service ? service.priceOMR : ''} OMR)`,
    `*Location:* ${locationText}`,
    `*Date:* ${date}`,
    `*Preferred Time:* ${time}`,
    ``,
    `_Sent via Rosellsa Online Booking Engine (Muscat, Oman)_`
  ];

  const waUrl = `https://wa.me/96898564463?text=${encodeURIComponent(msgLines.join('\n'))}`;
  window.open(waUrl, '_blank');
}

// 12. SLIDE-OVER VIP DRAWER LOGIC
function openBookingDrawer(serviceId = null, locationMode = 'salon') {
  populateServiceSelect('drawerServiceSelect', serviceId || (SALON_SERVICES[0] && SALON_SERVICES[0].id));

  // If location requested is home, toggle radio if allowed
  if (locationMode === 'home') {
    const homeRadio = document.getElementById('locHome');
    if (homeRadio && !homeRadio.disabled) {
      homeRadio.checked = true;
    }
  } else {
    const salonRadio = document.getElementById('locSalon');
    if (salonRadio) salonRadio.checked = true;
  }

  const dateInput = document.getElementById('bookingDateInput');
  if (dateInput && !dateInput.value) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  updateDrawerLocationRules();
  updateDrawerPriceDisplay();

  const drawer = document.getElementById('bookingDrawer');
  const overlay = document.getElementById('bookingDrawerOverlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeBookingDrawer() {
  const drawer = document.getElementById('bookingDrawer');
  const overlay = document.getElementById('bookingDrawerOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleDrawerServiceChange() {
  updateDrawerLocationRules();
  updateDrawerPriceDisplay();
}

function updateDrawerLocationRules() {
  const select = document.getElementById('drawerServiceSelect');
  if (!select) return;

  const service = SALON_SERVICES.find(s => s.id === select.value);
  const homeRadio = document.getElementById('locHome');
  const salonRadio = document.getElementById('locSalon');
  const homeLabel = document.getElementById('homeServiceRadioLabel');
  const noteEl = document.getElementById('drawerAudioRuleNote');
  const addressGroup = document.getElementById('homeAddressGroup');
  const addressInput = document.getElementById('clientAddressInput');

  if (!service) return;

  if (!service.homeService) {
    if (homeRadio) homeRadio.disabled = true;
    if (homeLabel) {
      homeLabel.style.opacity = '0.4';
      homeLabel.style.cursor = 'not-allowed';
    }
    if (salonRadio) salonRadio.checked = true;
    if (noteEl) {
      noteEl.style.display = 'block';
      noteEl.textContent = `★ Strict Audio Rule: ${service.title} requires specialized salon machinery/steam suites and is exclusively conducted in our private Muscat Sanctuary.`;
    }
    if (addressGroup) addressGroup.style.display = 'none';
    if (addressInput) addressInput.required = false;
  } else {
    if (homeRadio) homeRadio.disabled = false;
    if (homeLabel) {
      homeLabel.style.opacity = '1';
      homeLabel.style.cursor = 'pointer';
    }
    if (noteEl) noteEl.style.display = 'none';

    const isHome = homeRadio && homeRadio.checked;
    if (addressGroup) addressGroup.style.display = isHome ? 'block' : 'none';
    if (addressInput) addressInput.required = isHome;
  }
}

function updateDrawerPriceDisplay() {
  const select = document.getElementById('drawerServiceSelect');
  const display = document.getElementById('drawerPriceDisplay');
  if (!select || !display) return;

  const service = SALON_SERVICES.find(s => s.id === select.value);
  if (service) {
    display.textContent = `Official Fee: ${formatPrice(service.priceOMR)} (${service.priceOMR} OMR)`;
  }
}

function handleDrawerBookingSubmit(e) {
  e.preventDefault();

  const clientType = document.querySelector('input[name="drawerClientType"]:checked').value;
  const select = document.getElementById('drawerServiceSelect');
  const service = SALON_SERVICES.find(s => s.id === select.value);
  const locationType = document.querySelector('input[name="drawerLocation"]:checked').value;
  const name = document.getElementById('clientNameInput').value.trim();
  const phone = document.getElementById('clientPhoneInput').value.trim();
  const date = document.getElementById('bookingDateInput').value;
  const time = document.getElementById('bookingTimeSelect').value;
  const address = document.getElementById('clientAddressInput') ? document.getElementById('clientAddressInput').value.trim() : '';
  const notes = document.getElementById('clientNotesInput').value.trim();

  const locationText = locationType === 'home'
    ? `Home Service (Muscat Address: ${address || 'To be specified'})`
    : `In-Salon Sanctuary (Muscat Villa)`;

  const msgLines = [
    `✨ *ROSELLSA SANCTUARY — BESPOKE APPOINTMENT RESERVATION* ✨`,
    ``,
    `*Client Status:* ${clientType === 'Rebooking Customer' ? '🔄 Returning Client (Rebooking)' : '⭐ New Customer (First-Time Visit)'}`,
    `*Guest Name:* ${name}`,
    `*Phone / WhatsApp:* ${phone}`,
    `*Selected Treatment:* ${service ? service.title : 'Bespoke Consultation'} (${service ? service.priceOMR : ''} OMR)`,
    `*Location:* ${locationText}`,
    `*Preferred Date:* ${date}`,
    `*Preferred Time:* ${time}`,
    notes ? `*Special Notes / Specialist:* ${notes}` : ``,
    ``,
    `_Sent via Rosellsa Online Concierge (Muscat, Oman)_`
  ].filter(line => line !== null && line !== undefined);

  const waUrl = `https://wa.me/96898564463?text=${encodeURIComponent(msgLines.join('\n'))}`;
  window.open(waUrl, '_blank');
  closeBookingDrawer();
}

// 13. CUSTOMER FEEDBACK SUBMISSION (Audio Directive 5)
function handleFeedbackSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('fbName').value.trim();
  const phone = document.getElementById('fbPhone').value.trim();
  const service = document.getElementById('fbService').value;
  const rating = document.getElementById('fbRatingVal').value;
  const comments = document.getElementById('fbComments').value.trim();

  const successEl = document.getElementById('fbSuccessMsg');
  if (successEl) {
    successEl.style.display = 'block';
  }

  // Pre-fill message to WhatsApp desk for review logging
  const fbMsg = [
    `💌 *ROSELLSA SANCTUARY — NEW CLIENT FEEDBACK* 💌`,
    ``,
    `*Guest:* ${name} (${phone})`,
    `*Service Reviewed:* ${service}`,
    `*Rating:* ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5 Stars)`,
    `*Comments:* "${comments}"`
  ].join('\n');

  // Open confirmation
  setTimeout(() => {
    window.open(`https://wa.me/96898564463?text=${encodeURIComponent(fbMsg)}`, '_blank');
  }, 1000);
}

// Star Rating Interactive Widget
function setupStarRating() {
  const widget = document.getElementById('starRatingWidget');
  if (!widget) return;

  const starBtns = widget.querySelectorAll('.star-btn');
  const ratingInput = document.getElementById('fbRatingVal');

  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = parseInt(btn.dataset.rating, 10);
      ratingInput.value = selected;

      starBtns.forEach(b => {
        const r = parseInt(b.dataset.rating, 10);
        b.classList.toggle('active', r <= selected);
      });
    });
  });
}

// 14. FILTER & RESET HELPERS
function resetServiceFilters() {
  currentCategory = 'all';
  searchQuery = '';

  const searchInput = document.getElementById('serviceSearchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.cat === 'all');
  });

  renderServices();
}

// 15. MOBILE NAVIGATION CONTROLS
function toggleMobileNav() {
  const drawer = document.getElementById('mobileNavDrawer');
  const btn = document.getElementById('mobileMenuBtn');
  if (drawer) drawer.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
}

function closeMobileNav() {
  const drawer = document.getElementById('mobileNavDrawer');
  const btn = document.getElementById('mobileMenuBtn');
  if (drawer) drawer.classList.remove('open');
  if (btn) btn.classList.remove('open');
}

// 16. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  renderHomeServices();
  renderProducts();
  updateCategoryCounters();
  populateServiceSelect('inlineServiceSelect');
  updateInlinePriceDisplay();
  setupStarRating();

  // Set default inline booking date to tomorrow
  const inlineDateInput = document.getElementById('inlineDate');
  if (inlineDateInput && !inlineDateInput.value) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    inlineDateInput.value = tomorrow.toISOString().split('T')[0];
  }

  // Category Tabs Filter
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.cat;
      renderServices();
    });
  });

  // Search Input
  const searchInput = document.getElementById('serviceSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderServices();
    });
  }

  // Mobile Menu Button
  const mobileBtn = document.getElementById('mobileMenuBtn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleMobileNav);
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingDrawer();
      closeMobileNav();
    }
  });
});
