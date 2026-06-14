/* ══════════════════════════════════════════════════════════════
   PROJET — Courbes paramétriques & polaires
   Script principal : schémas intro, grapheur 2D, visualisation 3D
   ══════════════════════════════════════════════════════════════ */

/* ==============================
   NAVBAR BURGER (répliqué pour page autonome)
============================== */
function toggleMenu() {
  document.getElementById("burger").classList.toggle("open");
  document.getElementById("navLinks").classList.toggle("open");
}
window.toggleMenu = toggleMenu;
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    document.getElementById("burger").classList.remove("open");
    document.getElementById("navLinks").classList.remove("open");
  });
});

/* ==============================
   KATEX — Rendu des formules
============================== */
function renderAllFormulas() {
  document.querySelectorAll(".formula[data-formula]").forEach((el) => {
    try {
      katex.render(el.dataset.formula, el, {
        displayMode: true,
        throwOnError: false,
      });
    } catch (e) {
      el.textContent = el.dataset.formula;
    }
  });
}

function waitForKatex() {
  if (typeof katex !== "undefined") {
    renderAllFormulas();
  } else {
    setTimeout(waitForKatex, 100);
  }
}
waitForKatex();

/* ==============================
   SECTION 1 — SCHÉMAS INTRODUCTION
============================== */
function drawSchemaCartesian() {
  const canvas = document.getElementById("schemaCartesian");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;
  const cx = W / 2,
    cy = H / 2;

  ctx.clearRect(0, 0, W, H);

  // Grille cartésienne
  ctx.strokeStyle = "#2e334844";
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 30) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y <= H; y += 30) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = "#8b8fa3";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, cy);
  ctx.lineTo(W, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, H);
  ctx.stroke();

  // Labels axes
  ctx.fillStyle = "#8b8fa3";
  ctx.font = "bold 14px system-ui, sans-serif";
  ctx.fillText("x", W - 18, cy - 8);
  ctx.fillText("y", cx + 8, 16);

  // Point P(3, 2)
  const px = cx + 90,
    py = cy - 60;

  // Lignes de projection (pointillées)
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = "rgba(108, 99, 255, 0.5)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px, cy);
  ctx.lineTo(px, py);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, py);
  ctx.lineTo(px, py);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#6c63ff";
  ctx.font = "600 12px system-ui, sans-serif";
  ctx.fillText("x = 3", cx + 35, cy + 16);
  ctx.fillText("y = 2", cx - 48, cy - 25);

  // Point
  ctx.beginPath();
  ctx.arc(px, py, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#6c63ff";
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#e2e4ed";
  ctx.font = "bold 13px system-ui, sans-serif";
  ctx.fillText("P(3, 2)", px + 10, py - 10);

  ctx.fillStyle = "#8b8fa3";
  ctx.font = "600 13px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Cartésien (x, y)", W / 2, H - 10);
  ctx.textAlign = "start";
}

function drawSchemaPolar() {
  const canvas = document.getElementById("schemaPolar");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;
  const cx = W / 2,
    cy = H / 2;

  ctx.clearRect(0, 0, W, H);

  // Cercles concentriques
  ctx.strokeStyle = "#2e334844";
  ctx.lineWidth = 1;
  for (let r = 30; r <= 130; r += 30) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 140 * Math.cos(a), cy - 140 * Math.sin(a));
    ctx.stroke();
  }

  // Axe principal
  ctx.strokeStyle = "#8b8fa3";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 140, cy);
  ctx.lineTo(cx + 140, cy);
  ctx.stroke();

  const r = 90;
  const theta = Math.PI / 4;
  const px = cx + r * Math.cos(theta);
  const py = cy - r * Math.sin(theta);

  // Ligne r
  ctx.strokeStyle = "#00cfc8";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(px, py);
  ctx.stroke();

  // Arc θ
  ctx.strokeStyle = "#f5c842";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, 35, 0, -theta, true);
  ctx.stroke();

  const midX = (cx + px) / 2,
    midY = (cy + py) / 2;
  ctx.fillStyle = "#00cfc8";
  ctx.font = "bold 14px system-ui, sans-serif";
  ctx.fillText("r = 3", midX - 30, midY - 5);

  ctx.fillStyle = "#f5c842";
  ctx.font = "bold 13px system-ui, sans-serif";
  ctx.fillText("θ = π/4", cx + 40, cy - 10);

  // Point
  ctx.beginPath();
  ctx.arc(px, py, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#00cfc8";
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#e2e4ed";
  ctx.font = "bold 13px system-ui, sans-serif";
  ctx.fillText("P(3, π/4)", px + 10, py - 10);

  ctx.fillStyle = "#8b8fa3";
  ctx.font = "600 13px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Polaire (r, θ)", W / 2, H - 10);
  ctx.textAlign = "start";
}

drawSchemaCartesian();
drawSchemaPolar();

/* ══════════════════════════════════════════
   SECTION 2 — GRAPHEUR 2D INTERACTIF
   ══════════════════════════════════════════ */

const canvas2d = document.getElementById("canvas2d");
const ctx2d = canvas2d ? canvas2d.getContext("2d") : null;

let anim2d = { running: false, t: 0, id: null };

function resize2dCanvas() {
  if (!canvas2d) return;
  const wrapper = canvas2d.parentElement;
  canvas2d.width = wrapper.clientWidth;
  canvas2d.height = wrapper.clientHeight || 450;
}
resize2dCanvas();
window.addEventListener("resize", () => {
  resize2dCanvas();
  draw2d();
});

const slider2dA = document.getElementById("slider2dA");
const slider2dB = document.getElementById("slider2dB");
const val2dA = document.getElementById("val2dA");
const val2dB = document.getElementById("val2dB");
const curve2dSelect = document.getElementById("curve2dSelect");

if (slider2dA)
  slider2dA.addEventListener("input", () => {
    val2dA.textContent = slider2dA.value;
    // [FIX] Vider la traînée quand on change les paramètres
    trail2d.length = 0;
    draw2d();
  });
if (slider2dB)
  slider2dB.addEventListener("input", () => {
    val2dB.textContent = slider2dB.value;
    // [FIX] Vider la traînée quand on change les paramètres
    trail2d.length = 0;
    draw2d();
  });
if (curve2dSelect)
  curve2dSelect.addEventListener("change", () => {
    stop2dAnimation();
    trail2d.length = 0;
    const v = curve2dSelect.value;
    const customPolar = document.getElementById("customPolarInputs");
    const customParam = document.getElementById("customParamInputs");
    const presetSliders = document.getElementById("presetSliders2d");
    if (customPolar)
      customPolar.style.display = v === "custom_polar" ? "block" : "none";
    if (customParam)
      customParam.style.display = v === "custom_param" ? "block" : "none";
    if (presetSliders)
      presetSliders.style.display =
        v === "custom_polar" || v === "custom_param" ? "none" : "block";
    draw2d();
  });

/* ==============================
   CUSTOM EQUATION EDITOR (math.js)
============================== */

function debounce(fn, wait) {
  let id = null;
  return function (...args) {
    clearTimeout(id);
    id = setTimeout(() => fn.apply(this, args), wait);
  };
}

const custom2d = {
  polar: { expr: "", compiled: null, lastValidPoints: null, lastGoodExpr: "" },
  param: {
    xExpr: "",
    yExpr: "",
    compiledX: null,
    compiledY: null,
    lastValidPoints: null,
    lastGoodX: "",
    lastGoodY: "",
  },
};

function preprocessExpr(input) {
  if (!input || !input.trim()) return "";
  let s = input.trim();
  s = s.replace(/θ/g, "theta").replace(/π/g, "pi");
  return s;
}

function compilePolarExpression(exprStr) {
  if (typeof math === "undefined") return { err: "mathjs not loaded" };
  try {
    const node = math.parse(exprStr);
    const code = node.compile();
    return { compiled: code };
  } catch (e) {
    return { err: e.message || String(e) };
  }
}

