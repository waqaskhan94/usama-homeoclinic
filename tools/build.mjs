import fs from "node:fs";

import { fileURLToPath } from "node:url";
/* Writes the site pages into the repo root (the folder above tools/), whatever that folder is called.
   Run from the repo root:  node tools/build.mjs */
const OUT = fileURLToPath(new URL("../", import.meta.url));
const PHONE = "0300-9813872";
const TEL = "+923009813872";
const WA = "https://wa.me/923009813872?text=Hello%20Usama%20Homeo%20Clinic%2C%20I%20would%20like%20to%20book%20an%20appointment.";
const EMAIL = "appointments@example.com";
const BOOK = "request-an-appointment.html";

/* ---------- icons ---------- */
const P = {
  shield: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M5 21c1-4 4-6 7-6s6 2 7 6"/>',
  family: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c.5-3.5 3-5 6-5s5.5 1.5 6 5"/><path d="M16 15c2.5 0 4 1.2 5 4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  video: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M10 10l5 2-5 2z"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  chat: '<path d="M4 20l1.3-4A8 8 0 1 1 8.5 19L4 20z"/><path d="M9 10c.5 2.5 2.5 4.5 5 5l1.5-1.5-2-1-1 .8c-.8-.4-1.6-1.2-2-2l.8-1-1-2z"/>',
  pulse: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  bolt: '<path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z"/>',
  skin: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  wind: '<path d="M3 9h11a3 3 0 1 0-3-3"/><path d="M3 14h15a3 3 0 1 1-3 3"/><path d="M3 19h6"/>',
  female: '<circle cx="12" cy="8" r="5"/><path d="M12 13v8M9 18h6"/>',
  child: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14a4 4 0 0 0 7 0"/><circle cx="9" cy="9.5" r="0.9" fill="currentColor"/><circle cx="15" cy="9.5" r="0.9" fill="currentColor"/>',
  apple: '<path d="M12 7c-2-2-6-1-6 4 0 5 3 9 6 9s6-4 6-9c0-5-4-6-6-4z"/><path d="M12 7c0-2 1-3.5 3-4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
  head: '<path d="M8 21v-4.5a7 7 0 1 1 8-6.5l1 3h-2v3a2 2 0 0 1-2 2H8z"/>',
  bone: '<path d="M17 3.5a2.5 2.5 0 0 1 3.5 3.5 2.5 2.5 0 0 1-3 1.5L8.5 17.5A2.5 2.5 0 0 1 7 20.5 2.5 2.5 0 0 1 3.5 17a2.5 2.5 0 0 1 3-1.5L15.5 6.5A2.5 2.5 0 0 1 17 3.5z"/>',
  leaf: '<path d="M5 20c0-8 4-14 14-15-1 10-7 14-14 15z"/><path d="M5 20c2-5 5-8 9-10"/>',
  heart: '<path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  steth: '<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v1.5a5 5 0 0 0 10 0V14"/><circle cx="20" cy="12" r="2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check2: '<path d="M5 12.5l4.5 4.5L19 7.5" stroke-width="3"/>',
  kidney: '<path d="M14.5 3.5c-3.2-1.2-7.500.3-8.500 4.200-1 3.800 1.200 6.800 3.300 8.800 1.600 1.500 3.200 3.500 5.900 3 3-.600 4.200-3.500 3.200-7-.500-1.800-1.500-2.500-1.500-4.200 0-1.600.800-2.400-.700-4.300z"/><path d="M12.500 11.500h3.500"/>',
  plus: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  quote: '<path d="M7 7h4v4H9c0 2 .8 3 2 3v2c-3 0-4-2-4-5V7zm8 0h4v4h-2c0 2 .8 3 2 3v2c-3 0-4-2-4-5V7z" fill="currentColor" stroke="none"/>',
};
const svg = (n, cls = "") =>
  `<svg${cls ? ` class="${cls}"` : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
const leaf = (cls) => `<svg class="banner-leaf ${cls}" aria-hidden="true"><use href="#leaf"/></svg>`;

/* ---------- shared data ---------- */
const NAV = [
  ["Home", "index.html"],
  ["About Us", "about.html"],
  ["Services", "services.html"],
  ["Service Areas", "service-areas.html"],
  ["FAQs", "faqs.html"],
  ["Reviews", "reviews.html"],
  ["Contact", "contact.html"],
];

const SERVICES = [
  { icon: "kidney", t: "Kidney Stones", d: "Dr. Wahid-ur-Rehman has a special interest in kidney and urinary stone complaints. We look at your history, water and diet habits, and any scans or reports you already have. Bladder complaints are also seen.", b: ["Recurring kidney or urinary stone complaints", "Flank and lower-back pain", "Burning urination and bladder complaints", "Follow-up alongside your scans and reports"] },
  { icon: "plus", t: "Piles (Haemorrhoids)", d: "Piles are closely tied to constipation, diet and daily routine. We look at the whole picture and give simple habit advice alongside your remedy.", b: ["Painful or bleeding piles", "Constipation and straining", "Itching and discomfort", "Diet and routine guidance"] },
  { icon: "skin", t: "Skin Conditions", d: "Eczema, acne, recurring rashes and dry, irritated skin often have triggers outside the skin itself, such as stress, diet and sleep.", b: ["Eczema and itchy, dry skin", "Acne and recurring breakouts", "Fungal and recurring rashes", "Hair fall and scalp problems"] },
  { icon: "wind", t: "Allergies & Breathing", d: "Asthma, hay fever, a stubborn cough, sinus trouble and frequent colds are common reasons people visit us.", b: ["Seasonal and dust allergies", "Sinus congestion and headaches", "Recurring cough and colds", "Asthma and breathing difficulty"] },
  { icon: "female", t: "Women’s Health", d: "Irregular or painful cycles, leucorrhea and hormonal changes can be discussed openly in a private consultation.", b: ["Irregular or painful periods", "Hormonal changes", "Leucorrhea (white discharge)", "Support through life stages"] },
  { icon: "child", t: "Children’s Health", d: "Children are seen with a parent or guardian. Visits are kept calm, and every remedy is explained in plain words.", b: ["Recurring colds and coughs", "Tonsils and ear complaints", "Appetite and sleep concerns", "Skin and tummy troubles"] },
  { icon: "apple", t: "Digestive Health", d: "Gastric trouble, acidity, burning, bloating and irregular bowels are closely tied to routine, food and stress, so we look at the whole picture.", b: ["Gastric trouble and stomach gas", "Acidity, burning and heartburn", "Bloating", "Constipation or loose motions", "Poor appetite"] },
  { icon: "moon", t: "Stress, Sleep & Mood", d: "Long hours, worry and poor sleep take a toll. We take time to understand what is going on in your daily life.", b: ["Stress and tension", "Trouble falling asleep", "Low mood and irritability", "Exam and work pressure"] },
  { icon: "head", t: "Headache & Migraine", d: "We note when headaches come, what triggers them and what eases them, then choose a remedy that fits the pattern.", b: ["Recurring headaches", "Migraine patterns", "Tension headaches", "Sinus-related headaches"] },
  { icon: "bone", t: "Joint & Muscle Pain", d: "Stiffness and aches are discussed alongside your routine, sleep and past injuries. We refer you onward when tests or scans are needed.", b: ["Joint stiffness and aches", "Back and neck pain", "Muscle strain", "Pain that changes with weather"] },
  { icon: "pulse", t: "Sugar & Blood Pressure", d: "Diabetes (sugar) and high blood pressure need steady, long-term care. Homeopathy is offered alongside your regular tests and any medicines your physician has advised.", b: ["Diabetes (sugar) support", "High or fluctuating blood pressure", "Diet and routine guidance", "Follow-up alongside your lab reports"] },
  { icon: "bolt", t: "Sexual & Physical Weakness", d: "These concerns are discussed privately and without judgement. We look at stress, sleep, diet and general health together.", b: ["Sexual weakness", "General physical weakness and low energy", "Stress-related causes", "Private, respectful consultation"] },
];

const FAQ = {
  "About homeopathy": [
    ["What is homeopathy and how does it work?", "Homeopathy is a system of medicine that uses highly diluted natural substances, chosen to match the whole person and not just a single symptom. Your doctor takes a detailed history so the remedy fits your body, habits and temperament."],
    ["Which conditions do people visit you for?", "Commonly sugar (diabetes) and blood pressure, asthma, allergies and sinus trouble, skin complaints, digestive problems, gastric trouble and acidity, kidney stone and bladder complaints, piles, women’s health concerns including leucorrhea, sexual and physical weakness, headaches, joint pain, and stress or sleep difficulties, as well as recurring illnesses in children. Homeopathy is a complementary approach and does not replace emergency or specialist care."],
    ["Is homeopathic treatment suitable for children and older adults?", "Yes. Remedies are gentle and are chosen for the individual. Children are seen with a parent or guardian, and older patients are welcome to bring a family member. Please tell the doctor if the patient is pregnant or breastfeeding."],
    ["Can I take homeopathy alongside my other medicines?", "Please tell us everything you currently take. Do not stop or change prescribed medicine without speaking to the doctor who prescribed it."],
    ["Do you treat kidney stones?", "Dr. Wahid-ur-Rehman has a special interest in kidney and urinary stone complaints. Bring any ultrasound, CT or lab reports to your visit so the doctor can see your full picture. Homeopathy is a complementary approach and does not replace urgent care: go to a hospital straight away for severe pain, fever, vomiting, or if you cannot pass urine."],
    ["Do you treat piles (haemorrhoids)?", "Yes. Piles are closely linked to constipation, diet and daily habits, so your doctor looks at the whole picture and gives practical advice alongside your remedy. Please see a doctor urgently for heavy or repeated bleeding, severe pain, or dizziness."],
  ],
  "Your consultation": [
    ["How long is the first consultation?", "Usually 20 to 25 minutes. The doctor will ask about your main complaint and also about sleep, appetite, energy, emotions and past illnesses. Follow-up visits are shorter."],
    ["What should I expect during my first visit?", "A focused, unhurried conversation. The doctor listens, asks questions, explains the approach and, where suitable, prescribes your first remedy. You will also learn how to take it and what to watch for."],
    ["What should I bring with me?", "Any previous reports, prescriptions and a list of the medicines or supplements you take. If you are coming for your child, bring their vaccination card and any recent test results."],
    ["How soon will I notice a change?", "It varies from person to person and depends on the condition. Recent complaints may respond sooner, while long-standing problems usually need more time and follow-up visits. Your doctor will tell you what to expect."],
    ["Can I have an online consultation?", "Yes. Choose “Online video consultation” when you book and we will send a link once the appointment is confirmed. The doctor consults in Urdu, English, Punjabi and Pashto. Remedies can be arranged by courier where possible."],
  ],
  "Booking and payment": [
    ["How do I book an appointment?", "Use the Request an Appointment page or message us on WhatsApp. Choose a day and time and we will confirm by message."],
    ["What if I need to cancel or change my appointment?", "Message us on WhatsApp at least a day before and we will find you another time."],
    ["What is the consultation fee and how can I pay?", "The consultation fee is Rs. 1,000. You can pay in cash at the clinic, and for online consultations we can share details for bank transfer, JazzCash or Easypaisa."],
    ["Where are you located and which cities do you serve?", "Our clinic is in Rawalpindi, but we provide care to everyone. Patients from Rawalpindi, Islamabad and nearby cities visit us in person, and we consult online with patients across Pakistan and overseas. See the <a href=\"/service-areas\">Service Areas page</a> for details."],
    ["What are your clinic hours and where exactly is the clinic?", "Our clinic is at Mohra Chaper Stop, Chakri Road, Rawalpindi, with parking on the main road. Morning hours are 10 AM to 1 PM. Evening hours are 4 PM to 9 PM in winter and 6 PM to 10 PM in summer. The clinic is closed on Fridays. Please <a href=\"/request-an-appointment\">request an appointment</a> first so we can confirm a time."],
  ],
};
const HOME_FAQ = [
  FAQ["About homeopathy"][0], FAQ["About homeopathy"][3],
  FAQ["Your consultation"][0], FAQ["Your consultation"][1], FAQ["Your consultation"][4],
  FAQ["Booking and payment"][2],
];

const AREAS = [
  { id: "rawalpindi", t: "Rawalpindi", r: "Clinic location", l: ["Mohra Chaper Stop, Chakri Road"] },
  { id: "islamabad", t: "Islamabad", r: "Book a visit or consult online",l: ["F-7", "G-9", "G-11", "I-8", "E-11", "Bahria Enclave"] },
  { id: "nearby", t: "Nearby Cities", r: "Book a visit or consult online",l: ["Taxila", "Wah Cantt", "Murree", "Gujar Khan", "Jhelum", "Attock"] },
  { id: "online", t: "Online, Anywhere", r: "Across Pakistan & overseas", l: ["Lahore", "Karachi", "Peshawar", "Faisalabad", "Multan", "Overseas Pakistanis"] },
];

const REVIEWS = [
  { t: "I never felt rushed.", q: "The doctor listened to everything, explained each step clearly, and I left feeling understood.", img: "avatar-1", name: "Nasreen Akhtar", city: "Rawalpindi" },
  { t: "A calm visit with my child.", q: "Bringing my daughter here was easy. The doctor was patient and kind, and the follow-up visits were helpful.", img: "avatar-2", name: "Bilal Ahmed", city: "Islamabad" },
  { t: "Booking was simple.", q: "The clinic replied on WhatsApp the same day. The whole visit felt calm and well organised.", img: "avatar-3", name: "Usman Tariq", city: "Lahore" },
  { t: "Finally, someone who asked about everything.", q: "From my sleep to my stress, nothing was brushed aside. I appreciated the honest advice, including when to see a specialist.", img: "avatar-4", name: "Hassan Raza", city: "Karachi" },
  { t: "Online consultation worked well for us.", q: "We live in another city, so the video consultation saved a long journey. The remedies reached us by courier.", img: "avatar-5", name: "Imran Shah", city: "Peshawar" },
  { t: "Gentle, respectful care.", q: "The doctor took time to explain everything to me in simple words. I felt comfortable throughout.", img: "avatar-6", name: "Rukhsana Bibi", city: "Rawalpindi" },
];

/* ---------- partials ---------- */
const headHtml = ({ title, desc, extra = "" }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="assets/images/remedies-bottles.jpg">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Lato:wght@400;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">${extra}
</head>
<body>

<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <symbol id="leaf" viewBox="0 0 100 100">
      <path d="M50 96C18 72 12 34 50 4c38 30 32 68 0 92Z" fill="currentColor"/>
      <path d="M50 96V22" stroke="#fff" stroke-opacity="0.45" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </symbol>
  </defs>
</svg>
`;

