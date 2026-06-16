/* ==============================
   NAVBAR BURGER
============================== */
function toggleMenu() {
  document.getElementById("burger").classList.toggle("open");
  document.getElementById("navLinks").classList.toggle("open");
}
// Fermer le menu au clic sur un lien (mobile)
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    document.getElementById("burger").classList.remove("open");
    document.getElementById("navLinks").classList.remove("open");
  });
});

/* ==============================
   HELPERS MODALS
============================== */
function openOverlay(id) {
  document.getElementById(id).classList.add("open");
}
function closeOverlay(id) {
  document.getElementById(id).classList.remove("open");
}
document.querySelectorAll(".overlay").forEach((ov) => {
  ov.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeOverlay(ov.id);
  });
});

/* ==============================
   PILE OU FACE
============================== */
let coinPile = 0,
  coinFace = 0,
  coinN = 1;
const coinHistory = [];
let coinChart;

function openCoinModal() {
  openOverlay("coinOverlay");
  if (!coinChart) initCoinChart();
}
function closeCoinModal() {
  closeOverlay("coinOverlay");
}

function selectCoinN(btn) {
  btn
    .closest(".controls")
    .querySelectorAll(".btn-outline")
    .forEach((b) => b.classList.remove("active-btn"));
  btn.classList.add("active-btn");
  coinN = parseInt(btn.dataset.n);
}

function flipCoins() {
  const el = document.getElementById("coin");
  let lp = 0,
    lf = 0;
  for (let i = 0; i < coinN; i++) Math.random() < 0.5 ? lp++ : lf++;
  coinPile += lp;
  coinFace += lf;

  el.classList.remove("flip", "flip-face");
  void el.offsetWidth;
  el.classList.add(lp >= lf ? "flip" : "flip-face");

  document.getElementById("lastCoinResult").textContent =
    coinN === 1 ? (lp ? "→ Pile !" : "→ Face !") : `→ ${lp} pile · ${lf} face`;
  updateCoinUI();
}

function updateCoinUI() {
  const t = coinPile + coinFace;
  document.getElementById("pileCount").textContent = coinPile;
  document.getElementById("faceCount").textContent = coinFace;
  document.getElementById("coinTotal").textContent = t;
  document.getElementById("pilePct").textContent = t
    ? ((coinPile / t) * 100).toFixed(1) + " %"
    : "0 %";
  document.getElementById("facePct").textContent = t
    ? ((coinFace / t) * 100).toFixed(1) + " %"
    : "0 %";
  coinHistory.push({ t, pct: t ? (coinPile / t) * 100 : 50 });
  updateCoinChart();
}

function initCoinChart() {
  try {
    const ctx = document.getElementById("coinChart").getContext("2d");
    coinChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "% Pile",
            data: [],
            borderColor: "#f5c842",
            backgroundColor: "rgba(245,200,66,.1)",
            tension: 0.35,
            fill: true,
            pointRadius: 2,
          },
          {
            label: "Théorique (50%)",
            data: [],
            borderColor: "rgba(108,99,255,.5)",
            borderDash: [6, 4],
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#8b8fa3", font: { size: 11 } } },
        },
        scales: {
          x: {
            ticks: { color: "#555", maxTicksLimit: 12 },
            grid: { color: "#2e334822" },
          },
          y: {
            min: 0,
            max: 100,
            ticks: { color: "#555", callback: (v) => v + " %" },
            grid: { color: "#2e334833" },
          },
        },
      },
    });
  } catch (err) {
    console.error("initCoinChart error:", err);
    coinChart = null;
  }
}

function updateCoinChart() {
  if (!coinChart) return;
  const l = coinHistory.map((_, i) => i + 1);
  coinChart.data.labels = l;
  coinChart.data.datasets[0].data = coinHistory.map((h) => h.pct);
  coinChart.data.datasets[1].data = l.map(() => 50);
  coinChart.update();
}

function resetCoin() {
  coinPile = 0;
  coinFace = 0;
  coinHistory.length = 0;
  ["pileCount", "faceCount", "coinTotal"].forEach(
    (id) => (document.getElementById(id).textContent = "0"),
  );
  ["pilePct", "facePct"].forEach(
    (id) => (document.getElementById(id).textContent = "0 %"),
  );
  document.getElementById("lastCoinResult").textContent = "Cliquez pour lancer";
  document.getElementById("coin").classList.remove("flip", "flip-face");
  if (coinChart) {
    coinChart.data.labels = [];
    coinChart.data.datasets.forEach((d) => (d.data = []));
    coinChart.update();
  }
}