function compileParamExpressions(xStr, yStr) {
  if (typeof math === "undefined") return { err: "mathjs not loaded" };
  try {
    const nx = math.parse(xStr);
    const ny = math.parse(yStr);
    const cx = nx.compile();
    const cy = ny.compile();
    return { compiledX: cx, compiledY: cy };
  } catch (e) {
    return { err: e.message || String(e) };
  }
}

function exprToTex(s) {
  if (!s) return "";
  let t = s.replace(/theta/g, "\\theta").replace(/pi/g, "\\pi");
  t = t.replace(/\*\*/g, "^{}");
  t = t.replace(/(\d)\*(?=[a-zA-Z\\(])/g, "$1\\cdot ");
  t = t.replace(/\^\s*([0-9a-zA-Z_\\(\{\-]+)/g, "^{$1}");
  return t;
}

const debouncedCompilePolar = debounce(() => {
  const inp = document.getElementById("inputPolarR");
  const errEl = document.getElementById("errorPolarR");
  if (!inp) return;
  const raw = preprocessExpr(inp.value);
  if (!raw) {
    custom2d.polar.compiled = null;
    if (errEl) errEl.textContent = "";
    draw2d();
    return;
  }
  const res = compilePolarExpression(raw);
  if (res.err) {
    if (errEl) errEl.textContent = res.err;
    inp.classList.add("input-error");
  } else {
    custom2d.polar.compiled = res.compiled;
    custom2d.polar.expr = raw;
    custom2d.polar.lastGoodExpr = raw;
    if (errEl) errEl.textContent = "";
    inp.classList.remove("input-error");
    // [FIX] Vider la traînée quand l'équation change
    trail2d.length = 0;
    draw2d();
  }
}, 300);

const debouncedCompileParam = debounce(() => {
  const ix = document.getElementById("inputParamX");
  const iy = document.getElementById("inputParamY");
  const errX = document.getElementById("errorParamX");
  const errY = document.getElementById("errorParamY");
  if (!ix || !iy) return;
  const rawX = preprocessExpr(ix.value);
  const rawY = preprocessExpr(iy.value);
  if (!rawX || !rawY) {
    if (errX) errX.textContent = rawX ? "" : "Expression x vide";
    if (errY) errY.textContent = rawY ? "" : "Expression y vide";
    return;
  }
  const res = compileParamExpressions(rawX, rawY);
  if (res.err) {
    if (errX) errX.textContent = res.err;
    ix.classList.add("input-error");
    iy.classList.add("input-error");
  } else {
    custom2d.param.compiledX = res.compiledX;
    custom2d.param.compiledY = res.compiledY;
    custom2d.param.xExpr = rawX;
    custom2d.param.yExpr = rawY;
    custom2d.param.lastGoodX = rawX;
    custom2d.param.lastGoodY = rawY;
    if (errX) errX.textContent = "";
    if (errY) errY.textContent = "";
    ix.classList.remove("input-error");
    iy.classList.remove("input-error");
    // [FIX] Vider la traînée quand l'équation change
    trail2d.length = 0;
    draw2d();
  }
}, 300);

// Attach custom input handlers
(function attachCustomInputHandlers() {
  const inpP = document.getElementById("inputPolarR");
  if (inpP) inpP.addEventListener("input", () => debouncedCompilePolar());
  const polarChips = document.getElementById("polarChips");
  if (polarChips)
    polarChips.querySelectorAll("button[data-expr]").forEach((b) => {
      b.addEventListener("click", () => {
        if (inpP) inpP.value = b.dataset.expr;
        debouncedCompilePolar();
      });
    });

  const ix = document.getElementById("inputParamX");
  const iy = document.getElementById("inputParamY");
  if (ix) ix.addEventListener("input", () => debouncedCompileParam());
  if (iy) iy.addEventListener("input", () => debouncedCompileParam());
  const paramChips = document.getElementById("paramChips");
  if (paramChips)
    paramChips.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        if (b.dataset.x && ix) ix.value = b.dataset.x;
        if (b.dataset.y && iy) iy.value = b.dataset.y;
        debouncedCompileParam();
      });
    });
})();

/* --- Traînée lumineuse & Vecteurs --- */
const trail2d = [];
let trailMax = 0;

document.querySelectorAll(".trail-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".trail-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const v = parseInt(btn.dataset.trail, 10) || 0;
    trailMax = v;
    if (trailMax === 0) trail2d.length = 0;
  });
});

const chkV = document.getElementById("chkVelocity");
const chkA = document.getElementById("chkAcceleration");
const infoPanel2dEl = document.getElementById("infoPanel2d");

if (chkV)
  chkV.addEventListener("change", () => {
    if (infoPanel2dEl)
      infoPanel2dEl.style.display =
        chkV.checked || (chkA && chkA.checked) ? "block" : "none";
    draw2d();
  });
if (chkA)
  chkA.addEventListener("change", () => {
    if (infoPanel2dEl)
      infoPanel2dEl.style.display =
        (chkV && chkV.checked) || chkA.checked ? "block" : "none";
    draw2d();
  });

if (infoPanel2dEl)
  infoPanel2dEl.style.display =
    (chkV && chkV.checked) || (chkA && chkA.checked) ? "block" : "none";

const btn2dAnimate = document.getElementById("btn2dAnimate");
const btn2dReset = document.getElementById("btn2dReset");
if (btn2dAnimate) btn2dAnimate.addEventListener("click", toggle2dAnimation);
if (btn2dReset) btn2dReset.addEventListener("click", reset2d);

/* --- Définitions des courbes 2D --- */

function getCurve2dPoints(type, a, b, W, H, tMax) {
  const cx = W / 2,
    cy = H / 2;
  const scale = (Math.min(W, H) / 2) * 0.75;
  const points = [];

  switch (type) {
    case "rosace": {
      const maxTheta = tMax != null ? tMax : Math.PI * 2;
      const steps = 1000;
      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * maxTheta;
        const r = a * Math.cos(b * theta);
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        points.push({ x: cx + (x * scale) / a, y: cy - (y * scale) / a });
      }
      break;
    }
    case "cardioide": {
      const maxTheta = tMax != null ? tMax : Math.PI * 2;
      const steps = 800;
      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * maxTheta;
        const r = a * (1 + Math.cos(theta));
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        points.push({
          x: cx + (x * scale) / (2 * a),
          y: cy - (y * scale) / (2 * a),
        });
      }
      break;
    }
    case "spirale": {
      const maxTheta = tMax != null ? tMax : Math.PI * 4 * b;
      const steps = 1200;
      const maxR = a * maxTheta;
      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * maxTheta;
        const r = a * theta;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        const s = maxR > 0 ? scale / maxR : scale;
        points.push({ x: cx + x * s, y: cy - y * s });
      }
      break;
    }
    case "lissajous": {
      const maxT = tMax != null ? tMax : Math.PI * 2;
      const steps = 1000;
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * maxT;
        const x = Math.sin(a * t);
        const y = Math.cos(b * t);
        points.push({ x: cx + x * scale * 0.8, y: cy - y * scale * 0.8 });
      }
      break;
    }
    case "custom_polar": {
      const slider = document.getElementById("sliderThetaRange");
      const mult = slider ? parseFloat(slider.value) : 2;
      const maxTheta = tMax != null ? tMax : Math.PI * mult;
      const steps = 800;
      const compiled = custom2d.polar.compiled;
      if (!compiled) {
        return custom2d.polar.lastValidPoints || [];
      }
      try {
        const raw = [];
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * maxTheta;
          const scope = { theta: theta, t: theta, pi: Math.PI };
          const r = compiled.evaluate(scope);
          if (!isFinite(r)) {
            raw.push({ x: 0, y: 0 });
            continue;
          }
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta);
          raw.push({ x, y });
        }
        let maxAbs = 0;
        for (const p of raw) maxAbs = Math.max(maxAbs, Math.hypot(p.x, p.y));
        if (maxAbs <= 0) maxAbs = 1;
        const s = scale / maxAbs;
        for (const p of raw) points.push({ x: cx + p.x * s, y: cy - p.y * s });
        custom2d.polar.lastValidPoints = points.slice();
      } catch (e) {
        const errEl = document.getElementById("errorPolarR");
        if (errEl) errEl.textContent = (e && e.message) || String(e);
        return custom2d.polar.lastValidPoints || [];
      }
      break;
    }
    case "custom_param": {
      const slider = document.getElementById("sliderParamRange");
      const mult = slider ? parseFloat(slider.value) : 2;
      const maxT = tMax != null ? tMax : Math.PI * mult;
      const steps = 1000;
      const cxFn = custom2d.param.compiledX;
      const cyFn = custom2d.param.compiledY;
      if (!cxFn || !cyFn) {
        return custom2d.param.lastValidPoints || [];
      }
      try {
        const raw = [];
        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * maxT;
          const scope = { t: t, theta: t, pi: Math.PI };
          const xv = cxFn.evaluate(scope);
          const yv = cyFn.evaluate(scope);
          if (!isFinite(xv) || !isFinite(yv)) {
            raw.push({ x: 0, y: 0 });
            continue;
          }
          raw.push({ x: xv, y: yv });
        }
        let maxAbsX = 0,
          maxAbsY = 0;
        for (const p of raw) {
          maxAbsX = Math.max(maxAbsX, Math.abs(p.x));
          maxAbsY = Math.max(maxAbsY, Math.abs(p.y));
        }
        const maxAbs = Math.max(maxAbsX, maxAbsY, 1);
        const s = (scale * 0.9) / maxAbs;
        for (const p of raw) points.push({ x: cx + p.x * s, y: cy - p.y * s });
        custom2d.param.lastValidPoints = points.slice();
      } catch (e) {
        const errX = document.getElementById("errorParamX");
        const errY = document.getElementById("errorParamY");
        if (errX) errX.textContent = (e && e.message) || String(e);
        if (errY) errY.textContent = (e && e.message) || String(e);
        return custom2d.param.lastValidPoints || [];
      }
      break;
    }
  }
  return points;
}