const header = (active) => `

<header class="site-header">
  <div class="wrap header-row">
    <a class="brand" href="index.html" aria-label="Usama Homeo Clinic, home">
      <svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="#3A5C66"/><path d="M20 33C11 26 9 16 20 7c11 9 9 19 0 26Z" fill="#fff"/><path d="M20 33V14" stroke="#3A5C66" stroke-width="1.8" stroke-linecap="round"/></svg>
      <span>Usama Homeo Clinic<small>Individual care, natural approach</small></span>
    </a>

    <nav class="nav" id="nav" aria-label="Main">
      <ul class="menu">
${NAV.map(([n, f]) => `        <li><a href="${f}"${f === active ? ' aria-current="page"' : ""}>${n}</a></li>`).join("\n")}
      </ul>
    </nav>

    <div class="header-actions">
      <a class="header-phone" href="${WA}" rel="noopener">${svg("chat")}WhatsApp</a>
      <a class="btn btn--gold btn-long" href="${BOOK}">Request an Appointment</a>
      <a class="btn btn--gold btn-short" href="${BOOK}">Book</a>
      <button class="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
    </div>
  </div>
</header>
`;

const footer = () => `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-row">
      <div class="foot-contact">
        <span class="foot-head">Contact</span>
        <p>${svg("phone")}<span><strong>Call/Text:</strong> <a href="tel:${TEL}">${PHONE}</a></span></p>
        <p>${svg("chat")}<span><strong>WhatsApp:</strong> <a href="https://wa.me/${TEL.replace("+", "")}" rel="noopener">${PHONE}</a></span></p>
        <p>${svg("pin")}<span><strong>Clinic:</strong> Mohra Chaper Stop, Chakri Road, Rawalpindi</span></p>
        <p>${svg("clock")}<span><strong>Clinic Hours:</strong><br>Monday to Sunday<br>Morning: 10 AM to 1 PM<br>Evening (winter): 4 PM to 9 PM<br>Evening (summer): 6 PM to 10 PM<br>Friday: closed</span></p>
      </div>
      <div>
        <span class="foot-head">Service Areas</span>
        <ul class="foot-links">
          <li><a href="service-areas.html#rawalpindi">Rawalpindi</a></li>
          <li><a href="service-areas.html#islamabad">Islamabad</a></li>
          <li><a href="service-areas.html#nearby">Nearby Cities</a></li>
          <li><a href="service-areas.html#online">Online Consultations</a></li>
        </ul>
      </div>
      <div>
        <span class="foot-head">Resources</span>
        <ul class="foot-links">
          <li><a href="services.html">Conditions We Treat</a></li>
          <li><a href="faqs.html">FAQs</a></li>
          <li><a href="reviews.html">Reviews</a></li>
          <li><a href="${BOOK}">Request an Appointment</a></li>
        </ul>
      </div>
      <div>
        <span class="foot-head">Company</span>
        <ul class="foot-links">
          <li><a href="about.html">About Us</a></li>
          <li><a href="about.html#doctors">Our Doctor</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
<div class="copyrightDiv">
  <div class="wrap copyright">
    <span>© 2026 Usama Homeo Clinic. All rights reserved.</span>
    <span>This site gives general information and does not replace advice from your doctor. In an emergency, contact your nearest emergency service.</span>
  </div>
</div>

<!-- Floating booking button and popup -->
<button class="fab-book" id="fab-book" type="button" aria-haspopup="dialog" aria-controls="bk-modal">${svg("chat")}<span>Book an Appointment</span></button>
<div class="bk-modal" id="bk-modal" role="dialog" aria-modal="true" aria-labelledby="bk-title" hidden>
  <div class="bk-card">
    <div class="bk-head">
      <span class="bk-head-ico">${svg("calendar")}</span>
      <h2 id="bk-title">Book an Appointment</h2>
      <button class="bk-close" id="bk-close" type="button" aria-label="Close">&times;</button>
    </div>

    <div class="bk-step bk-detail">
      <img class="bk-photo" src="assets/images/doctor-wahid.jpg" alt="Dr. Wahid-ur-Rehman" width="84" height="84" loading="lazy">
      <h3>Dr. Wahid-ur-Rehman, BHMS</h3>
      <p class="bk-desc">Book an <strong>online video consultation</strong> from anywhere in Pakistan or overseas, or a <strong>clinic appointment</strong> at our Rawalpindi clinic. The first visit takes about 20 to 25 minutes. Consultations in Urdu, English, Punjabi and Pashto.<br><strong>Clinic Hours:</strong><br>Monday to Sunday<br>Morning: 10 AM to 1 PM<br>Evening (winter): 4 PM to 9 PM<br>Evening (summer): 6 PM to 10 PM<br>Friday: Closed<br><strong>Consultation fee: Rs. 1,000.</strong></p>
      <button class="bk-wa" id="bk-wa" type="button">${svg("chat")}<span>Book Now on WhatsApp</span></button>
    </div>
  </div>
</div>

<script src="assets/js/main.js"></script>
</body>
</html>
`;

