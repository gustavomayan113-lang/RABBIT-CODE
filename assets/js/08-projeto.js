/* ==========================================================================
   RABBIT CODE — 08. TEMPLATE DE PROJETO
   Lê ?id=N (índice do array PROJECTS) e monta a página.
   Uso: templates/projeto.html?id=0
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (s) { return document.querySelector(s); };
  var list = (typeof PROJECTS !== "undefined" && PROJECTS.length) ? PROJECTS : [];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var ACCENTS = {
    yellow: "#FFD60A", purple: "#A855F7", blue: "#3B82F6",
    pink: "#EC4899", green: "#22C55E", orange: "#FB923C"
  };

  var CAT_LABEL = {
    landing: "Landing Page", loja: "Loja Online",
    institucional: "Site Institucional", portfolio: "Portfólio", app: "Aplicação"
  };

  function paint() {
    var raw = new URLSearchParams(window.location.search).get("id");
    var i = parseInt(raw, 10);
    var p = list[Number.isFinite(i) && i >= 0 && i < list.length ? i : 0];

    if (!p) {
      document.title = "Projeto — Rabbit Code";
      $("#p-title").textContent = "Projeto não encontrado";
      $("#p-desc").textContent = "Volte ao portfólio e escolha um projeto.";
      return;
    }

    var accent = ACCENTS[p.accent] || ACCENTS.purple;
    document.title = p.title + " — Rabbit Code";
    var meta = document.querySelector('meta[name="description"]');
    if (meta && p.desc) meta.setAttribute("content", p.desc);

    $("#p-cat").textContent = CAT_LABEL[p.category] || p.category || "projeto";
    $("#p-title").textContent = p.title;
    $("#p-desc").textContent = p.desc || p.tagline || "";

    $("#p-tags").innerHTML = (p.tags || [])
      .map(function (t) { return '<span class="tag tag--yellow">' + esc(t) + "</span>"; })
      .join("");

    $("#p-link").href = p.url || "#";

    var features = $("#p-features");
    if (features) {
      features.innerHTML = (p.features || [])
        .map(function (f) {
          return "<li>" +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>' +
            "<span>" + esc(f) + "</span></li>";
        })
        .join("");
      features.hidden = !(p.features && p.features.length);
    }

    var specs = [
      ["Categoria", CAT_LABEL[p.category] || p.category || "—"],
      ["Entrega", p.year || "2026"],
      ["Setor", p.sector || "—"],
      ["Tecnologias", (p.tags || []).join(", ") || "—"],
      ["Status", p.url && p.url !== "#" ? "no ar ✓" : "a publicar"]
    ];
    $("#p-specs").innerHTML = specs
      .map(function (s) { return '<div class="p-spec"><dt>' + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd></div>"; })
      .join("");

    $("#p-shot").innerHTML = p.cover
      ? '<span class="p-shot__chrome" aria-hidden="true"><b></b><b></b><b></b>' +
        '<i>' + esc((p.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")) + "</i></span>" +
        '<img src="../' + esc(p.cover) + '" alt="Captura de tela do site ' + esc(p.title) + '" loading="lazy" width="1440" height="900">'
      : '<div class="project__art" style="position:relative;aspect-ratio:16/9" aria-hidden="true"><span>' +
        esc(p.title.charAt(0)) + "</span></div>";
    $("#p-shot").style.setProperty("--accent", accent);

    $("#p-challenge").textContent = p.challenge || $("#p-challenge").textContent;
    $("#p-solution").textContent = p.solution || $("#p-solution").textContent;
    $("#p-result").textContent = p.result || $("#p-result").textContent;

    /* Reveal + ano */
    $$("[data-reveal]").forEach(function (el) { el.classList.add("is-in"); });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", paint);
  else paint();
})();