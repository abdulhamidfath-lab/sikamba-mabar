// ============================================
// SIKAMBA MABAR - Sidebar Admin
// Include file ini di semua halaman
// ============================================

const SIDEBAR_CSS = `
  <style id="sidebar-style">
    body.has-sidebar { display: flex; flex-direction: column; min-height: 100vh; }
    .sidebar-layout { display: flex; flex: 1; }

    .admin-sidebar {
      width: 240px;
      background: #3D1F0D;
      min-height: 100vh;
      flex-shrink: 0;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      z-index: 50;
      transition: transform 0.3s;
    }
    .admin-sidebar-logo {
      padding: 1.3rem 1.2rem 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    .admin-sidebar-logo-icon { width: 32px; height: 32px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
    .admin-sidebar-logo-text { color: white; font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 700; line-height: 1.3; }
    .admin-sidebar-logo-sub { color: rgba(255,255,255,0.45); font-size: 10px; font-weight: 400; }
    .admin-sidebar-section { padding: 0.8rem 0.8rem 0.4rem; }
    .admin-sidebar-label { color: rgba(255,255,255,0.38); font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 0 0.5rem; margin-bottom: 3px; }
    .admin-sidebar-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 9px;
      color: rgba(255,255,255,0.7);
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.15s;
      margin-bottom: 2px;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
    }
    .admin-sidebar-link:hover { background: rgba(255,255,255,0.1); color: white; }
    .admin-sidebar-link.active { background: rgba(255,255,255,0.15); color: white; }
    .admin-sidebar-link .si { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }
    .admin-sidebar-divider { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 6px 1rem; }
    .admin-sidebar-bottom { margin-top: auto; padding: 1rem; border-top: 1px solid rgba(255,255,255,0.1); }
    .admin-sidebar-user { display: flex; align-items: center; gap: 10px; }
    .admin-sidebar-avatar { width: 34px; height: 34px; border-radius: 50%; background: #E8B45A; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
    .admin-sidebar-user-name { color: white; font-size: 12px; font-weight: 600; }
    .admin-sidebar-user-role { color: rgba(255,255,255,0.45); font-size: 10px; }

    .admin-topbar {
      background: #3D1F0D;
      height: 56px;
      display: flex;
      align-items: center;
      padding: 0 1.2rem;
      gap: 10px;
      position: sticky;
      top: 0;
      z-index: 40;
    }
    .admin-topbar-toggle {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      display: none;
      padding: 4px 6px;
      flex-shrink: 0;
    }
    .admin-topbar-brand {
      color: white;
      font-family: 'Playfair Display', serif;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      display: none;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .admin-topbar-brand img { width: 28px; height: 28px; border-radius: 5px; object-fit: cover; }

    /* =============================================
       SEARCH BAR DI TOPBAR ADMIN
       Di desktop: tampil normal
       Di HP (max 900px): DISEMBUNYIKAN
       karena sudah ada mobile-search-bar di bawah
       ============================================= */
    .admin-topbar-search {
      flex: 1;
      max-width: 360px;
      display: flex;
    }
    .admin-topbar-search input {
      flex: 1;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.18);
      border-right: none;
      border-radius: 8px 0 0 8px;
      padding: 6px 12px;
      font-size: 13px;
      color: white;
      font-family: 'Plus Jakarta Sans', sans-serif;
      outline: none;
    }
    .admin-topbar-search input::placeholder { color: rgba(255,255,255,0.4); }
    .admin-topbar-search button {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.18);
      border-radius: 0 8px 8px 0;
      padding: 6px 10px;
      color: white;
      cursor: pointer;
      font-size: 13px;
      white-space: nowrap;
    }

    .admin-topbar-right { margin-left: auto; display: flex; align-items: center; gap: 8px; }
    .admin-topbar-page { color: rgba(255,255,255,0.6); font-size: 13px; font-weight: 500; }
    .admin-main { flex: 1; min-width: 0; display: flex; flex-direction: column; overflow-x: hidden; }
    .admin-sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 49;
    }
    body.has-sidebar { overflow-x: hidden; }
    body.has-sidebar .admin-main { overflow-x: hidden; width: 100%; }
    body.has-sidebar .container,
    body.has-sidebar .container-sm,
    body.has-sidebar [class*="container"] {
      max-width: 100% !important;
      width: 100% !important;
      padding-left: 1.5rem !important;
      padding-right: 1.5rem !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    body.has-sidebar .stat-row,
    body.has-sidebar .stat-grid,
    body.has-sidebar .ikm-grid,
    body.has-sidebar .produk-grid,
    body.has-sidebar .charts-grid,
    body.has-sidebar .feature-grid,
    body.has-sidebar .cards-grid {
      width: 100% !important;
    }
    body.has-sidebar .filter-bar { width: 100% !important; box-sizing: border-box !important; }
    body.has-sidebar #map { width: 100% !important; }

    /* =============================================
       RESPONSIVE — HP (max 900px)
       ============================================= */
    @media (max-width: 900px) {
      .admin-sidebar {
        position: fixed;
        left: 0; top: 0; bottom: 0;
        transform: translateX(-100%);
      }
      .admin-sidebar.open { transform: translateX(0); }
      .admin-sidebar-overlay.open { display: block; }
      .admin-topbar-toggle { display: block; }
      .admin-topbar-brand { display: flex; }

      /* ✅ PERBAIKAN UTAMA:
         Sembunyikan search bar di topbar saat HP
         karena sudah ada mobile-search-bar di bawah navbar.
         Ini menghilangkan double search bar. */
      .admin-topbar-search { display: none; }
    }
  </style>
`;

