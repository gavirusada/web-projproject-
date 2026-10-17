document.addEventListener('DOMContentLoaded', () => {
  let currentCurrency = 'LKR';
  let currentCycle = '1';
  let activeName = 'Kasun Perera';
  let activeRole = 'Managing Director';

  // Provisioning Console Elements
  const userField = document.getElementById('userField');
  const domainField = document.getElementById('domainField');
  const tldField = document.getElementById('tldField');
  const checkBtn = document.getElementById('checkBtn');
  const industryChips = document.querySelectorAll('.industry-chip');

  const domainAvailHeading = document.getElementById('domainAvailHeading');
  const beforeAddressText = document.getElementById('beforeAddressText');
  const afterAddressText = document.getElementById('afterAddressText');
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const aliasInfo = document.getElementById('aliasInfo');
  const aliasAccounts = document.getElementById('aliasAccounts');
  const aliasSales = document.getElementById('aliasSales');

  // Live Inbox Preview Elements
  const webmailUrlPreview = document.getElementById('webmailUrlPreview');
  const previewAvatar = document.getElementById('previewAvatar');
  const previewSenderName = document.getElementById('previewSenderName');
  const previewSenderEmail = document.getElementById('previewSenderEmail');
  const previewCcEmail = document.getElementById('previewCcEmail');
  const previewCompanyBody = document.getElementById('previewCompanyBody');
  const sigLine1 = document.getElementById('sigLine1');
  const sigLine2 = document.getElementById('sigLine2');
  const pdfAttachmentName = document.getElementById('pdfAttachmentName');
  const barDomainName = document.getElementById('barDomainName');

  // Drawer Elements
  const drawerEmailText = document.getElementById('drawerEmailText');
  const drawerDomainText = document.getElementById('drawerDomainText');

  function sanitizeUser(val) {
    const cleaned = val.toLowerCase().replace(/[^a-z0-9._-]/g, '').replace(/^\.+|\.+$/g, '');
    return cleaned || 'info';
  }

  function sanitizeDomain(val) {
    const cleaned = val.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '');
    return cleaned || 'yourcompany';
  }

  function formatCompanyName(slug) {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, ch => ch.toUpperCase());
  }

  function getInitials(nameStr) {
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase();
  }

  function syncConsole() {
    const user = sanitizeUser(userField.value);
    const domain = sanitizeDomain(domainField.value);
    const tld = tldField.value;
    const fullDomain = `${domain}${tld}`;
    const fullEmail = `${user}@${fullDomain}`;
    const companyDisplay = formatCompanyName(domain);

    domainAvailHeading.textContent = `${fullDomain} is available for bundling`;
    beforeAddressText.textContent = `${domain}.srilanka@gmail.com`;
    afterAddressText.textContent = fullEmail;

    aliasInfo.textContent = `info@${fullDomain}`;
    aliasAccounts.textContent = `accounts@${fullDomain}`;
    aliasSales.textContent = `sales@${fullDomain}`;

    webmailUrlPreview.textContent = `mail.${fullDomain}`;
    previewAvatar.textContent = getInitials(activeName);
    previewSenderName.textContent = activeName;
    previewSenderEmail.textContent = `<${fullEmail}>`;
    previewCcEmail.textContent = `accounts@${fullDomain}`;
    previewCompanyBody.textContent = companyDisplay;
    sigLine1.textContent = `${activeName} — ${activeRole}`;
    sigLine2.textContent = `${fullEmail} | www.${fullDomain}`;
    pdfAttachmentName.textContent = `📎 Quotation_${companyDisplay.replace(/\s+/g, '')}.pdf`;
    barDomainName.textContent = fullDomain;

    if (drawerEmailText && drawerDomainText) {
      drawerEmailText.textContent = fullEmail;
      drawerDomainText.textContent = fullDomain;
    }
  }

  userField.addEventListener('input', () => {
    industryChips.forEach(c => c.classList.remove('active'));
    const u = sanitizeUser(userField.value);
    activeName = u.charAt(0).toUpperCase() + u.slice(1);
    syncConsole();
  });

  domainField.addEventListener('input', () => {
    industryChips.forEach(c => c.classList.remove('active'));
    syncConsole();
  });

  tldField.addEventListener('change', syncConsole);

  industryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      industryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      userField.value = chip.dataset.user;
      domainField.value = chip.dataset.domain;
      tldField.value = chip.dataset.tld;
      activeName = chip.dataset.name;
      activeRole = chip.dataset.role;
      syncConsole();
    });
  });

  checkBtn.addEventListener('click', () => {
    checkBtn.textContent = 'Checking Registry...';
    setTimeout(() => {
      checkBtn.textContent = '✓ Available';
      syncConsole();
      setTimeout(() => {
        checkBtn.textContent = 'Check Availability';
      }, 1400);
    }, 250);
  });

  copyAddressBtn.addEventListener('click', () => {
    navigator.clipboard?.writeText(afterAddressText.textContent);
    const orig = copyAddressBtn.textContent;
    copyAddressBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyAddressBtn.textContent = orig;
    }, 1400);
  });

  // Cost & Feature Comparison Matrix Calculator
  const teamSizeSlider = document.getElementById('teamSizeSlider');
  const teamSizeBadge = document.getElementById('teamSizeBadge');
  const annualSavingsValue = document.getElementById('annualSavingsValue');
  const recommendedTierBadge = document.getElementById('recommendedTierBadge');
  const promailTotalYr = document.getElementById('promailTotalYr');
  const promailPerUserMonth = document.getElementById('promailPerUserMonth');
  const googleTotalYr = document.getElementById('googleTotalYr');
  const googlePerUserMonth = document.getElementById('googlePerUserMonth');
  const msftTotalYr = document.getElementById('msftTotalYr');
  const msftPerUserMonth = document.getElementById('msftPerUserMonth');

  function updateComparisonMatrix() {
    const count = parseInt(teamSizeSlider.value, 10);
    teamSizeBadge.textContent = `${count} ${count === 1 ? 'Mailbox' : 'Mailboxes'}`;

    let promailLkr = 14900;
    let promailUsd = 49;
    let tierLabel = 'Recommended • Business .LK Bundle';

    if (count <= 2) {
      promailLkr = 6900;
      promailUsd = 23;
      tierLabel = 'Recommended • Starter .LK Bundle';
    } else if (count > 10) {
      promailLkr = 29900;
      promailUsd = 99;
      tierLabel = 'Recommended • Enterprise .LK Bundle';
    }

    recommendedTierBadge.textContent = tierLabel;

    const googleLkr = count * 26400 + 5500;
    const googleUsd = Math.round(count * 86.4 + 18);

    const msftLkr = count * 22080 + 5500;
    const msftUsd = Math.round(count * 72 + 18);

    const savedLkr = googleLkr - promailLkr;
    const savedUsd = googleUsd - promailUsd;

    const perUserMoLkr = Math.round(promailLkr / 12 / count);
    const perUserMoUsd = (promailUsd / 12 / count).toFixed(2);

    if (currentCurrency === 'LKR') {
      promailTotalYr.innerHTML = `Rs. ${promailLkr.toLocaleString()} <span style="font-size: 0.85rem; font-weight: 500; color: #94A3B8;">/ year total</span>`;
      promailPerUserMonth.textContent = `Equivalent to Rs. ${perUserMoLkr.toLocaleString()} / month per mailbox (Domain included)`;
      googleTotalYr.innerHTML = `Rs. ${googleLkr.toLocaleString()} <span style="font-size: 0.85rem; font-weight: 500; color: var(--text-500);">/ year total</span>`;
      googlePerUserMonth.textContent = `~Rs. 2,200 / month per single user + Rs. 5,500 .LK domain`;
      msftTotalYr.innerHTML = `Rs. ${msftLkr.toLocaleString()} <span style="font-size: 0.85rem; font-weight: 500; color: var(--text-500);">/ year total</span>`;
      msftPerUserMonth.textContent = `~Rs. 1,840 / month per single user + Rs. 5,500 .LK domain`;
      annualSavingsValue.textContent = `Rs. ${savedLkr.toLocaleString()}/yr`;
    } else {
      promailTotalYr.innerHTML = `$${promailUsd} <span style="font-size: 0.85rem; font-weight: 500; color: #94A3B8;">/ year total</span>`;
      promailPerUserMonth.textContent = `Equivalent to $${perUserMoUsd} / month per mailbox (Domain included)`;
      googleTotalYr.innerHTML = `$${googleUsd.toLocaleString()} <span style="font-size: 0.85rem; font-weight: 500; color: var(--text-500);">/ year total</span>`;
      googlePerUserMonth.textContent = `$7.20 / month per single user + $18 .LK domain`;
      msftTotalYr.innerHTML = `$${msftUsd.toLocaleString()} <span style="font-size: 0.85rem; font-weight: 500; color: var(--text-500);">/ year total</span>`;
      msftPerUserMonth.textContent = `$6.00 / month per single user + $18 .LK domain`;
      annualSavingsValue.textContent = `$${savedUsd.toLocaleString()}/yr`;
    }
  }

  teamSizeSlider.addEventListener('input', updateComparisonMatrix);

  // Currency & Billing Cycle Switchers
  const currOpts = document.querySelectorAll('.curr-opt');
  const cycleTabs = document.querySelectorAll('.cycle-tab');
  const dynamicPlanPrices = document.querySelectorAll('.dynamic-plan-price');
  const heroStartingPrice = document.getElementById('heroStartingPrice');

  function updateAllPrices() {
    const key = `data-${currentCurrency.toLowerCase()}-${currentCycle}`;
    dynamicPlanPrices.forEach(el => {
      const val = el.getAttribute(key);
      if (val) el.textContent = val;
    });

    if (heroStartingPrice) {
      heroStartingPrice.textContent =
        currentCurrency === 'LKR'
          ? heroStartingPrice.getAttribute('data-lkr')
          : heroStartingPrice.getAttribute('data-usd');
    }

    updateComparisonMatrix();
  }

  currOpts.forEach(btn => {
    btn.addEventListener('click', () => {
      currOpts.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCurrency = btn.dataset.currency;
      updateAllPrices();
    });
  });

  cycleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      cycleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCycle = tab.dataset.cycle;
      updateAllPrices();
    });
  });

  // FAQ Accordion
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-btn');
    const body = card.querySelector('.faq-body');

    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      faqCards.forEach(c => {
        c.classList.remove('open');
        c.querySelector('.faq-btn').setAttribute('aria-expanded', 'false');
        c.querySelector('.faq-body').style.maxHeight = null;
      });
      if (!isOpen) {
        card.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Slide-over Order Drawer
  const drawerOverlay = document.getElementById('drawerOverlay');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const openDrawerTriggers = document.querySelectorAll('.open-drawer-trigger');
  const drawerPlanSelect = document.getElementById('drawerPlanSelect');
  const drawerPlanTag = document.getElementById('drawerPlanTag');
  const bundleOrderForm = document.getElementById('bundleOrderForm');
  const drawerSuccessNotice = document.getElementById('drawerSuccessNotice');
  const confirmedBundleEmail = document.getElementById('confirmedBundleEmail');

  function openDrawer(plan) {
    syncConsole();
    if (plan && drawerPlanSelect) {
      drawerPlanSelect.value = plan;
      drawerPlanTag.textContent = plan;
    }
    drawerSuccessNotice.style.display = 'none';
    drawerOverlay.classList.add('open');
    drawerOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    drawerOverlay.classList.remove('open');
    drawerOverlay.setAttribute('aria-hidden', 'true');
  }

  openDrawerTriggers.forEach(btn => {
    btn.addEventListener('click', () => openDrawer(btn.dataset.plan || 'Business .LK'));
  });

  closeDrawerBtn.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', e => {
    if (e.target === drawerOverlay) closeDrawer();
  });

  drawerPlanSelect.addEventListener('change', () => {
    drawerPlanTag.textContent = drawerPlanSelect.value;
  });

  bundleOrderForm.addEventListener('submit', e => {
    e.preventDefault();
    confirmedBundleEmail.textContent = drawerEmailText.textContent;
    drawerSuccessNotice.style.display = 'block';
  });

  // Initialize
  syncConsole();
  updateAllPrices();
});
