(function () {
  "use strict";

  /* ── État ──────────────────────────────────── */
  var drawnPoints = [];
  var fourierData = [];
  var path = [];
  var drawingMode = false;
  var playing = false;
  var isDrawing = false;
  var time = 0;
  var animId = null;

  /* ── Canvas ────────────────────────────────── */
  var canvas = document.getElementById("fourierCanvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");

  function resize() {
    var wrapper = canvas.parentElement;
    canvas.width = wrapper ? wrapper.clientWidth : 600;
    canvas.height = wrapper ? (wrapper.clientHeight || 500) : 500;
  }
  resize();
  window.addEventListener("resize", function () {
    resize();
    if (!playing && fourierData.length > 0) drawStatic();
  });

  /* ── DFT ────────────────────────────────────── */
  function dft(points) {
    var N = points.length;
    var result = [];
    for (var k = 0; k < N; k++) {
      var re = 0, im = 0;
      for (var n = 0; n < N; n++) {
        var phi = (2 * Math.PI * k * n) / N;
        re += points[n].re * Math.cos(phi) + points[n].im * Math.sin(phi);
        im += points[n].im * Math.cos(phi) - points[n].re * Math.sin(phi);
      }
      re /= N;
      im /= N;
      result.push({
        freq: k,
        amp: Math.sqrt(re * re + im * im),
        phase: Math.atan2(im, re)
      });
    }
    result.sort(function (a, b) { return b.amp - a.amp; });
    return result;
  }

  /* ── Sous-échantillonnage ──────────────────── */
  function subsample(pts, maxN) {
    if (pts.length <= maxN) return pts;
    var result = [];
    for (var i = 0; i < maxN; i++) {
      result.push(pts[Math.floor((i / maxN) * pts.length)]);
    }
    return result;
  }

  /* ── Position souris ───────────────────────── */
  function getPos(e) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  /* ── Souris : dessin ───────────────────────── */
  canvas.addEventListener("mousedown", function (e) {
    if (!drawingMode) return;
    e.preventDefault();
    isDrawing = true;
    stopAnimation();
    playing = false;
    updatePlayBtn();
    drawnPoints = [];
    fourierData = [];
    path = [];
    time = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawnPoints.push(getPos(e));
  });

  canvas.addEventListener("mousemove", function (e) {
    if (!isDrawing) return;
    e.preventDefault();
    var pos = getPos(e);
    var prev = drawnPoints[drawnPoints.length - 1];
    drawnPoints.push(pos);
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#6c63ff";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  });

  function finalizeDraw() {
    if (!isDrawing) return;
    isDrawing = false;
    if (drawnPoints.length < 4) return;

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var sampled = subsample(drawnPoints, 256);
    var complexPts = sampled.map(function (p) {
      return { re: p.x - cx, im: p.y - cy };
    });

    fourierData = dft(complexPts);

    /* Ajuste le slider selon le nombre de composantes réelles */
    if (sliderEl) {
      sliderEl.max = fourierData.length;
      if (parseInt(sliderEl.value, 10) > fourierData.length) {
        sliderEl.value = fourierData.length;
      }
    }
    updateCountDisplay();
    path = [];
    time = 0;
    playing = true;
    updatePlayBtn();
    startAnimation();
  }

  canvas.addEventListener("mouseup", finalizeDraw);
  canvas.addEventListener("mouseleave", finalizeDraw);

  /* ── Calcul + dessin des épicycles ─────────── */
  function computeAndDraw(t) {
    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var x = cx, y = cy;
    var n = Math.min(getNEpicycles(), fourierData.length);

    for (var i = 0; i < n; i++) {
      var prevX = x, prevY = y;
      var f = fourierData[i];
      x += f.amp * Math.cos(f.freq * t + f.phase);
      y += f.amp * Math.sin(f.freq * t + f.phase);

      /* Cercle (gris translucide) */
      ctx.beginPath();
      ctx.arc(prevX, prevY, Math.max(f.amp, 0.5), 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(139,143,163,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      /* Rayon (violet translucide) */
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(108,99,255,0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    return { x: x, y: y };
  }

  /* ── Tracé de la courbe reconstruite ────────── */
  function drawPath() {
    if (path.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (var i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.shadowColor = "#6c63ff";
    ctx.shadowBlur = 10;
    ctx.strokeStyle = "#6c63ff";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  /* ── Point traceur doré ──────────────────────── */
  function drawTip(tip) {
    ctx.beginPath();
    ctx.arc(tip.x, tip.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#f5c842";
    ctx.fill();
  }

  /* ── Rendu statique (pause) ─────────────────── */
  function drawStatic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (fourierData.length === 0) return;
    var tip = computeAndDraw(time);
    drawPath();
    drawTip(tip);
  }

  /* ── Boucle d'animation ─────────────────────── */
  function animate() {
    if (!playing || fourierData.length === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var tip = computeAndDraw(time);
    path.push({ x: tip.x, y: tip.y });
    drawPath();
    drawTip(tip);

    var dt = (2 * Math.PI) / fourierData.length;
    time += dt;
    if (time >= 2 * Math.PI) {
      time -= 2 * Math.PI;
      path = [];
    }

    animId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (animId) cancelAnimationFrame(animId);
    animId = requestAnimationFrame(animate);
  }

  function stopAnimation() {
    if (animId) cancelAnimationFrame(animId);
    animId = null;
  }

  /* ── Contrôles ──────────────────────────────── */
  var sliderEl = document.getElementById("fourierEpicycles");
  var countEl = document.getElementById("fourierCount");
  var btnDraw = document.getElementById("btnFourierDraw");
  var btnPlay = document.getElementById("btnFourierPlay");
  var btnClear = document.getElementById("btnFourierClear");

  function getNEpicycles() {
    return sliderEl ? parseInt(sliderEl.value, 10) : 50;
  }

  function updateCountDisplay() {
    if (countEl) countEl.textContent = Math.min(getNEpicycles(), fourierData.length);
  }

  function updatePlayBtn() {
    if (btnPlay) btnPlay.textContent = playing ? "⏸ Pause" : "▶ Lancer";
  }

  if (sliderEl) {
    sliderEl.addEventListener("input", function () {
      updateCountDisplay();
      if (fourierData.length > 0) {
        path = [];
        if (!playing) {
          time = 0;
          drawStatic();
        }
      }
    });
  }

  if (btnDraw) {
    btnDraw.addEventListener("click", function () {
      drawingMode = !drawingMode;
      btnDraw.textContent = drawingMode ? "✏️ Stop dessin" : "✏️ Mode dessin";
      canvas.style.cursor = drawingMode ? "crosshair" : "default";
    });
  }

  if (btnPlay) {
    btnPlay.addEventListener("click", function () {
      if (fourierData.length === 0) return;
      playing = !playing;
      updatePlayBtn();
      if (playing) startAnimation();
      else stopAnimation();
    });
  }

  if (btnClear) {
    btnClear.addEventListener("click", function () {
      stopAnimation();
      isDrawing = false;
      drawingMode = false;
      drawnPoints = [];
      fourierData = [];
      path = [];
      time = 0;
      playing = false;
      if (btnDraw) btnDraw.textContent = "✏️ Mode dessin";
      canvas.style.cursor = "default";
      if (sliderEl) { sliderEl.max = 100; }
      updatePlayBtn();
      updateCountDisplay();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  }

  /* ── Init ───────────────────────────────────── */
  canvas.style.cursor = "default";
  updateCountDisplay();

})();