const lb = (long, short) => `<span class="lb-l">${long}</span><span class="lb-s">${short}</span>`;
const crumbs = (name) => `<p class="crumbs"><a href="index.html">Home</a> &nbsp;/&nbsp; ${name}</p>`;
const pageHero = (name, h1, p) => `
  <section class="page-hero">
    ${leaf("l1")}${leaf("l2")}
    <div class="wrap">
      ${crumbs(name)}
      <h1>${h1}</h1>
      <p>${p}</p>
    </div>
  </section>`;

const cta = (title = "Ready to Feel Better? Let Natural Healing Begin.") => `
  <section class="cta">
    ${leaf("l1")}
    <div class="wrap">
      <h2>${title}</h2>
      <div class="cta-features">
        <p>${svg("shield")}Registered Homeopathic Physician</p>
        <p>${svg("clock")}Unhurried First Consultation</p>
        <p>${svg("video")}In-Clinic &amp; Online Visits</p>
        <p>${svg("family")}Care for Children and Adults</p>
      </div>
      <div class="btn-row pair center">
        <a class="btn btn--gold" href="${BOOK}">${lb("Request an Appointment", "Book Appointment")}</a>
        <a class="btn btn--light" href="${WA}" rel="noopener">${lb("WhatsApp Us", "WhatsApp")}</a>
      </div>
    </div>
  </section>`;

const faqItems = (items) => items.map(([q, a]) => `        <details open>
          <summary>${q}</summary>
          <p>${a}</p>
        </details>`).join("\n");

const reviewCard = (r) => `
        <article class="review-card">
          ${svg("quote", "quote-ico")}
          <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
          <h3>${r.t}</h3>
          <blockquote>“${r.q}”</blockquote>
          <div class="author">
            <img src="assets/images/${r.img}.svg" alt="" width="52" height="52" loading="lazy">
            <div><div class="name">${r.name}</div><div class="loc">${r.city}</div></div>
          </div>
        </article>`;

const slug = (t) => t.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const serviceCard = (s, full = false) => `
        <article class="card"${full ? ` id="${slug(s.t)}"` : ""}>
          <div class="ico">${svg(s.icon)}</div>
          <h3>${s.t}</h3>
          <p>${s.d}</p>${full ? `
          <ul>${s.b.map((x) => `<li>${x}</li>`).join("")}</ul>` : ""}
          <a class="more" href="${full ? BOOK + "?condition=" + encodeURIComponent(s.t) : "services.html#" + slug(s.t)}">${full ? "Book for " + s.t : "Learn more"} &rarr;</a>
        </article>`;

