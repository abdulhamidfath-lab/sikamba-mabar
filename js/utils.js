// ============================================
// SIKAMBA MABAR - Fungsi Notifikasi & Konfirmasi
// Gunakan fungsi ini di semua halaman sebagai
// pengganti alert() dan confirm() bawaan browser
// ============================================

// ============================================
// showAlert(pesan, tipe, targetId, durasi)
//
// Menampilkan pesan notifikasi inline di halaman.
//
// Parameter:
//   pesan    — teks yang ditampilkan
//   tipe     — 'success' | 'error' | 'warning' | 'info'
//              (default: 'info')
//   targetId — id elemen tempat alert ditampilkan
//              (default: 'alertBox' — cari otomatis)
//   durasi   — berapa ms sebelum hilang otomatis
//              (default: 4000, isi 0 = tidak hilang)
// ============================================
function showAlert(pesan, tipe = 'info', targetId = null, durasi = 4000) {
  // Cari target elemen — pakai targetId kalau ada,
  // kalau tidak cari #alertBox, kalau tidak ada buat otomatis di atas
  let target = targetId
    ? document.getElementById(targetId)
    : document.getElementById('alertBox');

  // Kalau tidak ada #alertBox sama sekali, buat elemen baru
  // dan sisipkan di atas konten utama
  if (!target) {
    target = document.createElement('div');
    target.id = 'alertBox';
    target.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);z-index:9999;width:90%;max-width:480px;';
    document.body.appendChild(target);
  }

  // Ikon per tipe
  const ikon = {
    success: '✅',
    error:   '❌',
    warning: '⚠️',
    info:    'ℹ️'
  };

  // Buat elemen alert
  const alertEl = document.createElement('div');
  alertEl.className = `alert alert-${tipe}`;
  alertEl.style.cssText = 'display:flex;align-items:flex-start;gap:10px;animation:fadeInDown 0.3s ease;';
  alertEl.innerHTML = `
    <span style="font-size:16px;flex-shrink:0;margin-top:1px;">${ikon[tipe] || 'ℹ️'}</span>
    <span style="flex:1;line-height:1.6;">${pesan}</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;font-size:16px;color:inherit;opacity:0.6;padding:0;flex-shrink:0;line-height:1;" aria-label="Tutup">×</button>
  `;

  // Kosongkan target dulu lalu isi dengan alert baru
  target.innerHTML = '';
  target.appendChild(alertEl);

  // Scroll ke alert agar terlihat
  target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Hilang otomatis setelah durasi ms
  if (durasi > 0) {
    setTimeout(() => {
      if (alertEl && alertEl.parentElement) {
        alertEl.style.animation = 'fadeOutUp 0.3s ease forwards';
        setTimeout(() => alertEl.remove(), 300);
      }
    }, durasi);
  }
}

// ============================================
// showConfirm(opsi)
//
// Menampilkan modal konfirmasi sebagai pengganti
// confirm() bawaan browser. Mengembalikan Promise
// yang resolve true (klik Ya) atau false (klik Tidak/tutup).
//
// Parameter opsi:
//   judul    — judul modal (default: 'Konfirmasi')
//   pesan    — isi pesan konfirmasi
//   tipe     — 'danger' | 'warning' | 'info'
//              (mengubah warna tombol Ya)
//   labelYa  — teks tombol konfirmasi (default: 'Ya, Lanjutkan')
//   labelTdk — teks tombol batal (default: 'Batal')
//
// Contoh pakai:
//   const yakin = await showConfirm({
//     judul: 'Hapus IKM?',
//     pesan: 'Data ini tidak bisa dikembalikan.',
//     tipe: 'danger',
//     labelYa: 'Ya, Hapus'
//   });
//   if (!yakin) return;
// ============================================
function showConfirm({
  judul   = 'Konfirmasi',
  pesan   = 'Apakah Anda yakin?',
  tipe    = 'danger',
  labelYa = 'Ya, Lanjutkan',
  labelTdk = 'Batal'
} = {}) {
  return new Promise((resolve) => {

    // Warna tombol berdasarkan tipe
    const warnaYa = {
      danger:  'background:var(--red);color:white;',
      warning: 'background:var(--orange);color:white;',
      info:    'background:var(--brown);color:white;'
    };

    // Ikon berdasarkan tipe
    const ikonTipe = {
      danger:  '🗑️',
      warning: '⚠️',
      info:    'ℹ️'
    };

    // Buat overlay modal
    const overlay = document.createElement('div');
    overlay.id = 'confirmOverlay';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: fadeIn 0.2s ease;
    `;

    overlay.innerHTML = `
      <div style="
        background: white;
        border-radius: 16px;
        padding: 1.8rem;
        width: 100%;
        max-width: 380px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: slideUp 0.25s ease;
        text-align: center;
      ">
        <div style="font-size:48px;margin-bottom:0.8rem;line-height:1;">
          ${ikonTipe[tipe] || '❓'}
        </div>
        <h3 style="
          font-family:'Playfair Display',serif;
          color:var(--brown);
          margin-bottom:0.6rem;
          font-size:1.2rem;
        ">${judul}</h3>
        <p style="
          font-size:14px;
          color:var(--text2);
          line-height:1.7;
          margin-bottom:1.5rem;
        ">${pesan}</p>
        <div style="display:flex;gap:10px;justify-content:center;">
          <button id="confirmBtnTdk" style="
            flex:1;
            padding:11px 16px;
            border-radius:var(--radius);
            border:1.5px solid rgba(61,31,13,0.15);
            background:var(--cream2);
            color:var(--text);
            font-size:14px;
            font-weight:600;
            cursor:pointer;
            font-family:inherit;
            min-height:44px;
          ">${labelTdk}</button>
          <button id="confirmBtnYa" style="
            flex:1;
            padding:11px 16px;
            border-radius:var(--radius);
            border:none;
            ${warnaYa[tipe] || warnaYa.danger}
            font-size:14px;
            font-weight:600;
            cursor:pointer;
            font-family:inherit;
            min-height:44px;
          ">${labelYa}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Fungsi tutup modal
    function tutup(hasil) {
      overlay.style.animation = 'fadeOut 0.2s ease forwards';
      setTimeout(() => {
        overlay.remove();
        resolve(hasil);
      }, 200);
    }

    // Event listener tombol
    document.getElementById('confirmBtnYa').onclick  = () => tutup(true);
    document.getElementById('confirmBtnTdk').onclick = () => tutup(false);

    // Klik di luar modal = batal
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) tutup(false);
    });

    // Escape = batal
    function handleEsc(e) {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', handleEsc);
        tutup(false);
      }
    }
    document.addEventListener('keydown', handleEsc);
  });
}

// ============================================
// CSS animasi untuk modal dan alert
// Diinjeksi otomatis saat utils.js dimuat
// ============================================
(function injectUtilsCSS() {
  if (document.getElementById('utils-css')) return;
  const style = document.createElement('style');
  style.id = 'utils-css';
  style.textContent = `
    @keyframes fadeInDown {
      from { opacity:0; transform:translateY(-10px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeOutUp {
      from { opacity:1; transform:translateY(0); }
      to   { opacity:0; transform:translateY(-10px); }
    }
    @keyframes fadeIn {
      from { opacity:0; }
      to   { opacity:1; }
    }
    @keyframes fadeOut {
      from { opacity:1; }
      to   { opacity:0; }
    }
    @keyframes slideUp {
      from { opacity:0; transform:translateY(20px); }
      to   { opacity:1; transform:translateY(0); }
    }
    #confirmOverlay button:hover {
      opacity: 0.88;
    }
  `;
  document.head.appendChild(style);
})();