function getCurve2dEquation(type, a, b) {
  switch (type) {
    case "rosace":
      return `r(\\theta) = ${a} \\cdot \\cos(${b}\\theta)`;
    case "cardioide":
      return `r(\\theta) = ${a} \\cdot (1 + \\cos\\theta)`;
    case "spirale":
      return `r(\\theta) = ${a} \\cdot \\theta`;
    case "lissajous":
      return `\\begin{cases} x(t) = \\sin(${a}t) \\\\ y(t) = \\cos(${b}t) \\end{cases}`;
    default:
      return "";
  }
}

/* --- Grilles --- */

function drawPolarGrid(ctx, cx, cy, W, H) {
  const maxR = (Math.min(W, H) / 2) * 0.85;

  ctx.strokeStyle = "#2e334855";
  ctx.lineWidth = 1;
  for (let r = maxR / 5; r <= maxR; r += maxR / 5) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + maxR * Math.cos(a), cy - maxR * Math.sin(a));
    ctx.stroke();
  }

  ctx.strokeStyle = "#8b8fa366";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - maxR, cy);
  ctx.lineTo(cx + maxR, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy - maxR);
  ctx.lineTo(cx, cy + maxR);
  ctx.stroke();

  ctx.fillStyle = "#8b8fa3";
  ctx.font = "11px system-ui, sans-serif";
  ctx.fillText("0", cx + maxR + 4, cy + 4);
  ctx.fillText("π/2", cx + 3, cy - maxR - 4);
  ctx.fillText("π", cx - maxR - 16, cy + 4);
}

function drawCartesianGrid(ctx, cx, cy, W, H) {
  const step = 40;

  ctx.strokeStyle = "#2e334844";
  ctx.lineWidth = 1;
  for (let x = cx % step; x < W; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = cy % step; y < H; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "#8b8fa366";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, cy);
  ctx.lineTo(W, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, H);
  ctx.stroke();

  ctx.fillStyle = "#8b8fa3";
  ctx.font = "12px system-ui, sans-serif";
  ctx.fillText("x", W - 16, cy - 6);
  ctx.fillText("y", cx + 6, 14);
}

/* --- Arrow helper --- */

function drawArrow(ctx, x1, y1, x2, y2, color = "#00cfc8", width = 2) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  const len = 8 + width * 1.5;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - len * Math.cos(angle - 0.4),
    y2 - len * Math.sin(angle - 0.4),
  );
  ctx.lineTo(
    x2 - len * Math.cos(angle + 0.4),
    y2 - len * Math.sin(angle + 0.4),
  );
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

/* --- Equation display --- */

function updateEquation2d(type, a, b) {
  const el = document.getElementById("equation2d");
  if (!el || typeof katex === "undefined") return;

  if (type === "custom_polar") {
    const inp = document.getElementById("inputPolarR");
    const s = inp ? preprocessExpr(inp.value) : "";
    const tex = `r(\\theta) = ${exprToTex(s)}`;
    try {
      katex.render(tex, el, { displayMode: false, throwOnError: false });
    } catch (e) {
      el.textContent = tex;
    }
    return;
  }
  if (type === "custom_param") {
    const ix = document.getElementById("inputParamX");
    const iy = document.getElementById("inputParamY");
    const sx = ix ? preprocessExpr(ix.value) : "";
    const sy = iy ? preprocessExpr(iy.value) : "";
    const tex = `\\begin{cases} x(t) = ${exprToTex(sx)} \\\\ y(t) = ${exprToTex(sy)} \\end{cases}`;
    try {
      katex.render(tex, el, { displayMode: false, throwOnError: false });
    } catch (e) {
      el.textContent = tex;
    }
    return;
  }

  const tex = getCurve2dEquation(type, a, b);
  try {
    katex.render(tex, el, { displayMode: false, throwOnError: false });
  } catch (e) {
    el.textContent = tex;
  }
}

/* --- Dessin principal 2D --- */