/* ==============================
   LANCER DE DÉ
============================== */
let diceCounts = [0, 0, 0, 0, 0, 0],
  diceN = 1,
  diceTotal = 0;
const diceHistory = [];
let diceChart;

function openDiceModal() {
  openOverlay("diceOverlay");
  if (!diceChart) initDiceChart();
}
function closeDiceModal() {
  closeOverlay("diceOverlay");
}

function selectDiceN(btn) {
  btn
    .closest(".controls")
    .querySelectorAll(".btn-outline")
    .forEach((b) => b.classList.remove("active-btn"));
  btn.classList.add("active-btn");
  diceN = parseInt(btn.dataset.dn);
}

function rollDice() {
  const el = document.getElementById("dice");
  let lastFace = 1;
  const local = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < diceN; i++) {
    const f = Math.floor(Math.random() * 6);
    local[f]++;
    lastFace = f + 1;
  }
  for (let i = 0; i < 6; i++) diceCounts[i] += local[i];
  diceTotal += diceN;

  // Animate
  el.classList.remove("dice-roll");
  void el.offsetWidth;
  el.classList.add("dice-roll");
  document.getElementById("diceVal").textContent = lastFace;

  const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  document.getElementById("lastDiceResult").textContent =
    diceN === 1
      ? `→ ${faces[lastFace - 1]} ${lastFace} !`
      : `→ ${diceN} lancers effectués`;

  updateDiceUI();
}

function updateDiceUI() {
  const max = Math.max(...diceCounts, 1);
  for (let i = 1; i <= 6; i++) {
    document.getElementById("count" + i).textContent = diceCounts[i - 1];
    document.getElementById("bar" + i).style.width =
      (diceCounts[i - 1] / max) * 100 + "%";
  }
  document.getElementById("diceTotal").textContent = diceTotal;
  diceHistory.push(diceCounts.map((c) => (c / diceTotal) * 100));
  updateDiceChart();
}

function initDiceChart() {
  try {
    const colors = [
      "#e74c3c",
      "#e67e22",
      "#f1c40f",
      "#2ecc71",
      "#3498db",
      "#9b59b6",
    ];
    const ctx = document.getElementById("diceChart").getContext("2d");
    diceChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [1, 2, 3, 4, 5, 6].map((f, i) => ({
          label: "Face " + f,
          data: [],
          borderColor: colors[i],
          tension: 0.3,
          pointRadius: 1,
          borderWidth: 2,
          fill: false,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#8b8fa3",
              font: { size: 10 },
              boxWidth: 12,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#555", maxTicksLimit: 12 },
            grid: { color: "#2e334822" },
          },
          y: {
            min: 0,
            max: 50,
            ticks: { color: "#555", callback: (v) => v + " %" },
            grid: { color: "#2e334833" },
          },
        },
      },
    });
  } catch (err) {
    console.error("initDiceChart error:", err);
    diceChart = null;
  }
}

function updateDiceChart() {
  if (!diceChart) return;
  const l = diceHistory.map((_, i) => i + 1);
  diceChart.data.labels = l;
  for (let f = 0; f < 6; f++)
    diceChart.data.datasets[f].data = diceHistory.map((h) => h[f]);
  diceChart.update();
}

function resetDice() {
  diceCounts = [0, 0, 0, 0, 0, 0];
  diceTotal = 0;
  diceHistory.length = 0;
  for (let i = 1; i <= 6; i++) {
    document.getElementById("count" + i).textContent = "0";
    document.getElementById("bar" + i).style.width = "0%";
  }
  document.getElementById("diceTotal").textContent = "0";
  document.getElementById("diceVal").textContent = "?";
  document.getElementById("lastDiceResult").textContent = "Cliquez pour lancer";
  document.getElementById("dice").classList.remove("dice-roll");
  if (diceChart) {
    diceChart.data.labels = [];
    diceChart.data.datasets.forEach((d) => (d.data = []));
    diceChart.update();
  }
}

/* ==============================
   VECTEUR & MOUVEMENT
============================== */
let vecAnimId = null,
  vecRunning = false;
let point = { x: 250, y: 200 };
let velocity = { x: 2, y: 1.5 };
const trail = [];