const areaBlock = (a) => `
        <article class="area" id="${a.id}">
          <h3><a href="service-areas.html#${a.id}">${a.t}</a></h3>
          <span class="region">${a.r}</span>
          <ul>${a.l.map((x) => `<li>${x}</li>`).join("")}</ul>
        </article>`;

const SITE = "https://usama-homeoclinic.pages.dev";
const write = (file, html) => {
  const urlPath = file === "index.html" ? "/" : "/" + file.replace(/.html$/, "");
  html = html.replace('<meta property="og:type" content="website">',
    `<link rel="canonical" href="${SITE}${urlPath}">
<meta property="og:url" content="${SITE}${urlPath}">
<meta property="og:site_name" content="Usama Homeo Clinic">
<meta property="og:type" content="website">`);
  const ogImg = `${SITE}/assets/images/og-${file.replace(/.html$/, "")}.jpg`;
  html = html.replace('<meta property="og:image" content="assets/images/remedies-bottles.jpg">',
    `<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Usama Homeo Clinic, Rawalpindi: homeopathic care">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${ogImg}">`);
  html = html.replace(/href="(index|about|services|service-areas|faqs|reviews|contact|request-an-appointment).html(\?[^"#]*)?(#[^"]*)?"/g, (m, p, q, h) => 'href="' + (p === "index" ? "/" : "/" + p) + (q || "") + (h || "") + '"');
  html = html.replace(/<img [^>]*src="(assets[/]images[/][a-z0-9-]+)[.]jpg"[^>]*>/g, (m, p) => '<picture><source srcset="' + p + '.avif" type="image/avif">' + m + '</picture>');
  fs.writeFileSync(OUT + file, html); console.log("wrote", file, html.length);
};

/* ======================= HOME ======================= */
write("index.html", headHtml({
  title: "Homeopathic Doctor Rawalpindi & Online | Usama Homeo Clinic",
  desc: "Homeopathic doctor in Rawalpindi with online video consultation across Pakistan. 20 to 25 minute first visit with Dr. Wahid-ur-Rehman, BHMS. Fee Rs. 1,000.",
  extra: `
<script type="application/ld+json">{"@context":"https://schema.org","@type":["MedicalBusiness","LocalBusiness"],"name":"Usama Homeo Clinic","description":"Homeopathic clinic in Rawalpindi with in-clinic and online consultations across Pakistan.","url":"https://usama-homeoclinic.pages.dev/","telephone":"+923009813872","medicalSpecialty":"Homeopathy","image":"https://usama-homeoclinic.pages.dev/assets/images/remedies-bottles.jpg","address":{"@type":"PostalAddress","streetAddress":"Mohra Chaper Stop, Chakri Road","addressLocality":"Rawalpindi","addressRegion":"Punjab","addressCountry":"PK"},"areaServed":["Rawalpindi","Islamabad","Pakistan"],"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","name":"Morning: 10 AM to 1 PM","dayOfWeek":["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"],"opens":"10:00","closes":"13:00"},{"@type":"OpeningHoursSpecification","name":"Evening (winter): 4 PM to 9 PM","dayOfWeek":["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"],"opens":"16:00","closes":"21:00"},{"@type":"OpeningHoursSpecification","name":"Evening (summer): 6 PM to 10 PM","dayOfWeek":["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"],"opens":"18:00","closes":"22:00"}]}</script>`,
}) + header("index.html") + `
<main id="top">

  <!-- BANNER -->
  <section class="banner">
    ${leaf("l1")}${leaf("l2")}
    <div class="wrap banner-grid">
      <div>
        <span class="eyebrow">Homeopathic clinic in Rawalpindi</span>
        <h1>Homeopathic Doctor in Rawalpindi, With <em>Online Consultation</em> Across Pakistan</h1>
        <p class="lead">Whether you are dealing with a long-standing skin problem, allergies, sugar, blood pressure, asthma, joint pain, piles, kidney stone complaints, digestive trouble or stress, our registered homeopathic physician takes the time to listen. Visit our Rawalpindi clinic or consult online from anywhere in Pakistan.</p>
        <div class="btn-row pair">
          <a class="btn btn--gold" href="${BOOK}">${lb("Request an Appointment", "Book Appointment")}</a>
          <a class="btn btn--outline" href="${WA}" rel="noopener">${lb("WhatsApp Us", "WhatsApp")}</a>
        </div>
      </div>
      <div class="banner-photo">
        <div class="collage">
          <div class="c-main"><img src="assets/images/remedies-bottles.jpg" alt="Homeopathic remedy bottles with small white pillules and wildflowers on a wooden table" width="1200" height="800" fetchpriority="high"></div>
          <div class="c-top"><img src="assets/images/thermometer.jpg" alt="Digital thermometer on a grey background" width="700" height="700"></div>
          <div class="c-bottom"><img src="assets/images/stethoscope.jpg" alt="Stethoscope on a light blue background" width="700" height="700"></div>
        </div>
        <div class="badge b1">${svg("shield")}<span>Registered physician<small>Qualified homeopath</small></span></div>
        <div class="badge b2">${svg("video")}<span>Online visits<small>Across Pakistan</small></span></div>
      </div>
    </div>
  </section>

  <!-- TRUST -->
  <section class="trust">
    <div class="wrap">
      <div class="trust-card">
        <div class="trust-count">
          <div class="num"><span class="count" data-target="3000">3,000</span>+</div>
        </div>
        <p class="trust-text">Patients welcomed in clinic and online, from Rawalpindi and Islamabad to cities across Pakistan.</p>
        <div class="avatars" aria-hidden="true">
          <img src="assets/images/avatar-1.svg" alt="" width="48" height="48">
          <img src="assets/images/avatar-2.svg" alt="" width="48" height="48">
          <img src="assets/images/avatar-4.svg" alt="" width="48" height="48">
          <img src="assets/images/avatar-5.svg" alt="" width="48" height="48">
          <img src="assets/images/avatar-6.svg" alt="" width="48" height="48">
          <img src="assets/images/avatar-3.svg" alt="" width="48" height="48">
          <span>+2,900</span>
        </div>
      </div>
      <div class="trust-body">
        <h2>Natural Care, Tailored to You, Because Your Health Matters</h2>
        <div class="benefits">
          <p>${svg("check")}One doctor, a dedicated 20 to 25 minute first visit.</p>
          <p>${svg("check")}Visit the clinic or consult online.</p>
          <p>${svg("check")}Care for children and adults.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- WHAT WE TREAT -->
  <section class="section section--soft">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Conditions</span>
        <h2>What We Treat</h2>
        <p>From sugar, blood pressure, asthma and joint pain to kidney stones, piles, skin problems and general weakness, our doctor looks at the whole person so you can feel stronger and more comfortable in daily life. Homeopathy is a complementary approach and does not replace emergency or specialist care.</p>
      </div>
      <div class="cards">${SERVICES.map((s) => serviceCard(s)).join("")}
      </div>
      <div class="btn-row center mt"><a class="btn" href="services.html">Explore All Services</a></div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">How it works</span>
        <h2>Start Homeopathic Care in 3 Easy Steps</h2>
        <p>Whether you prefer to visit us or consult from home, getting started is simple.</p>
      </div>
      <div class="steps">
        <div class="track">
          <span class="track-title">If You’re Visiting the Clinic</span>
          <ol>
            <li><a href="${WA}" data-wa-popup>Request an appointment</a> today.<span>Choose a day and time that suits you.</span></li>
            <li>We confirm your time.<span>You will hear from us by WhatsApp or phone.</span></li>
            <li>Visit for your first consultation.<span>Expect about 20 to 25 minutes with your doctor.</span></li>
          </ol>
        </div>
        <div class="track">
          <span class="track-title">If You Prefer an Online Consultation</span>
          <ol>
            <li><a href="${WA}" data-wa-popup>Request an appointment</a> for an online video consultation.<span>Anywhere in Pakistan or overseas.</span></li>
            <li>We send you a video link.<span>Once your time is confirmed.</span></li>
            <li>Speak with your doctor from home.<span>Remedies can be arranged by courier where possible.</span></li>
          </ol>
        </div>
      </div>
      <p class="steps-foot">Still not sure? <a href="${WA}" rel="noopener">Message us on WhatsApp</a> and we’ll walk you through everything.</p>
    </div>
  </section>

  <!-- AREAS -->
  <section class="section section--mint">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Where we work</span>
        <h2>Based in Rawalpindi, Serving Everyone</h2>
        <p>Visit us in person, or consult online from any city in Pakistan or from abroad. Every patient is welcome.</p>
      </div>
      <div class="areas">${AREAS.map(areaBlock).join("")}
      </div>
      <p class="note-line">Wherever you live, you are welcome. Online consultations are available across Pakistan and worldwide.</p>
      <div class="btn-row center"><a class="btn" href="service-areas.html">Explore All Service Areas</a></div>
    </div>
  </section>

  <!-- REVIEWS -->
  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Testimonials</span>
        <h2>What Our Patients Say</h2>
      </div>
      <div class="reviews-grid three">${REVIEWS.slice(0, 3).map(reviewCard).join("")}
      </div>
      <div class="btn-row center mt"><a class="btn" href="reviews.html">Read More Testimonials</a></div>
    </div>
  </section>

  <!-- DETAIL -->
  <section class="section section--soft">
    <div class="wrap detail">
      <div>
        <h2>Homeopathic Care in Rawalpindi That Fits Your Life</h2>
        <p>Many people arrive after years of short appointments. Here, the first visit gives you 20 to 25 minutes of your doctor’s full attention, so he can understand the whole picture before suggesting anything. Follow-up visits are shorter and focus on how you are responding.</p>
        <p>Our doctor takes a clear history, explains each remedy, and tells you honestly when something needs a specialist or emergency care instead. You can visit our Rawalpindi clinic, or speak to us by video from the comfort of your home.</p>

        <h2>What Happens in Your First Homeopathic Consultation</h2>
        <p>Your first visit sets the stage. We take the time to understand your situation so that every part of your care is meaningful.</p>
        <ul>
          <li><strong>A detailed conversation.</strong> We ask about your main complaint and also your sleep, appetite, energy, emotions, routine and past illnesses.</li>
          <li><strong>A remedy chosen for you.</strong> Two people with the same complaint can leave with different remedies, because we treat the person and not just the label.</li>
          <li><strong>Clear guidance.</strong> You learn how to take your remedy, what to watch for, and which habits may help.</li>
          <li><strong>Follow-up and review.</strong> We track your progress, adjust the plan when needed and tell you when to seek other care.</li>
        </ul>

        <h2>Why Patients Choose Usama Homeo Clinic</h2>
        <ul>
          <li><strong>Focused visits.</strong> 20 to 25 minutes of undivided attention for new patients, with a doctor who listens.</li>
          <li><strong>A qualified practitioner.</strong> A registered homeopathic physician who keeps learning and reviewing his cases.</li>
          <li><strong>Care for the whole family.</strong> From a child’s recurring cold to an adult’s long-standing complaint.</li>
          <li><strong>Flexible visits.</strong> Come to our Rawalpindi clinic or consult by video, wherever you are in Pakistan.</li>
          <li><strong>Honest advice.</strong> We refer you for tests or specialist care whenever that is the right step.</li>
        </ul>

        <h2>Our Commitment to You</h2>
        <p>We combine training with compassion, so you feel supported at every stage. Our aim is simple: to help you feel better, understand your health, and make confident choices about your care.</p>
      </div>
      <div class="side-stack">
        <figure class="photo wide"><img src="assets/images/remedies-shelf.jpg" alt="Tray of small labelled homeopathic remedy vials filled with white pillules" width="1200" height="800" loading="lazy"></figure>
        <figure class="photo tall"><img src="assets/images/remedies-bottles.jpg" alt="Homeopathic remedy bottles and small white pillules on a wooden table" width="1200" height="800" loading="lazy"></figure>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Questions</span>
        <h2>Frequently Asked Questions</h2>
      </div>
      <div class="faq">
${faqItems(HOME_FAQ)}
        <p class="faq-foot">Have another question? <a href="${BOOK}#callback">Request a call back</a> and a team member will reach out.</p>
        <div class="btn-row center"><a class="btn btn--outline" href="faqs.html">View All FAQs</a></div>
      </div>
    </div>
  </section>
${cta()}
</main>
` + footer());

/* ======================= ABOUT ======================= */
write("about.html", headHtml({
  title: "Dr. Wahid-ur-Rehman, BHMS | Usama Homeo Clinic Rawalpindi",
  desc: "Meet Dr. Wahid-ur-Rehman, BHMS, homeopathic physician at Usama Homeo Clinic, Rawalpindi, with 10+ years of practice. Clinic and online consultations.",
  extra: `
<script type="application/ld+json">{"@context":"https://schema.org","@type":["Physician","Person"],"name":"Dr. Wahid-ur-Rehman","honorificPrefix":"Dr.","knowsLanguage":["Urdu","English","Punjabi","Pashto"],"image":"https://usama-homeoclinic.pages.dev/assets/images/doctor-wahid.jpg","jobTitle":"Homeopathic Physician","description":"Homeopathic physician (BHMS) with over ten years of practice in Rawalpindi, seeing adults and children in clinic and online.","hasCredential":{"@type":"EducationalOccupationalCredential","credentialCategory":"degree","name":"BHMS"},"medicalSpecialty":"Homeopathy","worksFor":{"@type":"MedicalBusiness","name":"Usama Homeo Clinic","url":"https://usama-homeoclinic.pages.dev/"},"workLocation":{"@type":"Place","address":{"@type":"PostalAddress","streetAddress":"Mohra Chaper Stop, Chakri Road","addressLocality":"Rawalpindi","addressCountry":"PK"}},"url":"https://usama-homeoclinic.pages.dev/about"}</script>`,
}) + header("about.html") + `
<main id="top">
${pageHero("About Us", "Dr. Wahid-ur-Rehman, Homeopathic Physician in Rawalpindi", "A homeopathic clinic built around time, listening and honest advice.")}

  <section class="section">
    <div class="wrap split">
      <figure class="photo wide"><img src="assets/images/apothecary.jpg" alt="Glass jars of dried herbs and natural ingredients on an apothecary table" width="1200" height="800" loading="lazy"></figure>
      <div>
        <span class="eyebrow">Our story</span>
        <h2>Homeopathy in Rawalpindi, with time for you</h2>
        <p style="margin-top:1rem">Many people arrive after years of short appointments. Here, the first visit gives you 20 to 25 minutes of your doctor’s full attention, so he can understand the whole picture before suggesting anything. Follow-up visits are shorter and focus on how you are responding.</p>
        <p>Our doctor takes a clear history, explains each remedy, and tells you honestly when something needs a specialist or emergency care instead.</p>
        <ul class="ticks">
          <li>A registered homeopathic physician</li>
          <li>One doctor, a dedicated 20 to 25 minute first visit</li>
          <li>Care for children and adults</li>
        </ul>
        <div class="btn-row pair"><a class="btn btn--gold" href="${BOOK}">${lb("Request an Appointment", "Book Appointment")}</a><a class="btn btn--outline" href="services.html">${lb("Our services", "Services")}</a></div>
      </div>
    </div>
  </section>

  <section class="section section--mint">
    <div class="wrap">
      <div class="section-head"><h2>Why patients choose us</h2></div>
      <div class="values">
        <article class="value">${svg("shield")}<h3>A qualified practitioner</h3><p>Our doctor is a trained and registered homeopathic physician who keeps learning and reviewing his cases.</p></article>
        <article class="value">${svg("leaf")}<h3>A remedy chosen for you</h3><p>Two people with the same complaint can leave with different remedies, because we treat the person, not just the label.</p></article>
        <article class="value">${svg("heart")}<h3>Care for the whole family</h3><p>From a child’s recurring cold to an adult’s long-standing complaint, one clinic can follow your family over time.</p></article>
      </div>
    </div>
  </section>

  <section class="section" id="doctors">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Our doctor</span>
        <h2>Meet Your Doctor</h2>
        <p>A registered homeopathic physician who takes time to listen, explains clearly and follows your progress.</p>
      </div>
      <div class="doctor-grid single">
        <article class="doctor doctor--solo">
          <img src="assets/images/doctor-wahid.jpg" alt="Portrait of Dr. Wahid-ur-Rehman, homeopathic physician at Usama Homeo Clinic" width="160" height="160" loading="lazy">
          <h3>Dr. Wahid-ur-Rehman</h3>
          <p class="cred">BHMS, Homeopathic Physician</p>
          <p class="bio">Dr. Wahid-ur-Rehman is the physician at Usama Homeo Clinic, with over ten years of experience in homeopathic practice in Rawalpindi. He sees adults and children with sugar and blood pressure, asthma, allergies and sinus trouble, skin conditions, digestive problems, kidney stone and bladder complaints, piles, women’s health concerns, sexual and physical weakness, headaches, joint and muscle pain, and stress or sleep difficulties.</p>
          <p class="bio">Every first visit is a focused, unhurried conversation, and he explains each remedy in plain words. He also consults by video with patients across Pakistan and overseas.</p>
          <ul class="ticks">
            <li>Speaks Urdu, English, Punjabi and Pashto</li>
            <li>In-clinic in Rawalpindi and online</li>
            <li>Adults and children</li>
          </ul>
          <a class="btn" href="${BOOK}">Request an Appointment</a>
        </article>
      </div>
    </div>
  </section>

  <section class="stats" aria-label="Clinic in numbers">
    <div class="wrap">
      <ul>
        <li><div class="num"><span class="count" data-target="10">10</span>+</div><div class="label">Years in practice</div></li>
        <li><div class="num"><span class="count" data-target="3000">3,000</span>+</div><div class="label">Patients seen</div></li>
        <li><div class="num"><span class="count" data-target="12000">12,000</span>+</div><div class="label">Consultations completed</div></li>
      </ul>
    </div>
  </section>

  <section class="section section--soft">
    <div class="wrap split flip">
      <figure class="photo wide"><img src="assets/images/droppers-notes.jpg" alt="Remedy dropper bottles beside a clipboard of patient notes" width="1000" height="667" loading="lazy"></figure>
      <div>
        <span class="eyebrow">How we work</span>
        <h2>Listening first, prescribing second</h2>
        <p style="margin-top:1rem">We believe good care starts with a good conversation. Your doctor will ask about your symptoms, sleep, appetite, stress and history, then explain the remedy he has chosen and why.</p>
        <ul class="ticks">
          <li>A clear history before any prescription</li>
          <li>Plain-language explanations for you and your family</li>
          <li>Honest referrals when you need tests or a specialist</li>
        </ul>
        <p class="fine-note" style="font-size:0.9rem;color:var(--muted)">Homeopathy is a complementary approach. It does not replace emergency care or specialist treatment.</p>
      </div>
    </div>
  </section>
${cta()}
</main>
` + footer());

/* ======================= SERVICES ======================= */
write("services.html", headHtml({
  title: "Homeopathic Treatment in Rawalpindi: Conditions We Treat",
  desc: "Homeopathic treatment for sugar, BP, asthma, kidney stones, piles, skin and joint pain in Rawalpindi and online across Pakistan. See conditions and book.",
}) + header("services.html") + `
<main id="top">
${pageHero("Services", "Homeopathic Treatment in Rawalpindi for Common Conditions", "Homeopathic care for adults and children, chosen around the whole person.")}

  <section class="section">
    <div class="wrap split">
      <div>
        <span class="eyebrow">Our approach</span>
        <h2>One person, one plan</h2>
        <p style="margin-top:1rem">From sugar, blood pressure and asthma to kidney stones, piles, skin, joint pain, weakness, stress and sleep, our doctor helps you understand what may be behind your complaint and choose a remedy that fits you. Every visit starts with a focused, unhurried conversation.</p>
        <ul class="ticks">
          <li>First visit of about 20 to 25 minutes</li>
          <li>Remedies explained in plain words</li>
          <li>In-clinic or online consultations</li>
        </ul>
        <p style="font-size:0.92rem;color:var(--muted)">Homeopathy is a complementary approach. It does not replace emergency care or specialist treatment.</p>
      </div>
      <figure class="photo wide"><img src="assets/images/remedies-shelf.jpg" alt="Shelves of small labelled homeopathic remedy vials" width="1200" height="800" loading="lazy"></figure>
    </div>
  </section>

  <section class="section section--soft">
    <div class="wrap">
      <div class="section-head"><h2>Conditions we commonly see</h2><p>Select a condition to book a consultation. If yours is not listed, ask us. We are happy to tell you honestly whether homeopathy may help.</p></div>
      <div class="cards two">${SERVICES.map((s) => serviceCard(s, true)).join("")}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap split flip">
      <figure class="photo wide"><img src="assets/images/mortar.jpg" alt="Hands grinding natural ingredients in a stone mortar and pestle" width="1000" height="667" loading="lazy"></figure>
      <div>
        <span class="eyebrow">What to expect</span>
        <h2>From first visit to follow-up</h2>
        <ul class="ticks" style="margin-top:1.25rem">
          <li>A detailed history covering symptoms, sleep, appetite and emotions</li>
          <li>A remedy chosen for you, with clear instructions</li>
          <li>Follow-up visits to review progress and adjust the plan</li>
          <li>Referral to a specialist whenever that is the right step</li>
        </ul>
        <a class="btn btn--gold" href="${BOOK}">Request an Appointment</a>
      </div>
    </div>
  </section>
${cta()}
</main>
` + footer());

/* ======================= SERVICE AREAS ======================= */
write("service-areas.html", headHtml({
  title: "Homeopathic Clinic Chakri Road Rawalpindi & Online Pakistan",
  desc: "Visit our homeopathic clinic at Mohra Chaper Stop, Chakri Road, Rawalpindi, from Islamabad and nearby cities, or consult online from anywhere in Pakistan.",
}) + header("service-areas.html") + `
<main id="top">
${pageHero("Service Areas", "Homeopathic Clinic on Chakri Road, Rawalpindi, Serving Everyone", "Visit our clinic at Mohra Chaper Stop, Chakri Road, or consult by video from anywhere in Pakistan or abroad. Every patient is welcome.")}

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>Our clinic is on Chakri Road, Rawalpindi. Our care is for everyone.</h2>
        <p>Patients visit us from Rawalpindi, Islamabad and nearby cities, and we consult online with patients in every part of Pakistan and overseas. Distance should never stop you from seeing a doctor.</p>
        <p>The clinic is at <strong>Mohra Chaper Stop, Chakri Road, Rawalpindi</strong>. Please request an appointment before you come so we can confirm a time, or choose an online video consultation if you live far away.</p>
      </div>
      <div class="areas">${AREAS.map(areaBlock).join("")}
      </div>
      <p class="note-line">Wherever you live, you are welcome. Request an appointment and we will find the best way to see you.</p>
      <div class="btn-row center"><a class="btn btn--gold" href="${BOOK}">Request an Appointment</a></div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Visiting the clinic</span>
        <h2>Finding us and what to bring</h2>
        <p>We are at Mohra Chaper Stop on Chakri Road, Rawalpindi. Parking is available along the main road.</p>
      </div>
      <ul class="ticks" style="max-width:640px;margin:0 auto 1.5rem">
        <li><strong>Address:</strong> Mohra Chaper Stop, Chakri Road, Rawalpindi</li>
        <li><strong>Parking:</strong> on the main road outside</li>
        <li><strong>Before you come:</strong> request an appointment so we can confirm a time</li>
        <li><strong>First visit:</strong> about 20 to 25 minutes, consultation fee Rs. 1,000</li>
        <li><strong>Please bring:</strong> previous reports, prescriptions and a list of any medicines you take</li>
      </ul>
      <div class="btn-row center"><a class="btn btn--gold" href="${BOOK}">Request an Appointment</a></div>
    </div>
  </section>

  <section class="section section--mint">
    <div class="wrap split">
      <div>
        <span class="eyebrow">Online consultations</span>
        <h2>Care for everyone, wherever you live</h2>
        <p style="margin-top:1rem">Choose “Online video consultation” when you book. Once your time is confirmed we send you a video link, and your doctor takes the same detailed history as in the clinic. Where possible, remedies can be sent by courier.</p>
        <ul class="ticks">
          <li>Open to patients in every city and village of Pakistan</li>
          <li>Welcoming overseas Pakistanis and patients in any time zone</li>
          <li>Consultations in Urdu, English, Punjabi and Pashto</li>
          <li>Follow-up visits by video or phone</li>
        </ul>
        <a class="btn" href="${BOOK}">Book an online consultation</a>
      </div>
      <figure class="photo wide"><img src="assets/images/droppers.jpg" alt="Amber dropper bottle and remedy vials with white flowers on a wooden table" width="1000" height="667" loading="lazy"></figure>
    </div>
  </section>
${cta()}
</main>
` + footer());

/* ======================= FAQS ======================= */
const ld = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: Object.values(FAQ).flat().map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/ \[Edit[^\]]*\]/, "").replace(/<[^>]+>/g, "") } })),
};
write("faqs.html", headHtml({
  title: "Homeopathy FAQs: First Visit, Fees and Online Consultation",
  desc: "Answers about homeopathic consultations in Rawalpindi: how long the first visit takes, fees, payment, online video visits and courier delivery of remedies.",
  extra: `\n<script type="application/ld+json">${JSON.stringify(ld)}</script>`,
}) + header("faqs.html") + `
<main id="top">
${pageHero("FAQs", "Homeopathy FAQs: First Visit, Fees and Online Consultation", "Quick answers about homeopathy, your first visit and booking.")}

  <section class="section">
    <div class="wrap">
      <div class="faq">
${Object.entries(FAQ).map(([g, items]) => `        <h2 class="faq-group">${g}</h2>\n${faqItems(items)}`).join("\n")}
        <p class="faq-foot">Have another question? <a href="${BOOK}#callback">Request a call back</a> and a team member will reach out.</p>
      </div>
    </div>
  </section>
${cta("Still Have Questions? Let’s Talk.")}
</main>
` + footer());