function draw2d() {
  if (!ctx2d || !canvas2d) return;
  const W = canvas2d.width,
    H = canvas2d.height;
  const cx = W / 2,
    cy = H / 2;
  const scale = (Math.min(W, H) / 2) * 0.75;
  const type = curve2dSelect ? curve2dSelect.value : "rosace";
  const a = parseFloat(slider2dA ? slider2dA.value : 3);
  const b = parseFloat(slider2dB ? slider2dB.value : 5);

  ctx2d.clearRect(0, 0, W, H);

  // [FIX] Grille adaptée au type de courbe
  const isPolar = type !== "lissajous" && type !== "custom_param";
  if (isPolar) {
    drawPolarGrid(ctx2d, cx, cy, W, H);
  } else {
    drawCartesianGrid(ctx2d, cx, cy, W, H);
  }

  // Courbe complète
  const points = getCurve2dPoints(type, a, b, W, H, null);

  if (points.length > 1) {
    ctx2d.beginPath();
    ctx2d.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx2d.lineTo(points[i].x, points[i].y);
    }
    ctx2d.strokeStyle = "#6c63ff";
    ctx2d.lineWidth = 2.5;
    ctx2d.stroke();
  }

  // Point animé
  if (anim2d.running || anim2d.t > 0) {
    const tRatio = anim2d.t % 1;
    let tMax;
    if (type === "spirale") tMax = Math.PI * 4 * b * tRatio;
    else if (type === "lissajous") tMax = Math.PI * 2 * tRatio;
    else if (type === "custom_polar") {
      const slider = document.getElementById("sliderThetaRange");
      const mult = slider ? parseFloat(slider.value) : 2;
      tMax = Math.PI * mult * tRatio;
    } else if (type === "custom_param") {
      const slider = document.getElementById("sliderParamRange");
      const mult = slider ? parseFloat(slider.value) : 2;
      tMax = Math.PI * mult * tRatio;
    } else tMax = Math.PI * 2 * tRatio;

    const animPoints = getCurve2dPoints(type, a, b, W, H, tMax);
    if (animPoints.length > 0) {
      const last = animPoints[animPoints.length - 1];

      // Traînée
      if (trailMax > 0) {
        trail2d.push({ x: last.x, y: last.y });
        if (trail2d.length > trailMax) trail2d.shift();
      }

      if (trail2d.length > 1) {
        for (let i = 1; i < trail2d.length; i++) {
          const p0 = trail2d[i - 1];
          const p1 = trail2d[i];
          const alpha = i / trail2d.length;
          const segLen = Math.hypot(p1.x - p0.x, p1.y - p0.y);
          const lineW = Math.min(6, 1 + segLen * 0.12);
          ctx2d.beginPath();
          ctx2d.moveTo(p0.x, p0.y);
          ctx2d.lineTo(p1.x, p1.y);
          ctx2d.strokeStyle = `rgba(245,200,66,${alpha * 0.9})`;
          ctx2d.lineWidth = lineW;
          ctx2d.stroke();
        }
      }

      // Vecteurs vitesse & accélération
      if ((chkV && chkV.checked) || (chkA && chkA.checked)) {
        const n = animPoints.length;
        if (n >= 3) {
          const p0 = animPoints[Math.max(0, n - 3)];
          const p1 = animPoints[Math.max(0, n - 2)];
          const p2 = animPoints[n - 1];
          const dtParam =
            tMax && animPoints.length > 1 ? tMax / (animPoints.length - 1) : 1;
          const vx = (p2.x - p0.x) / (2 * dtParam);
          const vy = (p2.y - p0.y) / (2 * dtParam);
          const ax = (p2.x - 2 * p1.x + p0.x) / (dtParam * dtParam);
          const ay = (p2.y - 2 * p1.y + p0.y) / (dtParam * dtParam);
          const speed = Math.hypot(vx, vy);
          const accel = Math.hypot(ax, ay);

          if (chkV && chkV.checked) {
            const vScale = 0.08;
            const tx = last.x + vx * vScale;
            const ty = last.y + vy * vScale;
            drawArrow(
              ctx2d,
              last.x,
              last.y,
              tx,
              ty,
              "#00cfc8",
              Math.max(2, Math.min(5, speed * 0.02)),
            );
          }

          if (chkA && chkA.checked) {
            const aScale = 0.0025;
            const tx2 = last.x + ax * aScale;
            const ty2 = last.y + ay * aScale;
            drawArrow(
              ctx2d,
              last.x,
              last.y,
              tx2,
              ty2,
              "#f07c5a",
              Math.max(2, Math.min(5, accel * 0.01)),
            );
          }

          // Info panel
          if (infoPanel2dEl) {
            const posEl = document.getElementById("infoPos");
            const speedEl = document.getElementById("infoSpeed");
            const accelEl = document.getElementById("infoAccel");
            const curvEl = document.getElementById("infoCurv");
            const normX = ((last.x - cx) / scale).toFixed(2);
            const normY = ((cy - last.y) / scale).toFixed(2);
            if (posEl) posEl.textContent = `(${normX}, ${normY})`;
            if (speedEl) speedEl.textContent = speed.toFixed(2);
            if (accelEl) accelEl.textContent = accel.toFixed(2);
            const x1 = (p2.x - p0.x) / (2 * dtParam);
            const y1 = (p2.y - p0.y) / (2 * dtParam);
            const x2 = (p2.x - 2 * p1.x + p0.x) / (dtParam * dtParam);
            const y2 = (p2.y - 2 * p1.y + p0.y) / (dtParam * dtParam);
            const denom = Math.pow(x1 * x1 + y1 * y1, 1.5);
            const curv = denom > 1e-6 ? Math.abs(x1 * y2 - y1 * x2) / denom : 0;
            if (curvEl) curvEl.textContent = curv.toFixed(2);
          }
        }
      }

      // Ligne de rappel
      ctx2d.beginPath();
      ctx2d.moveTo(cx, cy);
      ctx2d.lineTo(last.x, last.y);
      ctx2d.strokeStyle = "rgba(0, 207, 200, 0.4)";
      ctx2d.lineWidth = 1.5;
      ctx2d.setLineDash([4, 4]);
      ctx2d.stroke();
      ctx2d.setLineDash([]);

      // Tracé parcouru
      if (animPoints.length > 1) {
        ctx2d.beginPath();
        ctx2d.moveTo(animPoints[0].x, animPoints[0].y);
        for (let i = 1; i < animPoints.length; i++) {
          ctx2d.lineTo(animPoints[i].x, animPoints[i].y);
        }
        ctx2d.strokeStyle = "#00cfc8";
        ctx2d.lineWidth = 3;
        ctx2d.stroke();
      }

      // Point mobile
      ctx2d.beginPath();
      ctx2d.arc(last.x, last.y, 8, 0, Math.PI * 2);
      ctx2d.fillStyle = "#f5c842";
      ctx2d.fill();
      ctx2d.strokeStyle = "#fff";
      ctx2d.lineWidth = 2.5;
      ctx2d.stroke();
    }
  }

  updateEquation2d(type, a, b);
}

/* ==============================
   GALERIE DE PRESETS
============================== */

const PRESETS = [
  {
    cat: "classiques",
    name: "Rosace (3,5)",
    type: "rosace",
    a: 3,
    b: 5,
    formula: "r=3·cos(5θ)",
  },
  {
    cat: "classiques",
    name: "Cardioïde",
    type: "cardioide",
    a: 3,
    b: 1,
    formula: "r=3(1+cosθ)",
  },
  {
    cat: "classiques",
    name: "Spirale",
    type: "spirale",
    a: 0.2,
    b: 4,
    formula: "r=aθ",
  },
  {
    cat: "classiques",
    name: "Lemniscate",
    type: "custom_polar",
    expr: "sqrt(2)*cos(theta)/(1+sin(theta)^2)",
    formula: "r=√2·cos(θ)/(1+sin²θ)",
  },
  {
    cat: "complexes",
    name: "Papillon",
    type: "custom_polar",
    expr: "exp(cos(theta)) - 2*cos(4*theta) + (sin(theta/12))^5",
    formula: "r = eᶜᵒˢᶿ - 2cos(4θ) + sin(θ/12)⁵",
  },
  {
    cat: "complexes",
    name: "Fleur multi-pétales",
    type: "custom_polar",
    expr: "2*cos(5*theta) + sin(7*theta)",
    formula: "2cos(5θ)+sin(7θ)",
  },
  {
    cat: "artistiques",
    name: "Combinaison A",
    type: "custom_param",
    x: "sin(3*t)+cos(5*t)",
    y: "cos(2*t)-sin(t)",
    formula: "x=sin(3t)+cos(5t), y=cos(2t)-sin(t)",
  },
  {
    cat: "artistiques",
    name: "Spirale colorée",
    type: "custom_param",
    x: "cos(t)*(1+sin(6*t)/3)",
    y: "sin(t)*(1+sin(6*t)/3)",
    formula: "r(t)·(1+sin(6t)/3)",
  },
];

function openGallery() {
  const modal = document.getElementById("galleryModal");
  if (!modal) return;
  modal.classList.add("open");
  // [FIX] Populer avec l'onglet actif au moment de l'ouverture
  const activeTab = document.querySelector(".gallery-tab.active");
  populateGallery(activeTab ? activeTab.dataset.cat : "classiques");
}

function closeGallery() {
  const modal = document.getElementById("galleryModal");
  if (!modal) return;
  modal.classList.remove("open");
}