function openVectorModal() {
  openOverlay("vectorOverlay");
  resizeVectorCanvas();
  drawVector();
}
function closeVectorModal() {
  closeOverlay("vectorOverlay");
  pauseVector();
}

function resizeVectorCanvas() {
  const canvas = document.getElementById("vectorCanvas");
  const container = canvas.parentElement;
  canvas.width = container.clientWidth - 4;
  canvas.height = Math.min(400, window.innerHeight * 0.45);
}

function startVector() {
  if (vecRunning) return;
  point.x = parseFloat(document.getElementById("posX").value) || 0;
  point.y = parseFloat(document.getElementById("posY").value) || 0;
  velocity.x = parseFloat(document.getElementById("velX").value) || 0;
  velocity.y = parseFloat(document.getElementById("velY").value) || 0;
  vecRunning = true;
  trail.length = 0;
  animateVector();
}

function pauseVector() {
  vecRunning = false;
  if (vecAnimId) {
    cancelAnimationFrame(vecAnimId);
    vecAnimId = null;
  }
}

function resetVector() {
  pauseVector();
  point = { x: 250, y: 200 };
  velocity = { x: 2, y: 1.5 };
  trail.length = 0;
  document.getElementById("posX").value = 250;
  document.getElementById("posY").value = 200;
  document.getElementById("velX").value = 2;
  document.getElementById("velY").value = 1.5;
  updateVectorInfo();
  drawVector();
}

function animateVector() {
  if (!vecRunning) return;
  const canvas = document.getElementById("vectorCanvas");
  const W = canvas.width,
    H = canvas.height;

  trail.push({ x: point.x, y: point.y });
  if (trail.length > 500) trail.shift();

  point.x += velocity.x;
  point.y += velocity.y;

  // Rebond sur les bords
  if (point.x <= 0 || point.x >= W) {
    velocity.x *= -1;
    point.x = Math.max(0, Math.min(W, point.x));
  }
  if (point.y <= 0 || point.y >= H) {
    velocity.y *= -1;
    point.y = Math.max(0, Math.min(H, point.y));
  }

  updateVectorInfo();
  drawVector();
  vecAnimId = requestAnimationFrame(animateVector);
}

function updateVectorInfo() {
  document.getElementById("dispX").textContent = point.x.toFixed(1);
  document.getElementById("dispY").textContent = point.y.toFixed(1);
  document.getElementById("dispVX").textContent = velocity.x.toFixed(1);
  document.getElementById("dispVY").textContent = velocity.y.toFixed(1);
}

