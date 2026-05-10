const CONFIG = {
  // Tahun, bulan-1, tanggal, jam, menit
  eventDate: new Date(2026, 4, 15, 13, 0, 0),

  // Nomor WA format 62xxxx
  nomorWA: "6281234567890",
};

// ======================
// COUNTDOWN
// ======================

function tick() {
  const now = new Date();
  const diff = CONFIG.eventDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = `
      <div class="rounded border border-straw/20 bg-white/5 px-8 py-5">
        <div class="font-serif text-2xl text-white">
          Acara Sedang Berlangsung
        </div>
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

const pesan = encodeURIComponent(
  `Assalamu'alaikum,

Saya mengkonfirmasi kehadiran saya pada acara:

*Pertemuan Peternak JUN*

Nama:
Status: Hadir / Tidak Hadir

Terima kasih.`,
);

document.getElementById("btn-wa").href =
  `https://wa.me/${CONFIG.nomorWA}?text=${pesan}`;

// ======================
// SAVE CALENDAR
// ======================

function saveCalendar() {
  const start = CONFIG.eventDate;

  // durasi 3 jam
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);

  const pad = (n) => String(n).padStart(2, "0");

  const formatICS = (date) => {
    return (
      date.getFullYear() +
      pad(date.getMonth() + 1) +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      pad(date.getMinutes()) +
      "00"
    );
  };

  const ics = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//JUN//Peternak//ID
BEGIN:VEVENT
UID:peternak-jun-2026
DTSTAMP:${formatICS(new Date())}
DTSTART:${formatICS(start)}
DTEND:${formatICS(end)}
SUMMARY:Pertemuan Peternak JUN
DESCRIPTION:Pertemuan dan Diskusi Peternak Bebek Pedaging
LOCATION:Rumah Makan Mba Rum
END:VEVENT
END:VCALENDAR
`.trim();

  const blob = new Blob([ics], {
    type: "text/calendar;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "pertemuan-peternak-jun.ics";

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
