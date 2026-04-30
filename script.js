const meter = document.querySelector(".scroll-meter");
const reveals = document.querySelectorAll(".reveal");
const canvas = document.getElementById("mesh");
const ctx = canvas.getContext("2d");

const setMeter = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  meter.style.width = `${progress}%`;
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((item) => revealObserver.observe(item));
window.addEventListener("scroll", setMeter, { passive: true });
setMeter();

const pointer = { x: 0, y: 0 };
let points = [];
let frame = 0;

const resizeCanvas = () => {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(82, Math.floor((window.innerWidth * window.innerHeight) / 17000));
  points = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
  }));
};

const drawMesh = () => {
  frame += 1;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  points.forEach((point) => {
    point.x += point.vx;
    point.y += point.vy;

    if (point.x < -20 || point.x > window.innerWidth + 20) point.vx *= -1;
    if (point.y < -20 || point.y > window.innerHeight + 20) point.vy *= -1;

    const dx = pointer.x - point.x;
    const dy = pointer.y - point.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 120 && distance > 0) {
      point.x -= dx * 0.0025;
      point.y -= dy * 0.0025;
    }
  });

  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const a = points[i];
      const b = points[j];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);

      if (distance < 150) {
        const opacity = 1 - distance / 150;
        ctx.strokeStyle = `rgba(73, 245, 169, ${opacity * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  points.forEach((point, index) => {
    const pulse = 1.4 + Math.sin(frame * 0.025 + index) * 0.35;
    ctx.fillStyle = index % 3 === 0 ? "rgba(77, 215, 255, 0.55)" : "rgba(73, 245, 169, 0.55)";
    ctx.beginPath();
    ctx.arc(point.x, point.y, pulse, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawMesh);
};

window.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawMesh();