/* ======================= REVIEWS ======================= */
write("reviews.html", headHtml({
  title: "Patient Reviews of Dr. Wahid-ur-Rehman | Usama Homeo Clinic",
  desc: "Read what patients say about their visits to Dr. Wahid-ur-Rehman at Usama Homeo Clinic, Rawalpindi, and online.",
}) + header("reviews.html") + `
<main id="top">
${pageHero("Reviews", "Patient Reviews of Usama Homeo Clinic, Rawalpindi", "Real conversations, honest care and time to be heard.")}

  <section class="section">
    <div class="wrap">
      <div class="rating-box">
        <div><div class="big"><span class="count" data-target="3000">3,000</span>+</div></div>
        <p style="margin:0;color:var(--muted)">Patients welcomed in clinic and online, in Rawalpindi, Islamabad and cities across Pakistan.</p>
      </div>
      <div class="reviews-grid three">${REVIEWS.map(reviewCard).join("")}
      </div>
    </div>
  </section>
${cta("Ready to Feel Better? Book Your Consultation.")}
</main>
` + footer());

/* ======================= CONTACT ======================= */
write("contact.html", headHtml({
  title: "Contact Usama Homeo Clinic | Chakri Road, Rawalpindi",
  desc: "Call or WhatsApp 0300-9813872 to book at Usama Homeo Clinic, Mohra Chaper Stop, Chakri Road, Rawalpindi. Clinic hours, map and online visits.",
}) + header("contact.html") + `
<main id="top">
${pageHero("Contact", "Contact Usama Homeo Clinic, Chakri Road, Rawalpindi", "Message us on WhatsApp or book online. We reply during clinic hours.")}

  <section class="section">
    <div class="wrap">
      <div class="contact-grid">
        <article class="contact-card"><div class="ico">${svg("chat")}</div><h3>Call or WhatsApp</h3><p><a href="tel:${TEL}">${PHONE}</a><br><a href="${WA}" rel="noopener">Message us on WhatsApp</a></p></article>
        <article class="contact-card"><div class="ico">${svg("video")}</div><h3>Online Consultations</h3><p>By video, anywhere in Pakistan and overseas</p></article>
        <article class="contact-card"><div class="ico">${svg("pin")}</div><h3>Visit</h3><p>Usama Homeo Clinic<br>Mohra Chaper Stop, Chakri Road, Rawalpindi<br><a href="https://www.google.com/maps/search/?api=1&query=Mohra+Chaper+Stop+Chakri+Road+Rawalpindi" rel="noopener">Open in Google Maps</a></p></article>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="wrap">
      <div class="section-head"><h2>Clinic Hours</h2></div>
      <table class="hours">
        <tbody>
          <tr><th scope="row">Monday to Sunday, morning</th><td>10 AM to 1 PM</td></tr>
          <tr><th scope="row">Monday to Sunday, evening (winter)</th><td>4 PM to 9 PM</td></tr>
          <tr><th scope="row">Monday to Sunday, evening (summer)</th><td>6 PM to 10 PM</td></tr>
          <tr><th scope="row">Friday</th><td>Closed</td></tr>
        </tbody>
      </table>
      <div class="btn-row pair center mt"><a class="btn btn--gold" href="${BOOK}">${lb("Request an Appointment", "Book Appointment")}</a><a class="btn btn--outline" href="${BOOK}#callback">${lb("Request a Call Back", "Call Back")}</a></div>
    </div>
  </section>
${cta("Take the First Step Toward Feeling Better.")}
</main>
` + footer());