function populateGallery(category) {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const items = PRESETS.filter((p) => p.cat === category);
  items.forEach((p) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    const canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 160;
    const name = document.createElement("div");
    name.className = "gallery-name";
    name.textContent = p.name;
    const formula = document.createElement("div");
    formula.className = "gallery-formula";
    formula.textContent = p.formula || "";
    item.appendChild(canvas);
    item.appendChild(name);
    item.appendChild(formula);
    grid.appendChild(item);

    // Draw thumbnail
    try {
      const ctx = canvas.getContext("2d");
      // [FIX] Utiliser getComputedStyle avec fallback propre
      const cardColor =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--card")
          .trim() || "#222632";
      ctx.fillStyle = cardColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (p.type === "custom_polar") {
        const save = custom2d.polar.compiled;
        const compRes = compilePolarExpression(preprocessExpr(p.expr));
        if (!compRes.err) custom2d.polar.compiled = compRes.compiled;
        const pts = getCurve2dPoints(
          "custom_polar",
          0,
          0,
          canvas.width,
          canvas.height,
          Math.PI * 2,
        );
        drawThumbnailPath(ctx, pts);
        custom2d.polar.compiled = save;
      } else if (p.type === "custom_param") {
        const saveX = custom2d.param.compiledX;
        const saveY = custom2d.param.compiledY;
        const res = compileParamExpressions(
          preprocessExpr(p.x),
          preprocessExpr(p.y),
        );
        if (!res.err) {
          custom2d.param.compiledX = res.compiledX;
          custom2d.param.compiledY = res.compiledY;
        }
        const pts = getCurve2dPoints(
          "custom_param",
          0,
          0,
          canvas.width,
          canvas.height,
          Math.PI * 2,
        );
        drawThumbnailPath(ctx, pts);
        custom2d.param.compiledX = saveX;
        custom2d.param.compiledY = saveY;
      } else {
        const pts = getCurve2dPoints(
          p.type,
          p.a || 2,
          p.b || 3,
          canvas.width,
          canvas.height,
          Math.PI * 2,
        );
        drawThumbnailPath(ctx, pts);
      }
    } catch (e) {
      /* ignore thumbnail errors */
    }

    item.addEventListener("click", () => {
      if (p.type === "custom_polar") {
        if (curve2dSelect) curve2dSelect.value = "custom_polar";
        const cpEl = document.getElementById("customPolarInputs");
        const cpPEl = document.getElementById("customParamInputs");
        if (cpEl) cpEl.style.display = "block";
        if (cpPEl) cpPEl.style.display = "none";
        const inp = document.getElementById("inputPolarR");
        if (inp) inp.value = p.expr;
        debouncedCompilePolar();
      } else if (p.type === "custom_param") {
        if (curve2dSelect) curve2dSelect.value = "custom_param";
        const cpEl = document.getElementById("customPolarInputs");
        const cpPEl = document.getElementById("customParamInputs");
        if (cpEl) cpEl.style.display = "none";
        if (cpPEl) cpPEl.style.display = "block";
        const ix = document.getElementById("inputParamX");
        const iy = document.getElementById("inputParamY");
        if (ix) ix.value = p.x;
        if (iy) iy.value = p.y;
        debouncedCompileParam();
      } else {
        if (curve2dSelect) curve2dSelect.value = p.type;
        const cpEl = document.getElementById("customPolarInputs");
        const cpPEl = document.getElementById("customParamInputs");
        if (cpEl) cpEl.style.display = "none";
        if (cpPEl) cpPEl.style.display = "none";
        if (p.a != null && slider2dA) {
          slider2dA.value = p.a;
          if (val2dA) val2dA.textContent = p.a;
        }
        if (p.b != null && slider2dB) {
          slider2dB.value = p.b;
          if (val2dB) val2dB.textContent = p.b;
        }
      }
      // [FIX] Vider la traînée quand on applique un preset
      trail2d.length = 0;
      draw2d();
      closeGallery();
    });
  });
}

function drawThumbnailPath(ctx, pts) {
  if (!pts || pts.length < 2) return;
  ctx.strokeStyle = "#6c63ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.stroke();
}

// Gallery event hookups
const btnOpenGalleryEl = document.getElementById("btnOpenGallery");
if (btnOpenGalleryEl) btnOpenGalleryEl.addEventListener("click", openGallery);
const btnCloseGalleryEl = document.getElementById("btnCloseGallery");
if (btnCloseGalleryEl)
  btnCloseGalleryEl.addEventListener("click", closeGallery);
document.querySelectorAll(".gallery-tab").forEach((t) =>
  t.addEventListener("click", (ev) => {
    document
      .querySelectorAll(".gallery-tab")
      .forEach((x) => x.classList.remove("active"));
    ev.currentTarget.classList.add("active");
    populateGallery(ev.currentTarget.dataset.cat || "classiques");
  }),
);

/* ==============================
   COMPARATEUR CÔTE À CÔTE
   [FIX] Refonte complète avec :
   - vrais listeners sur les sliders
   - grille adaptée au type
   - point animé fonctionnel
   - copie droite→gauche réellement inversée
============================== */

const cmpLeftCanvas = document.getElementById("cmpCanvasLeft");
const cmpRightCanvas = document.getElementById("cmpCanvasRight");
let cmpAnimId = null;
let cmpRunning = false;
let cmpT = 0;

function resizeCompareCanvases() {
  [cmpLeftCanvas, cmpRightCanvas].forEach((c) => {
    if (c && c.parentElement) {
      // [FIX] Pas de soustraction arbitraire, utiliser 100% de la largeur
      c.width = c.parentElement.clientWidth;
      c.height = c.parentElement.clientHeight || 320;
    }
  });
}

function getCompareConfig(side) {
  const prefix = side === "left" ? "compareLeft" : "compareRight";
  const container = document.getElementById(prefix);
  if (!container) return { type: "rosace", a: 3, b: 3 };

  const sel =
    container.querySelector(".cmp-select") ||
    document.getElementById(
      side === "left" ? "cmpLeftSelect" : "cmpRightSelect",
    );
  const aSlider = container.querySelector(".cmp-slider-a");
  const bSlider = container.querySelector(".cmp-slider-b");

  return {
    type: sel ? sel.value : "rosace",
    a: aSlider ? parseFloat(aSlider.value) : 3,
    b: bSlider ? parseFloat(bSlider.value) : 3,
  };
}

