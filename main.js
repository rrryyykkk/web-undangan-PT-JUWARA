const CONFIG = {
  eventDate: new Date(2026, 4, 15, 13, 0, 0),
};

// ======================
// COUNTDOWN
// ======================

function tick() {
  const now = new Date();
  const diff = CONFIG.eventDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = `
      <div style="grid-column:1/-1;background:rgba(255,255,255,.7);border:1px solid rgba(45,90,61,.18);border-radius:10px;padding:20px;text-align:center">
        <div style="font-family:'Cormorant Garamond',serif;font-size:1.5rem;color:#1e3d2a">Acara Sedang Berlangsung</div>
      </div>
    `;
    return;
  }

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById("cd-day").textContent = String(days).padStart(2, "0");
  document.getElementById("cd-hour").textContent = String(hours).padStart(
    2,
    "0",
  );
  document.getElementById("cd-min").textContent = String(mins).padStart(2, "0");
  document.getElementById("cd-sec").textContent = String(secs).padStart(2, "0");
}

tick();
setInterval(tick, 1000);

// ======================
// WHATSAPP BUTTON
// ======================

// ======================
// SAVE CALENDAR
// ======================

function saveCalendar() {
  const start = CONFIG.eventDate;
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const pad = (n) => String(n).padStart(2, "0");
  const fmt = (d) =>
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    "T" +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    "00";

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//JUN//Peternak//ID
BEGIN:VEVENT
UID:peternak-jun-2026
DTSTAMP:${fmt(new Date())}
DTSTART:${fmt(start)}
DTEND:${fmt(end)}
SUMMARY:Pertemuan Peternak JUN
DESCRIPTION:Pertemuan dan Diskusi Peternak Bebek Pedaging
LOCATION:Rumah Makan Mba Rum
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pertemuan-peternak-jun.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ======================
// VANILLA ANIMATIONS
// ======================

document.addEventListener("DOMContentLoaded", () => {
  // --- Header: stagger fade-up saat load ---
  const headerItems = [
    { sel: ".fade1", delay: 60 },
    { sel: ".fade2", delay: 180 },
    { sel: ".fade3", delay: 300 },
    { sel: ".fade4", delay: 440 },
  ];

  headerItems.forEach(({ sel, delay }) => {
    document.querySelectorAll(sel).forEach((el) => {
      setTimeout(() => el.classList.add("is-visible"), delay);
    });
  });

  // Countdown boxes: stagger setelah header
  document.querySelectorAll(".cd-box").forEach((el, i) => {
    setTimeout(() => el.classList.add("is-visible"), 500 + i * 80);
  });

  // --- Scroll reveal via IntersectionObserver ---
  const revealEls = document.querySelectorAll(
    ".card, .sponsor-block, .map-card, .sec-label, .g-dot, .ornament, .btn-wa, .btn-cal, footer",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        // g-dot: stagger per index
        if (el.classList.contains("g-dot")) {
          const siblings = [
            ...el.closest(".grid, .card").querySelectorAll(".g-dot"),
          ];
          const idx = siblings.indexOf(el);
          setTimeout(() => el.classList.add("is-visible"), idx * 100);
        } else {
          el.classList.add("is-visible");
        }

        observer.unobserve(el);
      });
    },
    { rootMargin: "-50px 0px" },
  );

  revealEls.forEach((el) => observer.observe(el));
});