function drawVector() {
  const canvas = document.getElementById("vectorCanvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Grille
  ctx.strokeStyle = "#2e334844";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Trainée
  if (trail.length > 1) {
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);
    for (let i = 1; i < trail.length; i++) {
      const alpha = i / trail.length;
      ctx.strokeStyle = `rgba(108,99,255,${alpha * 0.6})`;
      ctx.lineWidth = 2;
      ctx.lineTo(trail[i].x, trail[i].y);
    }
    ctx.stroke();
  }

  // Vecteur vélocité
  const scale = 15;
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x + velocity.x * scale, point.y + velocity.y * scale);
  ctx.strokeStyle = "#00cfc8";
  ctx.lineWidth = 2;
  ctx.stroke();
  // Flèche
  const angle = Math.atan2(velocity.y, velocity.x);
  const tipX = point.x + velocity.x * scale;
  const tipY = point.y + velocity.y * scale;
  ctx.beginPath();
  ctx.moveTo(tipX, tipY);
  ctx.lineTo(
    tipX - 8 * Math.cos(angle - 0.4),
    tipY - 8 * Math.sin(angle - 0.4),
  );
  ctx.moveTo(tipX, tipY);
  ctx.lineTo(
    tipX - 8 * Math.cos(angle + 0.4),
    tipY - 8 * Math.sin(angle + 0.4),
  );
  ctx.strokeStyle = "#00cfc8";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Point
  ctx.beginPath();
  ctx.arc(point.x, point.y, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#6c63ff";
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Responsive canvas
window.addEventListener("resize", () => {
  if (document.getElementById("vectorOverlay").classList.contains("open")) {
    resizeVectorCanvas();
    drawVector();
  }
});

/* ==============================
   STRUCTURE RELATIONNELLE (améliorée)
   - ajout/suppression nœuds
   - déplacement par glisser
   - création d'arêtes (mode arête)
   - matrice d'adjacence dynamique
============================== */

let relCanvas = null;
let relCtx = null;
let relNodes = [];
let relEdges = []; // {from: 'A', to: 'B'}
let relNodeRadius = 22;
let relMode = "move"; // or 'edge'
let relSelected = null; // for edge creation
let relDrag = null;
let relInitialized = false;
let relCounter = 0;

function openRelModal() {
  openOverlay("relOverlay");
  resizeRelCanvas();
  initRel();
  drawRelGraph();
}
function closeRelModal() {
  closeOverlay("relOverlay");
}

function initRel() {
  relCanvas = document.getElementById("relCanvas");
  relCtx = relCanvas.getContext("2d");
  if (!relInitialized) {
    // initial nodes A,B,C
    resizeRelCanvas();
    const W = relCanvas.width,
      H = relCanvas.height;
    relNodes = [
      { id: "A", x: Math.round(W * 0.25), y: Math.round(H * 0.5) },
      { id: "B", x: Math.round(W * 0.75), y: Math.round(H * 0.3) },
      { id: "C", x: Math.round(W * 0.6), y: Math.round(H * 0.75) },
    ];
    // default full triangle
    relEdges = [
      { from: "A", to: "B" },
      { from: "B", to: "C" },
      { from: "C", to: "A" },
    ];

    // events
    relCanvas.addEventListener("mousedown", relMouseDown);
    relCanvas.addEventListener("mousemove", relMouseMove);
    window.addEventListener("mouseup", relMouseUp);
    relCanvas.addEventListener("dblclick", relDoubleClick);

    relInitialized = true;
    relCounter = 0;
  }
  renderRelMatrix();
}

function resizeRelCanvas() {
  const canvas = document.getElementById("relCanvas");
  const container = canvas.parentElement;
  canvas.width = Math.max(480, container.clientWidth - 4);
  canvas.height = Math.min(520, Math.max(300, window.innerHeight * 0.5));
}

function addRandomNode() {
  if (!relCanvas) initRel();
  const W = relCanvas.width,
    H = relCanvas.height;
  relCounter += 1;
  // label: use N1, N2 ... but avoid duplicates
  let label = `N${relCounter}`;
  while (relNodes.some((n) => n.id === label))
    relCounter++ && (label = `N${relCounter}`);
  const node = {
    id: label,
    x: Math.round(60 + Math.random() * (W - 120)),
    y: Math.round(40 + Math.random() * (H - 80)),
  };
  relNodes.push(node);
  renderRelMatrix();
  drawRelGraph();
}

function toggleRelMode() {
  relMode = relMode === "move" ? "edge" : "move";
  const btn = document.getElementById("relModeBtn");
  if (btn)
    btn.textContent = `Mode : ${relMode === "move" ? "déplacer" : "arête"}`;
}

function clearRelEdges() {
  relEdges.length = 0;
  renderRelMatrix();
  drawRelGraph();
}

function relMouseDown(e) {
  const pos = getRelPos(e);
  const hit = findNodeAt(pos.x, pos.y);
  if (relMode === "move") {
    if (hit) {
      relDrag = { node: hit, dx: pos.x - hit.x, dy: pos.y - hit.y };
      relCanvas.style.cursor = "grabbing";
    }
  } else {
    // edge mode
    if (hit) {
      if (!relSelected) {
        relSelected = hit;
      } else if (relSelected === hit) {
        relSelected = null;
      } else {
        // create edge from relSelected to hit
        relEdges.push({ from: relSelected.id, to: hit.id });
        relSelected = null;
        renderRelMatrix();
      }
      drawRelGraph();
    }
  }
}

function relMouseMove(e) {
  const pos = getRelPos(e);
  if (relDrag) {
    const n = relDrag.node;
    n.x = pos.x - relDrag.dx;
    n.y = pos.y - relDrag.dy;
    // clamp
    n.x = Math.max(
      relNodeRadius + 6,
      Math.min(relCanvas.width - relNodeRadius - 6, n.x),
    );
    n.y = Math.max(
      relNodeRadius + 6,
      Math.min(relCanvas.height - relNodeRadius - 6, n.y),
    );
    drawRelGraph();
  } else {
    // hover cursor change
    const hit = findNodeAt(pos.x, pos.y);
    relCanvas.style.cursor = hit
      ? relMode === "move"
        ? "grab"
        : "pointer"
      : "default";
  }
}

function relMouseUp() {
  if (relDrag) {
    relDrag = null;
    relCanvas.style.cursor = "default";
    renderRelMatrix();
  }
}

function relDoubleClick(e) {
  const pos = getRelPos(e);
  const hit = findNodeAt(pos.x, pos.y);
  if (hit) {
    const newName = prompt("Renommer le nœud (sans espaces)", hit.id);
    if (newName && newName.trim()) {
      const name = newName.trim();
      // avoid duplicates
      if (relNodes.some((n) => n !== hit && n.id === name)) {
        alert("Nom déjà utilisé");
      } else {
        // update edges referring to this id
        relEdges.forEach((e) => {
          if (e.from === hit.id) e.from = name;
          if (e.to === hit.id) e.to = name;
        });
        hit.id = name;
        renderRelMatrix();
        drawRelGraph();
      }
    }
  }
}

function getRelPos(e) {
  const rect = relCanvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function findNodeAt(x, y) {
  return (
    relNodes.find((n) => Math.hypot(n.x - x, n.y - y) <= relNodeRadius + 6) ||
    null
  );
}

function drawRelGraph() {
  if (!relCanvas || !relCtx) return;
  const canvas = relCanvas;
  const ctx = relCtx;
  const W = canvas.width,
    H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Draw edges
  ctx.lineWidth = 2;
  relEdges.forEach((e) => {
    const a = relNodes.find((n) => n.id === e.from);
    const b = relNodes.find((n) => n.id === e.to);
    if (!a || !b) return;
    // line
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = "rgba(108,99,255,0.9)";
    ctx.stroke();
    // arrow head if directed
    if (
      document.getElementById("relDirected") &&
      document.getElementById("relDirected").checked
    ) {
      drawArrowHead(ctx, a.x, a.y, b.x, b.y);
    }
  });

  // Draw nodes
  relNodes.forEach((n, i) => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, relNodeRadius, 0, Math.PI * 2);
    const color =
      i === 0
        ? "#f5c842"
        : i === 1
          ? "#6c63ff"
          : i === 2
            ? "#00cfc8"
            : "#6c63ff";
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    // label
    ctx.fillStyle = "#0f1117";
    ctx.font = "700 14px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(n.id, n.x, n.y);
  });

  // highlight selected for edge creation
  if (relSelected) {
    ctx.beginPath();
    ctx.arc(relSelected.x, relSelected.y, relNodeRadius + 6, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawArrowHead(ctx, x1, y1, x2, y2) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const len = 12;
  const hx = x2 - Math.cos(angle) * (relNodeRadius + 6);
  const hy = y2 - Math.sin(angle) * (relNodeRadius + 6);
  ctx.beginPath();
  ctx.moveTo(hx, hy);
  ctx.lineTo(
    hx - len * Math.cos(angle - 0.4),
    hy - len * Math.sin(angle - 0.4),
  );
  ctx.moveTo(hx, hy);
  ctx.lineTo(
    hx - len * Math.cos(angle + 0.4),
    hy - len * Math.sin(angle + 0.4),
  );
  ctx.strokeStyle = "rgba(108,99,255,0.95)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function renderRelMatrix() {
  const el = document.getElementById("relMatrix");
  if (!el) return;
  const ids = relNodes.map((n) => n.id);
  const directed =
    document.getElementById("relDirected") &&
    document.getElementById("relDirected").checked;
  // build adjacency map
  const map = {};
  ids.forEach((id) => (map[id] = {}));
  relEdges.forEach((e) => {
    if (!map[e.from] || !map[e.to]) return;
    map[e.from][e.to] = 1;
    if (!directed) map[e.to][e.from] = 1;
  });
  // HTML table
  let html = '<div class="matrix-title">Matrice d\'adjacence</div>';
  html +=
    '<table class="matrix-table"><thead><tr><th></th>' +
    ids.map((id) => `<th>${id}</th>`).join("") +
    "</tr></thead><tbody>";
  ids.forEach((r) => {
    html +=
      `<tr><th>${r}</th>` +
      ids.map((c) => `<td>${map[r][c] ? 1 : 0}</td>`).join("") +
      `</tr>`;
  });
  html += "</tbody></table>";
  el.innerHTML = html;
}

// Helper: keep canvas responsive
window.addEventListener("resize", () => {
  if (
    document.getElementById("relOverlay") &&
    document.getElementById("relOverlay").classList.contains("open")
  ) {
    resizeRelCanvas();
    drawRelGraph();
    renderRelMatrix();
  }
});