function drawCompareSide(side) {
  const canvas = side === "left" ? cmpLeftCanvas : cmpRightCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;
  const cx = W / 2,
    cy = H / 2;
  ctx.clearRect(0, 0, W, H);

  const config = getCompareConfig(side);

  // [FIX] Grille adaptée au type de courbe
  if (config.type === "lissajous") {
    drawCartesianGrid(ctx, cx, cy, W, H);
  } else {
    drawPolarGrid(ctx, cx, cy, W, H);
  }

  const points = getCurve2dPoints(config.type, config.a, config.b, W, H, null);
  if (points.length > 1) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++)
      ctx.lineTo(points[i].x, points[i].y);
    ctx.strokeStyle = "#6c63ff";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // [FIX] Dessiner le point animé dans le comparateur
  if (cmpRunning && cmpT > 0) {
    const tRatio = cmpT % 1;
    let tMax;
    if (config.type === "spirale") tMax = Math.PI * 4 * config.b * tRatio;
    else if (config.type === "lissajous") tMax = Math.PI * 2 * tRatio;
    else tMax = Math.PI * 2 * tRatio;

    const animPts = getCurve2dPoints(
      config.type,
      config.a,
      config.b,
      W,
      H,
      tMax,
    );
    if (animPts.length > 0) {
      const last = animPts[animPts.length - 1];

      // Tracé parcouru
      ctx.beginPath();
      ctx.moveTo(animPts[0].x, animPts[0].y);
      for (let i = 1; i < animPts.length; i++)
        ctx.lineTo(animPts[i].x, animPts[i].y);
      ctx.strokeStyle = "#00cfc8";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Ligne de rappel
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(last.x, last.y);
      ctx.strokeStyle = "rgba(0, 207, 200, 0.4)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point
      ctx.beginPath();
      ctx.arc(last.x, last.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#f5c842";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}

function animateCompare() {
  if (!cmpRunning) return;
  cmpT += 0.004;
  if (cmpT > 1) cmpT = 0;
  drawCompareSide("left");
  drawCompareSide("right");
  cmpAnimId = requestAnimationFrame(animateCompare);
}

// [FIX] Attacher les listeners aux sliders ET selects du comparateur
function attachCompareListeners() {
  ["compareLeft", "compareRight"].forEach((id) => {
    const container = document.getElementById(id);
    if (!container) return;
    const side = id === "compareLeft" ? "left" : "right";

    // Selects
    const sel =
      container.querySelector(".cmp-select") ||
      document.getElementById(
        side === "left" ? "cmpLeftSelect" : "cmpRightSelect",
      );
    if (sel) sel.addEventListener("change", () => drawCompareSide(side));

    // Sliders a et b
    const aSlider = container.querySelector(".cmp-slider-a");
    const bSlider = container.querySelector(".cmp-slider-b");
    const aLabel = container.querySelector(".cmp-val-a");
    const bLabel = container.querySelector(".cmp-val-b");

    if (aSlider) {
      aSlider.addEventListener("input", () => {
        if (aLabel) aLabel.textContent = aSlider.value;
        drawCompareSide(side);
      });
    }
    if (bSlider) {
      bSlider.addEventListener("input", () => {
        if (bLabel) bLabel.textContent = bSlider.value;
        drawCompareSide(side);
      });
    }
  });
}
attachCompareListeners();

// [FIX] Copie gauche → droite : copie les vrais éléments
function copyCompareConfig(fromSide, toSide) {
  const fromContainer = document.getElementById(
    fromSide === "left" ? "compareLeft" : "compareRight",
  );
  const toContainer = document.getElementById(
    toSide === "left" ? "compareLeft" : "compareRight",
  );
  if (!fromContainer || !toContainer) return;

  const fromSel =
    fromContainer.querySelector(".cmp-select") ||
    document.getElementById(
      fromSide === "left" ? "cmpLeftSelect" : "cmpRightSelect",
    );
  const toSel =
    toContainer.querySelector(".cmp-select") ||
    document.getElementById(
      toSide === "left" ? "cmpLeftSelect" : "cmpRightSelect",
    );

  if (fromSel && toSel) toSel.value = fromSel.value;

  const fromA = fromContainer.querySelector(".cmp-slider-a");
  const fromB = fromContainer.querySelector(".cmp-slider-b");
  const toA = toContainer.querySelector(".cmp-slider-a");
  const toB = toContainer.querySelector(".cmp-slider-b");

  if (fromA && toA) {
    toA.value = fromA.value;
    toA.dispatchEvent(new Event("input"));
  }
  if (fromB && toB) {
    toB.value = fromB.value;
    toB.dispatchEvent(new Event("input"));
  }
  drawCompareSide(toSide);
}

const btnCopyLtoR = document.getElementById("btnCopyLeftToRight");
if (btnCopyLtoR)
  btnCopyLtoR.addEventListener("click", () =>
    copyCompareConfig("left", "right"),
  );

// [FIX] Copie droite → gauche : vraie logique inversée au lieu de re-cliquer
const btnCopyRtoL = document.getElementById("btnCopyRightToLeft");
if (btnCopyRtoL)
  btnCopyRtoL.addEventListener("click", () =>
    copyCompareConfig("right", "left"),
  );

const btnCmpAnimate = document.getElementById("btnCompareAnimate");
if (btnCmpAnimate)
  btnCmpAnimate.addEventListener("click", () => {
    if (cmpRunning) {
      cmpRunning = false;
      btnCmpAnimate.textContent = "▶ Animer";
      if (cmpAnimId) cancelAnimationFrame(cmpAnimId);
    } else {
      cmpRunning = true;
      btnCmpAnimate.textContent = "⏸ Pause";
      cmpT = 0;
      animateCompare();
    }
  });

const btnCmpReset = document.getElementById("btnCompareReset");
if (btnCmpReset)
  btnCmpReset.addEventListener("click", () => {
    cmpRunning = false;
    if (cmpAnimId) cancelAnimationFrame(cmpAnimId);
    if (btnCmpAnimate) btnCmpAnimate.textContent = "▶ Animer";
    cmpT = 0;
    drawCompareSide("left");
    drawCompareSide("right");
  });

window.addEventListener("resize", () => {
  resizeCompareCanvases();
  drawCompareSide("left");
  drawCompareSide("right");
});
resizeCompareCanvases();
drawCompareSide("left");
drawCompareSide("right");

/* ==============================
   EXPORT & PARTAGE
============================== */

function exportCanvasPNG(canvas, filename = "curve.png", scaleFactor = 2) {
  const tmp = document.createElement("canvas");
  tmp.width = canvas.width * scaleFactor;
  tmp.height = canvas.height * scaleFactor;
  const tctx = tmp.getContext("2d");
  // [FIX] Fond dynamique avec fallback
  const bgColor =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--card")
      .trim() || "#222632";
  tctx.fillStyle = bgColor;
  tctx.fillRect(0, 0, tmp.width, tmp.height);
  tctx.drawImage(canvas, 0, 0, tmp.width, tmp.height);
  tmp.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}

function export2dPNG() {
  if (!canvas2d) return;
  exportCanvasPNG(canvas2d, "curve-2d.png", 2);
}

function export2dSVG() {
  if (!canvas2d) return;
  const W = canvas2d.width,
    H = canvas2d.height;
  const type = curve2dSelect ? curve2dSelect.value : "rosace";
  const aVal = parseFloat(slider2dA ? slider2dA.value : 3);
  const bVal = parseFloat(slider2dB ? slider2dB.value : 5);
  const pts = getCurve2dPoints(type, aVal, bVal, W, H, null);
  if (!pts || pts.length < 2) return;
  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  // [FIX] Fond SVG dynamique
  const bgColor =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--card")
      .trim() || "#222632";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="100%" height="100%" fill="${bgColor}"/><path d="${path}" fill="none" stroke="#6c63ff" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "curve-2d.svg";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const btnExp2d = document.getElementById("btnExport2d");
if (btnExp2d) btnExp2d.addEventListener("click", export2dPNG);
// [FIX] Ajouter le bouton export SVG s'il existe
const btnExpSvg = document.getElementById("btnExportSvg2d");
if (btnExpSvg) btnExpSvg.addEventListener("click", export2dSVG);

const btnShare2dEl = document.getElementById("btnShare2d");
if (btnShare2dEl)
  btnShare2dEl.addEventListener("click", () => {
    const state = {
      type: curve2dSelect ? curve2dSelect.value : "rosace",
      a: slider2dA ? slider2dA.value : null,
      b: slider2dB ? slider2dB.value : null,
      polarExpr: document.getElementById("inputPolarR")?.value || "",
      paramX: document.getElementById("inputParamX")?.value || "",
      paramY: document.getElementById("inputParamY")?.value || "",
      thetaRange: document.getElementById("sliderThetaRange")?.value || null,
      paramRange: document.getElementById("sliderParamRange")?.value || null,
      trail: trailMax,
      showV: (chkV && chkV.checked) || false,
      showA: (chkA && chkA.checked) || false,
    };
    const s = encodeURIComponent(JSON.stringify(state));
    const url = location.origin + location.pathname + "#state=" + s;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        const fb = document.getElementById("shareFeedback2d");
        if (fb) {
          fb.textContent = "✓ Copié !";
          setTimeout(() => (fb.textContent = ""), 1500);
        }
      });
    }
    location.hash = "state=" + s;
  });

// [FIX] Restore state : vérifications null sur tous les éléments DOM
function restoreStateFromHash() {
  if (!location.hash) return;
  const m = location.hash.match(/state=(.*)/);
  if (!m) return;
  try {
    const obj = JSON.parse(decodeURIComponent(m[1]));
    if (!obj) return;

    if (obj.type && curve2dSelect) {
      curve2dSelect.value = obj.type;
      curve2dSelect.dispatchEvent(new Event("change"));
    }
    if (obj.a != null && slider2dA) {
      slider2dA.value = obj.a;
      if (val2dA) val2dA.textContent = obj.a;
    }
    if (obj.b != null && slider2dB) {
      slider2dB.value = obj.b;
      if (val2dB) val2dB.textContent = obj.b;
    }

    const inpPolar = document.getElementById("inputPolarR");
    if (obj.polarExpr && inpPolar) {
      inpPolar.value = obj.polarExpr;
      debouncedCompilePolar();
    }
    const inpParamX = document.getElementById("inputParamX");
    const inpParamY = document.getElementById("inputParamY");
    if (obj.paramX && inpParamX) {
      inpParamX.value = obj.paramX;
    }
    if (obj.paramY && inpParamY) {
      inpParamY.value = obj.paramY;
      debouncedCompileParam();
    }

    const sliderTheta = document.getElementById("sliderThetaRange");
    if (obj.thetaRange && sliderTheta) sliderTheta.value = obj.thetaRange;
    const sliderParam = document.getElementById("sliderParamRange");
    if (obj.paramRange && sliderParam) sliderParam.value = obj.paramRange;

    if (obj.trail) {
      trailMax = parseInt(obj.trail, 10) || 0;
    }
    // [FIX] Vérifier que les checkboxes existent avant d'y accéder
    if (obj.showV && chkV) chkV.checked = true;
    if (obj.showA && chkA) chkA.checked = true;

    draw2d();
  } catch (e) {
    console.warn("restoreStateFromHash failed", e);
  }
}

// [FIX] Un seul point d'initialisation DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // Gallery : populate seulement ici, pas en double
  const activeTab = document.querySelector(".gallery-tab.active");
  if (activeTab) populateGallery(activeTab.dataset.cat || "classiques");

  // Gallery modal close on overlay click
  const modal = document.getElementById("galleryModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeGallery();
    });
  }

  // Restore URL state
  restoreStateFromHash();
});

