// ============================================
// SIKAMBA MABAR - Navbar Konsisten
// Mengisi ulang menu navbar (#navMenu) otomatis
// berdasarkan status login & peran pengguna,
// supaya semua halaman punya menu yang sama.
// ============================================

async function renderNavbar(halamanAktif) {
  const navMenu = document.getElementById('navMenu');
  if (!navMenu) return;

  // Deteksi apakah file ini ada di dalam folder /pages/ atau di root
  const diPages    = window.location.pathname.includes('/pages/');
  const prefix     = diPages ? '' : 'pages/';   // dari root ke pages/
  const rootPrefix = diPages ? '../' : '';       // dari pages/ ke root

  let user = null;
  let profil = null;
  try {
    user = await getUser();
    if (user) profil = await getProfil(user.id);
  } catch(e) {}

  const peran = profil?.peran || null;

  // Kalau belum ada fungsi logout() di halaman ini (halaman publik
  // yang belum load auth.js), sediakan versi cadangan
  if (typeof window.logout !== 'function') {
    window.logout = async function() {
      await db.auth.signOut();
      window.location.href = rootPrefix + 'login.html';
    };
  }

  const links = [];

  // Menu utama — beda label tergantung sudah login atau belum
  if (user) {
    links.push({ key: 'dashboard', label: 'Dashboard', href: prefix + 'dashboard.html' });
  } else {
    links.push({ key: 'beranda', label: 'Beranda', href: rootPrefix + 'index.html' });
  }

  links.push({ key: 'data-ikm',     label: 'Data IKM',       href: prefix + 'data-ikm.html' });
  links.push({ key: 'peta',         label: 'Peta Industri',  href: prefix + 'peta.html' });
  links.push({ key: 'marketplace',  label: 'Marketplace',    href: prefix + 'marketplace.html' });
  links.push({ key: 'informasi',    label: 'Informasi',      href: prefix + 'informasi.html' });

  // Menu khusus peran IKM
  if (peran === 'ikm') {
    links.push({ key: 'produk-saya',   label: 'Produk Saya',      href: prefix + 'produk-saya.html' });
    links.push({ key: 'dokumen-saya',  label: '📄 Dokumen Saya',  href: prefix + 'dokumen-saya.html' });
  }

  // Menu akun — cuma untuk yang sudah login
  if (user) {
    links.push({ key: 'profil', label: 'Profil Saya', href: prefix + 'profil.html' });
  }

  // Render ke HTML
  navMenu.innerHTML = links.map(l =>
    `<a href="${l.href}"${l.key === halamanAktif ? ' class="active"' : ''}>${l.label}</a>`
  ).join('') + (
    user
      ? `<a href="#" onclick="logout()">Keluar</a>`
      : `<a href="${rootPrefix}login.html">Masuk</a>`
  );
}
