/* beHER Awards — interactions */

(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('menuToggle');
  var drawer = document.getElementById('drawer');

  function setMenu(open) {
    if (!toggle || !drawer) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Honoree rail ---------- */
  var rail = document.getElementById('honoreeRail');
  var prev = document.getElementById('railPrev');
  var next = document.getElementById('railNext');
  var counter = document.getElementById('railCount');

  if (rail) {
    var cards = rail.querySelectorAll('.person');
    var total = cards.length;

    var step = function () {
      if (!cards.length) return 300;
      var gap = parseFloat(getComputedStyle(rail).columnGap || '24') || 24;
      return cards[0].getBoundingClientRect().width + gap;
    };

    var update = function () {
      var i = Math.round(rail.scrollLeft / step());
      var maxIndex = Math.max(0, total - Math.floor(rail.clientWidth / step()));
      i = Math.min(Math.max(i, 0), maxIndex);
      if (counter) {
        counter.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
      }
      if (prev) prev.disabled = rail.scrollLeft <= 2;
      if (next) next.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
    };

    if (prev) prev.addEventListener('click', function () { rail.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { rail.scrollBy({ left: step(), behavior: 'smooth' }); });

    var ticking = false;
    rail.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(function () { update(); ticking = false; });
      }
    }, { passive: true });

    rail.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); rail.scrollBy({ left: step(), behavior: 'smooth' }); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); rail.scrollBy({ left: -step(), behavior: 'smooth' }); }
    });

    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById('lightbox');
  var lbImage = document.getElementById('lbImage');
  var lbCaption = document.getElementById('lbCaption');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var group = [];
  var index = 0;
  var lastFocus = null;

  function openLightbox(items, i) {
    if (!lb || !items.length) return;
    group = items;
    index = i;
    lastFocus = document.activeElement;
    render();
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (lbClose) lbClose.focus();
  }

  function render() {
    var el = group[index];
    if (!el || !lbImage) return;
    var full = el.getAttribute('data-full');
    var name = el.getAttribute('data-name') || '';
    lbImage.src = full;
    lbImage.alt = name ? name : 'beHER Awards photograph';
    if (lbCaption) lbCaption.textContent = name;
    lbCaption.style.display = name ? '' : 'none';
    if (lbPrev) lbPrev.style.display = group.length > 1 ? '' : 'none';
    if (lbNext) lbNext.style.display = group.length > 1 ? '' : 'none';
  }

  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function move(dir) {
    if (!group.length) return;
    index = (index + dir + group.length) % group.length;
    render();
  }

  document.querySelectorAll('.person[data-full]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var all = Array.prototype.slice.call(document.querySelectorAll('.person[data-full]'));
      openLightbox(all, all.indexOf(btn));
    });
  });

  document.querySelectorAll('.gallery [data-full]').forEach(function (fig) {
    fig.addEventListener('click', function () {
      var all = Array.prototype.slice.call(document.querySelectorAll('.gallery [data-full]'));
      openLightbox(all, all.indexOf(fig));
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', function () { move(-1); });
  if (lbNext) lbNext.addEventListener('click', function () { move(1); });
  if (lb) {
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (lb && lb.classList.contains('is-open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    } else if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
      setMenu(false);
    }
  });

  /* ---------- Newsletter ---------- */
  var form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('formStatus');
      var first = form.querySelector('#firstName');
      var email = form.querySelector('#email');

      if (!first.value.trim() || !email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        if (status) status.textContent = 'Please add your first name and a valid email address.';
        (first.value.trim() ? email : first).focus();
        return;
      }

      if (status) {
        status.textContent = 'Thank you, ' + first.value.trim() + '. You are on the list — watch your inbox for news from beHER.';
      }
      form.reset();
    });
  }

  /* ---------- Smooth anchor offset for sticky header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2 || id === '#main') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: top, behavior: 'smooth' });
      history.replaceState(null, '', id);
      setMenu(false);
    });
  });
})();
