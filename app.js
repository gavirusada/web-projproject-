document.addEventListener('DOMContentLoaded', () => {
  let currentCurrency = 'LKR';
  let currentYears = '1';
  let activePersonName = 'Kasun Perera';
  let activeRole = 'Managing Director';
  let activeCity = 'Colombo 03';

  // Elements: Live Builder & Business Card
  const userInput = document.getElementById('userInput');
  const domainInput = document.getElementById('domainInput');
  const tldInput = document.getElementById('tldInput');
  const availText = document.getElementById('availText');
  const sampleBtns = document.querySelectorAll('.sample-btn');

  // Business card elements
  const cardMonogram = document.getElementById('cardMonogram');
  const cardCompanyName = document.getElementById('cardCompanyName');
  const cardCity = document.getElementById('cardCity');
  const cardPersonName = document.getElementById('cardPersonName');
  const cardPersonRole = document.getElementById('cardPersonRole');
  const cardEmailText = document.getElementById('cardEmailText');
  const cardWebText = document.getElementById('cardWebText');
  const oldGmailText = document.getElementById('oldGmailText');
  const copyCardEmailBtn = document.getElementById('copyCardEmailBtn');

  // Quotation preview elements
  const quoteInitial = document.getElementById('quoteInitial');
  const quoteSenderName = document.getElementById('quoteSenderName');
  const quoteSenderAddr = document.getElementById('quoteSenderAddr');
  const quoteCcAddr = document.getElementById('quoteCcAddr');
  const quoteBodyCompany = document.getElementById('quoteBodyCompany');
  const quoteBodyAccounts = document.getElementById('quoteBodyAccounts');
  const quotePdfName = document.getElementById('quotePdfName');

  // Order sheet elements
  const sheetEmailPreview = document.getElementById('sheetEmailPreview');
  const sheetDomainPreview = document.getElementById('sheetDomainPreview');

  function cleanUser(str) {
    const s = str.toLowerCase().replace(/[^a-z0-9._-]/g, '').replace(/^\.+|\.+$/g, '');
    return s || 'info';
  }

  function cleanDomain(str) {
    const s = str.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '');
    return s || 'yourbusiness';
  }

  function formatDisplayCompany(slug) {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  function updateAllPreviews() {
    const user = cleanUser(userInput.value);
    const domain = cleanDomain(domainInput.value);
    const tld = tldInput.value;
    const fullDomain = `${domain}${tld}`;
    const fullEmail = `${user}@${fullDomain}`;
    const prettyCompany = formatDisplayCompany(domain);

    // Availability line
    availText.innerHTML = `<strong>${fullDomain}</strong> can be bundled today`;

    // Update Physical Business Card
    cardMonogram.textContent = domain.slice(0, 2).toUpperCase();
    cardCompanyName.textContent = prettyCompany.toUpperCase();
    cardCity.textContent = `${activeCity} • Sri Lanka`;
    cardPersonName.textContent = activePersonName;
    cardPersonRole.textContent = activeRole;
    cardEmailText.textContent = fullEmail;
    cardWebText.textContent = `www.${fullDomain}`;
    oldGmailText.textContent = `${domain}.srilanka2019@gmail.com`;

    // Update Quotation Email Preview
    quoteInitial.textContent = user.charAt(0).toUpperCase();
    quoteSenderName.textContent = activePersonName;
    quoteSenderAddr.textContent = `<${fullEmail}>`;
    quoteCcAddr.textContent = `accounts@${fullDomain}`;
    quoteBodyCompany.textContent = prettyCompany;
    quoteBodyAccounts.textContent = `accounts@${fullDomain}`;
    quotePdfName.textContent = `Quotation_${prettyCompany.replace(/\s+/g, '')}_2026.pdf (420 KB)`;

    // Update Slide-over Order Sheet
    if (sheetEmailPreview && sheetDomainPreview) {
      sheetEmailPreview.textContent = fullEmail;
      sheetDomainPreview.textContent = fullDomain;
    }
  }

  userInput.addEventListener('input', () => {
    sampleBtns.forEach(b => b.classList.remove('active'));
    const typedUser = cleanUser(userInput.value);
    activePersonName = typedUser.charAt(0).toUpperCase() + typedUser.slice(1);
    updateAllPreviews();
  });

  domainInput.addEventListener('input', () => {
    sampleBtns.forEach(b => b.classList.remove('active'));
    updateAllPreviews();
  });

  tldInput.addEventListener('change', updateAllPreviews);

  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sampleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      userInput.value = btn.dataset.user;
      domainInput.value = btn.dataset.domain;
      tldInput.value = btn.dataset.tld;
      activePersonName = btn.dataset.person;
      activeRole = btn.dataset.role;
      activeCity = btn.dataset.city;
      updateAllPreviews();
    });
  });

  copyCardEmailBtn.addEventListener('click', () => {
    navigator.clipboard?.writeText(cardEmailText.textContent);
    const prev = copyCardEmailBtn.textContent;
    copyCardEmailBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyCardEmailBtn.textContent = prev;
    }, 1400);
  });

  // Workbench View Switcher
  const switchPills = document.querySelectorAll('.switch-pill');
  const wbPanes = document.querySelectorAll('.wb-pane');

  switchPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const target = pill.dataset.pane;
      switchPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      wbPanes.forEach(pane => pane.classList.remove('active'));

      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      const el = document.getElementById(target);
      if (el) el.classList.add('active');
    });
  });

  // Honest Cost Calculator
  const teamSlider = document.getElementById('teamSlider');
  const teamCountText = document.getElementById('teamCountText');
  const yearlySavedText = document.getElementById('yearlySavedText');
  const calcOursPrice = document.getElementById('calcOursPrice');
  const calcGooglePrice = document.getElementById('calcGooglePrice');
  const calcMsftPrice = document.getElementById('calcMsftPrice');

  function updateCalculator() {
    const count = parseInt(teamSlider.value, 10);
    teamCountText.textContent = `${count} ${count === 1 ? 'Email Address' : 'Email Addresses'}`;

    let oursLkr = 14900;
    let oursUsd = 49;
    if (count <= 2) {
      oursLkr = 6900;
      oursUsd = 23;
    } else if (count > 10) {
      oursLkr = 29900;
      oursUsd = 99;
    }

    const googleLkr = count * 26400 + 5500;
    const googleUsd = Math.round(count * 86.4 + 18);

    const msftLkr = count * 22080 + 5500;
    const msftUsd = Math.round(count * 72 + 18);

    const savedLkr = googleLkr - oursLkr;
    const savedUsd = googleUsd - oursUsd;

    if (currentCurrency === 'LKR') {
      calcOursPrice.textContent = `Rs. ${oursLkr.toLocaleString()} / yr`;
      calcGooglePrice.textContent = `Rs. ${googleLkr.toLocaleString()} / yr`;
      calcMsftPrice.textContent = `Rs. ${msftLkr.toLocaleString()} / yr`;
      yearlySavedText.textContent = `Rs. ${savedLkr.toLocaleString()}`;
    } else {
      calcOursPrice.textContent = `$${oursUsd} / yr`;
      calcGooglePrice.textContent = `$${googleUsd.toLocaleString()} / yr`;
      calcMsftPrice.textContent = `$${msftUsd.toLocaleString()} / yr`;
      yearlySavedText.textContent = `$${savedUsd.toLocaleString()}`;
    }
  }

  teamSlider.addEventListener('input', updateCalculator);

  // Currency & Billing Cycle Switchers
  const currBtns = document.querySelectorAll('.curr-btn');
  const cycleBtns = document.querySelectorAll('.cycle-btn');
  const priceItems = document.querySelectorAll('.price-item');

  function updateDisplayedPrices() {
    const attr = `data-${currentCurrency.toLowerCase()}-${currentYears}`;
    priceItems.forEach(item => {
      const val = item.getAttribute(attr);
      if (val) item.textContent = val;
    });
    updateCalculator();
  }

  currBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCurrency = btn.dataset.currency;
      updateDisplayedPrices();
    });
  });

  cycleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cycleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentYears = btn.dataset.years;
      updateDisplayedPrices();
    });
  });

  // FAQ Accordion
  const faqRows = document.querySelectorAll('.faq-row');
  faqRows.forEach(row => {
    const trigger = row.querySelector('.faq-trigger');
    const content = row.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isOpen = row.classList.contains('open');
      faqRows.forEach(r => {
        r.classList.remove('open');
        r.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        r.querySelector('.faq-content').style.maxHeight = null;
      });
      if (!isOpen) {
        row.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Reservation Slide-over Sheet
  const orderOverlay = document.getElementById('orderOverlay');
  const closeSheetBtn = document.getElementById('closeSheetBtn');
  const openOrderBtns = document.querySelectorAll('.open-order-btn');
  const sheetPlanSelect = document.getElementById('sheetPlanSelect');
  const reserveForm = document.getElementById('reserveForm');
  const sheetConfirmMsg = document.getElementById('sheetConfirmMsg');
  const confirmedEmailSpan = document.getElementById('confirmedEmailSpan');

  function openSheet(plan) {
    updateAllPreviews();
    if (plan && sheetPlanSelect) {
      sheetPlanSelect.value = plan;
    }
    sheetConfirmMsg.style.display = 'none';
    orderOverlay.classList.add('open');
    orderOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeSheet() {
    orderOverlay.classList.remove('open');
    orderOverlay.setAttribute('aria-hidden', 'true');
  }

  openOrderBtns.forEach(btn => {
    btn.addEventListener('click', () => openSheet(btn.dataset.plan));
  });

  closeSheetBtn.addEventListener('click', closeSheet);
  orderOverlay.addEventListener('click', e => {
    if (e.target === orderOverlay) closeSheet();
  });

  reserveForm.addEventListener('submit', e => {
    e.preventDefault();
    confirmedEmailSpan.textContent = sheetEmailPreview.textContent;
    sheetConfirmMsg.style.display = 'block';
  });

  // Initialize
  updateAllPreviews();
  updateDisplayedPrices();
});