// Fungsi untuk mendapatkan path logo yang benar
// berdasarkan posisi file (root atau /pages/)
function _getLogoPath() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../images/logo-mabar.png' : 'images/logo-mabar.png';
}

async function initAdminSidebar(pageName) {
  try {
    const user = await getUser();
    if (!user) return;
    const profil = await getProfil(user.id);
    if (profil?.peran !== 'admin') return;

    const logoPath = _getLogoPath();

    document.head.insertAdjacentHTML('beforeend', SIDEBAR_CSS);
    document.body.classList.add('has-sidebar');

    const oldNavbar = document.querySelector('.navbar');
    const oldBatik  = document.querySelector('.batik-strip');
    if (oldNavbar) oldNavbar.style.display = 'none';
    if (oldBatik)  oldBatik.style.display  = 'none';

    const overlay = document.createElement('div');
    overlay.className = 'admin-sidebar-overlay';
    overlay.id = 'adminOverlay';
    overlay.onclick = closeSidebar;

    const layout = document.createElement('div');
    layout.className = 'sidebar-layout';

    const sidebarEl = document.createElement('aside');
    sidebarEl.className = 'admin-sidebar';
    sidebarEl.id = 'adminSidebar';
    sidebarEl.innerHTML = `
      <a href="dashboard.html" class="admin-sidebar-logo">
        <img src="${logoPath}" alt="Logo Mabar" class="admin-sidebar-logo-icon">
        <div>
          <div class="admin-sidebar-logo-text">SIKAMBA MABAR</div>
          <div class="admin-sidebar-logo-sub">Dinas Perindustrian & Perdagangan</div>
        </div>
      </a>
      <div class="admin-sidebar-section">
        <div class="admin-sidebar-label">Utama</div>
        <a href="dashboard.html"   class="admin-sidebar-link" data-page="dashboard"><span class="si">🏠</span>Dashboard</a>
        <a href="data-ikm.html"    class="admin-sidebar-link" data-page="data-ikm"><span class="si">🏭</span>Data IKM</a>
        <a href="peta.html"        class="admin-sidebar-link" data-page="peta"><span class="si">🗺️</span>Peta Industri</a>
        <a href="marketplace.html" class="admin-sidebar-link" data-page="marketplace"><span class="si">🛍️</span>Marketplace</a>
        <a href="cari.html"        class="admin-sidebar-link" data-page="cari"><span class="si">🔍</span>Pencarian</a>
      </div>
      <hr class="admin-sidebar-divider">
      <div class="admin-sidebar-section">
        <div class="admin-sidebar-label">Administrasi</div>
        <a href="laporan.html"            class="admin-sidebar-link" data-page="laporan"><span class="si">📊</span>Laporan & Statistik</a>
        <a href="manajemen-pengguna.html" class="admin-sidebar-link" data-page="manajemen-pengguna"><span class="si">👥</span>Manajemen Pengguna</a>
        <a href="form-ikm.html"           class="admin-sidebar-link" data-page="form-ikm"><span class="si">➕</span>Tambah IKM</a>
      </div>
      <hr class="admin-sidebar-divider">
      <div class="admin-sidebar-section">
        <div class="admin-sidebar-label">Akun</div>
        <a href="profil.html"  class="admin-sidebar-link" data-page="profil"><span class="si">👤</span>Profil Saya</a>
        <a href="tentang.html" class="admin-sidebar-link" data-page="tentang"><span class="si">ℹ️</span>Tentang SIKAMBA</a>
        <button class="admin-sidebar-link" onclick="logout()"><span class="si">🚪</span>Keluar</button>
      </div>
      <div class="admin-sidebar-bottom">
        <div class="admin-sidebar-user">
          <div class="admin-sidebar-avatar">👑</div>
          <div>
            <div class="admin-sidebar-user-name" id="sidebarNamaAdmin">Admin</div>
            <div class="admin-sidebar-user-role">Administrator</div>
          </div>
        </div>
      </div>`;

    const topbarEl = document.createElement('div');
    topbarEl.className = 'admin-topbar';
    topbarEl.innerHTML = `
      <button class="admin-topbar-toggle" onclick="toggleSidebar()">☰</button>
      <a href="dashboard.html" class="admin-topbar-brand">
        <img src="${logoPath}" alt="Logo">
        SIKAMBA
      </a>
      <form class="admin-topbar-search" onsubmit="goSearchAdmin(event)">
        <input type="text" id="adminNavSearch" placeholder="🔍 Cari IKM atau produk...">
        <button type="submit">Cari</button>
      </form>
      <div class="admin-topbar-right">
        <span class="admin-topbar-page" id="adminTopbarPage"></span>
      </div>`;

    const mainEl = document.createElement('div');
    mainEl.className = 'admin-main';
    mainEl.id = 'adminMain';

    const bodyChildren = Array.from(document.body.childNodes);
    mainEl.appendChild(topbarEl);
    bodyChildren.forEach(child => mainEl.appendChild(child));

    layout.appendChild(sidebarEl);
    layout.appendChild(mainEl);
    document.body.appendChild(overlay);
    document.body.appendChild(layout);

    const nama = profil?.nama_lengkap || user.email;
    const elNama = document.getElementById('sidebarNamaAdmin');
    if (elNama) elNama.textContent = nama;

    // Tandai menu yang sedang aktif
    document.querySelectorAll('.admin-sidebar-link[data-page]').forEach(link => {
      if (link.dataset.page === pageName) link.classList.add('active');
    });

    // Tampilkan nama halaman di topbar
    const pageLabels = {
      'dashboard'           : 'Dashboard',
      'data-ikm'            : 'Data IKM',
      'peta'                : 'Peta Industri',
      'marketplace'         : 'Marketplace',
      'cari'                : 'Pencarian',
      'laporan'             : 'Laporan & Statistik',
      'manajemen-pengguna'  : 'Manajemen Pengguna',
      'form-ikm'            : 'Tambah IKM',
      'detail-ikm'          : 'Detail IKM',
      'form-produk'         : 'Tambah Produk',
      'produk-saya'         : 'Produk Saya',
      'profil'              : 'Profil Saya',
      'tentang'             : 'Tentang',
    };
    const topbarPage = document.getElementById('adminTopbarPage');
    if (topbarPage) topbarPage.textContent = pageLabels[pageName] || '';

    // Refresh peta Leaflet kalau ada
    setTimeout(() => {
      if (window.map && typeof window.map.invalidateSize === 'function') {
        window.map.invalidateSize();
      }
    }, 300);

  } catch(e) {
    console.log('Sidebar init error:', e.message);
  }
}

function toggleSidebar() {
  document.getElementById('adminSidebar')?.classList.toggle('open');
  document.getElementById('adminOverlay')?.classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('adminSidebar')?.classList.remove('open');
  document.getElementById('adminOverlay')?.classList.remove('open');
}

function goSearchAdmin(e) {
  e.preventDefault();
  const q = document.getElementById('adminNavSearch')?.value.trim();
  if (q) window.location.href = 'cari.html?q=' + encodeURIComponent(q);
}