/* ======================= REQUEST AN APPOINTMENT ======================= */
const FLAG = `<svg class="flag" viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" rx="2" fill="#01411c"/><rect width="6" height="16" rx="2" fill="#fff"/><rect x="4" width="2" height="16" fill="#fff"/><circle cx="15" cy="8" r="3.6" fill="#fff"/><circle cx="16.3" cy="7.3" r="3.2" fill="#01411c"/><path d="M18.6 4.6l.5 1.3 1.3.1-1 .9.3 1.3-1.1-.8-1.2.7.4-1.3-1-.9 1.3-.1z" fill="#fff"/></svg>`;
write("request-an-appointment.html", headHtml({
  title: "Request an Appointment | Usama Homeo Clinic",
  desc: "Book a homeopathic consultation in Rawalpindi or online, or request a call back. Choose a day and time and we will confirm by message.",
}) + header("") + `
<main id="top">

  <section class="req-hero">
    ${leaf("l1")}${leaf("l2")}
    <div class="wrap">
      <span class="eyebrow">Request an appointment</span>
      <h1>Request a Homeopathic Appointment in Rawalpindi or Online</h1>
      <p>Fill out this short form and we’ll confirm your time by WhatsApp or phone, answer your questions and match you with the right doctor.</p>
    </div>
  </section>

  <section class="req-body">
    <div class="wrap">

      <div class="form-card form-card--lg" id="book">
        <div class="tabs" role="tablist" aria-label="Request type">
          <button class="tab" role="tab" id="tab-book" aria-selected="true" type="button" data-mode="book">${svg("calendar")}Book appointment</button>
          <button class="tab" role="tab" id="tab-callback" aria-selected="false" type="button" data-mode="callback">${svg("phone")}Request a call back</button>
        </div>

        <form id="lead-form" novalidate aria-labelledby="form-title">
          <div class="form-head">
            <h2 id="form-title">Book your appointment</h2>
            <p class="sub-note" id="form-note">Choose a day and time. We’ll confirm by message.</p>
          </div>

          <div class="two">
            <div class="field">
              <label for="name">Full name<span class="req" aria-hidden="true">*</span></label>
              <div class="control">${svg("person", "lead")}<input type="text" id="name" placeholder="e.g. Ayesha Khan" autocomplete="name" aria-describedby="name-err"></div>
              <div class="error" id="name-err" role="alert"></div>
            </div>
            <div class="field">
              <label for="phone">Phone / WhatsApp<span class="req" aria-hidden="true">*</span></label>
              <div class="control control--phone"><span class="prefix">${FLAG}+92</span><input type="tel" id="phone" placeholder="03XX XXXXXXX" autocomplete="tel" inputmode="tel" aria-describedby="phone-err"></div>
              <div class="error" id="phone-err" role="alert"></div>
            </div>
          </div>

          <div class="field">
            <label for="visit">Type of visit</label>
            <div class="control">${svg("steth", "lead")}
              <select id="visit">
                <option value="First consultation" data-hint="About 20 to 25 minutes with your doctor">First consultation</option>
                <option value="Follow-up" data-hint="A shorter visit to review progress">Follow-up</option>
                <option value="Online video consultation" data-hint="Speak with your doctor from anywhere">Online video consultation</option>
              </select>
            </div>
          </div>

          <div id="when-fields">
            <div class="two">
              <div class="field">
                <label for="date">Preferred date<span class="req" aria-hidden="true">*</span></label>
                <div class="control">${svg("calendar", "lead")}<input type="date" id="date" aria-describedby="date-err"></div>
                <div class="error" id="date-err" role="alert"></div>
              </div>
              <div class="field">
                <label for="time">Preferred time<span class="req" aria-hidden="true">*</span></label>
                <div class="control">${svg("clock", "lead")}
                  <select id="time" aria-describedby="time-err" disabled>
                    <option value="">Select a date first</option>
                  </select>
                </div>
                <div class="error" id="time-err" role="alert"></div>
              </div>
            </div>
          </div>

          <div class="field">
            <label for="message">Message <span class="opt">(optional)</span></label>
            <div class="control control--area">${svg("chat", "lead")}<textarea id="message" placeholder="A few words about what brings you in."></textarea></div>
          </div>

          <label class="check">
            <input type="checkbox" id="for-other">
            <span class="box">${svg("check2")}</span>
            <span>This appointment is for a child or a family member.</span>
          </label>

          <button class="btn btn--gold submit" type="submit" id="submit-btn"><span class="label">Request appointment</span>${svg("arrow")}<span class="spin" aria-hidden="true"></span></button>
          <p class="send-error" id="form-error" role="alert" hidden>Sorry, we couldn’t send your request just now. Please check your connection and try again, or message us on WhatsApp.</p>
          <p class="secure">${svg("lock")}<span>Your information is confidential. We’ll only use it to confirm your appointment. Please don’t share detailed medical history here. The doctor will ask at your visit.</span></p>
        </form>

        <div id="confirm" hidden tabindex="-1">
          <div class="ok-ico">${svg("check2")}</div>
          <h2>Please review your request</h2>
          <p class="sub-note">Check your details, then press Submit to send them to the clinic. We will confirm your appointment by call or message.</p>
          <ul class="summary" id="summary"></ul>
          <p class="send-error" id="send-error" role="alert" hidden>Sorry, we couldn’t send your request just now. Please check your connection and press Submit again, or message us on WhatsApp.</p>
          <div class="confirm-actions">
            <button class="btn submit" type="button" id="submit-final"><span class="label">Submit</span>${svg("arrow")}<span class="spin" aria-hidden="true"></span></button>
            <button class="btn btn--outline" type="button" id="edit-btn">Change details</button>
          </div>
        </div>

        <div id="success" hidden tabindex="-1">
          <div class="ok-ico big">${svg("check2")}</div>
          <h2 id="success-title">Thank you!</h2>
          <p class="sub-note">Your request has been received. Our team will confirm your appointment by phone or WhatsApp shortly.</p>
          <p class="success-count" id="success-count" aria-live="polite"></p>
        </div>
      </div>

      <div class="req-info">
        <div class="side-card">
          <h3>What to expect</h3>
          <ul class="ticks">
            <li>Pick a day and time, or ask for a call back</li>
            <li>We confirm by WhatsApp or phone</li>
            <li>First visit of about 20 to 25 minutes with your doctor</li>
            <li>In-clinic (Rawalpindi) or online consultation</li>
            <li>Consultations in Urdu, English, Punjabi and Pashto</li>
          </ul>
        </div>
        <figure class="photo wide"><img src="assets/images/doctor-tablet.jpg" alt="Doctor reviewing information on a tablet with a patient" width="1200" height="800" loading="lazy"></figure>
        <div class="side-card">
          <h3>Prefer to talk?</h3>
          <ul class="side-contact">
            <li>${svg("chat")}<span><a href="${WA}" rel="noopener">Message on WhatsApp</a></span></li>
            <li>${svg("pin")}<span>Mohra Chaper Stop, Chakri Road, Rawalpindi</span></li>
            <li>${svg("clock")}<span>Monday to Sunday<br>Morning: 10 AM to 1 PM<br>Evening (winter): 4 PM to 9 PM<br>Evening (summer): 6 PM to 10 PM<br>Friday: closed</span></li>
          </ul>
        </div>
      </div>

    </div>
  </section>
</main>
` + footer());