/* --- Animation 2D --- */

function toggle2dAnimation() {
  if (anim2d.running) {
    stop2dAnimation();
  } else {
    start2dAnimation();
  }
}

function start2dAnimation() {
  anim2d.running = true;
  anim2d.t = 0;
  // [FIX] Vider la traînée au démarrage d'une nouvelle animation
  trail2d.length = 0;
  if (btn2dAnimate) btn2dAnimate.textContent = "⏸ Pause";
  animate2d();
}

function stop2dAnimation() {
  anim2d.running = false;
  if (anim2d.id) cancelAnimationFrame(anim2d.id);
  anim2d.id = null;
  if (btn2dAnimate) btn2dAnimate.textContent = "▶ Animer";
}

function animate2d() {
  if (!anim2d.running) return;
  anim2d.t += 0.003;
  if (anim2d.t > 1) anim2d.t = 0;
  draw2d();
  anim2d.id = requestAnimationFrame(animate2d);
}

function reset2d() {
  stop2dAnimation();
  anim2d.t = 0;
  trail2d.length = 0;
  draw2d();
}

// Dessin initial
draw2d();

/* ══════════════════════════════════════════
   SECTION 3 — VISUALISATION 3D (Three.js)
   ══════════════════════════════════════════ */

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container3d = document.getElementById("three-container");
let scene, camera, renderer, controls;
let curveLine3d, animPoint3d, animLine3d, gridHelper;
let anim3d = { running: false, t: 0, id: null };

function init3d() {
  if (!container3d) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222632);

  const w = container3d.clientWidth || 600;
  const h = container3d.clientHeight || 500;
  camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
  camera.position.set(6, 4, 6);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container3d.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  gridHelper = new THREE.GridHelper(12, 12, 0x2e3348, 0x2e334844);
  scene.add(gridHelper);

  addAxes3d();

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));

  update3dCurve();
  render3dLoop();

  window.addEventListener("resize", resize3d);
}

function addAxes3d() {
  const len = 6;
  const matX = new THREE.LineBasicMaterial({ color: 0xe74c3c });
  const matY = new THREE.LineBasicMaterial({ color: 0x2ecc71 });
  const matZ = new THREE.LineBasicMaterial({ color: 0x3498db });

  const geoX = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-len, 0, 0),
    new THREE.Vector3(len, 0, 0),
  ]);
  scene.add(new THREE.Line(geoX, matX));

  const geoY = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, -len, 0),
    new THREE.Vector3(0, len, 0),
  ]);
  scene.add(new THREE.Line(geoY, matY));

  const geoZ = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, -len),
    new THREE.Vector3(0, 0, len),
  ]);
  scene.add(new THREE.Line(geoZ, matZ));

  addAxisLabel("X", len + 0.3, 0, 0, 0xe74c3c);
  addAxisLabel("Y", 0, len + 0.3, 0, 0x2ecc71);
  addAxisLabel("Z", 0, 0, len + 0.3, 0x3498db);
}

function addAxisLabel(text, x, y, z, color) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#" + color.toString(16).padStart(6, "0");
  ctx.font = "bold 48px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 32, 32);

  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.position.set(x, y, z);
  sprite.scale.set(0.6, 0.6, 0.6);
  scene.add(sprite);
}

function resize3d() {
  if (!container3d || !renderer || !camera) return;
  const w = container3d.clientWidth;
  const h = container3d.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function render3dLoop() {
  if (!renderer) return;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render3dLoop);
}

/* --- Courbes 3D --- */

// [FIX] Signature cohérente : accepter a, b, c même si non utilisés
function getMaxT3d(type, a, b, c) {
  switch (type) {
    case "helice":
      return Math.PI * 8;
    case "torique":
      return Math.PI * 2;
    case "lissajous3d":
      return Math.PI * 2;
    case "ressort":
      return Math.PI * 8;
    case "spirale_sphere":
      return Math.PI * 10;
    case "custom_3d": {
      const slider = document.getElementById("slider3dTRange");
      return Math.PI * (slider ? parseFloat(slider.value) : 2);
    }
    default:
      return Math.PI * 4;
  }
}

function getCurve3dPoints(type, a, b, c, tMax) {
  const points = [];
  const steps = 1500;
  const maxT = tMax != null ? tMax : getMaxT3d(type, a, b, c);

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * maxT;
    const p = evalCurve3d(type, a, b, c, t);
    points.push(new THREE.Vector3(p.x, p.y, p.z));
  }
  return points;
}

function evalCurve3d(type, a, b, c, t) {
  switch (type) {
    case "helice": {
      return {
        x: a * Math.cos(t),
        y: (t / (Math.PI * 2)) * 2,
        z: a * Math.sin(t),
      };
    }
    case "torique": {
      const p = Math.round(a);
      const q = Math.round(b);
      const R = 3;
      const rr = 1;
      const r = R + rr * Math.cos(q * t);
      return {
        x: r * Math.cos(p * t),
        y: rr * Math.sin(q * t),
        z: r * Math.sin(p * t),
      };
    }
    case "lissajous3d": {
      const s = 3;
      return {
        x: s * Math.sin(a * t),
        y: s * Math.sin(b * t + Math.PI / 4),
        z: s * Math.cos(c * t),
      };
    }
    case "ressort": {
      const maxT = Math.PI * 8;
      const radius = a * (1 - (t / maxT) * 0.7);
      return {
        x: radius * Math.cos(b * t),
        y: (t / maxT) * 6 - 3,
        z: radius * Math.sin(b * t),
      };
    }
    case "spirale_sphere": {
      const maxT = Math.PI * 10;
      const phi = (t / maxT) * Math.PI - Math.PI / 2;
      const theta = b * t;
      return {
        x: a * Math.cos(phi) * Math.cos(theta),
        y: a * Math.sin(phi),
        z: a * Math.cos(phi) * Math.sin(theta),
      };
    }
    case "custom_3d": {
      if (!custom3d.compiledX || !custom3d.compiledY || !custom3d.compiledZ) {
        return { x: 0, y: 0, z: 0 };
      }
      const scope = { t: t, theta: t, pi: Math.PI };
      try {
        return {
          x: custom3d.compiledX.evaluate(scope),
          y: custom3d.compiledY.evaluate(scope),
          z: custom3d.compiledZ.evaluate(scope),
        };
      } catch {
        return { x: 0, y: 0, z: 0 };
      }
    }
    default:
      return { x: 0, y: 0, z: 0 };
  }
}

function getCurve3dEquation(type, a, b, c) {
  switch (type) {
    case "helice":
      return `\\begin{cases} x = ${a}\\cos(t) \\\\ y = \\frac{t}{\\pi} \\\\ z = ${a}\\sin(t) \\end{cases}`;
    case "torique":
      return `\\text{Nœud torique } (p=${Math.round(a)},\\; q=${Math.round(b)})`;
    case "lissajous3d":
      return `\\begin{cases} x = \\sin(${a}t) \\\\ y = \\sin(${b}t + \\pi/4) \\\\ z = \\cos(${c}t) \\end{cases}`;
    case "ressort":
      return `\\text{Ressort conique } (R=${a},\\; \\omega=${b})`;
    case "spirale_sphere":
      return `\\text{Spirale sphérique } (R=${a},\\; b=${b})`;
    case "custom_3d": {
      const sx = custom3d.lastGoodX || "?";
      const sy = custom3d.lastGoodY || "?";
      const sz = custom3d.lastGoodZ || "?";
      return `\\begin{cases} x = ${exprToTex(sx)} \\\\ y = ${exprToTex(sy)} \\\\ z = ${exprToTex(sz)} \\end{cases}`;
    }
    default:
      return "";
  }
}
/* ── Custom 3D equation editor ── */
const custom3d = {
  compiledX: null,
  compiledY: null,
  compiledZ: null,
  lastGoodX: "",
  lastGoodY: "",
  lastGoodZ: "",
};

