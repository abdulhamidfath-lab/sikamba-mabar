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
    .admin-sidebar-logo-icon { font-size: 22px; }
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
    .admin-sidebar-link .sb {
      margin-left: auto;
      background: #C8862B;
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 10px;
      display: none;
    }
    .admin-sidebar-divider { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 6px 1rem; }
    .admin-sidebar-bottom { margin-top: auto; padding: 1rem; border-top: 1px solid rgba(255,255,255,0.1); }
    .admin-sidebar-user { display: flex; align-items: center; gap: 10px; }
    .admin-sidebar-avatar { width: 34px; height: 34px; border-radius: 50%; background: #E8B45A; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
    .admin-sidebar-user-name { color: white; font-size: 12px; font-weight: 600; }
    .admin-sidebar-user-role { color: rgba(255,255,255,0.45); font-size: 10px; }

    /* TOPBAR ADMIN — lebih simpel, tanpa nav links */
    .admin-topbar {
      background: #3D1F0D;
      height: 52px;
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
    }
    .admin-topbar-brand {
      color: white;
      font-family: 'Playfair Display', serif;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      display: none;
    }
    .admin-topbar-search { flex: 1; max-width: 360px; display: flex; }
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

    /* MAIN WRAPPER */
    .admin-main { flex: 1; min-width: 0; display: flex; flex-direction: column; overflow-x: hidden; }

    /* OVERLAY MOBILE */
    .admin-sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 49;
    }

    @media (max-width: 900px) {
      .admin-sidebar {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        transform: translateX(-100%);
      }
      .admin-sidebar.open {
        transform: translateX(0);
      }
      .admin-sidebar-overlay.open { display: block; }
      .admin-topbar-toggle { display: block; }
      .admin-topbar-brand { display: block; }
      .admin-topbar-search { max-width: 200px; }
    }
  </style>
`;

const SIDEBAR_HTML = `
  <div class="admin-sidebar-overlay" id="adminOverlay" onclick="closeSidebar()"></div>

  <div class="sidebar-layout">
    <aside class="admin-sidebar" id="adminSidebar">
      <a href="dashboard.html" class="admin-sidebar-logo">
        <span class="admin-sidebar-logo-icon">🏛️</span>
        <div>
          <div class="admin-sidebar-logo-text">SIKAMBA MABAR</div>
          <div class="admin-sidebar-logo-sub">Dinas Perindustrian & Perdagangan</div>
        </div>
      </a>

      <div class="admin-sidebar-section">
        <div class="admin-sidebar-label">Utama</div>
        <a href="dashboard.html" class="admin-sidebar-link" data-page="dashboard"><span class="si">🏠</span>Dashboard</a>
        <a href="data-ikm.html" class="admin-sidebar-link" data-page="data-ikm"><span class="si">🏭</span>Data IKM</a>
        <a href="peta.html" class="admin-sidebar-link" data-page="peta"><span class="si">🗺️</span>Peta Industri</a>
        <a href="marketplace.html" class="admin-sidebar-link" data-page="marketplace"><span class="si">🛍️</span>Marketplace</a>
        <a href="cari.html" class="admin-sidebar-link" data-page="cari"><span class="si">🔍</span>Pencarian</a>
      </div>

      <hr class="admin-sidebar-divider">

      <div class="admin-sidebar-section">
        <div class="admin-sidebar-label">Administrasi</div>
        <a href="laporan.html" class="admin-sidebar-link" data-page="laporan"><span class="si">📊</span>Laporan & Statistik</a>
        <a href="manajemen-pengguna.html" class="admin-sidebar-link" data-page="manajemen-pengguna"><span class="si">👥</span>Manajemen Pengguna</a>
        <a href="form-ikm.html" class="admin-sidebar-link" data-page="form-ikm"><span class="si">➕</span>Tambah IKM</a>
      </div>

      <hr class="admin-sidebar-divider">

      <div class="admin-sidebar-section">
        <div class="admin-sidebar-label">Akun</div>
        <a href="profil.html" class="admin-sidebar-link" data-page="profil"><span class="si">👤</span>Profil Saya</a>
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
      </div>
    </aside>

    <div class="admin-main" id="adminMain">
      <!-- TOPBAR ADMIN -->
      <div class="admin-topbar">
        <button class="admin-topbar-toggle" onclick="toggleSidebar()">☰</button>
        <a href="dashboard.html" class="admin-topbar-brand">🏛️ SIKAMBA</a>
        <form class="admin-topbar-search" onsubmit="goSearchAdmin(event)">
          <input type="text" id="adminNavSearch" placeholder="🔍 Cari IKM atau produk...">
          <button type="submit">Cari</button>
        </form>
        <div class="admin-topbar-right">
          <span class="admin-topbar-page" id="adminTopbarPage"></span>
        </div>
      </div>
`;

const SIDEBAR_CLOSE = `
    </div><!-- end admin-main -->
  </div><!-- end sidebar-layout -->
`;

// Fungsi untuk inject sidebar ke halaman
async function initAdminSidebar(pageName) {
  try {
    const user = await getUser();
    if (!user) return;
    const profil = await getProfil(user.id);
    if (profil?.peran !== 'admin') return;

    // Inject CSS ke head
    document.head.insertAdjacentHTML('beforeend', SIDEBAR_CSS);

    // Tambah class ke body
    document.body.classList.add('has-sidebar');

    // Sembunyikan navbar lama
    const oldNavbar = document.querySelector('.navbar');
    const oldBatik = document.querySelector('.batik-strip');
    if (oldNavbar) oldNavbar.style.display = 'none';
    if (oldBatik) oldBatik.style.display = 'none';

    // Bungkus semua konten body dalam layout sidebar
    const bodyContent = document.body.innerHTML;
    document.body.innerHTML = SIDEBAR_HTML + bodyContent + SIDEBAR_CLOSE;

    // Set nama admin
    const nama = profil?.nama_lengkap || user.email;
    const el = document.getElementById('sidebarNamaAdmin');
    if (el) el.textContent = nama;

    // Set active page
    const links = document.querySelectorAll('.admin-sidebar-link[data-page]');
    links.forEach(link => {
      if (link.dataset.page === pageName) link.classList.add('active');
    });

    // Set label halaman di topbar
    const pageLabels = {
      'dashboard': 'Dashboard',
      'data-ikm': 'Data IKM',
      'peta': 'Peta Industri',
      'marketplace': 'Marketplace',
      'cari': 'Pencarian',
      'laporan': 'Laporan & Statistik',
      'manajemen-pengguna': 'Manajemen Pengguna',
      'form-ikm': 'Tambah IKM',
      'detail-ikm': 'Detail IKM',
      'profil': 'Profil Saya',
      'tentang': 'Tentang',
    };
    const topbarPage = document.getElementById('adminTopbarPage');
    if (topbarPage) topbarPage.textContent = pageLabels[pageName] || '';

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
