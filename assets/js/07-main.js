/* ==========================================================================
   RABBIT CODE — 07. COMPORTAMENTO DA PÁGINA
   Carregado DEPOIS do 06-data.js
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FINE = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ======================================================================
     1. PRELOADER
     ====================================================================== */
  function initPreloader() {
    var pre = $(".preloader");
    if (!pre) return;

    var bar = $(".preloader__bar span", pre);
    var num = $("[data-preload-num]", pre);
    var pct = 0;
    var done = false;

    function finish() {
      if (done) return;
      done = true;
      pct = 100;
      if (bar) bar.style.width = "100%";
      if (num) num.textContent = "100";
      setTimeout(function () {
        pre.classList.add("is-done");
        document.body.classList.remove("is-locked");
        document.dispatchEvent(new CustomEvent("rc:loaded"));
      }, 380);
    }

    document.body.classList.add("is-locked");

    var timer = setInterval(function () {
      pct += Math.random() * 16 + 6;
      if (pct >= 100) {
        pct = 100;
        clearInterval(timer);
        finish();
      }
      if (bar) bar.style.width = pct + "%";
      if (num) num.textContent = String(Math.floor(pct));
    }, 110);

    window.addEventListener("load", function () { setTimeout(clearInterval(timer), 1400); });
    setTimeout(function () { clearInterval(timer); finish(); }, 3200);
  }

  /* ======================================================================
     2. NAVEGAÇÃO: sticky, menu mobile, scroll-spy
     ====================================================================== */
  function initNav() {
    var nav = $(".nav");
    var toggle = $(".nav__toggle");
    var menu = $("#menu");

    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("is-open");
        toggle.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("is-locked", open);
      });

      $$("a", menu).forEach(function (a, i) {
        a.style.setProperty("--d", 0.06 + i * 0.055 + "s");
        a.addEventListener("click", function () {
          menu.classList.remove("is-open");
          toggle.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("is-locked");
        });
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menu.classList.contains("is-open")) toggle.click();
      });
    }

    /* Scroll-spy */
    var links = $$('.nav__link[href^="#"]');
    var sections = links
      .map(function (l) { return document.getElementById(l.getAttribute("href").slice(1)); })
      .filter(Boolean);

    function onScroll() {
      if (nav) nav.classList.toggle("is-stuck", window.scrollY > 24);

      var y = window.scrollY + window.innerHeight * 0.32;
      var current = "";
      sections.forEach(function (s) { if (s.offsetTop <= y) current = s.id; });

      links.forEach(function (l) {
        l.classList.toggle("is-active", l.getAttribute("href") === "#" + current);
      });

      /* progresso */
      var bar = $(".progress__bar");
      if (bar) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      }

      /* botões flutuantes */
      $$(".to-top, .float-cta").forEach(function (b) {
        b.classList.toggle("is-show", window.scrollY > window.innerHeight * 0.7);
      });
    }

    var ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { onScroll(); ticking = false; });
      },
      { passive: true }
    );
    onScroll();
  }

  /* ======================================================================
     3. CURSOR CUSTOMIZADO + SPOTLIGHT (só desktop)
     ====================================================================== */
  function initCursor() {
    if (!FINE) return;

    var cur = $(".cursor");
    if (!cur) return;
    cur.style.opacity = "1";

    var x = 0, y = 0, tx = 0, ty = 0;

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      var sp = $(".spotlight");
      if (sp) {
        sp.style.opacity = "1";
        sp.style.transform = "translate3d(" + tx + "px," + ty + "px,0)";
      }
    }, { passive: true });

    (function loop() {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      cur.style.transform = "translate3d(" + (x - 6) + "px," + (y - 6) + "px,0)";
      requestAnimationFrame(loop);
    })();

    var HOVER = "a, button, .filter, .project, .chip, .social, input, .faq__q, [role='button']";
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest(HOVER);
      if (!t) { cur.classList.remove("is-hover"); return; }
      if (t.dataset.cursor) {
        cur.classList.add("is-label");
        $(".cursor__label", cur).textContent = t.dataset.cursor;
      } else {
        cur.classList.add("is-hover");
      }
    });

    document.addEventListener("mouseout", function (e) {
      if (!e.target.closest(HOVER)) return;
      cur.classList.remove("is-hover", "is-label");
    });

    document.addEventListener("mousedown", function () { cur.style.transform += " scale(0.75)"; });
  }

  /* ======================================================================
     4. REVELAÇÃO NO SCROLL
     ====================================================================== */
  function initReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;

    if (REDUCED || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    items.forEach(function (el) {
      var idx = Number(el.dataset.revealIndex || 0);
      if (el.dataset.revealIndex != null || idx) {
        el.style.setProperty("--reveal-delay", Math.min(idx * 0.08, 0.6) + "s");
      }
      io.observe(el);
    });

    /* Rede de segurança: garante que nada fique invisível se o observer
       falhar (navegador antigo, aba em background, scroll suave, etc.). */
    var queued = false;
    function sweep() {
      queued = false;
      var h = window.innerHeight;
      $$("[data-reveal]:not(.is-in)").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < h * 0.92 && r.bottom > 0) el.classList.add("is-in");
      });
    }
    window.addEventListener("scroll", function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sweep);
    }, { passive: true });
    window.addEventListener("resize", sweep, { passive: true });
    setTimeout(sweep, 900);
  }

  /* ======================================================================
     5. CONTADORES ANIMADOS
     ====================================================================== */
  function initCounters() {
    var nums = $$("[data-count]");
    if (!nums.length) return;

    function run(el) {
      var target = parseFloat(el.dataset.count) || 0;
      if (REDUCED) { el.textContent = target + (el.dataset.suffix || ""); return; }

      var dur = 1500;
      var start = performance.now();

      function tick(now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (el.dataset.suffix || "");
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        run(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.4 });

    nums.forEach(function (n) { io.observe(n); });
  }

  /* ======================================================================
     6. MARQUEE (duplica o conteúdo pra loop infinito)
     ====================================================================== */
  function initMarquee() {
    $$(".marquee__track").forEach(function (track) {
      if (track.dataset.cloned) return;
      var html = track.innerHTML;
      for (var i = 0; i < 3; i++) track.insertAdjacentHTML("beforeend", html);
      track.dataset.cloned = "1";
    });
  }

  /* ======================================================================
     7. PROJETOS — render, filtros e brilho
     ====================================================================== */
  var ACCENTS = {
    yellow: "#FFD60A",
    purple: "#A855F7",
    blue: "#3B82F6",
    pink: "#EC4899",
    green: "#22C55E",
    orange: "#FB923C"
  };

  function iconArrow() {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function projectCard(p, i) {
    var accent = ACCENTS[p.accent] || ACCENTS.purple;
    var stack = (p.tags || []).slice(0, 3).map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join("");

    /* Os 2 primeiros cards usam eager: estão acima da dobra na maioria das telas.
       Os demais ficam com lazy para não pesar o carregamento inicial. */
    var load = i < 2 ? "eager" : "lazy";

    var visual = p.cover
      ? '<img src="' + esc(p.cover) + '" alt="Captura de tela do site ' + esc(p.title) +
        '" loading="' + load + '" decoding="async" width="1440" height="900" />' +
        '<span class="project__chrome" aria-hidden="true">' +
          '<i class="project__chrome-dots"><b></b><b></b><b></b></i>' +
          '<i class="project__chrome-url">' + esc((p.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")) + "</i>" +
        "</span>"
      : '<div class="project__art" aria-hidden="true"><span>' + esc(p.title.charAt(0)) + "</span></div>";

    /* O card inteiro é o link. Não existe <a> dentro de <a>: o antigo
       rodapé "abrir site" virou <span>, mantendo o mesmo visual. */
    return (
      '<a class="project' + (p.feature ? " project--feature" : "") + '"' +
      ' href="' + esc(p.url || "#") + '" target="_blank" rel="noopener noreferrer"' +
      ' aria-label="' + esc(p.title) + " — abrir site em nova aba" +
      '" style="--accent:' + accent + '"' +
      ' data-category="' + esc(p.category || "landing") + '" data-cursor="abrir">' +
        '<div class="project__thumb">' +
          visual +
          '<div class="project__stack">' + stack + "</div>" +
          '<span class="project__year">' + esc(p.year || "2026") + "</span>" +
          '<div class="project__veil"><span class="project__open">Visitar site ' + iconArrow() + "</span></div>" +
        "</div>" +
        '<div class="project__body">' +
          '<span class="project__cat">' + esc(p.tagline || (p.category || "")) + "</span>" +
          '<h3 class="project__name">' + esc(p.title) + "</h3>" +
          '<p class="project__desc">' + esc(p.desc || "") + "</p>" +
          '<div class="project__foot">' +
            '<span class="project__link">' +
              "abrir site " + iconArrow() +
            "</span>" +
            '<span class="project__index">' + String(i + 1).padStart(2, "0") + "</span>" +
          "</div>" +
        "</div>" +
      "</a>"
    );
  }

  function initProjects() {
    var grid = $("#projects-grid");
    if (!grid || typeof PROJECTS === "undefined") return;

    if (!PROJECTS.length) {
      grid.innerHTML =
        '<div class="project__empty">Nenhum projeto publicado ainda. ' +
        "Adicione os links em <b>assets/js/06-data.js</b>.</div>";
      return;
    }

    grid.innerHTML = PROJECTS.map(projectCard).join("");

    /* Brilho que segue o mouse em cada card */
    if (FINE) {
      $$(".project", grid).forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
          var r = card.getBoundingClientRect();
          card.style.setProperty("--mx", e.clientX - r.left + "px");
          card.style.setProperty("--my", e.clientY - r.top + "px");
        });
      });
    }
  }

  /* Só renderiza um filtro se algum projeto usa aquela categoria.
     Assim o site nunca mostra uma aba vazia. */
  function initFilters() {
    var bar = $("#filters");
    var grid = $("#projects-grid");
    if (!bar || !grid || typeof CATEGORIES === "undefined" || typeof PROJECTS === "undefined") return;

    var used = PROJECTS.map(function (p) { return p.category; });
    var list = CATEGORIES.filter(function (c) { return c.id === "all" || used.indexOf(c.id) !== -1; });

    bar.innerHTML = list
      .map(function (c, i) {
        return '<button class="filter' + (i === 0 ? " is-active" : "") + '" type="button" data-filter="' +
          esc(c.id) + '" aria-pressed="' + (i === 0) + '">' + esc(c.label) + "</button>";
      })
      .join("");

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter");
      if (!btn) return;

      $$(".filter", bar).forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");

      var f = btn.dataset.filter;
      $$(".project", grid).forEach(function (card) {
        var show = f === "all" || card.dataset.category === f;
        card.classList.toggle("is-hidden", !show);
        if (show) card.classList.add("is-in");
      });
    });
  }

  /* ======================================================================
     8. STATS, MARQUEE TOP, ESCOPO, FAQ, REDES
     ====================================================================== */
  function initStats() {
    var el = $("#stats");
    if (!el || typeof PROFILE === "undefined" || !PROFILE.stats) return;

    el.innerHTML = PROFILE.stats
      .map(function (s) {
        return (
          '<div class="stat" data-reveal>' +
            '<div class="stat__num" data-count="' + s.value + '" data-suffix="' + esc(s.suffix || "") + '">0</div>' +
            '<div class="stat__label">' + esc(s.label) + "</div>" +
          "</div>"
        );
      })
      .join("");

    initCounters();
    initReveal();
  }

  function initMarqueeTop() {
    var el = $("#marquee-top");
    if (!el || typeof MARQUEE_TOP === "undefined") return;

    el.innerHTML = MARQUEE_TOP
      .map(function (t) { return '<span class="marquee__item">' + esc(t) + '<i class="marquee__dot"></i></span>'; })
      .join("");

    initMarquee();
  }

  function initScopes() {
    var el = $("#scopes");
    if (!el || typeof SCOPES === "undefined") return;

    el.innerHTML = SCOPES.map(function (s, i) {
      return (
        '<article class="card card--grad scope" data-reveal data-reveal-index="' + i + '">' +
          '<div class="scope__head">' +
            '<span class="scope__sector">' + esc(s.sector) + "</span>" +
            '<span class="scope__cat">' + esc(s.category === "loja" ? "Loja" : "Landing page") + "</span>" +
          "</div>" +
          "<h3>" + esc(s.title) + "</h3>" +
          '<ul class="scope__list">' +
            (s.features || []).map(function (f) {
              return "<li>" +
                '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>' +
                "<span>" + esc(f) + "</span></li>";
            }).join("") +
          "</ul>" +
          '<a class="scope__link" href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" data-cursor="abrir">' +
            "ver o site ao vivo " +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>' +
          "</a>" +
        "</article>"
      );
    }).join("");

    initReveal();
  }

  function initFaq() {
    var el = $("#faq-list");
    if (!el) return;

    if (typeof FAQS !== "undefined" && FAQS.length) {
      el.innerHTML = FAQS.map(function (f, i) {
        return (
          '<div class="faq__item" data-reveal data-reveal-index="' + i + '">' +
            '<button class="faq__q" type="button" aria-expanded="false">' +
              "<span>" + esc(f.q) + "</span>" +
              '<span class="faq__ico" aria-hidden="true">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>' +
              "</span>" +
            "</button>" +
            '<div class="faq__a"><div><p>' + esc(f.a) + "</p></div></div>" +
          "</div>"
        );
      }).join("");
    }

    el.addEventListener("click", function (e) {
      var btn = e.target.closest(".faq__q");
      if (!btn) return;
      var item = btn.closest(".faq__item");
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });

    initReveal();
  }

  var SOCIAL_ICONS = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none"/>',
    github: '<path d="M9 19c-4.5 1.5-4.5-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.5A6 6 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    whatsapp: '<path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.5A8.5 8.5 0 1 1 21 11.5z"/><path d="M8.5 9.5c0 3 2.5 5.5 5.5 5.5"/>',
    behance: '<path d="M2 6h5.5a2.5 2.5 0 0 1 0 5H2zM2 11h6a2.5 2.5 0 0 1 0 5H2z"/><path d="M15 10.5a3.5 3.5 0 1 1 6.5 1.8H15zM14 16.5h7"/>',
    email: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2.5 7 9.5 6 9.5-6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
    arrow: '<path d="M7 17 17 7M8 7h9v9"/>'
  };

  function initSocials() {
    var el = $("#socials");
    if (!el || typeof SOCIALS === "undefined") return;

    el.innerHTML = SOCIALS.map(function (s, i) {
      var d = SOCIAL_ICONS[s.id] || SOCIAL_ICONS.globe;
      return (
        '<a class="social" data-reveal data-reveal-index="' + i + '" href="' + esc(s.url) + '"' +
        (s.id === "email" ? "" : ' target="_blank" rel="noopener noreferrer"') +
        ' data-cursor="abrir">' +
          '<span class="social__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg></span>" +
          '<span class="social__txt"><b>' + esc(s.label) + "</b><span>" + esc(s.handle || "") + "</span></span>" +
        "</a>"
      );
    }).join("");

    initReveal();
  }

  /* ======================================================================
     9. COPIAR E-MAIL + TOAST
     ====================================================================== */
  function initCopy() {
    var mail = (typeof PROFILE !== "undefined" && PROFILE.email) || "";

    $$("[data-copy]").forEach(function (btn) {
      var isPhone = btn.hasAttribute("data-copy");
      var value = isPhone ? "+" + btn.dataset.copy : mail;
      var idle = btn.textContent;

      btn.addEventListener("click", function () {
        write(value, function () {
          btn.classList.add("is-copied");
          btn.textContent = "copiado ✓";
          showToast(isPhone ? "Número copiado" : "E-mail copiado");
          setTimeout(function () {
            btn.classList.remove("is-copied");
            btn.textContent = idle;
          }, 2400);
        });
      });
    });

    function write(text, done) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done).catch(function () { fallback(text, done); });
      } else {
        fallback(text, done);
      }
    }

    function fallback(text, done) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:-9999px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (err) { showToast("Não foi possível copiar"); }
      document.body.removeChild(ta);
    }
  }

  function showToast(msg) {
    var t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove("is-show"); }, 2200);
  }

  /* ======================================================================
     10. TERMINAL — efeito de digitação
     ====================================================================== */
  function initTerminal() {
    var el = $("[data-typed]");
    if (!el) return;

    var full = el.dataset.typed || "";
    if (REDUCED) { el.textContent = full; return; }

    var i = 0;
    setTimeout(function () {
      (function type() {
        el.textContent = full.slice(0, ++i);
        if (i < full.length) setTimeout(type, 22 + Math.random() * 26);
      })();
    }, 900);
  }

  /* ======================================================================
     11. BOTÃO VOLTAR AO TOPO
     ====================================================================== */
  function initToTop() {
    var b = $(".to-top");
    if (!b) return;
    b.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
    });
  }

  /* ======================================================================
     12. ANO NO FOOTER
     ====================================================================== */
  function initYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
  function boot() {
    initPreloader();
    initNav();
    initCursor();
    initMarqueeTop();
    initProjects();
    initFilters();
    initScopes();
    initStats();
    initFaq();
    initSocials();
    initCopy();
    initTerminal();
    initToTop();
    initYear();
    initMarquee();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();