const debouncedCompile3d = debounce(() => {
  const ix = document.getElementById("input3dX");
  const iy = document.getElementById("input3dY");
  const iz = document.getElementById("input3dZ");
  const ex = document.getElementById("error3dX");
  const ey = document.getElementById("error3dY");
  const ez = document.getElementById("error3dZ");
  if (!ix || !iy || !iz) return;

  const rawX = preprocessExpr(ix.value);
  const rawY = preprocessExpr(iy.value);
  const rawZ = preprocessExpr(iz.value);

  if (!rawX || !rawY || !rawZ) {
    if (ex) ex.textContent = rawX ? "" : "Expression x vide";
    if (ey) ey.textContent = rawY ? "" : "Expression y vide";
    if (ez) ez.textContent = rawZ ? "" : "Expression z vide";
    return;
  }

  if (typeof math === "undefined") return;

  try {
    custom3d.compiledX = math.parse(rawX).compile();
    custom3d.compiledY = math.parse(rawY).compile();
    custom3d.compiledZ = math.parse(rawZ).compile();
    custom3d.lastGoodX = rawX;
    custom3d.lastGoodY = rawY;
    custom3d.lastGoodZ = rawZ;
    [ex, ey, ez].forEach((e) => {
      if (e) e.textContent = "";
    });
    [ix, iy, iz].forEach((i) => i.classList.remove("input-error"));
    update3dCurve();
  } catch (e) {
    const msg = (e && e.message) || String(e);
    if (ex) ex.textContent = msg;
    [ix, iy, iz].forEach((i) => i.classList.add("input-error"));
  }
}, 300);

// Attach listeners
["input3dX", "input3dY", "input3dZ"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", () => debouncedCompile3d());
});

// Chips 3D
const chips3dEl = document.getElementById("chips3d");
if (chips3dEl) {
  chips3dEl.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ix = document.getElementById("input3dX");
      const iy = document.getElementById("input3dY");
      const iz = document.getElementById("input3dZ");
      if (btn.dataset.x && ix) ix.value = btn.dataset.x;
      if (btn.dataset.y && iy) iy.value = btn.dataset.y;
      if (btn.dataset.z && iz) iz.value = btn.dataset.z;
      debouncedCompile3d();
    });
  });
}
/* --- Mise à jour scène 3D --- */

function update3dCurve() {
  if (!scene) return;
  const type = document.getElementById("curve3dSelect")?.value || "helice";
  const a = parseFloat(document.getElementById("slider3dA")?.value || 2);
  const b = parseFloat(document.getElementById("slider3dB")?.value || 3);
  const c = parseFloat(document.getElementById("slider3dC")?.value || 2);

  if (curveLine3d) {
    scene.remove(curveLine3d);
    curveLine3d.geometry.dispose();
  }
  if (animPoint3d) scene.remove(animPoint3d);
  if (animLine3d) {
    scene.remove(animLine3d);
    animLine3d.geometry.dispose();
  }

  const points = getCurve3dPoints(type, a, b, c, null);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0x6c63ff,
    linewidth: 2,
  });
  curveLine3d = new THREE.Line(geometry, material);
  scene.add(curveLine3d);

  const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16);
  const sphereMat = new THREE.MeshBasicMaterial({ color: 0xf5c842 });
  animPoint3d = new THREE.Mesh(sphereGeo, sphereMat);
  animPoint3d.visible = false;
  scene.add(animPoint3d);

  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0),
  ]);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00cfc8,
    transparent: true,
    opacity: 0.4,
  });
  animLine3d = new THREE.Line(lineGeo, lineMat);
  animLine3d.visible = false;
  scene.add(animLine3d);

  updateEquation3d(type, a, b, c);
}

function updateEquation3d(type, a, b, c) {
  const el = document.getElementById("equation3d");
  if (!el || typeof katex === "undefined") return;
  const tex = getCurve3dEquation(type, a, b, c);
  try {
    katex.render(tex, el, { displayMode: false, throwOnError: false });
  } catch (e) {
    el.textContent = tex;
  }
}

/* --- Animation 3D --- */

function toggle3dAnimation() {
  if (anim3d.running) {
    stop3dAnimation();
  } else {
    start3dAnimation();
  }
}

function start3dAnimation() {
  anim3d.running = true;
  anim3d.t = 0;
  if (animPoint3d) animPoint3d.visible = true;
  if (animLine3d) animLine3d.visible = true;
  const btn = document.getElementById("btn3dAnimate");
  if (btn) btn.textContent = "⏸ Pause";
  animate3d();
}

function stop3dAnimation() {
  anim3d.running = false;
  if (anim3d.id) cancelAnimationFrame(anim3d.id);
  anim3d.id = null;
  const btn = document.getElementById("btn3dAnimate");
  if (btn) btn.textContent = "▶ Animer";
}

function animate3d() {
  if (!anim3d.running) return;
  const type = document.getElementById("curve3dSelect")?.value || "helice";
  const a = parseFloat(document.getElementById("slider3dA")?.value || 2);
  const b = parseFloat(document.getElementById("slider3dB")?.value || 3);
  const c = parseFloat(document.getElementById("slider3dC")?.value || 2);
  const maxT = getMaxT3d(type, a, b, c);

  anim3d.t += 0.003;
  if (anim3d.t > 1) anim3d.t = 0;

  const t = anim3d.t * maxT;
  const p = evalCurve3d(type, a, b, c, t);

  if (animPoint3d) {
    animPoint3d.position.set(p.x, p.y, p.z);
  }

  if (animLine3d) {
    const positions = animLine3d.geometry.attributes.position.array;
    positions[3] = p.x;
    positions[4] = p.y;
    positions[5] = p.z;
    animLine3d.geometry.attributes.position.needsUpdate = true;
  }

  anim3d.id = requestAnimationFrame(animate3d);
}

function reset3d() {
  stop3dAnimation();
  anim3d.t = 0;
  if (animPoint3d) animPoint3d.visible = false;
  if (animLine3d) animLine3d.visible = false;
}

/* --- Event listeners 3D --- */
const slider3dA = document.getElementById("slider3dA");
const slider3dB = document.getElementById("slider3dB");
const slider3dC = document.getElementById("slider3dC");
const curve3dSelect = document.getElementById("curve3dSelect");

if (slider3dA)
  slider3dA.addEventListener("input", () => {
    document.getElementById("val3dA").textContent = slider3dA.value;
    update3dCurve();
  });
if (slider3dB)
  slider3dB.addEventListener("input", () => {
    document.getElementById("val3dB").textContent = slider3dB.value;
    update3dCurve();
  });
if (slider3dC)
  slider3dC.addEventListener("input", () => {
    document.getElementById("val3dC").textContent = slider3dC.value;
    update3dCurve();
  });
if (curve3dSelect)
  curve3dSelect.addEventListener("change", () => {
    stop3dAnimation();
    const v = curve3dSelect.value;
    const custom3dInputs = document.getElementById("custom3dInputs");
    const presetSliders3d = document.getElementById("presetSliders3d");
    if (custom3dInputs)
      custom3dInputs.style.display = v === "custom_3d" ? "block" : "none";
    if (presetSliders3d)
      presetSliders3d.style.display = v === "custom_3d" ? "none" : "block";
    update3dCurve();
  });

const btn3dAnimate = document.getElementById("btn3dAnimate");
const btn3dReset = document.getElementById("btn3dReset");
if (btn3dAnimate) btn3dAnimate.addEventListener("click", toggle3dAnimation);
if (btn3dReset) btn3dReset.addEventListener("click", reset3d);

// Init 3D
init3d();
